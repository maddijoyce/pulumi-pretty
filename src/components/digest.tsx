import { PreviewDigest } from "../utils/parse";
import { DigestSummary } from "./digest-summary";

export const DigestDisplay = ({ digest }: { digest: PreviewDigest }) => {
  return (
    <div className="container mx-auto p-4 flex flex-col gap-4">
      {digest.changeSummary && <DigestSummary changes={digest.changeSummary} />}
    </div>
  );
};
