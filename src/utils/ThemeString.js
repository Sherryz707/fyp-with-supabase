export function appendWithThemeVariant(base, theme) {
  const variant = theme === "dracula" ? "dark" : "light";
  return `${base}_${variant}.svg`;
}
export function resolveAssetPath(id, theme, gender) {
  const variant = theme === "dracula" ? "dark" : "light";

  const parts = id.split("-");
  const type = parts[parts.length - 1]; // e.g., "color", "outline"

  switch (type) {
    case "color":
      return `/imgs/paint_${gender}_${variant}.svg`;
    case "teach":
      return `/imgs/teacher_${variant}.svg`;
    case "quiz":
      return `/imgs/quiz_${gender}_${variant}.svg`;
    case "sleep":
      return `/imgs/sleep_${gender}_${variant}.svg`;
    default:
      return "https://placehold.co/300x300";
  }
}
