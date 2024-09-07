import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.redirect(process.env.APP_URL as string, { status: 307 });
}
