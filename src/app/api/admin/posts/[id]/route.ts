import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type Params = Promise<{ id: string }>
export async function DELETE(_request: NextRequest, { params }: { params: Params }) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
  });

  if (!post) {
    return NextResponse.json({ message: "Post not found" }, { status: 404 });
  }

  await prisma.post.delete({
    where: { id: parseInt(id) },
  });

  return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
}
