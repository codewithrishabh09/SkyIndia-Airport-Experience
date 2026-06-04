import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ZoomIn, ZoomOut } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const POIS = [
  { id: 'g12', name: 'Gate 12', type: 'gate', x: 70, y: 30 },
  { id: 'g28', name: 'Gate 28', type: 'gate', x: 75, y: 55 },
  { id: 'lounge', name: 'SkyIndia First Lounge', type: 'lounge', x: 40, y: 40 },
  { id: 'food', name: 'Masala Kitchen', type: 'restaurant', x: 55, y: 65 },
  { id: 'shop', name: 'Duty Free Plaza', type: 'shop', x: 30, y: 60 },
  { id: 'rest', name: 'Restrooms Block B', type: 'restroom', x: 50, y: 25 },
]

export default function TerminalGuide() {
  const [zoom, setZoom] = useState(1)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<string | null>(null)
  const [path, setPath] = useState<string[]>([])

  const filtered = POIS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  const findPath = (targetId: string) => {
    setSelected(targetId)
    setPath(['Entrance', 'Security', 'Concourse B', POIS.find((p) => p.id === targetId)?.name ?? ''])
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <SectionHeading
        eyebrow="Navigation"
        title="Terminal Guide"
        subtitle="Interactive map for DEL Terminal 3 — zoom, search, and find shortest path."
        align="left"
      />

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 glass rounded-2xl overflow-hidden relative min-h-[400px]">
          <div className="absolute top-4 left-4 right-4 z-10 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-sky-500" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search gates, shops, lounges..."
                className="pl-10"
              />
            </div>
            <Button variant="glass" size="icon" onClick={() => setZoom((z) => Math.min(2, z + 0.2))}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="glass" size="icon" onClick={() => setZoom((z) => Math.max(0.6, z - 0.2))}>
              <ZoomOut className="h-4 w-4" />
            </Button>
          </div>

          <motion.div
            className="absolute inset-0 p-8 pt-20"
            style={{ scale: zoom }}
          >
            <svg viewBox="0 0 100 80" className="w-full h-full min-h-[360px]">
              <rect width="100" height="80" fill="#0f172a" rx="2" />
              <rect x="5" y="10" width="90" height="60" fill="none" stroke="#334155" strokeWidth="0.5" />
              <text x="50" y="8" textAnchor="middle" fill="#64748b" fontSize="3">
                DEL T3 — Departure
              </text>
              {path.length > 1 && (
                <motion.path
                  d="M 15 70 L 35 50 L 55 45 L 70 35"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="0.8"
                  strokeDasharray="2 1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                />
              )}
              {filtered.map((poi) => (
                  <g
                    key={poi.id}
                    onClick={() => findPath(poi.id)}
                    className="cursor-pointer"
                  >
                    <text
                      x={poi.x}
                      y={poi.y + 6}
                      textAnchor="middle"
                      fill={selected === poi.id ? '#fbbf24' : '#94a3b8'}
                      fontSize="2.5"
                    >
                      {poi.name}
                    </text>
                  </g>
              ))}
            </svg>
          </motion.div>
        </div>

        <div className="lg:w-80 space-y-4">
          <h3 className="font-display text-lg">Locations</h3>
          {filtered.map((poi) => (
            <button
              key={poi.id}
              type="button"
              onClick={() => findPath(poi.id)}
              className={cn(
                'w-full text-left glass rounded-xl p-4 hover:border-accent/30 transition-colors',
                selected === poi.id && 'border-accent/50 bg-accent/5'
              )}
            >
              <p className="font-medium">{poi.name}</p>
              <p className="text-xs text-sky-500 capitalize">{poi.type}</p>
            </button>
          ))}
          {path.length > 0 && (
            <div className="glass rounded-xl p-4 mt-6">
              <p className="text-sm text-accent font-medium mb-2">Shortest Path</p>
              <ol className="text-sm text-sky-400 space-y-1">
                {path.map((step, i) => (
                  <li key={i}>
                    {i + 1}. {step}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
