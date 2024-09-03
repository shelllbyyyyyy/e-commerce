import { NextRequest } from "next/server";

export const dynamic = "force-static";

export async function POST(req: NextRequest) {
  const baseUrl = process.env.BASE_API_URL;
  const { email, password, username } = await req.json();

  const res = await fetch(`${baseUrl}/auth/register`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
    }),
    credentials: "include",
  });
  const data = await res.json();

  return Response.json({ data });
}
