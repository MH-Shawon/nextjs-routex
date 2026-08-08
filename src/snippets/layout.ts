import * as vscode from "vscode";

export function createLayoutSnippet(
  routeName: string
): vscode.SnippetString {
  const layoutName =
    routeName === "root"
      ? "RootLayout"
      : `${routeName}Layout`;

  return new vscode.SnippetString(
    `export default function ${layoutName}({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
    </div>
  );
}`
  );
}