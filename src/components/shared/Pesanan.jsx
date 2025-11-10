import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { supabase } from "@/lib/supabase-client";

const Pesanan = ({ product, is_paid, invoice, token }) => {
  const userId = 1

  const handleClick = async () => {
    if (!token) {
      toast.error("Token pembayaran tidak tersedia");
      return;
    }

    window.snap.pay(token, {
      onSuccess: async (result) => {
        console.log("Payment success:", result);

        // Update Supabase to mark as paid
        const { data, error } = await supabase
          .from("user_videos")
          .update({ is_paid: true })
          .eq("video_id", product.id)
          .eq("user_id", userId);

        if (error) {
          console.error("Failed to update payment status:", error);
          toast.error("Gagal memperbarui status pembayaran di database");
        } else {
          toast.success("Pembayaran berhasil dan status diperbarui!");
        }
      },
      onPending: (result) => {
        console.log("Payment pending:", result);
        toast.info("Pembayaran masih pending...");
      },
      onError: (result) => {
        console.error("Payment error:", result);
        toast.error("Pembayaran gagal!");
      },
      onClose: () => {
        console.log("Payment popup closed");
      },
    });
  };

  return (
    <div>
      <div className="border rounded-xl p-4 bg-green-50/30">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex gap-4 text-sm text-gray-700">
            <p>
              <span className="font-medium">No. Invoice:</span>{" "}
              <a href="#" className="text-blue-600 hover:underline font-medium">
                {invoice}
              </a>
            </p>
            <p>
              <span className="font-medium">Waktu Pembayaran:</span>{" "}
              {new Date(product.created_at).toLocaleString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          {is_paid === true ? (
            <Badge variant="success">Berhasil</Badge>
          ) : (
            <Badge variant="secondary">Belum Bayar</Badge>
          )}
        </div>

        {/* Product Info */}
        <div className="flex justify-between items-center py-4">
          <div className="flex gap-3 items-center">
            <img
              src={product.image}
              alt="course"
              className="w-14 h-14 rounded-lg object-cover"
            />
            <div>
              <h2 className="text-sm font-medium text-gray-800">
                {product.title}
              </h2>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500">Harga</p>
            <p className="font-semibold text-gray-900">
              Rp {product.price}.000
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t pt-3 flex justify-between items-center text-sm">
          <p className="font-medium text-gray-600">Total Pembayaran</p>
          <div className="flex justify-center items-center gap-4">
            <p className="font-semibold text-green-500">
              Rp {product.price}.000
            </p>
            {!is_paid && (
              <Button
                onClick={handleClick}
                className={"bg-yellow-400 text-black hover:bg-yellow-500/80"}
              >
                Bayar
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pesanan;
