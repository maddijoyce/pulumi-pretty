import { StepOp } from "./schema";

export const unchangedOps: StepOp[] = [
  "same",
  "read",
  "read-replacement",
  "refresh",
];

export const operationLabels: Record<StepOp, string> = {
  create: "Create",
  update: "Update",
  delete: "Delete",
  replace: "Replace",
  "create-replacement": "Create Replacement",
  "delete-replaced": "Delete Replaced",
  read: "Read",
  "read-replacement": "Read Replacement",
  refresh: "Refresh",
  discard: "Discard",
  "discard-replaced": "Discard Replaced",
  "remove-pending-replace": "Remove Pending Replace",
  import: "Import",
  "import-replacement": "Import Replacement",
  same: "Existing",
  unknown: "Unknown",
};

export const operationColors: Record<StepOp, string> = {
  create:
    "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300",
  update:
    "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300",
  delete:
    "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300",
  replace:
    "bg-orange-50 border-orange-200 text-orange-800 dark:bg-orange-900/20 dark:border-orange-800 dark:text-orange-300",
  "create-replacement":
    "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-300",
  "delete-replaced":
    "bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-900/20 dark:border-rose-800 dark:text-rose-300",
  read: "bg-cyan-50 border-cyan-200 text-cyan-800 dark:bg-cyan-900/20 dark:border-cyan-800 dark:text-cyan-300",
  "read-replacement":
    "bg-sky-50 border-sky-200 text-sky-800 dark:bg-sky-900/20 dark:border-sky-800 dark:text-sky-300",
  refresh:
    "bg-teal-50 border-teal-200 text-teal-800 dark:bg-teal-900/20 dark:border-teal-800 dark:text-teal-300",
  discard:
    "bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-300",
  "discard-replaced":
    "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-300",
  "remove-pending-replace":
    "bg-lime-50 border-lime-200 text-lime-800 dark:bg-lime-900/20 dark:border-lime-800 dark:text-lime-300",
  import:
    "bg-indigo-50 border-indigo-200 text-indigo-800 dark:bg-indigo-900/20 dark:border-indigo-800 dark:text-indigo-300",
  "import-replacement":
    "bg-violet-50 border-violet-200 text-violet-800 dark:bg-violet-900/20 dark:border-violet-800 dark:text-violet-300",
  same: "bg-zinc-100 border-zinc-200 text-zinc-800 dark:bg-zinc-800/40 dark:border-zinc-800 dark:text-zinc-300",
  unknown:
    "bg-zinc-50 border-zinc-200 text-zinc-800 dark:bg-zinc-900/20 dark:border-zinc-800 dark:text-zinc-300",
};
