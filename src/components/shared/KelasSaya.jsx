"use client";

import { useQuery } from "@tanstack/react-query";
import Kelas from "./Kelas";
import { supabase } from "@/lib/supabase-client";

const KelasSaya = () => {
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null;

  const userId = user?.id;

  const { data, isLoading } = useQuery({
    queryKey: ["kelasSaya"],
    queryFn: async () => {
      const { data } = await supabase
        .from("user_videos")
        .select(
          "*, products(id, image, owner, owner_position, title, description)"
        )
        .eq("user_id", userId);
      return data;
    },
  });

  const filteredData = (data || []).filter((d) => d.is_paid === true);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col gap-3">
      {filteredData.length > 0 ? (
        filteredData.map((kelas) => (
          <Kelas product={kelas.products} key={kelas.id} />
        ))
      ) : (
        <p>Tidak ada kelas yang sudah dibayar.</p>
      )}
    </div>
  );
};

export default KelasSaya;
