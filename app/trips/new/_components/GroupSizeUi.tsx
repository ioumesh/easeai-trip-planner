import React from 'react'

type TravellerOption = {
  id: number;
  title: string;
  desc: string;
  icon: string;
  people: string;
}

export const SelectTravelesList: TravellerOption[] = [
  {
    id: 1,
    title: 'Just Me',
    desc: 'A sole traveles in exploration',
    icon: '✈️',
    people: '1',
  },
  {
    id: 2,
    title: 'A Couple',
    desc: 'Two traveles in tandem',
    icon: '🥂',
    people: '2 People',
  },
  {
    id: 3,
    title: 'Family',
    desc: 'A group of fun loving adv',
    icon: '👨‍👩',
    people: '3 to 5 People',
  },
  {
    id: 4,
    title: 'Friends',
    desc: 'A bunch of thrill-seekes',
    icon: '👯',
    people: '5 to 10 People',
  },
]

const GroupSizeUI = ({handleGroupSizeClick}: { handleGroupSizeClick?: (groupSize: string) => void }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {SelectTravelesList.map((item) => (
        <div
          key={item.id}
          className="flex items-start gap-3 border rounded-xl p-3 cursor-pointer hover:border-primary transition-colors bg-card/40 hover:bg-card/70"
          onClick={() => handleGroupSizeClick?.(item.title+":"+item.people)}
        >
          <span className="text-xl leading-none select-none">{item.icon}</span>
          <div className="flex-1">
            <h3 className="font-medium tracking-tight">{item.title}</h3>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
            <p className="text-xs mt-1">{item.people}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default GroupSizeUI