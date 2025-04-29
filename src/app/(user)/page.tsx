import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="bg-background h-screen items-center justify-center flex flex-col">
      <section className="px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Mental health,
              <br />
              reimagined for
              <br />
              <span className="font-cursive italic">everyone</span>
            </h1>

            <p className="text-muted-foreground max-w-md">
              Helping you succeed and thrive with the help of licensed therapists and a community of peers.
              When and where they need it most.
            </p>

            <Button size="lg" asChild>
              <Link href="/signup">Join now</Link>
            </Button>
          </div>

          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="https://i.pinimg.com/736x/1e/6d/0c/1e6d0cf720e8e21a7734176280109f0b.jpg"
              fill
              alt="using mental health app"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>
    </div>
  )
}
