import { UTApi } from "uploadthing/server";

import { getCurrentUser } from "@/lib/session";

const utapi = new UTApi();

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });
  const { key } = await req.json();
  try {
    const res = await utapi.deleteFiles(key);
    return new Response(JSON.stringify(res), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
