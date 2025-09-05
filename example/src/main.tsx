import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import { Pretty } from "pulumi-pretty";
import { Loading } from "pulumi-pretty/components/loading";
import { Select } from "./select";

import "./main.css";

const Main = () => {
  const [plan, setPlan] = useState<{
    loading: boolean;
    contents?: string;
    error?: string;
  }>({
    loading: true,
  });

  useEffect(() => {
    const fetchPlan = async () => {
      const hash = window.location.hash;
      setPlan({ loading: true });

      try {
        const params = new URLSearchParams(hash.slice(1));
        let url = params.get("url");
        if (!url) {
          const encoded = params.get("encoded");
          if (encoded) url = atob(encoded);
        }

        if (!url) {
          setPlan({ loading: false });
          return;
        }

        const contents = await fetch(url).then((res) => res.text());
        setPlan({ contents, loading: false });
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown error";
        setPlan({
          loading: false,
          error: `Failed to fetch preview: ${message}`,
        });
      }
    };
    fetchPlan().catch(console.error);

    window.addEventListener("hashchange", fetchPlan);

    return () => {
      window.removeEventListener("hashchange", fetchPlan);
    };
  }, []);

  if (plan.loading) return <Loading />;
  if (plan.contents) return <Pretty plan={plan.contents} />;

  return (
    <Select
      error={plan.error}
      setEncodedUrl={(encoded) =>
        (window.location.hash = `#encoded=${encoded}`)
      }
      setContents={(contents) => setPlan({ contents, loading: false })}
    />
  );
};

const rootElement = document.getElementById("app");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<Main />);
}
