import * as vscode from "vscode";

export function createClientSnippet(
  componentName: string
): vscode.SnippetString {
  const snippet = `"use client";

export default function ${componentName}() {
  return (
    <div>
      ${componentName}
    </div>
  );
}
`;

  return new vscode.SnippetString(snippet);
}

export function createServerSnippet(
  componentName: string
): vscode.SnippetString {
  const snippet = `export default function ${componentName}() {
  return (
    <div>
      ${componentName}
    </div>
  );
}
`;

  return new vscode.SnippetString(snippet);
}

export function createPropsSnippet(
  componentName: string
): vscode.SnippetString {
  const snippet = `type ${componentName}Props = {
  title: string;
};

export default function ${componentName}({
  title,
}: ${componentName}Props) {
  return (
    <div>
      {title}
    </div>
  );
}
`;

  return new vscode.SnippetString(snippet);
}