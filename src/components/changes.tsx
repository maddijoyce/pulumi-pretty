import { useMemo, useState } from "react";
import { PreviewDisplayStep } from "../utils/parse";
import { Change } from "./change";
import { Filter } from "./filter";

export const Changes = ({ steps }: { steps: PreviewDisplayStep[] }) => {
  const [filter, setFilter] = useState("");

  const items = useMemo(() => {
    const filtered = filter.length
      ? steps.filter((step) =>
          Object.values(step)
            .join(" ")
            .toLowerCase()
            .includes(filter.toLowerCase())
        )
      : steps;

    return filtered;
  }, [steps, filter]);

  return (
    <div className="flex flex-col">
      <Filter
        name="change"
        filter={filter}
        setFilter={setFilter}
        total={steps.length}
        filtered={items.length}
      />
      {items.map((step) => (
        <Change key={step.urn} step={step} />
      ))}
    </div>
  );
};
