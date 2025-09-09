import z from "zod";
import { PreviewStep } from "../schema";
import { sortField } from "../sort";

const lambdaStateSchema = z.object({
  type: z.literal("aws:lambda/function:Function"),
  inputs: z.object({
    name: z.string(),
  }),
});

export const lambdaTypes = ["aws:lambda/function:Function"];

export type PreviewLambda = {
  id: string;
  type: "lambda";

  create: string[];
  delete: string[];
  update: string[];
  code: string[];
};

export const lambdaItemsToGroups = (lambdaItems: PreviewStep[]) => {
  if (!lambdaItems.length) return [];

  const group: PreviewLambda = {
    id: "functions",
    type: "lambda",

    create: [],
    delete: [],
    update: [],
    code: [],
  };

  for (const item of sortField(lambdaItems, { key: "urn", dir: "asc" })) {
    const { data } = lambdaStateSchema.safeParse(
      item.newState || item.oldState
    );
    if (!data) continue;

    switch (item.op) {
      case "create":
        group.create.push(data.inputs.name);
        break;
      case "delete":
        group.delete.push(data.inputs.name);
        break;
      case "update": {
        const diffReasons = (item.diffReasons || []).filter(
          (reason) => reason !== "lastModified"
        );
        if (diffReasons.length === 1 && diffReasons[0] === "code") {
          group.code.push(data.inputs.name);
        } else {
          group.update.push(`${data.inputs.name} (${diffReasons.join(", ")})`);
        }
        break;
      }
    }
  }

  return [group];
};
