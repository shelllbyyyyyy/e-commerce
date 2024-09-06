import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.clone();

  const response = NextResponse.redirect(new URL("/", url.origin));

  return response;
}
