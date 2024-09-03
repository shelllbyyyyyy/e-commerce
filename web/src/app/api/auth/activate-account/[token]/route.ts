import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-static";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  const baseUrl = process.env.BASE_API_URL;
  const { token } = params;

  if (!token) {
    return NextResponse.json(
      { error: "Token is missing or invalid" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(`${baseUrl}/auth/verify-user/${token}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Failed to verify user");
    }

    const data = await res.json();

    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
