import { Field } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useMemo, useState } from "react";
import { PreviewDisplayStep } from "../utils/parse";
import { Change } from "./change";
import { Label } from "./fieldset";
import { Input, InputGroup } from "./input";
import { Switch } from "./switch";
import { unchangedOps } from "../utils/operations";

export const Changes = ({ steps }: { steps: PreviewDisplayStep[] }) => {
  const [filter, setFilter] = useState("");
  const [hideUnchanged, setHideUnchanged] = useState(true);

  const items = useMemo(() => {
    const unchanged = hideUnchanged
      ? steps.filter((step) => !unchangedOps.includes(step.op))
      : steps;

    const filtered = filter.length
      ? unchanged.filter((step) =>
          Object.values(step)
            .join(" ")
            .toLowerCase()
            .includes(filter.toLowerCase())
        )
      : unchanged;

    return filtered;
  }, [steps, filter, hideUnchanged]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-8 items-center">
        <InputGroup>
          <MagnifyingGlassIcon />
          <Input
            name="filter"
            type="search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter&hellip;"
            aria-label="Filter"
          />
        </InputGroup>
        <Field className="flex gap-2 items-center">
          <Switch
            color="indigo"
            checked={hideUnchanged}
            onChange={setHideUnchanged}
          />
          <Label>Hide Unchanged</Label>
        </Field>
      </div>
      {items.map((step) => (
        <Change key={step.urn} step={step} />
      ))}
    </div>
  );
};
