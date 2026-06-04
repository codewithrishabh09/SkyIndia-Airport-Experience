import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Crown,
  Users,
  Luggage,
  Car,
  Accessibility,
  HeartPulse,
} from 'lucide-react'
import { fetchServices } from '@/services/api'
import { SectionHeading } from '@/components/common/SectionHeading'
import { AirportCard } from '@/components/airport/AirportCard'
import { ServiceComparison } from '@/components/airport/ServiceComparison'
import { BookingModal } from '@/components/booking/BookingModal'
import { Skeleton } from '@/components/ui/skeleton'

const ICONS: Record<string, React.ReactNode> = {
  Crown: <Crown className="h-6 w-6" />,
  Users: <Users className="h-6 w-6" />,
  Luggage: <Luggage className="h-6 w-6" />,
  Car: <Car className="h-6 w-6" />,
  Accessibility: <Accessibility className="h-6 w-6" />,
  HeartPulse: <HeartPulse className="h-6 w-6" />,
}

export default function AirportServices() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [selectedService, setSelectedService] = useState('')

  const { data: services = [], isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: fetchServices,
  })

  const openBooking = (title: string) => {
    setSelectedService(title)
    setBookingOpen(true)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <SectionHeading
        eyebrow="Concierge"
        title="Airport Services"
        subtitle="Premium assistance from curb to aircraft and back."
        align="left"
      />

      {isLoading ? (
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-stagger>
          {services.map((s, i) => (
            <div
              key={s.id}
              onClick={() => openBooking(s.title)}
              onKeyDown={(e) => e.key === 'Enter' && openBooking(s.title)}
              role="button"
              tabIndex={0}
              className="cursor-pointer"
            >
              <AirportCard
                title={s.title}
                description={s.description}
                price={s.price}
                index={i}
                icon={ICONS[s.icon] ?? <Crown className="h-6 w-6" />}
              />
            </div>
          ))}
        </div>
      )}

      <div className="mt-20">
        <SectionHeading title="Compare Services" subtitle="Choose the right level of care." />
        <ServiceComparison />
      </div>

      <BookingModal
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        serviceTitle={selectedService}
      />
    </div>
  )
}
