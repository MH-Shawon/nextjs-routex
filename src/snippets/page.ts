import * as vscode from "vscode";

export function createPageSnippet(routeName: string): vscode.SnippetString {
  return new vscode.SnippetString(
`export default function ${routeName}Page() {
  return (
    <div>\${1:${routeName}Page}</div>
  );
}`
  );
}