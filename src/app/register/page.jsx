"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase-client";
import bcrypt from "bcryptjs"

const registerSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email().nonempty("Email is required"),
  hp: z
    .string()
    .min(8, "Nomor HP minimal 8 digit")
    .max(15, "Nomor HP maksimal 15 digit")
    .regex(/^\d+$/, "Nomor HP hanya boleh angka"),
  password: z
    .string()
    .nonempty("Password is requireds")
    .min(8, "Password minimal 8 karakter"),
});

export default function Daftar() {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      hp: "",
      password: "",
    },
  });
  const router = useRouter();

  const onSubmit = async (values) => {
    const hashedPassword = await bcrypt.hash(values.password, 10);

    const { data, error } = await supabase.from("users").insert({
      nama_lengkap: values.name,
      email: values.email,
      nomor: values.hp,
      password: hashedPassword,
      created_at: new Date(),
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Berhasil daftar!");
    router.push("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-105 bg-white text-gray-500 max-w-105 mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
        <h2 className="text-2xl font-semibold mb-2 text-center text-gray-800">
          Pendaftaran Akun
        </h2>

        <h4 className="text-center mb-4">
          Yuk, lanjutin belajarmu di videobelajar.
        </h4>

        <Form {...form}>
          <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor hp</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter password"
                      type={"password"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              type="submit"
              className="w-full mb-3 bg-green-500 py-2.5 rounded-lg text-white font-semibold hover:bg-green-600 transition cursor-pointer"
            >
              Daftar
            </button>
          </form>
        </Form>

        <button
          type="button"
          onClick={() => router.push("login")}
          className="w-full mb-3 bg-green-100 py-2.5 rounded-lg text-green-500 font-semibold transition cursor-pointer"
        >
          Masuk
        </button>
      </div>
    </div>
  );
}
