"use client";

import { use, useEffect, useState } from "react";
import { Play, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase-client";

export default function CoursePlayerPage({ params }) {
  const videoId = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const videoParams = searchParams.get("video") || "1";
  const productId = videoId.kelas_id;
  const userId = 1;

  const handleTabChange = (value) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("video", value);
    router.push(`?${params.toString()}`);
  };

  const { data: userVideos } = useQuery({
    queryKey: ["user_video"],
    queryFn: async () => {
      const { data } = await supabase
        .from("user_videos")
        .select("*")
        .eq("user_id", userId)
        .eq("video_id", productId).single();

      return data;
    },
  });

  const { data } = useQuery({
    queryKey: ["video"],
    queryFn: async () => {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();
      return data;
    },
  });

  let videoNow;
  if (videoParams == 1 || "") {
    videoNow = data?.video;
  } else if (videoParams == 2) {
    videoNow = data?.video_2;
  } else if (videoParams == 3) {
    videoNow = data?.video_3;
  }

  const [activeVideo, setActiveVideo] = useState(videoParams - 1);

  const modules = [
    { id: 0, title: `${data?.title} #1` },
    { id: 1, title: `${data?.title} #2` },
    { id: 2, title: `${data?.title} #3` },
  ];

  useEffect(() => {
    if (userVideos?.is_paid === false) {
      router.push("/")
    }
  }, [userVideos])

  return (
    <div className="min-h-screen bg-white flex flex-col px-30">
      <div className="flex flex-1">
        {/* Left Side (Video Player) */}
        <div className="flex-1 border-r">
          <div className="relative w-full aspect-video">
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-none"
              src={videoNow}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className="p-6">
            <h1 className="text-lg font-semibold text-gray-900 mb-2">
              Praktikkan Skill dengan Technical Book
            </h1>
            <p className="text-sm text-gray-600 mb-4">
              Pelajari dan praktikan skill teknis dalam berbagai industri dengan
              Technical Book Riselearn
            </p>

            {/* Tutor Info */}
            <div className="flex items-center gap-3">
              <Image
                src="/assets/classOwner.png"
                alt="Instructor"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {data?.owner}
                </p>
                <p className="text-xs text-gray-500">{data?.owner_position}</p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-3">
              <Star size={16} fill="#FFD700" className="text-yellow-400" />
              <Star size={16} fill="#FFD700" className="text-yellow-400" />
              <Star size={16} fill="#FFD700" className="text-yellow-400" />
              <Star size={16} className="text-gray-300" />
              <Star size={16} className="text-gray-300" />
              <p className="text-sm text-gray-500 ml-2">
                3.5 <span className="text-gray-400">(86)</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side (Module List) */}
        <div className="w-[320px] bg-gray-50 border-l p-4 space-y-3 overflow-y-auto">
          <h3 className="font-semibold text-gray-800 mb-2">{data?.title}</h3>

          {modules.map((mod) => {
            const isActive = activeVideo === mod.id;
            return (
              <div
                key={mod.id}
                onClick={() => {
                  handleTabChange(mod.id + 1);
                  setActiveVideo(mod.id);
                }} // 👈 click to activate
                className={`p-3 border rounded-lg flex items-center justify-between cursor-pointer transition
                  ${
                    isActive
                      ? "bg-green-50 border-green-200"
                      : "bg-white border-gray-200 hover:bg-gray-100"
                  }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 flex items-center justify-center rounded-full ${
                      isActive
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-700"
                    }`}
                  >
                    <Play size={12} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {mod.title}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
