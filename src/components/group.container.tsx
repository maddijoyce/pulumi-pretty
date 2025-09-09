import { Fragment } from "react";
import { PreviewContainer } from "../utils/groups/container";
import { Card } from "./card";
import { Badge } from "./badge";
import clsx from "clsx";
import { operationLabels } from "../utils/operations";
import { Code } from "./text";

const containerLabel = {
  tag: "Tag",
  registryImage: "Image",
  taskDefinition: "Task",
  service: "Service",
};

export const GroupContainer = ({ group }: { group: PreviewContainer }) => {
  return (
    <Card logo="docker" title={group.id.split("/")[1] || group.id}>
      {({ expanded }) => (
        <div
          className={clsx(
            "flex flex-wrap gap-1.5 items-center",
            expanded && "flex-col items-start"
          )}
        >
          {(["tag", "registryImage", "taskDefinition", "service"] as const).map(
            (type) => (
              <Fragment key={type}>
                {group[type] ? (
                  <Badge
                    op={group[type][0]}
                    label={`${operationLabels[group[type][0]]} ${
                      containerLabel[type]
                    }`}
                  />
                ) : (
                  <Badge op="same" label={containerLabel[type]} />
                )}
                {group[type]?.[1].length ? (
                  <div
                    className={clsx(
                      "flex-wrap gap-1 items-start pl-4",
                      expanded ? "flex" : "hidden"
                    )}
                  >
                    {group[type]?.[1].map((item) => (
                      <Code key={item}>{item}</Code>
                    ))}
                  </div>
                ) : null}
              </Fragment>
            )
          )}
        </div>
      )}
    </Card>
  );
};
