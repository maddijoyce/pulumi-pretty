import clsx from "clsx";
import { PreviewDisplayStep } from "../utils/parse";
import { operationColors, operationLabels } from "../utils/operations";
import { Code, Strong, Text } from "./text";
import { Logo } from "./logo";

export const Change = ({ step }: { step: PreviewDisplayStep }) => {
  return (
    <div className="flex flex-col gap-1 items-start px-6 py-1.5 border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex gap-2 items-center">
        <div
          className={clsx(
            "rounded-md px-3 py-1 text-xs font-medium",
            operationColors[step.op]
          )}
        >
          {operationLabels[step.op]}
        </div>
        <Logo item={step.provider} />
        <Logo item={step.library} />
      </div>
      <div className="flex gap-2 items-center">
        <Text>
          <Strong>{step.resource}</Strong>
        </Text>
        <Text>
          <Code>{step.id}</Code>
        </Text>
      </div>
      {step.diffReasons?.length ? (
        <div className="flex gap-2 items-center">
          <Text>
            <Strong>Why?</Strong>
          </Text>
          {step.diffReasons.map((reason) => (
            <Text>
              <Code key={reason}>{reason}</Code>
            </Text>
          ))}
        </div>
      ) : null}
    </div>
  );
};
