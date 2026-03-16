import { useSelector } from "react-redux"

export const useColorScheme = () => {
  const colorScheme = useSelector((s) => s.settings.colorScheme || "system")
  return colorScheme === "system"
    ? window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
    : colorScheme
}
