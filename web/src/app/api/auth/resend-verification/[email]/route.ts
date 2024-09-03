import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-static";

export async function POST(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  const baseUrl = process.env.BASE_API_URL;
  const { email } = params;

  if (!email) {
    return NextResponse.json(
      { error: "email is missing or invalid" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(`${baseUrl}/auth/resend-verification/${email}`, {
      method: "POST",
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
