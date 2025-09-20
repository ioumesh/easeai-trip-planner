"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NewTripPage() {
  return (
    <div className="px-4 sm:px-6 md:px-8 py-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Create New Trip</h1>
        <Link href="/">
          <Button variant="outline" size="sm">Back</Button>
        </Link>
      </div>
      <div className="border rounded-xl p-4 sm:p-6">
        <p className="text-sm sm:text-base text-muted-foreground">
          This is a placeholder for your trip creation flow. Add trip details
          form here.
        </p>
      </div>
    </div>
  );
}


