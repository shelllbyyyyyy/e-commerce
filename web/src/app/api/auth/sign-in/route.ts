import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-static";

export async function POST(req: NextRequest) {
  const baseUrl = process.env.BASE_API_URL;
  const { email, password } = await req.json();

  try {
    // Make the login request to the backend
    const res = await fetch(`${baseUrl}/auth/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    // Extract cookies from the response
    const setCookie = res.headers.get("set-cookie");

    // Check if the response was successful
    if (!res.ok) {
      return NextResponse.json(
        { error: "Login failed", message: res.statusText },
        { status: res.status }
      );
    }

    // Parse response data
    const data = await res.json();

    // Create a NextResponse with the data
    const response = NextResponse.json({ data });

    // Set the cookies in the NextResponse
    if (setCookie) {
      response.headers.set("Set-Cookie", setCookie);
    }

    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
