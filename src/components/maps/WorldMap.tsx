import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface FlightRoute {
  id: string
  from: { lat: number; lng: number; code: string }
  to: { lat: number; lng: number; code: string }
  progress: number
}

const ROUTES: FlightRoute[] = [
  {
    id: '1',
    from: { lat: 28.5562, lng: 77.1, code: 'DEL' },
    to: { lat: 19.0896, lng: 72.8656, code: 'BOM' },
    progress: 0.65,
  },
  {
    id: '2',
    from: { lat: 12.9716, lng: 77.5946, code: 'BLR' },
    to: { lat: 25.2532, lng: 55.3657, code: 'DXB' },
    progress: 0.4,
  },
]

function latLngToXY(
  lat: number,
  lng: number,
  width: number,
  height: number
) {
  const x = ((lng + 180) / 360) * width
  const y = ((90 - lat) / 180) * height
  return { x, y }
}

interface WorldMapProps {
  onSelectFlight?: (id: string) => void
  selectedId?: string
}

export function WorldMap({ onSelectFlight, selectedId }: WorldMapProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const width = 800
  const height = 400

  useEffect(() => {
    const interval = setInterval(() => {
      ROUTES.forEach((r) => {
        r.progress = (r.progress + 0.002) % 1
      })
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative glass rounded-2xl overflow-hidden aspect-[2/1]">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width={width} height={height} fill="#0f172a" />
        <rect width={width} height={height} fill="url(#mapGlow)" />

        {/* Grid */}
        {Array.from({ length: 9 }, (_, i) => (
          <line
            key={`h${i}`}
            x1={0}
            y1={(i * height) / 8}
            x2={width}
            y2={(i * height) / 8}
            stroke="#1e293b"
            strokeWidth={0.5}
          />
        ))}
        {Array.from({ length: 17 }, (_, i) => (
          <line
            key={`v${i}`}
            x1={(i * width) / 16}
            y1={0}
            x2={(i * width) / 16}
            y2={height}
            stroke="#1e293b"
            strokeWidth={0.5}
          />
        ))}

        {ROUTES.map((route) => {
          const from = latLngToXY(route.from.lat, route.from.lng, width, height)
          const to = latLngToXY(route.to.lat, route.to.lng, width, height)
          const midX = (from.x + to.x) / 2
          const midY = Math.min(from.y, to.y) - 40
          const path = `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`

          const t = route.progress
          const planeX =
            (1 - t) * (1 - t) * from.x + 2 * (1 - t) * t * midX + t * t * to.x
          const planeY =
            (1 - t) * (1 - t) * from.y + 2 * (1 - t) * t * midY + t * t * to.y

          return (
            <g
              key={route.id}
              onClick={() => onSelectFlight?.(route.id)}
              className="cursor-pointer"
            >
              <motion.path
                d={path}
                fill="none"
                stroke={selectedId === route.id ? '#fbbf24' : '#38bdf8'}
                strokeWidth={selectedId === route.id ? 2.5 : 1.5}
                strokeDasharray="6 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2 }}
                opacity={0.7}
              />
              <text
                x={from.x}
                y={from.y - 10}
                fill="#94a3b8"
                fontSize={10}
                textAnchor="middle"
              >
                {route.from.code}
              </text>
              <g transform={`translate(${planeX}, ${planeY})`}>
                <polygon
                  points="0,-6 12,0 0,6"
                  fill={selectedId === route.id ? '#fbbf24' : '#38bdf8'}
                />
              </g>
            </g>
          )
        })}
      </svg>
      <div className="absolute bottom-4 left-4 glass px-3 py-2 rounded-lg text-xs text-sky-400">
        Live radar simulation · Click route for details
      </div>
    </div>
  )
}
