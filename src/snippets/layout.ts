import * as vscode from "vscode";

export function createLayoutSnippet(
  routeName: string
): vscode.SnippetString {
  return new vscode.SnippetString(
`export default function ${routeName}Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}`
  );
}