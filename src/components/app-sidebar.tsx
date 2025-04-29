"use client"

import * as React from "react"
import {
  LayoutDashboardIcon,
  ListIcon,
  Stethoscope,
  UsersIcon,
} from "lucide-react"
import Link from "next/link"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { jwtDecode } from "jwt-decode"

let user = null;
if (localStorage.getItem("token")) {
  user = jwtDecode(localStorage.getItem("token") || "")
}
console.log("user: ", user)
const data = {
  user: {
    name: user?.name || "Admin",
    email: user?.email || "admin@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Posts",
      url: "/admin/posts",
      icon: ListIcon,
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: UsersIcon,
    },
    {
      title: "Psychatrist",
      url: "/admin/doctors",
      icon: Stethoscope,
    },
  ],

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/" className="flex items-center gap-2">
                <div className="bg-primary rounded-md w-8 h-8 flex items-center justify-center">
                </div>
                <span className="font-bold text-2xl">tna</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
