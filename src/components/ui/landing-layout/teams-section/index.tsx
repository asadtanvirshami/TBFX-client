"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

import paolo_img from "../../../../../public/assets/team/team.png";

const teamMembers = [
  {
    id: "1",
    name: "Paolo",
    role: "Lead Developer",
    bio: "Expert in full-stack architecture and system design.",
    image: paolo_img,
  },
  {
    id: "2",
    name: "Paolo",
    role: "Product Manager",
    bio: "Drives the product vision and roadmap with precision.",
    image: paolo_img,
  },
  {
    id: "3",
    name: "Paolo",
    role: "UI/UX Designer",
    bio: "Crafts user-centric designs and smooth interfaces.",
    image: paolo_img,
  },
];

export default function TeamSection() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-12">
      <span className="text-4xl space-x-3 flex justify-center md:flex lg:flex md:text-5xl font-extrabold tracking-tight">
        <h1> Meet Our</h1>
        <h1 className="t bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
          Team
        </h1>
      </span>
      <Carousel className="w-full">
        <CarouselContent className="-ml-4">
          {teamMembers.map((member) => (
            <CarouselItem
              key={member.id}
              className="pl-4 basis-full sm:basis-1/2 md:basis-1/3"
            >
              <Card className="h-full">
                <CardHeader>
                  <Image
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-md mb-2"
                  />
                  <CardTitle className="text-base">{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-gray-600 dark:text-gray-300">
                  <p>{member.bio}</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
