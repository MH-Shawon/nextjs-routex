import * as vscode from "vscode";

import { registerSmartProvider } from "./providers/smartProvider";
import { registerAutoInsert } from "./listeners/autoInsert";
import { registerCreateRoute } from "./commands/createRoute";
import { registerCreateComponent } from "./commands/createComponent";

export function activate(
  context: vscode.ExtensionContext
) {
  registerSmartProvider(context);
  registerAutoInsert(context);
  registerCreateRoute(context);
  registerCreateComponent(context);
}

export function deactivate() {}