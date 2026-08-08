import * as fs from "fs";
import * as path from "path";

export function findAppDirectory(
  workspacePath: string
): string | null {
  const srcApp = path.join(workspacePath, "src", "app");

  if (fs.existsSync(srcApp)) {
    return srcApp;
  }

  const app = path.join(workspacePath, "app");

  if (fs.existsSync(app)) {
    return app;
  }

  return null;
}