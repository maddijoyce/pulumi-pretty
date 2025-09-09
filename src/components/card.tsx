import { ReactNode, useState } from "react";
import { Logo } from "./logo";
import { Strong, Text } from "./text";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";

export const Card = ({
  logo,
  title,
  children,
}: {
  logo: string;
  title: string;
  children: (props: { expanded: boolean }) => ReactNode;
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mb-2.5 bg-zinc-500/5 dark:bg-indigo-300/5 p-3 rounded-md">
      <div className="flex items-start gap-3">
        <Logo item={logo} className="size-6" />
        <div className="flex flex-col gap-2 flex-1">
          <Text className="italic px-2 flex gap-1 items-center">
            <Strong>{title}</Strong>
            <span className="flex-1" />
            <button
              className="flex gap-1 items-center text-xs font-medium cursor-pointer"
              onClick={() => setExpanded(!expanded)}
            >
              <span>{expanded ? "Hide" : "Show"} Details</span>
              <ChevronDownIcon
                className={clsx("size-4", expanded && "rotate-180")}
              />
            </button>
          </Text>
          {children({ expanded })}
        </div>
      </div>
    </div>
  );
};
