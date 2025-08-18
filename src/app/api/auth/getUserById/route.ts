import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    const user = await db.select().from(users).where(eq(users.id, id)).limit(1);

    return NextResponse.json(user.length > 0 ? user[0] : null);
  } catch (error) {
    console.error("Error fetching user by id:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
