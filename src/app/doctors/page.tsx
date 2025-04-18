import { Star, MapPin, Clock, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Mock data for doctors
const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Psychiatry Specialist",
    location: "New York, USA",
    experience: "8 Years",
    patients: "1240+",
    rating: 4.8,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Psychology Specialist",
    location: "Boston, USA",
    experience: "6 Years",
    patients: "980+",
    rating: 4.7,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Therapy Specialist",
    location: "Chicago, USA",
    experience: "5 Years",
    patients: "870+",
    rating: 4.6,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Psychiatry Specialist",
    location: "Los Angeles, USA",
    experience: "12 Years",
    patients: "1560+",
    rating: 4.9,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 5,
    name: "Dr. Aisha Patel",
    specialty: "Counseling Specialist",
    location: "Seattle, USA",
    experience: "7 Years",
    patients: "1120+",
    rating: 4.8,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 6,
    name: "Dr. Robert Kim",
    specialty: "Psychology Specialist",
    location: "Austin, USA",
    experience: "4 Years",
    patients: "780+",
    rating: 4.5,
    image: "/placeholder.svg?height=300&width=300",
  },
]

export default function DoctorsPage() {
  return (
    <div className="container py-8 px-4 mx-auto">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Find a Mental Health Professional</h1>
          <p className="text-muted-foreground">
            Connect with licensed therapists, counselors, and psychiatrists specialized in student mental health
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Input placeholder="Search by name, specialty, or location..." className="pl-4" />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="specialty">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Specialty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Specialties</SelectItem>
                <SelectItem value="psychiatrist">Psychiatrist</SelectItem>
                <SelectItem value="psychologist">Psychologist</SelectItem>
                <SelectItem value="therapist">Therapist</SelectItem>
                <SelectItem value="counselor">Counselor</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results count */}
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{doctors.length}</span> professionals
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <Card key={doctor.id} className="overflow-hidden bg-muted/10 ">
              <CardContent className="p-5">
                <div className="flex flex-col items-center">
                  {/* Image and Rating */}
                  <div className="relative w-full mb-3">
                    <div className="aspect-square w-32 h-32 mx-auto rounded-md overflow-hidden">
                      <Image
                        src={doctor.image || "/placeholder.svg"}
                        alt={doctor.name}
                        width={128}
                        height={128}
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Doctor Info */}
                  <div className="text-center mb-3">
                    <h3 className="font-bold text-lg">{doctor.name}</h3>
                    <p className="text-muted-foreground text-sm">{doctor.specialty}</p>
                  </div>

                  {/* Location */}
                  <div className="flex items-center justify-center text-sm text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{doctor.location}</span>
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between w-full mt-2">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-green-600 mr-2" />
                      <div>
                        <p className="text-sm font-medium">Experience</p>
                        <p className="text-sm">{doctor.experience}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-green-600 mr-2" />
                      <div>
                        <p className="text-sm font-medium">Patients</p>
                        <p className="text-sm">{doctor.patients}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex gap-2">
                <Button variant="outline" className="flex-1" asChild>
                  <Link href={`/doctors/${doctor.id}`}>View Profile</Link>
                </Button>
                <Button className="flex-1" asChild>
                  <Link href={`/appointments/book?doctor=${doctor.id}`}>Book Session</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
