import clsx from "clsx";
import { Fragment } from "react";
import { PreviewBucket } from "../utils/groups/bucket";
import { Badge } from "./badge";
import { Card } from "./card";
import { Code, Strong, Text } from "./text";

export const GroupBucket = ({ group }: { group: PreviewBucket }) => (
  <Card logo="s3" title={group.id}>
    {({ expanded }) => (
      <>
        {group.changes.length ? (
          <Text className="flex flex-wrap gap-x-2 items-center">
            <Strong>Changes</Strong>
            {group.changes.map((change) => (
              <Code key={change}>{change}</Code>
            ))}
          </Text>
        ) : null}
        <div
          className={clsx(
            "flex flex-wrap gap-1.5 items-center",
            expanded && "flex-col items-start"
          )}
        >
          {(["create", "update", "delete"] as const).map((op) => (
            <Fragment key={op}>
              <Badge op={op} count={group[op].length} />
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
      </>
    )}
  </Card>
);
