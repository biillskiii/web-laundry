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
    addon: [] as string[],
    harga: "7000",
    noHp: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleAddonChange = (e: any) => {
    const { value, checked } = e.target;

    if (checked) {
      setForm((prev) => ({
        ...prev,
        addon: [...prev.addon, value],
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        addon: prev.addon.filter((item) => item !== value),
      }));
    }
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
    if (!form.harga.trim() || isNaN(Number(form.harga)))
      newErrors.harga = "Harga harus angka, jangan ngadi-ngadi.";
    if (!form.noHp.trim() || isNaN(Number(form.noHp)))
      newErrors.noHp = "No hp harus angka, jangan ngadi-ngadi.";

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
          harga: form.harga,
          noHp: form.noHp,
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
        addon: [],
        harga: "",
        noHp: "",
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
      <div className="w-full flex ">
        <form
          onSubmit={handleSubmit}
          className="p-6 w-full max-w-md flex flex-col gap-5 bg-[#084428] text-white rounded-2xl shadow-lg mt-10 mx-auto"
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
              className="border rounded-lg px-3 py-2 bg-[#084428] focus:ring-2 focus:ring-black/40 outline-none"
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
              className="border rounded-lg px-3 py-2 bg-[#084428] focus:ring-2 focus:ring-black/40 outline-none"
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
          <div className="flex flex-col gap-2">
            <label className="text-white font-medium">AddOn</label>

            <div className="flex justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="addon"
                  value="parfum"
                  checked={form.addon.includes("parfum")}
                  onChange={handleAddonChange}
                />
                Parfum
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="addon"
                  value="deterjen"
                  checked={form.addon.includes("deterjen")}
                  onChange={handleAddonChange}
                />
                Deterjen
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="addon"
                  value="pewangi"
                  checked={form.addon.includes("pewangi")}
                  onChange={handleAddonChange}
                />
                Pewangi
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="addon"
                  value="dropoff"
                  checked={form.addon.includes("dropoff")}
                  onChange={handleAddonChange}
                />
                Drop-Off
              </label>
            </div>
          </div>

          {/* NO HP */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">No Hp</label>
            <input
              type="text"
              name="noHp"
              value={form.noHp}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black/40 outline-none"
            />
            {errors.noHp && (
              <span className="text-red-500 text-sm">{errors.noHp}</span>
            )}
          </div>
          {/* HARGA */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Harga</label>
            <input
              type="text"
              name="harga"
              value={form.harga}
              disabled
              className="border cursor-not-allowed bg-[#084428] rounded-lg px-3 py-2 focus:ring-2 focus:ring-black/40 outline-none"
            />
            {errors.harga && (
              <span className="text-red-500 text-sm">{errors.harga}</span>
            )}
          </div>

          {loading ? (
            <button className="w-full py-3 rounded-lg bg-white flex justify-center items-center text-black font-semibold hover:bg-black/80 transition">
              <AiOutlineLoading3Quarters className="animate-spin" width={50} />
            </button>
          ) : (
            <button className="w-full py-3 rounded-lg bg-white text-black font-bold hover:bg-black/80 transition">
              Submit
            </button>
          )}
        </form>
      </div>
    </ClientLayout>
  );
};

export default LaundryForm;
