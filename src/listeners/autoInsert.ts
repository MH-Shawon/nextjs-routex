import * as vscode from "vscode";
import * as path from "path";

import { getRouteName } from "../utils/routeParser";
import { createPageSnippet } from "../snippets/page";
import { createLayoutSnippet } from "../snippets/layout";
import { createLoadingSnippet } from "../snippets/loading";
import { createErrorSnippet } from "../snippets/error";
import { createNotFoundSnippet } from "../snippets/notFound";
import { createRouteSnippet } from "../snippets/route";

export function registerAutoInsert(
  context: vscode.ExtensionContext
) {
  const disposable = vscode.window.onDidChangeActiveTextEditor(async (editor) => {
    if (!editor) {return;}

    const document = editor.document;

    // Only insert into empty files
    if (document.getText().trim() !== "") {
      return;
    }

    const fileName = path.basename(document.fileName);
    const routeName = getRouteName(document.fileName);

    let snippet: vscode.SnippetString | undefined;

    switch (fileName) {
      case "page.tsx":
        snippet = createPageSnippet(routeName);
        break;

      case "layout.tsx":
        snippet = createLayoutSnippet(routeName);
        break;

      case "loading.tsx":
        snippet = createLoadingSnippet(routeName);
        break;

      case "error.tsx":
        snippet = createErrorSnippet(routeName);
        break;

      case "not-found.tsx":
        snippet = createNotFoundSnippet(routeName);
        break;

      case "route.ts":
        snippet = createRouteSnippet();
        break;

      default:
        return;
    }

    await editor.insertSnippet(snippet);
  });

  context.subscriptions.push(disposable);
}