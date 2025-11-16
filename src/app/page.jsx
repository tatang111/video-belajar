"use client";

import CardProduct from "@/components/shared/Card";
import { supabase } from "@/lib/supabase-client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const fetchVideos = async () => {
  const { data, error } = await supabase.from("products").select("*");

  if (error) throw new Error(error.message);
  return data;
};

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchVideos,
  });

  const router = useRouter()
  useEffect(() => {
    const stored = localStorage.getItem("user");
    const user = stored ? JSON.parse(stored) : null;

    if (!user?.email) {
      router.push("/login");
    }
  }, []);

  if (error)
    return (
      <p className="text-center py-10 text-red-500">
        Error loading products: {error.message}
      </p>
    );

  return (
    <div className="flex justify-start items-start py-10 flex-col px-10">
      <img src="/assets/main.png" className="mx-auto" alt="Main" />

      <div className="space-y-4 flex flex-col mt-10 md:ml-18">
        <div className="text-left">
          <h1 className="text-xl font-bold">
            Koleksi Video Pembelajaran Unggulan
          </h1>
          <p className="text-gray-500 text-base">
            Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!
          </p>
        </div>

        <div className="w-full px-5">
          <div className="grid grid-cols-3 gap-6 mt-6 place-items-center">
            {isLoading ? (
              <p>Loading videos</p>
            ) : (
              data?.map((item) => <CardProduct key={item.id} product={item} />)
            )}
          </div>
        </div>
      </div>

      <div className="w-8/10 mx-auto rounded-xl mt-10 bg-slate-900 px-2 text-center text-white py-20 flex flex-col items-center justify-center">
        <p className="text-indigo-500 font-medium">Get updated</p>
        <h1 className="max-w-lg font-semibold text-4xl/[44px] mt-2">
          Subscribe to our newsletter & get the latest news
        </h1>
        <div className="flex items-center justify-center mt-10 border border-slate-600 focus-within:outline focus-within:outline-indigo-600 text-sm rounded-full h-14 max-w-md w-full">
          <input
            type="text"
            className="bg-transparent outline-none rounded-full px-4 h-full flex-1"
            placeholder="Enter your email address"
          />
          <button className="bg-indigo-600 text-white rounded-full h-11 mr-1 px-8 flex items-center justify-center">
            Subscribe now
          </button>
        </div>
      </div>
    </div>
  );
}
