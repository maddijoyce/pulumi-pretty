import z from "zod";
import { PreviewStep, StepOp } from "../schema";

const containerStateSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("docker:index/tag:Tag"),
    inputs: z.object({ sourceImage: z.string(), targetImage: z.string() }),
  }),
  z.object({
    type: z.literal("docker:index/registryImage:RegistryImage"),
    inputs: z.object({ name: z.string() }),
  }),
  z.object({
    type: z.literal("aws:ecs/taskDefinition:TaskDefinition"),
    propertyDependencies: z.object({
      containerDefinitions: z.array(z.string()),
    }),
  }),
  z.object({
    type: z.literal("aws:ecs/service:Service"),
    propertyDependencies: z.object({
      taskDefinition: z.array(z.string()),
    }),
  }),
]);

export const containerTypes = [
  "docker:index/tag:Tag",
  "docker:index/registryImage:RegistryImage",
  "aws:ecs/taskDefinition:TaskDefinition",
  "aws:ecs/service:Service",
];

export type PreviewContainer = {
  id: string;
  type: "container";

  tag?: [StepOp, string[]];
  registryImage?: [StepOp, string[]];
  taskDefinition?: [StepOp, string[]];
  service?: [StepOp, string[]];
};

export const containerItemsToGroups = (containerItems: PreviewStep[]) => {
  const groups: Record<string, PreviewContainer> = {};
  const registryUrnToId: [string, string][] = [];
  const registryUrnToTask: Record<string, PreviewStep> = {};
  const taskUrnToService: Record<string, PreviewStep> = {};

  for (const item of containerItems) {
    const { data } = containerStateSchema.safeParse(
      item.newState || item.oldState
    );
    if (!data) continue;

    switch (data.type) {
      case "docker:index/tag:Tag": {
        const group = (groups[data.inputs.targetImage] = groups[
          data.inputs.targetImage
        ] || {
          id: data.inputs.targetImage,
          type: "container",
        });
        group.tag = [item.op, []];
        break;
      }
      case "docker:index/registryImage:RegistryImage": {
        const group = (groups[data.inputs.name] = groups[data.inputs.name] || {
          id: data.inputs.name,
          type: "container",
        });
        group.registryImage = [item.op, []];
        registryUrnToId.push([item.urn, data.inputs.name]);
        break;
      }
      case "aws:ecs/taskDefinition:TaskDefinition": {
        const registryUrn = data.propertyDependencies.containerDefinitions.find(
          (urn) => urn.includes("registryImage:RegistryImage")
        );
        if (registryUrn) registryUrnToTask[registryUrn] = item;
        break;
      }
      case "aws:ecs/service:Service": {
        for (const taskUrn of data.propertyDependencies.taskDefinition) {
          taskUrnToService[taskUrn] = item;
        }
        break;
      }
    }
  }

  for (const [registryUrn, groupId] of registryUrnToId) {
    const task = registryUrnToTask[registryUrn];

    if (task) {
      const group = (groups[groupId] = groups[groupId] || {
        id: groupId,
        type: "container",
      });
      group.taskDefinition = [task.op, task.diffReasons || []];

      const service = taskUrnToService[task.urn];
      if (service) {
        group.service = [service.op, service.diffReasons || []];
      }
    }
  }

  return Object.values(groups);
};
