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

const Navbar = () => {
  return (
    <nav className="h-[70px] relative w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between z-20 bg-white text-gray-700 shadow-[0px_4px_25px_0px_#0000000D] transition-all">
      <a href="/" className="text-indigo-600">
        <img src="/assets/Logo.png" alt="" />
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
            <DropdownMenuItem className="text-red-500">Keluar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <img src="/assets/Avatar.png" alt="" />
      </div>
    </nav>
  );
};

export default Navbar;
