import * as vscode from "vscode";

export function createServerSnippet(componentName: string) {
  return new vscode.SnippetString(
`type Props = {};

export default async function ${componentName}({}: Props) {
  return (
    <div>${componentName}</div>
  );
}`
  );
}