import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { ModeToggle } from "../mode-toggle"

export function Navbar() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary rounded-md w-8 h-8 flex items-center justify-center">
            {/* <Image src="/placeholder.svg?height=24&width=24" width={24} height={24} alt="Logo" className="invert" /> */}
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

        <div className="flex items-center gap-3">
          <ModeToggle />
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/signup">Sign up</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
