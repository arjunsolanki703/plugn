import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatTime } from "@/lib/utils";
import {
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60;

const getRestaurantProfile = async () => {
  const res = await fetch(
    "https://api.plugn.io/v2/store/rest_d7f4f8b8-ebc7-11ea-808a-0673128d0c9c?expand=noOfItems,categories,categories.noOfItems,isOpen,reopeningAt,webLinks,country,currency,currencies,supportPickup,supportDelivery,storeTheme,openingHours"
  );

  const data = await res.json();

  return data;
};

export default async function RestaurantProfile() {
  const profile: Record<string, any> = await getRestaurantProfile();
  console.log("profile", profile);

  const isOpen = true; // This should be dynamically determined based on current time and opening hours

  const branches = [
    {
      name: "Downtown Delight",
      location: "123 Main St, Downtown, City 12345",
    },
    {
      name: "Suburban Savor",
      location: "456 Oak Ave, Suburbia, City 67890",
    },
    {
      name: "Beachside Bites",
      location: "789 Coast Rd, Beachtown, City 54321",
    },
  ];

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (!profile) {
    return <Skeleton />;
  }

  return (
    <div className="bg-background flex flex-col">
      {/* Header Section */}
      <header className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <Image
              src="https://res.cloudinary.com/plugn/image/upload/c_scale,f_jpg,q_100,w_128/restaurants/rest_d7f4f8b8-ebc7-11ea-808a-0673128d0c9c/logo/vmwa6KSIqM3tltPLBdIX-UQ1Y9L5RIXD.png"
              alt="Gourmet Grove Logo"
              width={100}
              height={100}
              className="rounded-full mb-2"
            />
            <Link href={profile.restaurant_domain}>
              <h1 className="text-4xl font-bold mb-2">
                {profile.name}
              </h1>
            </Link>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>
                {profile.isOpen ? "Open now" : "Closed now"}
              </span>
              <Badge variant={isOpen ? "secondary" : "destructive"}>
                {isOpen ? "Open Now" : "Closed"}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Branch List Section */}
      <section className="py-6 md:py-12 bg-muted">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Our Branches
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {branches.map((branch, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{branch.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 mt-0.5" />
                    <span>{branch.location}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-4 container mx-auto">
        {/* Opening hours */}
        <section className="">
          <div className="border border-gray-200 p-4 rounded-lg">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Opening Hours
            </h2>
            <div className="max-w-2xl mx-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Day</TableHead>
                    <TableHead>Open</TableHead>
                    <TableHead>Close</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {profile.openingHours?.map(
                    (hour: Record<string, any>) => (
                      <TableRow key={hour.day_of_week}>
                        <TableCell>
                          {dayNames[hour.day_of_week]}
                        </TableCell>
                        <TableCell>
                          {formatTime(hour.open_at)}
                        </TableCell>
                        <TableCell>
                          {formatTime(hour.close_at)}
                        </TableCell>
                        <TableCell>
                          {hour.is_closed ? (
                            <Badge variant="destructive">
                              Closed
                            </Badge>
                          ) : (
                            <Badge variant="default">Open</Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="self-stretch">
          <div className="border border-gray-200 h-full p-4 rounded-lg ">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Contact Us
            </h2>
            <div className="max-w-2xl mx-auto">
              <div className="grid grid-cols-1 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Get in Touch</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="w-5 h-5" />
                      <span>{profile.phone_number}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-5 h-5" />
                      <span>{profile.restaurant_email}</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Follow Us</CardTitle>
                  </CardHeader>
                  <CardContent className="flex  gap-4">
                    <Button variant="outline" size="icon">
                      <Facebook className="w-5 h-5" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Instagram className="w-5 h-5" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Twitter className="w-5 h-5" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
