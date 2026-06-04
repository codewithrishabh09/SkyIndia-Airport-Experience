import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ServiceRow {
  feature: string
  vip: boolean
  meet: boolean
  standard: boolean
}

const rows: ServiceRow[] = [
  { feature: 'Fast-track security', vip: true, meet: true, standard: false },
  { feature: 'Personal escort', vip: true, meet: true, standard: false },
  { feature: 'Lounge access', vip: true, meet: false, standard: false },
  { feature: 'Baggage porter', vip: true, meet: true, standard: false },
  { feature: 'Ground transfer', vip: true, meet: false, standard: true },
]

function Cell({ value }: { value: boolean }) {
  return value ? (
    <Check className="h-5 w-5 text-emerald mx-auto" />
  ) : (
    <X className="h-5 w-5 text-sky-600 mx-auto" />
  )
}

export function ServiceComparison() {
  return (
    <div className="glass rounded-2xl overflow-hidden overflow-x-auto" data-reveal>
      <table className="w-full min-w-[500px] text-sm">
        <thead>
          <tr className="border-b border-white/10">
            <th className="p-4 text-left text-sky-400 font-medium">Feature</th>
            <th className="p-4 text-center text-gold">VIP</th>
            <th className="p-4 text-center text-accent">Meet & Greet</th>
            <th className="p-4 text-center text-sky-300">Standard</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.feature}
              className={cn(
                'border-b border-white/5',
                i % 2 === 0 && 'bg-white/[0.02]'
              )}
            >
              <td className="p-4 text-sky-200">{row.feature}</td>
              <td className="p-4">
                <Cell value={row.vip} />
              </td>
              <td className="p-4">
                <Cell value={row.meet} />
              </td>
              <td className="p-4">
                <Cell value={row.standard} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
