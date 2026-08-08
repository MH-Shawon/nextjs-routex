import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

export function registerCreateComponent(
  context: vscode.ExtensionContext
) {
  const command = vscode.commands.registerCommand(
    "nextjs-routex.createComponent",
    async (uri?: vscode.Uri) => {
      const workspace =
        vscode.workspace.workspaceFolders?.[0];

      if (!workspace) {
        vscode.window.showErrorMessage(
          "Please open a workspace first."
        );
        return;
      }

      const componentName =
        await vscode.window.showInputBox({
          title: "Next RouteX: Create Component",
          prompt: "Enter component name",
          placeHolder: "Button",
          validateInput(value) {
            if (!value.trim()) {
              return "Component name is required.";
            }

            if (
              !/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(
                value.trim()
              )
            ) {
              return "Enter a valid component name.";
            }

            return undefined;
          },
        });

      if (!componentName) {
        return;
      }

      const componentType =
        await vscode.window.showQuickPick(
          [
            {
              label: "Server Component",
              description:
                "Default Next.js Server Component",
              value: "server",
            },
            {
              label: "Client Component",
              description:
                'Adds "use client"',
              value: "client",
            },
          ],
          {
            title:
              "Next RouteX: Select Component Type",
          }
        );

      if (!componentType) {
        return;
      }

      /*
       * Determine where the component should be created.
       *
       * Priority:
       *
       * 1. Folder selected in Explorer
       * 2. Current active editor folder
       * 3. src/components
       */

      let targetFolder: string;

      if (uri) {
        const stat = fs.statSync(uri.fsPath);

        if (stat.isDirectory()) {
          targetFolder = uri.fsPath;
        } else {
          targetFolder = path.dirname(uri.fsPath);
        }
      } else if (
        vscode.window.activeTextEditor
      ) {
        targetFolder = path.dirname(
          vscode.window.activeTextEditor.document
            .uri.fsPath
        );
      } else {
        targetFolder = path.join(
          workspace.uri.fsPath,
          "src",
          "components"
        );
      }

      fs.mkdirSync(targetFolder, {
        recursive: true,
      });

      const name = componentName.trim();

      const filePath = path.join(
        targetFolder,
        `${name}.tsx`
      );

      if (fs.existsSync(filePath)) {
        const action =
          await vscode.window.showWarningMessage(
            `${name}.tsx already exists.`,
            "Overwrite",
            "Cancel"
          );

        if (action !== "Overwrite") {
          return;
        }
      }

      const clientDirective =
        componentType.value === "client"
          ? `"use client";\n\n`
          : "";

      const componentCode = `${clientDirective}export default function ${name}() {
  return (
    <div>
      ${name}
    </div>
  );
}
`;

      fs.writeFileSync(
        filePath,
        componentCode,
        "utf8"
      );

      const document =
        await vscode.workspace.openTextDocument(
          filePath
        );

      await vscode.window.showTextDocument(
        document
      );

      const relativePath =
        path.relative(
          workspace.uri.fsPath,
          filePath
        );

      vscode.window.showInformationMessage(
        `Next RouteX: Created ${name} at ${relativePath}`
      );
    }
  );

  context.subscriptions.push(command);
}