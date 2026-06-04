import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Radio, Clock, MapPin } from 'lucide-react'
import { WorldMap } from '@/components/maps/WorldMap'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Timeline, type TimelineItem } from '@/components/common/Timeline'
import { Card, CardContent } from '@/components/ui/card'

const FLIGHT_DETAILS: Record<
  string,
  { flight: string; route: string; altitude: string; speed: string; timeline: TimelineItem[] }
> = {
  '1': {
    flight: 'SkyIndia SI101',
    route: 'DEL → BOM',
    altitude: '35,000 ft',
    speed: '840 km/h',
    timeline: [
      { time: '06:00', title: 'Pushback', status: 'completed' },
      { time: '06:30', title: 'Takeoff DEL', status: 'completed' },
      { time: '07:45', title: 'Cruising', status: 'current', description: 'Over Rajasthan' },
      { time: '08:45', title: 'Landing BOM', status: 'upcoming' },
    ],
  },
  '2': {
    flight: 'SkyIndia SI204',
    route: 'BLR → DXB',
    altitude: '38,200 ft',
    speed: '890 km/h',
    timeline: [
      { time: '14:00', title: 'Departed BLR', status: 'completed' },
      { time: '15:30', title: 'Over Arabian Sea', status: 'current' },
      { time: '17:40', title: 'Arrive DXB', status: 'upcoming' },
    ],
  },
}

export default function FlightTracker() {
  const [selectedId, setSelectedId] = useState('1')
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 3000)
    return () => clearInterval(interval)
  }, [])

  const detail = FLIGHT_DETAILS[selectedId] ?? FLIGHT_DETAILS['1']

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <SectionHeading
        eyebrow="Live"
        title="Flight Tracker"
        subtitle="Interactive world map with animated flight routes."
        align="left"
      />

      <div className="flex items-center gap-2 mb-6 glass inline-flex px-4 py-2 rounded-full text-sm text-emerald">
        <Radio className="h-4 w-4 animate-pulse" />
        Simulated live updates · refresh #{tick}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <WorldMap selectedId={selectedId} onSelectFlight={setSelectedId} />
        </div>
        <motion.div
          key={selectedId}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="font-display text-xl font-semibold">{detail.flight}</h3>
              <p className="text-accent mt-1">{detail.route}</p>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="glass rounded-xl p-4">
                  <p className="text-xs text-sky-500">Altitude</p>
                  <p className="font-semibold">{detail.altitude}</p>
                </div>
                <div className="glass rounded-xl p-4">
                  <p className="text-xs text-sky-500">Speed</p>
                  <p className="font-semibold">{detail.speed}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 text-sm text-sky-400">
                <MapPin className="h-4 w-4 text-accent" />
                Click routes on map to switch flights
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-4 w-4 text-accent" />
                <h4 className="font-medium">Flight Timeline</h4>
              </div>
              <Timeline items={detail.timeline} />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
