import React from 'react'

type BudgetOption = {
  id: number;
  title: string;
  desc: string;
  icon: string;
  color: string; // Tailwind bg/text classes
}

export const SelectBudgetOptions: BudgetOption[] = [
  {
    id: 1,
    title: 'Cheap',
    desc: 'Stay conscious of costs',
    icon: '🪙',
    color: 'bg-green-100 text-green-600',
  },
  {
    id: 2,
    title: 'Moderate',
    desc: 'Keep cost on the average side',
    icon: '💰',
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    id: 3,
    title: 'Luxury',
    desc: "Don't worry about cost",
    icon: '💎',
    color: 'bg-purple-100 text-purple-600',
  },
]

const BudgetUI = ({ handleBudgetClick }: { handleBudgetClick?: (budget: string) => void }) => {
  return (
    <div className="border rounded-xl p-4 bg-card/40">
      <h3 className="font-semibold">Select your budget</h3>
      <p className="text-xs text-muted-foreground mb-3">This helps tailor stay, travel and activities.</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {SelectBudgetOptions.map((opt) => (
          <div
            key={opt.id}
            className="flex items-start gap-3 border rounded-xl p-3 cursor-pointer hover:border-primary transition-colors bg-card/40 hover:bg-card/70"
            onClick={() => handleBudgetClick?.(opt.title)}
          >
            <span className="text-xl leading-none select-none">
              {opt.icon}
            </span>
            <div className="flex-1">
              <h3 className="font-medium tracking-tight flex items-center gap-2">
                {opt.title}
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${opt.color}`}>{opt.title}</span>
              </h3>
              <p className="text-xs text-muted-foreground">{opt.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BudgetUI