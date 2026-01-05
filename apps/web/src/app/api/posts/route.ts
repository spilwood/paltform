import { NextResponse } from "next/server";
import { api } from "~/trpc/server";

export async function GET() {
  try {
    const caller = await api();
    const posts = await caller.post.list();

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
