"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Sidebar from "@/components/sidebar";
import ClientLayout from "@/components/layout/ClientLayout";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ModalKonfirmasi from "@/components/modal-konfirmasi";

const addonPrices: any = {
  parfum: 2000,
  deterjen: 1000,
  pewangi: 1000,
  dropoff: 3000,
};

const laundryPrices: any = {
  cuci: 7000,
  kering: 8000,
};

const LaundryForm = () => {
  const [form, setForm] = useState({
    nama: "",
    jenisCucian: [] as string[],
    weight: "",
    jenisPembayaran: "",
    addon: [] as string[],
    harga: "0",
    noHp: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [showModal, setShowModal] = useState(false);
  const [pendingData, setPendingData] = useState<any>(null);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLaundryChange = (e: any) => {
    const { value, checked } = e.target;

    setForm((prev: any) => {
      let updated = checked
        ? [...prev.jenisCucian, value]
        : prev.jenisCucian.filter((item: string) => item !== value);

      return { ...prev, jenisCucian: updated };
    });
  };

  const handleAddonChange = (e: any) => {
    const { value, checked } = e.target;

    setForm((prev: any) => {
      let updated = checked
        ? [...prev.addon, value]
        : prev.addon.filter((item: string) => item !== value);

      return { ...prev, addon: updated };
    });
  };

  const validate = () => {
    let newErrors: any = {};

    if (!form.nama.trim()) newErrors.nama = "Nama jangan kosong, bro.";
    if (form.jenisCucian.length === 0)
      newErrors.jenisCucian = "Pilih minimal 1 jenis cucian.";
    if (!form.weight.trim() || isNaN(Number(form.weight)))
      newErrors.weight = "Berat harus angka.";
    if (!form.jenisPembayaran.trim())
      newErrors.jenisPembayaran = "Pilih metode pembayaran.";
    if (!form.noHp.trim() || isNaN(Number(form.noHp)))
      newErrors.noHp = "No HP harus angka.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ===================== AUTO UPDATE HARGA ======================
  useEffect(() => {
    let total = 0;

    const selected = form.jenisCucian;

    if (selected.includes("cuci") && selected.includes("kering")) {
      total += 14000;
    } else {
      selected.forEach((item) => {
        if (item === "cuci") total += 7000;
        if (item === "kering") total += 8000;
      });
    }

    // Add-on
    form.addon.forEach((item) => {
      total += addonPrices[item] || 0;
    });

    setForm((prev) => ({ ...prev, harga: total.toString() }));
  }, [form.jenisCucian, form.addon]);

  // =============================================================

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!validate()) return;

    // simpan data yang mau dikirim
    setPendingData(form);

    // munculkan modal
    setShowModal(true);
  };
  const handleConfirm = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/add-laundry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pendingData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Error, coba ulang lagi.");
        return;
      }

      toast.success("Mantap, data ke-save cuy.");

      // Reset form
      setForm({
        nama: "",
        jenisCucian: [],
        weight: "",
        jenisPembayaran: "",
        addon: [],
        harga: "0",
        noHp: "",
      });

      setErrors({});
      setShowModal(false);
    } catch (err) {
      toast.error("Servernya ngadat cuyy.");
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
              className="border rounded-lg px-3 py-2 outline-none"
            />
            {errors.nama && <span className="text-red-500">{errors.nama}</span>}
          </div>

          {/* JENIS CUCIAN MULTI */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Jenis Cucian</label>

            <div className="flex gap-2 capitalize">
              {["cuci", "kering"].map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={item}
                    checked={form.jenisCucian.includes(item)}
                    onChange={handleLaundryChange}
                  />
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </label>
              ))}
            </div>

            {errors.jenisCucian && (
              <span className="text-red-500">{errors.jenisCucian}</span>
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
              className="border rounded-lg px-3 py-2 outline-none"
            />
            {errors.weight && (
              <span className="text-red-500">{errors.weight}</span>
            )}
          </div>

          {/* JENIS PEMBAYARAN */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Jenis Pembayaran</label>
            <select
              name="jenisPembayaran"
              value={form.jenisPembayaran}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 bg-[#084428]"
            >
              <option value="">-- Pilih --</option>
              <option value="cash">Cash</option>
              <option value="qris">QRIS</option>
              <option value="transfer">Transfer Bank</option>
            </select>
            {errors.jenisPembayaran && (
              <span className="text-red-500">{errors.jenisPembayaran}</span>
            )}
          </div>

          {/* ADD ON */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Add-On</label>
            <div className="flex flex-wrap justify-between gap-x-5">
              {["parfum", "deterjen", "pewangi", "dropoff"].map((item) => (
                <label key={item} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={item}
                    checked={form.addon.includes(item)}
                    onChange={handleAddonChange}
                  />
                  {item.toUpperCase()} (+{addonPrices[item]})
                </label>
              ))}
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
              className="border rounded-lg px-3 py-2 outline-none"
            />
            {errors.noHp && <span className="text-red-500">{errors.noHp}</span>}
          </div>

          {/* HARGA */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Harga Total</label>
            <input
              type="text"
              name="harga"
              value={form.harga}
              disabled
              className="border bg-[#084428] rounded-lg px-3 py-2 cursor-not-allowed"
            />
          </div>
          {showModal && (
            <ModalKonfirmasi
              pendingData={pendingData}
              onClose={() => setShowModal(false)}
              onConfirm={handleConfirm}
            />
          )}

          {loading ? (
            <button className="w-full py-3 rounded-lg bg-white flex justify-center items-center text-black font-semibold">
              <AiOutlineLoading3Quarters className="animate-spin" />
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
