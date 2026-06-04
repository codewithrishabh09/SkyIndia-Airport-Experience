import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { SearchForm } from '@/components/flight/SearchForm'
import { FlightCard } from '@/components/flight/FlightCard'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Skeleton } from '@/components/ui/skeleton'
import { searchFlights } from '@/services/api'

export default function Flights() {
  const { data: flights = [], isLoading } = useQuery({
    queryKey: ['search-flights'],
    queryFn: () => searchFlights({}),
  })

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <SectionHeading
        eyebrow="Book"
        title="Search Flights"
        subtitle="One way, round trip, or multi-city across India and beyond."
        align="left"
      />
      <SearchForm />
      <div className="mt-16">
        <h2 className="font-display text-2xl mb-6" data-reveal>
          Available Flights
        </h2>
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-40 w-full" />
            ))}
          </div>
        ) : (
          <motion.div className="space-y-4" data-stagger>
            {flights.map((f, i) => (
              <FlightCard key={f.id} flight={f} index={i} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
