import * as path from "path";

export function getComponentName(
  filePath: string
): string {
  const fileName = path.basename(
    filePath,
    path.extname(filePath)
  );

  if (!fileName) {
    return "Component";
  }

  return fileName
    .replace(/[-_\s]+(.)?/g, (_, char) =>
      char ? char.toUpperCase() : ""
    )
    .replace(/^./, (char) =>
      char.toUpperCase()
    );
}