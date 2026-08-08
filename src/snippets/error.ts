import * as vscode from "vscode";

export function createErrorSnippet(
  routeName: string
): vscode.SnippetString {
  return new vscode.SnippetString(
`"use client";

export default function ${routeName}Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}`
  );
}