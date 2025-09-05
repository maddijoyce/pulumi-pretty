import { useEffect, useState } from "react";
import { parsePreviewDigest, PreviewDigest } from "./utils/parse";
import z, { ZodError } from "zod";
import { Loading } from "./components/loading";
import { BasicDisplay } from "./components/basic";
import { DigestDisplay } from "./components/digest";

export const Pretty = ({ plan }: { plan: string }) => {
  const [computed, setComputed] = useState<{
    digest?: PreviewDigest;
    loading: boolean;
    error?: string;
  }>({
    loading: true,
  });

  useEffect(() => {
    setComputed({ loading: true });
    try {
      const digest = parsePreviewDigest(JSON.parse(plan));
      setComputed({ digest, loading: false });
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
  if (computed.digest) return <DigestDisplay digest={computed.digest} />;

  return <BasicDisplay error={computed.error} plan={plan} />;
};
