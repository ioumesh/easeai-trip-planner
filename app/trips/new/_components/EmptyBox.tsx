
import { suggestions } from '@/app/_components/Hero'
import React from 'react'


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EmptyBox = ({handleSuggestionClick}:any) => {


    return (
    <div className='mt-4 px-3 md:px-4'>
        <h2 className='text-center text-xl md:text-2xl font-bold tracking-tight'>Start planning new <strong className='text-primary'>Trip</strong> using AI</h2>
       <p className='mt-1 text-center text-sm md:text-base text-muted-foreground'>Tell me what you want, and I&apos;ll handle the rest: Flights, Hotels, trip Planner - all in seconds</p>
       <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          {suggestions.map((item, index) => (
            <button
              type="button"
              key={`suggestion${index}`}
              className="flex items-center justify-start border rounded-full px-3.5 py-2 gap-2 hover:bg-primary hover:text-primary-foreground transition-colors select-none text-xs sm:text-sm text-left"
              onClick={() => handleSuggestionClick(item.title)}
            >
              {item.icon}
              <span className="truncate">{item.title}</span>
            </button>
          ))}
        </div>
    </div>
  )
}

export default EmptyBox