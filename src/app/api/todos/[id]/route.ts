import { NextRequest, NextResponse } from "next/server";
import  prisma  from "../../../../../lib/prisma"; // lib/prisma.ts のパスに応じて変更してください

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  await prisma.todo.delete({ where: { id } });
  return NextResponse.json({ message: "Deleted" }, { status: 200 });
}
