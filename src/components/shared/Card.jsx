"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CardProduct({product}) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/product/${product.id}`)
  }

  return (
    <Card onClick={handleClick} className="w-[350px] border cursor-pointer group border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition">
      <CardContent className="p-4">
        {/* Thumbnail */}
        <div className="w-full h-[150px] mb-3 overflow-hidden rounded-xl">
          <Image
            src={product.image}
            alt="Course thumbnail"
            width={270}
            height={150}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-gray-900 group-hover:text-green-400 transition duration-200">
         {product.title}
        </h3>
        <p className="text-gray-500 text-sm mt-1">
          {product.description.split(".")[0]}
        </p>

        {/* Instructor */}
        <div className="flex items-center gap-2 mt-3">
          <Image
            src="/assets/avatar.png"
            alt="Instructor"
            width={32}
            height={32}
            className="rounded-full"
          />
          <div>
            <p className="text-sm font-medium text-gray-800">{product.owner}</p>
            <p className="text-xs text-gray-500">{product.owner_position}</p>
          </div>
        </div>

        {/* Rating + Price */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1 text-yellow-400">
            {[...Array(3)].map((_, i) => (
              <Star key={i} size={14} fill="currentColor" />
            ))}
            <Star size={14} />
            <Star size={14} />
            <span className="text-gray-500 text-sm ml-1">
              3.5 <span className="text-gray-400">(86)</span>
            </span>
          </div>
          <p className="text-[#00A859] font-semibold text-base">Rp {product.price}K</p>
        </div>
      </CardContent>
    </Card>
  );
}
