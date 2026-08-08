import * as vscode from "vscode";

export function createLoadingSnippet(
  routeName: string
): vscode.SnippetString {
  return new vscode.SnippetString(
`export default function ${routeName}Loading() {
  return (
    <div>\${1:Loading...}</div>
  );
}`
  );
}