"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export interface TeamMember {
  src: string | null;
  title: string;
  designation: string;
}

interface Gallery27CarouselProps {
  members: TeamMember[];
  className?: string;
}

export const Gallery27Carousel = ({ members, className }: Gallery27CarouselProps) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container bg-stone-200/50 ">
        <p className="py-3 text-sm font-medium text-yellow-500 text-center uppercase tracking-wider mb-2">unser Team</p>
        <h1 className="font-black text-4xl lg:text-6xl">Das Team hinter dem Erfolg von Viconia Care GmbH</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magnam veniam, quis
          nostrud exercitation ullamco laboris nisi ut aliqui
        </p>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="relative w-full pt-15"
        >
          <div className="z-10 absolute top-0 right-0 flex h-12 w-20 items-center justify-end gap-2">
            <CarouselPrevious
              variant="default"
              className="absolute left-0 rounded-none"
            />
            <CarouselNext
              variant="default"
              className="absolute right-0 rounded-none"
            />
          </div>
          <CarouselContent>
            {members.map((member, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                <div className="group">
                  {member.src ? (
                    <img
                      src={member.src}
                      alt={member.title}
                      className="h-92 w-full object-cover transition-all duration-300 group-hover:-translate-y-2.5"
                    />
                  ) : (
                    <div className="h-92 w-full bg-stone-300 flex items-center justify-center text-4xl font-bold text-stone-500">
                      {member.title.split(" ").map((w) => w[0]).join("").toUpperCase()}
                    </div>
                  )}
                  <h3 className="mt-4 text-2xl font-semibold">{member.title}</h3>
                  <p className="text-muted-foreground">{member.designation}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};
