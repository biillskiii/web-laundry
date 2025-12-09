export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { nama, jenisCucian, weight, jenisPembayaran, addon, harga, noHp } =
    body;

  if (!nama || !jenisCucian || !weight || !jenisPembayaran || !harga || !noHp) {
    return NextResponse.json(
      { error: "Data kurang lengkap." },
      { status: 400 }
    );
  }

  const created = await prisma.riwayat.create({
    data: {
      nama,
      jenisCucian,
      berat: parseFloat(weight),
      tipePembayaran: jenisPembayaran,
      addOn: Array.isArray(addon) ? addon : [], // INI FIX NYA
      harga: harga || "",
      noHp: String(noHp),
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
