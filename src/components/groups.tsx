import { useMemo, useState } from "react";
import { PreviewDisplay } from "../utils/parse";
import { Filter } from "./filter";
import { GroupBucket } from "./group.bucket";
import { GroupLambda } from "./group.lambda";
import { GroupContainer } from "./group.container";

export const Groups = ({ groups }: { groups: PreviewDisplay["groups"] }) => {
  const [filter, setFilter] = useState("");

  const items = useMemo(() => {
    const filtered = filter.length
      ? groups.filter((group) =>
          Object.values(group)
            .join(" ")
            .toLowerCase()
            .includes(filter.toLowerCase())
        )
      : groups;

    return filtered;
  }, [groups, filter]);

  return (
    <div className="flex flex-col col-span-2">
      <Filter
        name="group"
        filter={filter}
        setFilter={setFilter}
        total={groups.length}
        filtered={items.length}
      />
      {items.map((group) => {
        switch (group.type) {
          case "bucket":
            return <GroupBucket key={group.id} group={group} />;
          case "lambda":
            return <GroupLambda key={group.id} group={group} />;
          case "container":
            return <GroupContainer key={group.id} group={group} />;
          default:
            return null;
        }
      })}
    </div>
  );
};
