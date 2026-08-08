export function createLayoutTemplate(routeName: string): string {
  return `export default function ${routeName}Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
    </div>
  );
}
`;
}