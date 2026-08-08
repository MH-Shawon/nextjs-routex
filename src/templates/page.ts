export function createPageTemplate(routeName: string): string {
  return `export default function ${routeName}Page() {
  return (
    <div>${routeName}Page</div>
  );
}
`;
}