"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Sidebar from "@/components/sidebar";
import ClientLayout from "@/components/layout/ClientLayout";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LaundryForm = () => {
  const [form, setForm] = useState({
    nama: "",
    jenisCucian: "",
    weight: "",
    jenisPembayaran: "",
    addon: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors: any = {};

    if (!form.nama.trim()) newErrors.nama = "Nama jangan kosong, bro.";
    if (!form.jenisCucian.trim())
      newErrors.jenisCucian = "Jenis cucian wajib diisi.";
    if (!form.weight.trim() || isNaN(Number(form.weight)))
      newErrors.weight = "Berat harus angka, jangan ngadi-ngadi.";
    if (!form.jenisPembayaran.trim())
      newErrors.jenisPembayaran = "Pilih metode pembayaran.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/add-laundry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: form.nama,
          jenisCucian: form.jenisCucian,
          weight: form.weight,
          jenisPembayaran: form.jenisPembayaran,
          addon: form.addon,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Error, coba tanya tim IT.");
        return;
      }
      toast.success("Mantap, data ke-save cuy.");
      setForm({
        nama: "",
        jenisCucian: "",
        weight: "",
        jenisPembayaran: "",
        addon: "",
      });
      setErrors({});
    } catch (err) {
      toast.error("Servernya ngadat cuyy, coba contact tim IT.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClientLayout sidebar={<Sidebar activeItem="Dashboard" isOpen />}>
      <div className="w-full flex my-10">
        <form
          onSubmit={handleSubmit}
          className="p-6 w-full max-w-md flex flex-col gap-5 bg-gray-800 text-white rounded-2xl shadow-lg mt-10 mx-auto"
        >
          {/* NAMA */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Nama</label>
            <input
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black/40 outline-none"
            />
            {errors.nama && (
              <span className="text-red-500 text-sm">{errors.nama}</span>
            )}
          </div>

          {/* JENIS CUCIAN */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Jenis Cucian</label>
            <select
              name="jenisCucian"
              value={form.jenisCucian}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 bg-gray-800 focus:ring-2 focus:ring-black/40 outline-none"
            >
              <option value="">-- Pilih Jenis --</option>
              <option value="cuci kering">Cuci Kering</option>
            </select>
            {errors.jenisCucian && (
              <span className="text-red-500 text-sm">{errors.jenisCucian}</span>
            )}
          </div>

          {/* WEIGHT */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={form.weight}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black/40 outline-none"
            />
            {errors.weight && (
              <span className="text-red-500 text-sm">{errors.weight}</span>
            )}
          </div>

          {/* JENIS PEMBAYARAN */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Jenis Pembayaran</label>
            <select
              name="jenisPembayaran"
              value={form.jenisPembayaran}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 bg-gray-800 focus:ring-2 focus:ring-black/40 outline-none"
            >
              <option value="">-- Pilih Pembayaran --</option>
              <option value="cash">Cash</option>
              <option value="qris">QRIS</option>
              <option value="transfer">Transfer Bank</option>
            </select>
            {errors.jenisPembayaran && (
              <span className="text-red-500 text-sm">
                {errors.jenisPembayaran}
              </span>
            )}
          </div>

          {/* ADD ON */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Add On</label>
            <input
              type="text"
              name="addon"
              value={form.addon}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black/40 outline-none"
            />
            {errors.addon && (
              <span className="text-red-500 text-sm">{errors.addon}</span>
            )}
          </div>
          {loading ? (
            <button className="w-full py-3 rounded-lg bg-black flex justify-center items-center text-white font-semibold hover:bg-black/80 transition">
              <AiOutlineLoading3Quarters className="animate-spin" width={50} />
            </button>
          ) : (
            <button className="w-full py-3 rounded-lg bg-black text-white font-semibold hover:bg-black/80 transition">
              Submit
            </button>
          )}
        </form>
      </div>
    </ClientLayout>
  );
};

export default LaundryForm;
