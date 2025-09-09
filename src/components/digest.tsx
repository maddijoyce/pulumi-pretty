import { PreviewDisplay } from "../utils/parse";
import { Changes } from "./changes";
import { Divider } from "./divider";
import { Groups } from "./groups";
import { Heading } from "./heading";
import { Summary } from "./summary";

export const DigestDisplay = ({ preview }: { preview: PreviewDisplay }) => {
  return (
    <div className="max-w-[100rem] mx-auto p-4 flex flex-col gap-6">
      <Heading level={1}>Plan Summary</Heading>
      {preview.changeSummary && <Summary changes={preview.changeSummary} />}
      <Divider />
      <div className="grid md:grid-cols-3 gap-4">
        <Groups groups={preview.groups} />
        <Changes steps={preview.items} />
      </div>
    </div>
  );
};
