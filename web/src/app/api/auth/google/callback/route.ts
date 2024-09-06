import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.clone();

  const accessToken = url.searchParams.get("access_token");

  if (accessToken) {
    return NextResponse.redirect(url.origin + "/");
  }
  return NextResponse.redirect(new URL("/", request.url));
}
