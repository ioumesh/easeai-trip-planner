import React from 'react'

const FinalUI = ({ onViewTrip }: { onViewTrip?: () => void }) => {
  return (
    <div className="border rounded-xl p-4 bg-card/40">
      <div className="text-center">
        <div className="mx-auto mb-2 size-10 rounded-full bg-primary/10 flex items-center justify-center">🧭</div>
        <h3 className="font-semibold">Planning your dream trip...</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Gathering best destinations, activities, and travel details for you.
        </p>
      </div>
      <div className="mt-4 flex justify-center">
        <button
          type="button"
          className="px-4 py-2 rounded-full bg-primary text-primary-foreground shadow-sm"
          onClick={onViewTrip}
        >
          View Trip
        </button>
      </div>
    </div>
  )
}

export default FinalUI


