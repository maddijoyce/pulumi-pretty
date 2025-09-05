import Editor from "@monaco-editor/react";
import { useMediaQuery } from "../utils/media";
import { ErrorMessage, Field } from "./fieldset";
import { Heading, Subheading } from "./heading";

export const BasicDisplay = ({
  error,
  plan,
}: {
  error?: string;
  plan: string;
}) => {
  const isDark = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <div className="p-4 flex flex-col gap-4 h-full">
      <Heading>Unable to display parsed preview</Heading>
      {error && (
        <div className="bg-gray-600/10 rounded p-4 flex flex-col gap-2">
          <Subheading>Parsing Errors:</Subheading>
          <Field className="max-h-72 overflow-y-auto">
            <ErrorMessage className="whitespace-pre-wrap">{error}</ErrorMessage>
          </Field>
        </div>
      )}
      {plan && (
        <div className="flex-1 min-h-96">
          <Editor
            defaultLanguage="json"
            theme={isDark ? "vs-dark" : "light"}
            value={plan}
            options={{
              readOnly: true,
              wordWrap: "on",
              minimap: { enabled: false },
            }}
          />
        </div>
      )}
    </div>
  );
};
