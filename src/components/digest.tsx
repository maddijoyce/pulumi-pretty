import { PreviewDisplay } from "../utils/parse";
import { Changes } from "./changes";
import { Divider } from "./divider";
import { Heading } from "./heading";
import { Summary } from "./summary";

export const DigestDisplay = ({ preview }: { preview: PreviewDisplay }) => {
  return (
    <div className="container mx-auto p-4 flex flex-col gap-6">
      <Heading level={1}>Plan Summary</Heading>
      {preview.changeSummary && <Summary changes={preview.changeSummary} />}
      <Divider />
      <Changes steps={preview.steps || []} />
    </div>
  );
};
