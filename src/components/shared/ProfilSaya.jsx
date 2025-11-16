"use client";

import React from "react";
import Link from "next/link";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { supabase } from "@/lib/supabase-client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const ProfilSaya = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const stored = localStorage.getItem("user");
      const user = JSON.parse(stored);

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", user.email)
        .single();

      if (error) throw error;

      return data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (values) => {
      console.log(values);
      const { error } = await supabase
        .from("users")
        .update({
          nama_lengkap: values.nama_lengkap,
          email: values.email,
          nomor: values.hp,
        })
        .eq("email", data.email);

      if (error) throw error;

      localStorage.setItem(
        "user",
        JSON.stringify({
          email: values.email,
          nama_lengkap: values.nama_lengkap,
          hp: values.hp,
        })
      );
    },
    onSuccess: () => {
      toast.success("Profil berhasil diperbarui!");
      queryClient.invalidateQueries(["user"]);
    },
    onError: () => {
      toast.error("Gagal memperbarui profil.");
    },
  });

  const handleUpdate = () => {
    const nama_lengkap = document.getElementById("nama_lengkap").value;
    const email = document.getElementById("email").value;
    const hp = document.getElementById("hp").value;

    updateMutation.mutate({
      nama_lengkap,
      email,
      hp,
    });
  };

  return (
    <div className="p-4">
      {/* Profile Info */}
      <div className="flex mb-4 gap-4">
        <img src="/assets/Avatar.png" className="w-20" alt="User Avatar" />
        <div>
          <h1 className="text-lg font-semibold">
            {isLoading ? "..." : data?.nama_lengkap}
          </h1>
          <p className="text-sm text-gray-400">
            {isLoading ? "..." : data?.email}
          </p>
        </div>
      </div>

      <hr />

      {/* Input Section */}
      <div className="mt-5 flex items-center gap-3">
        <Input
          id="nama_lengkap"
          type="text"
          placeholder="Nama lengkap"
          className="w-60"
          defaultValue={data?.nama_lengkap}
        />

        <Input
          id="email"
          type="email"
          placeholder="Email"
          className="w-60"
          defaultValue={data?.email}
        />

        <Input
          id="hp"
          type="number"
          placeholder="Nomor telepon"
          className="w-35"
          defaultValue={data?.hp}
        />
      </div>

      <div className="flex justify-end mt-4">
        <Button
          onClick={handleUpdate}
          disabled={updateMutation.isPending}
          className="bg-green-400 p-5 cursor-pointer hover:bg-green-500"
        >
          {updateMutation.isPending ? "Menyimpan..." : "Simpan"}
        </Button>
      </div>
    </div>
  );
};

export default ProfilSaya;
