import React from "react";
import Pesanan from "./Pesanan";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase-client";

const PesananSaya = () => {
  const userId = 1;

  const { data, isLoading } = useQuery({
    queryKey: ["pesananSaya"],
    queryFn: async () => {
      const { data } = await supabase
        .from("user_videos")
        .select("*, products(*)")
        .eq("user_id", userId);
      return data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col gap-4">
      {data.length > 0 ? (
        data.map((product) => (
          <Pesanan
            product={product.products}
            token={product.token}
            invoice={product.id}
            is_paid={product.is_paid}
            key={product.id}
          />
        ))
      ) : (
        <p>Pesanan tidak ada.</p>
      )}
    </div>
  );
};

export default PesananSaya;
