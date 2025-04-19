"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "../mode-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner";
export function Navbar() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage?.getItem("token")
    const user = token ? jwtDecode(token as string) : null
    setUser(user)
  }, [])


  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary rounded-md w-8 h-8 flex items-center justify-center">
          </div>
          <span className="font-bold text-2xl">tna</span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/doctors">Doctors</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/resources">Resources</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/community">Community</Link>
          </Button>
        </nav>


        {!user ? (
        <div className="flex items-center gap-3">
          <ModeToggle />
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/signup">Sign up</Link>
          </Button>
          </div>)
          :
          <div className="flex items-center gap-3">
          <ModeToggle />
          <Link href="/profile">
            <Avatar>
              <AvatarImage src={user?.avatar} />
              <AvatarFallback>
                {user?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </Link>
          </div>

        }
      </div>
    </header>
  )
}
