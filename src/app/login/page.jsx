"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase-client";
import { toast } from "sonner";
import bcrypt from "bcryptjs";

const loginSchema = z.object({
  email: z.string().email().nonempty("Email is required"),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password minimal 8 karakter"),
});

export default function Login() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  const onSubmit = async (values) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", values.email)
      .single();

    if (error) {
      toast.error("Terjadi kesalahan saat mengambil data");
      return;
    }

    if (!data) {
      toast.error("Email tidak ditemukan");
      return;
    }

    const isMatch = await bcrypt.compare(values.password, data.password);

    if (!isMatch) {
      toast.error("Password salah");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({
        id: data.id,
        name: data.nama_lengkap,
        email: data.email,
      })
    );

    toast.success("Login berhasil.");
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-105 bg-white text-gray-500 max-w-105 mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
        <h2 className="text-2xl font-semibold mb-2 text-center text-gray-800">
          Masuk ke Akun
        </h2>
        <h4 className="text-center mb-2">
          Yuk, daftarkan akunmu sekarang juga!.
        </h4>

        <br />

        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type={"password"}
                      placeholder="Enter password"
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
              Masuk
            </button>
          </form>
        </Form>

        <button
          type="button"
          onClick={() => router.push("register")}
          className="w-full mb-3 bg-green-100 py-2.5 rounded-lg text-green-500 font-semibold transition cursor-pointer"
        >
          Daftar
        </button>
      </div>
    </div>
  );
}
