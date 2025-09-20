/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRouter } from "next/navigation";

export function PopularDestination() {
  const router = useRouter();
  return (
    <div className="w-full h-full py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between gap-4">
          <div className="w-full text-center md:text-left">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground font-sans tracking-tight">
              <span className="text-primary">Popular</span> destinations
            </h2>
            <p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl md:max-w-3xl mx-auto md:mx-0">
              Explore handpicked places travelers love.
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-2 md:px-4 mt-6 md:mt-8">
        <Carousel className="w-full" opts={{ align: "center", loop: true }}>
          <CarouselContent className="-ml-4">
            {data.map((card) => (
              <CarouselItem
                key={card.src}
                className="pl-4 basis-[80%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div
                  className="relative h-72 md:h-96 rounded-3xl overflow-hidden cursor-pointer"
                  role="button"
                  aria-label={`Open ${card.title}`}
                  onClick={() => router.push(card.href)}
                >
                  <img
                    src={card.src}
                    alt={card.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white/90 text-xs md:text-sm">{card.category}</p>
                    <h3 className="mt-1 text-white text-lg md:text-2xl font-semibold">
                      {card.title}
                    </h3>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:inline-flex" />
          <CarouselNext className="hidden md:inline-flex" />
        </Carousel>
      </div>
    </div>
  );
}

// no modal content needed for simplified carousel

const data = [
    {
      "category": "Paris, France",
      "title": "Explore the City of Lights – Eiffel Tower, Louvre & more",
      "src": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2600&auto=format&fit=crop",
      "href": "/destinations/paris"
    },
    {
      "category": "New York, USA",
      "title": "Experience NYC – Times Square, Central Park, Broadway",
      "src": "https://plus.unsplash.com/premium_photo-1661954654458-c673671d4a08?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "href": "/destinations/new-york"
    },
    {
      "category": "Tokyo, Japan",
      "title": "Discover Tokyo – Shibuya, Cherry Blossoms, Temples",
      "src": "https://images.unsplash.com/photo-1522547902298-51566e4fb383?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "href": "/destinations/tokyo"
    },
    {
      "category": "Rome, Italy",
      "title": "Walk through History – Colosseum, Vatican, Roman Forum",
      "src": "https://plus.unsplash.com/premium_photo-1675975678457-d70708bf77c8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "href": "/destinations/rome"
    },
    {
      "category": "Dubai, UAE",
      "title": "Luxury and Innovation – Burj Khalifa, Desert Safari",
      "src": "https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "href": "/destinations/dubai"
    },
    {
      "category": "India",
      "title": "Harbour Views – Opera House, Bondi Beach & Wildlife",
      "src": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "href": "/destinations/india"
    }
  ]
  
            

export default PopularDestination;