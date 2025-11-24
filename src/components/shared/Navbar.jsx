"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase-client";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname.includes("login") || pathname.includes("register")) {
    return null;
  }

  const handleLogout = () => {
      try {
    localStorage.removeItem("user");
    toast.success("Berhasil keluar");
    router.push("/login");
  } catch (e) {
    toast.error("Gagal logout");
  }
  };

  const handleDeleteAccount = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.id) return toast.error("User tidak ditemukan");

      const { error } = await supabase.from("users").delete().eq("id", user.id);

      if (error) {
        return toast.error("Gagal menghapus akun");
      }

      localStorage.removeItem("user");
      toast.success("Akun berhasil dihapus");
      router.push("/register");
    } catch (err) {
      toast.error("Terjadi kesalahan");
    }
  };

  return (
    <nav className="h-[70px] relative w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between z-20 bg-white text-gray-700 shadow-[0px_4px_25px_0px_#0000000D] transition-all">
      <a href="/" className="text-indigo-600">
        <img src="/assets/Logo.png" alt="" className="w-full h-15 -ml-5" />
      </a>

      <div className="flex justify-center items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Category</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            <Link href={"/main?tab=profil"}>
              <DropdownMenuItem>Profil Saya</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <Link href={"/main?tab=kelas"}>
              <DropdownMenuItem>Kelas Saya</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <Link href={"/main?tab=pesanan"}>
              <DropdownMenuItem>Pesanan Saya</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-500 hover:text-red-400"
            >
              Keluar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleDeleteAccount}
              className={"text-red-500 hover:text-red-400"}
            >
              Hapus Akun
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <img src="/assets/Avatar.png" alt="" />
      </div>
    </nav>
  );
};

export default Navbar;
