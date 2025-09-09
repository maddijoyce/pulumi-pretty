import clsx from "clsx";
import { PreviewDisplayStep } from "../utils/parse";
import { operationColors, operationLabels } from "../utils/operations";
import { Logo } from "./logo";
import { Code, Strong, Text } from "./text";
import { Badge } from "./badge";

export const Change = ({ step }: { step: PreviewDisplayStep }) => {
  return (
    <div className="flex flex-col gap-1 items-start px-6 py-2.5 rounded border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex gap-2 items-center">
        <Badge op={step.op} />
        <Logo item={step.provider} />
        <Logo item={step.library} />
      </div>
      <Text className="flex flex-wrap gap-x-2 items-center">
        <Strong>{step.resource}</Strong>
        <Code>{step.id}</Code>
      </Text>
      {step.diffReasons?.length ? (
        <Text className="flex flex-wrap gap-x-2 items-center">
          <Strong>Why?</Strong>
          {step.diffReasons.map((reason) => (
            <Code key={reason}>{reason}</Code>
          ))}
        </Text>
      ) : null}
    </div>
  );
};
