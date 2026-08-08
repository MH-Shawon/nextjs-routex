export function createRouteTemplate(): string {
  return `import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
  });
}

export async function POST(request: Request) {}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}
`;
}