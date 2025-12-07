-- CreateTable
CREATE TABLE "Riwayat" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "jenisCucian" TEXT NOT NULL,
    "berat" DOUBLE PRECISION NOT NULL,
    "tipePembayaran" TEXT NOT NULL,
    "addOn" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Riwayat_pkey" PRIMARY KEY ("id")
);
