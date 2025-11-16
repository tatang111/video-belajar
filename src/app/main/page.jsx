"use client";

import KelasSaya from "@/components/shared/KelasSaya";
import PesananSaya from "@/components/shared/PesananSaya";
import ProfilSaya from "@/components/shared/ProfilSaya";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { User, BookOpen, ShoppingBag } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "profil";

  useEffect(() => {
    const stored = localStorage.getItem("user");
    const user = stored ? JSON.parse(stored) : null;

    if (!user?.email) {
      router.push("/login");
    }
  }, []);

  const handleTabChange = (value) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);
    router.push(`?${params.toString()}`);
  };

  return (
    <Tabs
      value={tab}
      onValueChange={handleTabChange}
      className="w-full bg-[#FFFCF0] px-20"
    >
      <div className="flex   border-gray-200 rounded-xl overflow-hidden">
        {/* Sidebar */}
        <div className="w-1/3 bg-[#FFFCF0]  border-gray-200 p-6">
          <h1 className="text-lg font-semibold text-gray-800">Ubah Profil</h1>
          <p className="text-sm text-gray-500 mt-1">Ubah data diri Anda</p>

          <div className="mt-6 bg-white border border-gray-200 rounded-xl p-4">
            <TabsList className="flex flex-col gap-2 bg-transparent p-0 h-30">
              {/* Profil Saya */}
              <TabsTrigger
                value="profil"
                className={`flex items-center  gap-2 text-sm justify-start py-2.5 px-4 rounded-lg transition-all ${
                  tab === "profil"
                    ? "bg-yellow-50 text-yellow-600 border border-yellow-400 font-medium shadow-sm"
                    : "text-gray-400 hover:bg-gray-50"
                }`}
              >
                <User
                  size={16}
                  className={
                    tab === "profil" ? "text-yellow-600" : "text-gray-400"
                  }
                />
                Profil Saya
              </TabsTrigger>

              {/* Kelas Saya */}
              <TabsTrigger
                value="kelas"
                className={`flex items-center gap-2 text-sm justify-start py-2.5 px-4 rounded-lg transition-all ${
                  tab === "kelas"
                    ? "bg-yellow-50 text-yellow-600 border border-yellow-400 font-medium shadow-sm"
                    : "text-gray-400 hover:bg-gray-50"
                }`}
              >
                <BookOpen
                  size={16}
                  className={
                    tab === "kelas" ? "text-yellow-600" : "text-gray-400"
                  }
                />
                Kelas Saya
              </TabsTrigger>

              {/* Pesanan Saya */}
              <TabsTrigger
                value="pesanan"
                className={`flex items-center gap-2 text-sm justify-start py-2.5 px-4 rounded-lg transition-all ${
                  tab === "pesanan"
                    ? "bg-yellow-50 text-yellow-600 border border-yellow-400 font-medium shadow-sm"
                    : "text-gray-400 hover:bg-gray-50"
                }`}
              >
                <ShoppingBag
                  size={16}
                  className={
                    tab === "pesanan" ? "text-yellow-600" : "text-gray-400"
                  }
                />
                Pesanan Saya
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* Content Area */}
        <div className="w-2/3 bg-[#FFFCF0] p-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 h-full">
            <TabsContent value="profil">
              <ProfilSaya />
            </TabsContent>

            <TabsContent value="kelas">
              <KelasSaya />
            </TabsContent>

            <TabsContent value="pesanan">
              <PesananSaya />
            </TabsContent>
          </div>
        </div>
      </div>
    </Tabs>
  );
}
