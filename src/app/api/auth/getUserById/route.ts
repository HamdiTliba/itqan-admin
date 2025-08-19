// app/api/auth/getUserById/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  return handleRequest(req);
}

async function handleRequest(req: NextRequest) {
  try {
    let id: string | null;

    if (req.method === "GET") {
      const { searchParams } = new URL(req.url);
      id = searchParams.get("id");
    } else {
      const body = await req.json();
      id = body.id;
    }

    if (!id) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
    });

    return NextResponse.json(user || null);
  } catch (error) {
    console.error("Error fetching user by id:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
