"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AdminLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export default function AdminLoginPage() {
  const router = useRouter()
  const form = useForm<z.infer<typeof AdminLoginSchema>>({
    resolver: zodResolver(AdminLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleAdminLogin = useMutation({
    mutationFn: async (data: z.infer<typeof AdminLoginSchema>) => {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        body: JSON.stringify(data),
      })
      return response.json()
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token)
      toast.success("Login successful")
      router.push("/admin/dashboard")
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong")
    }
  })

  const onSubmit = (data: z.infer<typeof AdminLoginSchema>) => {
    handleAdminLogin.mutate(data)
  }

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Input type="email" placeholder="Email" {...form.register("email")} />
        <Input type="password" placeholder="Password" {...form.register("password")} />
        <Button type="submit">Login</Button>
      </form>
    </div>
  )
}