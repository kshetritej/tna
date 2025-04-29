"use client";

import type React from "react"
import { Toaster } from "@/components/ui/sonner"
import { Inter } from "next/font/google"
import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { redirect, usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const queryClient = new QueryClient()

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const location = usePathname()
  let user = null;
  const token = localStorage.getItem("token")
  if (token) {
    user = jwtDecode(token)
  }

  if (user?.role !== "SUPERADMIN" || user?.role !== "ADMIN") {
    redirect("/")
  }
  return (
    <html>
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <SidebarProvider>
              <AppSidebar variant="inset" />
              <SidebarInset>
                <div>
                  <SiteHeader headerTitle={location.split('/').pop() || ''} />
                  <main className="mx-auto w-full">{children}</main>
              <Toaster />
            </div>
              </SidebarInset>
            </SidebarProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
