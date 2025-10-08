"use client";
import React from "react";
import Image from "next/image";
import ChatBox from "./_components/ChatBox";

export default function NewTripPage() {
  return (
  <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-4">
    <div><ChatBox /></div>
    <div>
      <div className="relative h-[360px] md:h-full rounded-xl overflow-hidden">
        <Image
          src="/hero-travel.png"
          alt="Scenic travel destination"
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover brightness-90"
        />
        {/* Vignette mask */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_45%,rgba(0,0,0,0.65)_100%)]"></div>
        {/* Bottom gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        {/* Text panel */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-md bg-black/35 backdrop-blur-sm ring-1 ring-white/10 rounded-lg p-4 text-white drop-shadow-md">
            <h2 className="text-2xl md:text-3xl font-semibold">Visualize your next getaway</h2>
            <p className="mt-2 text-sm md:text-base text-white/90">Your trip map, day plans, and highlights will appear here.</p>
            <div className="mt-4 flex flex-wrap gap-2 text-[11px] md:text-xs">
              <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur">Smart itinerary</span>
              <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur">Budget-aware</span>
              <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur">Local gems</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}


