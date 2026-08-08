import * as vscode from "vscode";

export function createRouteSnippet(): vscode.SnippetString {
  return new vscode.SnippetString(`import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    return NextResponse.json(
      {
        success: true,
        data: body,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid request body",
      },
      { status: 400 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    return NextResponse.json({
      success: true,
      data: body,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid request body",
      },
      { status: 400 }
    );
  }
}

export async function DELETE() {
  try {
    return NextResponse.json({
      success: true,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
`);
}

export function createGetRouteSnippet(): vscode.SnippetString {
  return new vscode.SnippetString(`import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
`);
}

export function createPostRouteSnippet(): vscode.SnippetString {
  return new vscode.SnippetString(`import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    return NextResponse.json(
      {
        success: true,
        data: body,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid request body",
      },
      { status: 400 }
    );
  }
}
`);
}

export function createPutRouteSnippet(): vscode.SnippetString {
  return new vscode.SnippetString(`import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    return NextResponse.json({
      success: true,
      data: body,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid request body",
      },
      { status: 400 }
    );
  }
}
`);
}

export function createDeleteRouteSnippet(): vscode.SnippetString {
  return new vscode.SnippetString(`import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    return NextResponse.json({
      success: true,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
`);
}