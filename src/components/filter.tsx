import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { Input, InputGroup } from "./input";

export const Filter = ({
  name,
  filter,
  setFilter,
  total,
  filtered,
}: {
  name: string;
  filter: string;
  setFilter: (filter: string) => void;
  total: number;
  filtered: number;
}) => {
  return (
    <div className="flex gap-2 items-center pb-2.5">
      <InputGroup>
        <MagnifyingGlassIcon />
        <Input
          name={name}
          type="search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </InputGroup>
      <div className="text-xs rounded-full font-medium italic bg-indigo-100 text-indigo-800 dark:text-indigo-200 dark:bg-indigo-900/50 px-2 py-0.5">
        {filter.length ? `${filtered} of ${total}` : total}{" "}
        {total === 1 ? name : name + "s"}
      </div>
    </div>
  );
};
