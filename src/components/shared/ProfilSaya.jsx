"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

const ProfilSaya = () => {
  const [selectedCode, setSelectedCode] = useState("+62"); // default value

  return (
    <div className="p-4">
      {/* Profile Info */}
      <div className="flex mb-4 gap-4">
        <img src="/assets/Avatar.png" className="w-20" alt="User Avatar" />
        <div>
          <h1 className="text-lg font-semibold">Jennie Ruby Jane</h1>
          <p className="text-sm text-gray-400">rubyjane@gmail.com</p>
          <Link
            href="#"
            className="text-red-500 font-semibold cursor-pointer hover:underline"
          >
            Ganti Foto Profil
          </Link>
        </div>
      </div>

      <hr />

      {/* Input Section */}
      <div className="mt-5 flex items-center gap-3">
        <Input type="text" placeholder="Nama lengkap" className="w-60" />
        <Input type="email" placeholder="Email" className="w-60" />

        {/* Dropdown for Phone Code */}
        <DropdownMenu>
          <DropdownMenuTrigger
            className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white hover:bg-gray-50"
          >
            {selectedCode}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-24">
            {["+62", "+1", "+44", "+81"].map((code) => (
              <DropdownMenuItem
                key={code}
                onClick={() => setSelectedCode(code)}
                className="cursor-pointer"
              >
                {code}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Input type="tel" placeholder="Nomor telepon" className="w-35" />
      </div>
      <div className="flex justify-end mt-4">
      <Button className={'bg-green-400 p-5 cursor-pointer hover:bg-green-500'}>Simpan</Button>
      </div>
    </div>
  );
};

export default ProfilSaya;
