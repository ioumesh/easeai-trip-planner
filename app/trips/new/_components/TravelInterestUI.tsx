"use client";
import React, { useState } from 'react'

type Interest = {
  id: number;
  title: string;
  icon: string;
}

export const INTERESTS: Interest[] = [
  { id: 1, title: 'Sightseeing', icon: '🏛️' },
  { id: 2, title: 'Adventure', icon: '🧗' },
  { id: 3, title: 'Cultural', icon: '🎭' },
  { id: 4, title: 'Food', icon: '🍜' },
  { id: 5, title: 'Nightlife', icon: '🎶' },
  { id: 6, title: 'Relaxation', icon: '🌿' },
]

const TravelInterestUI = ({ onConfirm }: { onConfirm?: (values: string[]) => void }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (title: string) => {
    setSelected((prev) => prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]);
  }

  return (
    <div className="border rounded-xl p-4 bg-card/40">
      <h3 className="font-semibold">What are your travel interests?</h3>
      <p className="text-xs text-muted-foreground mb-3">Pick a few so I can tailor the itinerary.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {INTERESTS.map((i) => {
          const isActive = selected.includes(i.title);
          return (
            <button
              type="button"
              key={i.id}
              className={`flex items-center gap-2 border rounded-xl px-3 py-2 text-sm transition-colors bg-card/40 hover:bg-card/70 ${isActive ? 'border-primary ring-1 ring-primary/40' : ''}`}
              onClick={() => toggle(i.title)}
            >
              <span className="text-lg select-none">{i.icon}</span>
              <span className="truncate">{i.title}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex justify-end">
        <button
          type="button"
          className="px-4 py-2 rounded-full bg-primary text-primary-foreground"
          onClick={() => onConfirm?.(selected)}
        >
          Confirm
        </button>
      </div>
    </div>
  )
}

export default TravelInterestUI


