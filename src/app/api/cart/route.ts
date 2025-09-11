import { NextResponse } from "next/server";
import { getUserCartAction } from "@/CartActions/gitUserCart";

export async function GET() {
  try {
    const data = await getUserCartAction();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load cart";
    return NextResponse.json({ message }, { status: 500 });
  }
}


