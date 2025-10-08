"use client";
import React from "react";
import Link from "next/link";

export default function TripsIndexPage() {
  return (
    <div className="p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-semibold">My Trips</h1>
          <Link href="/trips/new" className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-white hover:opacity-90">
            Create New Trip
          </Link>
        </div>

        {/* Dummy trips grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1,2,3].map((id) => (
            <Link key={id} href={`/trips/${id}`} className="group rounded-xl overflow-hidden border hover:shadow-md transition-shadow">
              <div className="relative h-40 bg-muted">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-90" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="text-sm text-white/90">City Escape {id}</div>
                  <div className="text-xs text-white/70">3 days • Budget: $ {id * 250}</div>
                </div>
              </div>
              <div className="p-4 text-sm text-muted-foreground">
                Explore top sights, food spots, and relaxed walks. Itinerary auto-generated.
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}


