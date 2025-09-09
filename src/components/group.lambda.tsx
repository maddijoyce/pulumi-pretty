import clsx from "clsx";
import { PreviewLambda } from "../utils/groups/lambda";
import { Card } from "./card";
import { Badge } from "./badge";
import { Code } from "./text";
import { Fragment } from "react/jsx-runtime";

export const GroupLambda = ({ group }: { group: PreviewLambda }) => {
  return (
    <Card logo="lambda" title={group.id}>
      {({ expanded }) => (
        <div
          className={clsx(
            "flex flex-wrap gap-1.5 items-center",
            expanded && "flex-col items-start"
          )}
        >
          {(["create", "update", "code", "delete"] as const).map((op) => (
            <Fragment key={op}>
              <Badge
                op={op === "code" ? "update" : op}
                label={op === "code" ? "Code Change" : undefined}
                count={group[op].length}
              />
              {group[op].length ? (
                <div
                  className={clsx(
                    "flex-col gap-1 items-start pl-4",
                    expanded ? "flex" : "hidden"
                  )}
                >
                  {group[op].map((item) => (
                    <Code key={item}>{item}</Code>
                  ))}
                </div>
              ) : null}
            </Fragment>
          ))}
        </div>
      )}
    </Card>
  );
};
