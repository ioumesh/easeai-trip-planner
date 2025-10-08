"use client";
import React, { useState } from 'react'

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const TripDaysUI = ({
  defaultDays = 7,
  minDays = 1,
  maxDays = 30,
  onConfirm,
}: {
  defaultDays?: number;
  minDays?: number;
  maxDays?: number;
  onConfirm?: (days: number) => void;
}) => {
  const [days, setDays] = useState<number>(clamp(defaultDays, minDays, maxDays));

  const decrement = () => setDays((d) => clamp(d - 1, minDays, maxDays));
  const increment = () => setDays((d) => clamp(d + 1, minDays, maxDays));

  return (
    <div className="border rounded-xl p-4 bg-card/40">
      <h3 className="text-center font-semibold">How many days do you want to travel?</h3>
      <div className="mt-3 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="decrease days"
          onClick={decrement}
          className="h-10 w-10 md:h-11 md:w-11 rounded-full border hover:bg-card/70 hover:border-primary text-lg"
        >
          –
        </button>
        <div className="text-xl md:text-2xl font-semibold select-none min-w-[110px] text-center">
          {days} Days
        </div>
        <button
          type="button"
          aria-label="increase days"
          onClick={increment}
          className="h-10 w-10 md:h-11 md:w-11 rounded-full border hover:bg-card/70 hover:border-primary text-lg"
        >
          +
        </button>
      </div>
      <div className="mt-4 flex justify-center">
        <button
          type="button"
          className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground shadow-sm"
          onClick={() => onConfirm?.(days)}
        >
          Confirm
        </button>
      </div>
    </div>
  )
}

export default TripDaysUI


