export function getRouteName(filePath: string): string {
  const normalized = filePath.replace(/\\/g, "/");

  const parts = normalized.split("/");

  const appIndex = parts.lastIndexOf("app");

  if (appIndex === -1) {
    return "Page";
  }

  const routeParts = parts.slice(appIndex + 1, parts.length - 1);

  const filtered = routeParts
    .filter((part) => !part.startsWith("("))
    .filter((part) => !part.startsWith("@"))
    .map((part) => part.replace(/\[|\]/g, ""));

  if (filtered.length === 0) {
    return "Page";
  }

  return filtered.map(toPascalCase).join("");
}

function toPascalCase(str: string): string {
  return str
    .replace(/-/g, " ")
    .replace(/_/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}