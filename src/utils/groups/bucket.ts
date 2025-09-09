import z from "zod";
import { PreviewStep } from "../schema";
import { sortField } from "../sort";

const bucketStateSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("aws:s3/bucket:Bucket"),
    inputs: z.object({ bucket: z.string() }),
  }),
  z.object({
    type: z.literal("aws:s3/bucketObject:BucketObject"),
    inputs: z.object({ bucket: z.string(), key: z.string() }),
  }),
]);

export const bucketTypes = [
  "aws:s3/bucket:Bucket",
  "aws:s3/bucketObject:BucketObject",
];

export type PreviewBucket = {
  id: string;
  type: "bucket";

  changes: string[];

  create: string[];
  update: string[];
  delete: string[];
};

export const bucketItemsToGroups = (bucketItems: PreviewStep[]) => {
  const groups: Record<string, PreviewBucket> = {};

  for (const item of sortField(bucketItems, { key: "urn", dir: "asc" })) {
    const { data } = bucketStateSchema.safeParse(
      item.newState || item.oldState
    );
    if (!data) continue;

    const groupId = data.inputs.bucket;
    const group = (groups[groupId] = groups[groupId] || {
      id: groupId,
      type: "bucket",

      changes: [],
      create: [],
      update: [],
      delete: [],
    });

    // console.log(data.type);
    if (data.type === "aws:s3/bucket:Bucket" && item.diffReasons?.length) {
      group.changes.push(...item.diffReasons);
    } else if (data.type === "aws:s3/bucketObject:BucketObject") {
      switch (item.op) {
        case "create":
          group.create.push(data.inputs.key);
          break;
        case "update":
          group.update.push(data.inputs.key);
          break;
        case "delete":
          group.delete.push(data.inputs.key);
          break;
      }
    }
  }

  return Object.values(groups);
};
