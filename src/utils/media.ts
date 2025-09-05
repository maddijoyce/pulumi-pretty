import { useEffect, useState } from "react";

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const matches = () => setMatches(media.matches);
    matches();

    media.addEventListener("change", matches);
    return () => media.removeEventListener("change", matches);
  }, [query]);

  return matches;
};
