import { useTheme } from "next-themes";
import { useEffect } from "react";

export const useResolvedTheme = () => {
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const actualTheme = localStorage.getItem("theme");
    setTheme(actualTheme || "system");
  }, [setTheme]);

  return {
    theme: resolvedTheme,
  };
};
