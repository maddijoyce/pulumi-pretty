import clsx from "clsx";
import { operationColors, operationLabels } from "../utils/operations";
import { StepOp } from "../utils/schema";

export const Badge = ({
  op,
  label,
  count,
}: {
  op: StepOp;
  label?: string;
  count?: number;
}) => (
  <div
    className={clsx(
      "rounded-full px-3 py-1 text-xs font-medium border",
      operationColors[op]
    )}
  >
    {count !== undefined ? `${count} ` : null}
    {label || operationLabels[op]}
  </div>
);
