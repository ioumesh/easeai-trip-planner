"use client";
import React, { useState } from 'react'
import { MapPin, ArrowRightLeft } from "lucide-react";

const LocationUI = ({ onConfirm }: { onConfirm?: (from: string, to: string) => void }) => {
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");

  const swap = () => {
    setFrom(to);
    setTo(from);
  }

  const canConfirm = from.trim().length > 0 && to.trim().length > 0;

  return (
    <div className="border rounded-xl p-4 bg-card/40">
      <h3 className="font-semibold text-center">Where are you traveling from and to?</h3>
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 items-end">
        <div className="flex items-center gap-2 border rounded-xl p-2.5 bg-card/40">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={from}
            onChange={(e)=>setFrom(e.target.value)}
            placeholder="Starting location (e.g., Delhi)"
            className="w-full bg-transparent outline-none text-sm"
          />
        </div>
        <button
          type="button"
          onClick={swap}
          className="h-10 w-10 rounded-full border hover:bg-card/70 hover:border-primary mx-auto flex items-center justify-center"
          aria-label="Swap locations"
        >
          <ArrowRightLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2 border rounded-xl p-2.5 bg-card/40">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={to}
            onChange={(e)=>setTo(e.target.value)}
            placeholder="Destination (e.g., Goa)"
            className="w-full bg-transparent outline-none text-sm"
          />
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <button
          type="button"
          disabled={!canConfirm}
          onClick={()=>canConfirm && onConfirm?.(from.trim(), to.trim())}
          className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground disabled:opacity-60"
        >
          Confirm
        </button>
      </div>
    </div>
  )
}

export default LocationUI


