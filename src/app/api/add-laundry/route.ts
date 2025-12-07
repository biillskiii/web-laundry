export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { nama, jenisCucian, weight, jenisPembayaran, addon } = body;

  if (!nama || !jenisCucian || !weight || !jenisPembayaran) {
    return NextResponse.json(
      { error: "Data kurang lengkap cuk." },
      { status: 400 }
    );
  }

  const created = await prisma.riwayat.create({
    data: {
      nama,
      jenisCucian,
      berat: parseFloat(weight),
      tipePembayaran: jenisPembayaran,
      addOn: addon || "",
    },
  });

  return NextResponse.json(
    { message: "Data masuk, mantap.", data: created },
    { status: 200 }
  );
}

export async function GET() {
  const list = await prisma.riwayat.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(list, { status: 200 });
}
