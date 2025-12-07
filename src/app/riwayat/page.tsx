"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import ClientLayout from "@/components/layout/ClientLayout";

type RiwayatType = {
  id: number;
  nama: string;
  jenisCucian: string;
  berat: number;
  tipePembayaran: string;
  addOn: string;
  createdAt: string;
};

const Riwayat = () => {
  const [riwayat, setRiwayat] = useState<RiwayatType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRiwayat = async () => {
    try {
      const res = await fetch("/api/add-laundry", { method: "GET" });
      if (!res.ok) throw new Error("Gagal fetch data riwayat");

      const data: RiwayatType[] = await res.json();
      setRiwayat(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRiwayat();
  }, []);

  return (
    <ClientLayout sidebar={<Sidebar activeItem="Riwayat" isOpen />}>
      <div className="flex w-full min-h-screen p-6">
        <div className="w-full bg-gray-900 p-6 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold mb-5">Riwayat Laundry</h1>

          {loading && <p>Loading bang sabar…</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && (
            <div className="overflow-x-auto rounded-lg border border-gray-700">
              <table className="w-full min-w-max">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="p-3 border border-gray-700 whitespace-nowrap">
                      Nama
                    </th>
                    <th className="p-3 border border-gray-700 whitespace-nowrap">
                      Jenis Cucian
                    </th>
                    <th className="p-3 border border-gray-700 whitespace-nowrap">
                      Berat (kg)
                    </th>
                    <th className="p-3 border border-gray-700 whitespace-nowrap">
                      Pembayaran
                    </th>
                    <th className="p-3 border border-gray-700 whitespace-nowrap">
                      Add On
                    </th>
                    <th className="p-3 border border-gray-700 whitespace-nowrap">
                      Tanggal
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {riwayat.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center p-4 text-gray-400">
                        Belum ada riwayat, bang. Kosong melompong.
                      </td>
                    </tr>
                  ) : (
                    riwayat.map((item) => (
                      <tr key={item.id} className="border border-gray-800">
                        <td className="p-3 whitespace-nowrap">{item.nama}</td>
                        <td className="p-3 whitespace-nowrap">
                          {item.jenisCucian}
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          {item.berat} kg
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          {item.tipePembayaran}
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          {item.addOn || "-"}
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          {new Date(item.createdAt).toLocaleString("id-ID")}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </ClientLayout>
  );
};

export default Riwayat;
