import {
  bucketItemsToGroups,
  bucketTypes,
  PreviewBucket,
} from "./groups/bucket";
import { containerItemsToGroups, containerTypes } from "./groups/container";
import { lambdaItemsToGroups, lambdaTypes } from "./groups/lambda";
import { PreviewDigest, PreviewStep } from "./schema";

export const mapPreviewStep = ({
  op,
  urn,
  newState,
  oldState,
  diffReasons,
}: PreviewStep) => {
  const id = newState?.id || oldState?.id || urn.split("::").pop();
  const [provider, libraryFull, resource] = (
    newState?.type ||
    oldState?.type ||
    ""
  ).split(":");
  const [library, libraryPart] = (libraryFull || "").split("/");

  return {
    id,
    provider,
    library,
    libraryPart,
    resource,
    urn,
    op,
    diffReasons,
  };
};

export type PreviewDisplayStep = ReturnType<typeof mapPreviewStep>;

export const mapPreviewDigest = ({ changeSummary, steps }: PreviewDigest) => {
  const items: PreviewDisplayStep[] = [];

  const bucketItems: PreviewStep[] = [];
  const lambdaItems: PreviewStep[] = [];
  const containerItems: PreviewStep[] = [];

  for (const step of steps || []) {
    const type = step.newState?.type || step.oldState?.type;

    if (type && bucketTypes.includes(type)) {
      bucketItems.push(step);
    } else if (type && lambdaTypes.includes(type)) {
      lambdaItems.push(step);
    } else if (type && containerTypes.includes(type)) {
      containerItems.push(step);
    } else {
      const mappedStep = mapPreviewStep(step);
      items.push(mappedStep);
    }
  }

  const groups = [
    ...lambdaItemsToGroups(lambdaItems),
    ...bucketItemsToGroups(bucketItems),
    ...containerItemsToGroups(containerItems),
  ];

  return {
    changeSummary,
    groups,
    items,
  };
};

export type PreviewDisplay = ReturnType<typeof mapPreviewDigest>;
