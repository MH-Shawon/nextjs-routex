import * as vscode from "vscode";
import * as path from "path";

import { getRouteName } from "../utils/routeParser";
import { createPageSnippet } from "../snippets/page";

export function registerPageProvider(
  context: vscode.ExtensionContext
) {
  const provider = vscode.languages.registerCompletionItemProvider(
    "typescriptreact",
    {
      provideCompletionItems(document) {
        if (path.basename(document.fileName) !== "page.tsx") {
          return [];
        }

        const routeName = getRouteName(document.fileName);

        const item = new vscode.CompletionItem(
          "nxt",
          vscode.CompletionItemKind.Snippet
        );

        item.detail = "Next RouteX • Page";

        item.documentation = new vscode.MarkdownString(
          `Generate **${routeName}Page**`
        );

        item.insertText = createPageSnippet(routeName);

        return [item];
      },
    },
    "n"
  );

  context.subscriptions.push(provider);
}