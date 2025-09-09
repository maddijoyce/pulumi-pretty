import { operationColors, operationLabels } from "../utils/operations";
import { ResourceChanges, stepOpEnum } from "../utils/schema";
import { Text } from "./text";

export const Summary = ({ changes }: { changes: ResourceChanges }) => {
  return (
    <div className="flex flex-col gap-3">
      <Text>The following operations will be performed:</Text>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
        {stepOpEnum.options.map((operation) =>
          changes[operation] ? (
            <div
              key={operation}
              className={`
              rounded-lg border-2 px-3 py-2 flex sm:flex-col items-baseline gap-2 sm:gap-0 sm:items-center
              ${operationColors[operation] || operationColors.same}
            `}
              title={`${operationLabels[operation] || operation}: ${
                changes[operation]
              } resources`}
            >
              <div className="text-xl sm:text-2xl font-bold">
                {changes[operation]}
              </div>
              <div className="text-sm sm:text-xs font-medium leading-tight">
                {operationLabels[operation] || operation}
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};
