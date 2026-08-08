import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

export function registerCreateRoute(
  context: vscode.ExtensionContext
) {
  const command = vscode.commands.registerCommand(
    "nextjs-routex.createRoute",
    async () => {
      const workspace =
        vscode.workspace.workspaceFolders?.[0];

      if (!workspace) {
        vscode.window.showErrorMessage(
          "Please open a workspace first."
        );
        return;
      }

      const routePath =
        await vscode.window.showInputBox({
          title: "Next RouteX: Create Route",
          prompt:
            "Enter route path",
          placeHolder:
            "blog/[slug]",
          validateInput(value) {
            const route = value.trim();

            if (!route) {
              return "Route path is required.";
            }

            if (
              route.startsWith("/") ||
              route.endsWith("/")
            ) {
              return "Don't start or end the route with '/'.";
            }

            if (
              route.includes("..")
            ) {
              return "Invalid route path.";
            }

            return undefined;
          },
        });

      if (!routePath) {
        return;
      }

      const cleanRoute =
        routePath.trim();

      const appFolder = path.join(
        workspace.uri.fsPath,
        "src",
        "app"
      );

      const routeFolder =
        path.join(
          appFolder,
          ...cleanRoute.split("/")
        );

      const pagePath =
        path.join(
          routeFolder,
          "page.tsx"
        );

      if (fs.existsSync(pagePath)) {
        const action =
          await vscode.window.showWarningMessage(
            `Route "${cleanRoute}" already exists.`,
            "Open",
            "Cancel"
          );

        if (action === "Open") {
          const document =
            await vscode.workspace.openTextDocument(
              pagePath
            );

          await vscode.window.showTextDocument(
            document
          );
        }

        return;
      }

      fs.mkdirSync(
        routeFolder,
        {
          recursive: true,
        }
      );

      const pageName =
        getPageName(cleanRoute);

      const pageContent = `export default function ${pageName}Page() {
  return (
    <main>
      <h1>${pageName}</h1>
    </main>
  );
}
`;

      fs.writeFileSync(
        pagePath,
        pageContent,
        "utf8"
      );

      const document =
        await vscode.workspace.openTextDocument(
          pagePath
        );

      await vscode.window.showTextDocument(
        document
      );

      vscode.window.showInformationMessage(
        `Next RouteX: Created route "${cleanRoute}"`
      );
    }
  );

  context.subscriptions.push(command);
}

function getPageName(
  route: string
): string {
  const parts = route
    .split("/")
    .filter(Boolean);

  const lastPart =
    parts[parts.length - 1] ?? "Home";

  return lastPart
    .replace(/^\[|\]$/g, "")
    .replace(/^\.\.\./, "")
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map(
      (part) =>
        part.charAt(0).toUpperCase() +
        part.slice(1)
    )
    .join("");
}