import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Users, Calendar, ArrowLeftRight } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { MagneticButton } from '@/components/common/MagneticButton'

interface SearchFormProps {
  compact?: boolean
  onSearch?: () => void
}

export function SearchForm({ compact = false, onSearch }: SearchFormProps) {
  const navigate = useNavigate()
  const [trip, setTrip] = useState('round')
  const [passengers, setPassengers] = useState(1)
  const [travelClass, setTravelClass] = useState('Economy')
  const [from, setFrom] = useState('DEL')
  const [to, setTo] = useState('BOM')
  const [searching, setSearching] = useState(false)

  const handleSearch = async () => {
    setSearching(true)
    onSearch?.()
    await new Promise((r) => setTimeout(r, 800))
    setSearching(false)
    navigate('/flights')
  }

  const swap = () => {
    setFrom(to)
    setTo(from)
  }

  return (
    <motion.div
      className={`glass-strong rounded-2xl ${compact ? 'p-4' : 'p-6 md:p-8'} shadow-2xl`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Tabs value={trip} onValueChange={setTrip}>
        <TabsList className="mb-6 w-full justify-start">
          <TabsTrigger value="oneway">One Way</TabsTrigger>
          <TabsTrigger value="round">Round Trip</TabsTrigger>
          <TabsTrigger value="multi">Multi City</TabsTrigger>
        </TabsList>

        <TabsContent value={trip} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <label htmlFor="from-input" className="text-xs text-sky-500 mb-1 block">From</label>
              <Input
                id="from-input"
                value={from}
                onChange={(e) => setFrom(e.target.value.toUpperCase())}
                placeholder="Airport code"
              />
            </div>
            <div className="relative">
              <label htmlFor="to-input" className="text-xs text-sky-500 mb-1 block">To</label>
              <div className="flex gap-2">
                <Input
                  id="to-input"
                  value={to}
                  onChange={(e) => setTo(e.target.value.toUpperCase())}
                  placeholder="Airport code"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="glass"
                  size="icon"
                  onClick={swap}
                  className="shrink-0 mt-auto"
                >
                  <ArrowLeftRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <label htmlFor="depart-date" className="text-xs text-sky-500 mb-1 block">Depart</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-sky-500" />
                <Input id="depart-date" type="date" className="pl-10" defaultValue="2026-06-15" />
              </div>
            </div>
            {trip === 'round' && (
              <div>
                <label htmlFor="return-date" className="text-xs text-sky-500 mb-1 block">Return</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-sky-500" />
                  <Input id="return-date" type="date" className="pl-10" defaultValue="2026-06-22" />
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-4 items-end">
            <div>
              <label className="text-xs text-sky-500 mb-1 block">Passengers</label>
              <div className="flex items-center gap-2 glass rounded-xl px-3 h-11">
                <Users className="h-4 w-4 text-sky-500" />
                <button
                  type="button"
                  className="px-2 text-lg"
                  onClick={() => setPassengers((p) => Math.max(1, p - 1))}
                >
                  −
                </button>
                <span className="w-8 text-center">{passengers}</span>
                <button
                  type="button"
                  className="px-2 text-lg"
                  onClick={() => setPassengers((p) => Math.min(9, p + 1))}
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="class-select" className="text-xs text-sky-500 mb-1 block">Class</label>
              <select
                id="class-select"
                title="Select Travel Class"
                value={travelClass}
                onChange={(e) => setTravelClass(e.target.value)}
                className="h-11 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-sky-100"
              >
                {['Economy', 'Premium Economy', 'Business', 'First'].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <MagneticButton className="ml-auto w-full md:w-auto">
              <Button
                size="lg"
                className="w-full md:w-auto min-w-[200px]"
                onClick={handleSearch}
                disabled={searching}
              >
                {searching ? (
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                  >
                    Searching...
                  </motion.span>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    Search Flights
                  </>
                )}
              </Button>
            </MagneticButton>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
