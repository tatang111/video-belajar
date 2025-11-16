"use client";

import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { use, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase-client";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CourseDetail({ params }) {
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null;

  const userId = user?.id;
  const productId = use(params);

  const router = useRouter()
  useEffect(() => {
      const stored = localStorage.getItem("user");
      const user = stored ? JSON.parse(stored) : null;
  
      if (!user?.email) {
        router.push("/login");
      }
    }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["productDetails"],
    queryFn: async () => {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("id", Number(productId.product_id))
        .single();
      return data;
    },
  });

  const handleClick = async () => {
    try {
      const { data: existingRecord } = await supabase
        .from("user_videos")
        .select("*")
        .eq("user_id", userId)
        .eq("video_id", data?.id)
        .single();

      if (existingRecord) {
        if (existingRecord.is_paid) {
          toast.error("You already paid this course");
          return;
        } else {
          window.snap.pay(existingRecord.token, {
            onSuccess: async (result) => {
              await supabase
                .from("user_videos")
                .update({ is_paid: true })
                .eq("user_id", userId)
                .eq("video_id", data.id);

              toast.success("Pembayaran berhasil!");
            },
          });
          return;
        }
      }

      const dataRequest = {
        id: data?.id,
        productName: data?.title,
        price: data?.price,
      };

      const response = await axios.post("/api/tokenizer", dataRequest);

      const { error } = await supabase.from("user_videos").insert({
        user_id: userId,
        video_id: data?.id,
        is_paid: false,
        token: response.data.token,
        created_at: new Date(),
      });

      if (error) {
        console.error("Failed to create user_video record:", error);
        toast.error("Terjadi kesalahan saat membuat transaksi");
        return;
      }

      window.snap.pay(response.data.token, {
        onSuccess: async (result) => {
          await supabase
            .from("user_videos")
            .update({ is_paid: true })
            .eq("user_id", userId)
            .eq("video_id", data.id);

          toast.success("Pembayaran berhasil!");
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan saat memproses pembayaran");
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );

  return (
    <div className="bg-[#f9f9f9] min-h-screen py-8 space-y-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* ✅ Hero Section */}
        <div className="relative rounded-xl overflow-hidden mb-8">
          <img
            src="/assets/uiux-banner.jpg"
            alt="UI UX Course Banner"
            className="w-full h-64 md:h-80 object-cover"
          />
          {/* FIX: make overlay positioned absolutely inside relative container */}
          <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-6 md:px-10 text-white">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              {data.description.split(".")[0]}
            </h1>
            <p className="text-sm md:text-base text-gray-200 max-w-2xl">
              Belajar bersama tutor profesional di Video Course. Kapanpun, di
              manapun.
            </p>
            <div className="flex items-center gap-2 mt-3">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <p className="text-sm">
                3.8 <span className="text-gray-300">(86)</span>
              </p>
            </div>
          </div>
        </div>

        {/* ✅ Main Layout */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Section */}
          <div className="md:col-span-2 space-y-6">
            {/* Deskripsi */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-3">Deskripsi</h2>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                  {data.description}
                </p>
              </CardContent>
            </Card>

            {/* Tutor Section */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h2 className="text-lg font-semibold mb-3">
                  Belajar bersama Tutor Profesional
                </h2>
                {/* Tutor Item */}
                <div className="flex items-center gap-3 border rounded-lg p-3 bg-green-50/50 hover:bg-green-100/60 transition-all duration-200">
                  <img
                    src="/assets/tutor.png"
                    alt="Tutor"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-800">{data.owner}</h3>
                    <p className="text-sm text-gray-600">
                      {data.owner_position}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ✅ Right Section (Sticky Purchase Card) */}
          <div className="md:col-span-1">
            <Card className="sticky top-6 shadow-md">
              <CardContent className="p-6 space-y-3">
                <h3 className="text-base font-semibold leading-snug">
                  {data.title}
                </h3>

                <div className="flex items-center gap-2">
                  <p className="text-green-600 font-semibold text-lg">
                    Rp {data.price}K
                  </p>
                  <p className="text-gray-400 line-through text-sm">
                    Rp {data.price * 2}K
                  </p>
                  <Badge className="bg-yellow-100 text-yellow-700">
                    Diskon 50%
                  </Badge>
                </div>

                <p className="text-xs text-gray-500">
                  Penawaran spesial tersisa 2 hari lagi!
                </p>

                <Button
                  onClick={handleClick}
                  className="w-full bg-green-600 hover:bg-green-700 text-white mt-2 transition-all duration-300"
                >
                  Beli Sekarang
                </Button>

                <div className="border-t pt-3 text-sm text-gray-600">
                  <p className="font-medium">Kelas Ini Sudah Termasuk</p>
                  <ul className="mt-2 space-y-1 text-gray-500 text-sm">
                    <li>🎥 3 Video</li>
                  </ul>
                  <p className="text-xs text-gray-400 mt-3">
                    Bahasa Pengantar: Bahasa Indonesia
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <h1 className="font-semibold text-xl">
          Video Pembelajaran Terkait Lainnya
        </h1>
        <p className="text-sm text-[#333333AD]">
          Ekspansi Pengetahuan Anda dengan Rekomendasi Spesial Kami!
        </p>
        <div className="flex gap-4 mt-6">
          {/* <CardProduct />
        <CardProduct />
        <CardProduct /> */}
        </div>
      </div>
    </div>
  );
}
