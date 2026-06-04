import { motion } from 'framer-motion'
import { Plane, Clock, ArrowRight } from 'lucide-react'
import type { Flight } from '@/services/api'
import { formatCurrency, formatDuration, cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/components/ui/toast'

interface FlightCardProps {
  flight: Flight
  index?: number
}

const statusColors: Record<string, string> = {
  'On Time': 'text-emerald bg-emerald/10',
  Boarding: 'text-accent bg-accent/10',
  Delayed: 'text-rose bg-rose/10',
}

export function FlightCard({ flight, index = 0 }: FlightCardProps) {
  const { toast } = useToast()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      data-stagger-item
    >
      <Card className="group hover:border-accent/30 transition-colors">
        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row">
            <div className="flex items-center gap-4 p-6 border-b lg:border-b-0 lg:border-r border-white/10">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-accent/30 to-gold/20 flex items-center justify-center font-accent font-bold text-accent">
                {flight.logo}
              </div>
              <div>
                <p className="font-medium text-sky-100">{flight.airline}</p>
                <p className="text-xs text-sky-500">{flight.id} · {flight.class}</p>
                <span
                  className={cn(
                    'inline-block mt-2 text-xs px-2 py-0.5 rounded-full',
                    statusColors[flight.status] ?? 'text-sky-400 bg-white/5'
                  )}
                >
                  {flight.status}
                </span>
              </div>
            </div>

            <div className="flex-1 flex flex-col sm:flex-row items-center justify-between gap-6 p-6">
              <div className="flex items-center gap-6 w-full sm:w-auto justify-center">
                <div className="text-center">
                  <p className="text-2xl font-semibold">{flight.from.time}</p>
                  <p className="text-sm text-sky-400">{flight.from.code}</p>
                  <p className="text-xs text-sky-500">{flight.from.city}</p>
                </div>
                <div className="flex flex-col items-center gap-1 min-w-[120px]">
                  <div className="flex items-center gap-2 text-xs text-sky-500">
                    <Clock className="h-3 w-3" />
                    {formatDuration(flight.duration)}
                  </div>
                  <div className="relative w-full flex items-center">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
                    <Plane className="h-4 w-4 text-accent mx-2 rotate-90" />
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
                  </div>
                  {flight.layovers > 0 && (
                    <span className="text-xs text-gold">
                      {flight.layovers} stop{flight.layovers > 1 ? 's' : ''}
                    </span>
                  )}
                  {flight.layovers === 0 && (
                    <span className="text-xs text-emerald">Non-stop</span>
                  )}
                </div>
                <div className="text-center">
                  <p className="text-2xl font-semibold">{flight.to.time}</p>
                  <p className="text-sm text-sky-400">{flight.to.code}</p>
                  <p className="text-xs text-sky-500">{flight.to.city}</p>
                </div>
              </div>

              <div className="flex flex-col items-center sm:items-end gap-3 w-full sm:w-auto">
                <p className="text-2xl font-display font-semibold text-gold">
                  {formatCurrency(flight.price)}
                </p>
                <Button
                  onClick={() =>
                    toast("Your seat is saved — ready for takeoff!", 'success')
                  }
                  className="w-full sm:w-auto group/btn"
                >
                  Book Now
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
