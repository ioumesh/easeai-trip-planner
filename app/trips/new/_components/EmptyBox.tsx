
import { suggestions } from '@/app/_components/Hero'
import React from 'react'


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EmptyBox = ({handleSuggestionClick}:any) => {


    return (
    <div className='mt-4'>
        <h2 className='text-center text-xl font-bold'>Start planning new <strong className='text-primary'>Trip</strong> using AI</h2>
       <p className='text-center text-sm text-gray-500'>Tell me what you want, and I&apos;ll handle the rest: Flights, Hotels, trip Planner - all in seconds</p>
       <div className="flex flex-col flex-wrap  gap-5">
          {suggestions.map((item, index) => (
            <div
              key={`suggestion${index}`}
              className="mt-7 flex items-center border rounded-xl p-3 px-3.5 py-2 gap-2 cursor-pointer hover:border-primary transition-colors select-none text-xs sm:text-sm"
              onClick={() => handleSuggestionClick(item.title)}
            >
              {item.icon}
              <h2 className="text-lg">{item.title}</h2>
            </div>
          ))}
        </div>
    </div>
  )
}

export default EmptyBox