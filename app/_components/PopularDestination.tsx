/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function PopularDestination() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 font-sans">
              Popular destinations
            </h2>
            <p className="mt-2 text-sm md:text-base text-neutral-600 dark:text-neutral-300">
              Explore handpicked places travelers love. Tap a card to learn more.
            </p>
          </div>
        </div>
      </div>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-12 rounded-3xl mb-4"
          >
            <p className="text-neutral-700 dark:text-neutral-300 text-base md:text-xl font-sans max-w-3xl mx-auto text-center">
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                Plan smarter, travel better.
              </span>{" "}
              Find highlights, local tips, and the best times to visit. Build an
              itinerary in minutes.
            </p>
            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop"
              alt="Scenic travel inspiration"
              height="500"
              width="800"
              className="mt-6 rounded-2xl h-full w-full mx-auto object-cover"
            />
          </div>
        );
      })}
    </>
  );
};

const data = [
    {
      "category": "Paris, France",
      "title": "Explore the City of Lights – Eiffel Tower, Louvre & more",
      "src": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2600&auto=format&fit=crop",
      "content": "<DummyContent />"
    },
    {
      "category": "New York, USA",
      "title": "Experience NYC – Times Square, Central Park, Broadway",
      "src": "https://plus.unsplash.com/premium_photo-1661954654458-c673671d4a08?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "content": "<DummyContent />"
    },
    {
      "category": "Tokyo, Japan",
      "title": "Discover Tokyo – Shibuya, Cherry Blossoms, Temples",
      "src": "https://images.unsplash.com/photo-1522547902298-51566e4fb383?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "content": "<DummyContent />"
    },
    {
      "category": "Rome, Italy",
      "title": "Walk through History – Colosseum, Vatican, Roman Forum",
      "src": "https://plus.unsplash.com/premium_photo-1675975678457-d70708bf77c8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "content": "<DummyContent />"
    },
    {
      "category": "Dubai, UAE",
      "title": "Luxury and Innovation – Burj Khalifa, Desert Safari",
      "src": "https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "content": "<DummyContent />"
    },
    {
      "category": "India",
      "title": "Harbour Views – Opera House, Bondi Beach & Wildlife",
      "src": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "content": "<DummyContent />"
    }
  ]
  
            

export default PopularDestination;