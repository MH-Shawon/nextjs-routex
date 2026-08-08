import * as vscode from "vscode";

export function createNotFoundSnippet(
  routeName: string
): vscode.SnippetString {
  return new vscode.SnippetString(
`export default function ${routeName}NotFound() {
  return (
    <div>
      Not Found
    </div>
  );
}`
  );
}