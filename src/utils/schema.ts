// previewDigest.schema.ts
import { z } from "zod";

/**
 * Pulumi step operation types (full set).
 * Source: github.com/pulumi/pulumi/pkg/resource/deploy (StepOp constants)
 * - same, create, update, delete, replace, create-replacement, delete-replaced,
 *   read, read-replacement, refresh, discard, discard-replaced,
 *   remove-pending-replace, import, import-replacement
 */
export const stepOpEnum = z.enum([
  "create",
  "create-replacement",
  "update",
  "replace",
  "delete",
  "delete-replaced",
  "discard",
  "discard-replaced",
  "remove-pending-replace",
  "same",
  "read",
  "read-replacement",
  "refresh",
  "import",
  "import-replacement",
]);

/**
 * Fallback-friendly StepOp: if the input isn’t one of the known enum values,
 * it becomes "unknown" instead of failing validation.
 */
export const stepOp = z
  .union([stepOpEnum, z.literal("unknown")])
  .catch("unknown");
export type StepOp = z.infer<typeof stepOp>;

/**
 * Diagnostic severities used by Pulumi logs.
 * Source: Pulumi logging docs (debug, info, warn, error) — we use "warning" to
 * match the PreviewDiagnostic JSON shape. :contentReference[oaicite:1]{index=1}
 */
export const severityEnum = z.enum(["debug", "info", "warning", "error"]);

/**
 * Fallback-friendly Severity: unrecognized values become "unknown".
 */
export const severity = z
  .union([severityEnum, z.literal("unknown")])
  .catch("unknown");
export type Severity = z.infer<typeof severity>;

/**
 * PropertyDiff — kind is a free-form string in the Go type, so we keep it open.
 */
export const propertyDiff = z.object({
  kind: z.string(),
  inputDiff: z.boolean(),
});
export type PropertyDiff = z.infer<typeof propertyDiff>;

/**
 * PreviewDiagnostic — attached to a URN (stringified), with message, prefix, and severity.
 * Matches github.com/pulumi/pulumi/sdk/v3/go/common/display.PreviewDiagnostic. :contentReference[oaicite:2]{index=2}
 */
export const previewDiagnostic = z.object({
  urn: z.string().optional(), // resource.URN serialized as string
  prefix: z.string().optional(),
  message: z.string().optional(),
  severity: severity.optional(),
});
export type PreviewDiagnostic = z.infer<typeof previewDiagnostic>;

/**
 * PreviewStep — matches display.PreviewStep in the Pulumi display package. :contentReference[oaicite:3]{index=3}
 *
 * Note: oldState/newState are apitype.ResourceV3 in Go. If you want to validate them,
 * plug in a dedicated schema; for now we accept any JSON shape.
 */
export const stateObject = z.looseObject({
  id: z.string().optional(),
  type: z.string(),
});
export type StateObject = z.infer<typeof stateObject>;

export const previewStep = z.object({
  op: stepOp, // StepOp with fallback
  urn: z.string(), // resource.URN serialized as string
  provider: z.string().optional(),
  oldState: stateObject.optional(),
  newState: stateObject.optional(),
  diffReasons: z.array(z.string()).optional(), // []resource.PropertyKey
  replaceReasons: z.array(z.string()).optional(),
  detailedDiff: z.record(z.string(), propertyDiff).optional().nullable(), // map[string]PropertyDiff
});
export type PreviewStep = z.infer<typeof previewStep>;

/**
 * ResourceChanges — a map from StepOp to counts.
 * We allow the well-known StepOp keys only (no fallback key here since Go uses map[StepOp]int).
 */
export const resourceChanges = z.record(
  stepOpEnum,
  z.number().int().optional()
);
export type ResourceChanges = z.infer<typeof resourceChanges>;

/**
 * PreviewDigest — top-level object that summarizes a preview.
 * Matches display.PreviewDigest in the Pulumi display package. :contentReference[oaicite:4]{index=4}
 */
export const previewDigest = z.object({
  config: z.record(z.string(), z.string()).optional(),
  steps: z.array(previewStep).optional(),
  diagnostics: z.array(previewDiagnostic).optional(),
  duration: z.number().optional(), // time.Duration serialized (ns)
  changeSummary: resourceChanges.optional(),
  maybeCorrupt: z.boolean().optional(),
});
export type PreviewDigest = z.infer<typeof previewDigest>;

export const parsePreviewDigest = (input: unknown): PreviewDigest =>
  previewDigest.parse(input);
