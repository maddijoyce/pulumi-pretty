import { useEffect, useState } from "react";
import {
  mapPreviewDigest,
  parsePreviewDigest,
  PreviewDisplay,
} from "./utils/parse";
import z, { ZodError } from "zod";
import { Loading } from "./components/loading";
import { BasicDisplay } from "./components/basic";
import { DigestDisplay } from "./components/digest";
import { MediaProvider } from "./utils/media";

export const PrettyContent = ({ plan }: { plan: string }) => {
  const [computed, setComputed] = useState<{
    preview?: PreviewDisplay;
    loading: boolean;
    error?: string;
  }>({
    loading: true,
  });

  useEffect(() => {
    setComputed({ loading: true });
    try {
      const digest = parsePreviewDigest(JSON.parse(plan));
      const preview = mapPreviewDigest(digest);
      setComputed({ preview, loading: false });
    } catch (error) {
      let message = "Unable to parse preview digest";
      if (error instanceof Error) message = error.message;
      if (error instanceof ZodError) message = z.prettifyError(error);

      setComputed({
        error: message,
        loading: false,
      });
    }
  }, [plan]);

  if (computed.loading) return <Loading />;
  if (computed.preview) return <DigestDisplay preview={computed.preview} />;

  return <BasicDisplay error={computed.error} plan={plan} />;
};

export const Pretty = ({ plan }: { plan: string }) => (
  <MediaProvider>
    <PrettyContent plan={plan} />
  </MediaProvider>
);
