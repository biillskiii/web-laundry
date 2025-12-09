export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const addonPrices: Record<string, number> = {
  parfum: 2000,
  deterjen: 1000,
  pewangi: 1000,
  dropoff: 3000,
};

export async function POST(req: Request) {
  const body = await req.json();
  const { nama, jenisCucian, weight, jenisPembayaran, addon, harga, noHp } =
    body;

  if (
    !nama ||
    !Array.isArray(jenisCucian) ||
    jenisCucian.length === 0 ||
    !weight ||
    !jenisPembayaran ||
    !noHp
  ) {
    return NextResponse.json(
      { error: "Data kurang lengkap." },
      { status: 400 }
    );
  }

  let finalHarga = 7000;

  if (Array.isArray(addon)) {
    addon.forEach((item) => {
      finalHarga += addonPrices[item] || 0;
    });
  }

  const created = await prisma.riwayat.create({
    data: {
      nama,
      jenisCucian,
      berat: parseFloat(weight),
      tipePembayaran: jenisPembayaran,
      addOn: addon || [],
      harga: String(finalHarga),
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
