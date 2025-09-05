import { createContext, useContext, useEffect, useState } from "react";

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

export const MediaContext = createContext({
  isDark: false,
});

export const MediaProvider = ({ children }: { children: React.ReactNode }) => {
  const isDark = useMediaQuery("(prefers-color-scheme: dark)");

  return <MediaContext value={{ isDark }}>{children}</MediaContext>;
};

export const useMedia = () => useContext(MediaContext);
