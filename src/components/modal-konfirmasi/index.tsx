import React from "react";

const ModalKonfirmasi = ({
  pendingData,
  onClose,
  onConfirm,
}: {
  pendingData: any;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  if (!pendingData) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white text-black rounded-xl p-6 w-[90%] max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Konfirmasi Data</h2>

        <div className="space-y-2 text-sm">
          <p>
            <b>Nama:</b> {pendingData?.nama}
          </p>
          <p>
            <b>Jenis Cucian:</b> {pendingData?.jenisCucian.join(", ")}
          </p>
          <p>
            <b>Berat:</b> {pendingData?.weight} kg
          </p>
          <p>
            <b>Pembayaran:</b> {pendingData?.jenisPembayaran}
          </p>
          <p>
            <b>Add-On:</b> {pendingData?.addon.join(", ") || "Tidak ada"}
          </p>
          <p>
            <b>No HP:</b> {pendingData?.noHp}
          </p>
          <p className="text-lg font-bold mt-3">
            Total Harga: Rp {Number(pendingData?.harga).toLocaleString()}
          </p>
        </div>

        <div className="flex justify-end mt-6 gap-3">
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg"
            onClick={onClose}
          >
            Batal
          </button>

          <button
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
            onClick={onConfirm}
          >
            Konfirmasi
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalKonfirmasi;
