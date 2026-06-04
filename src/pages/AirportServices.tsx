import { useState } from 'react'
import { AirportServicesHub } from '@/components/airport/AirportServicesHub'
import { BookingModal } from '@/components/booking/BookingModal'

export default function AirportServices() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [selectedService, setSelectedService] = useState('')

  const openBooking = (title: string) => {
    setSelectedService(title)
    setBookingOpen(true)
  }

  return (
    <div className="min-h-screen bg-sky-950">
      <AirportServicesHub onBook={openBooking} />

      <BookingModal
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        serviceTitle={selectedService}
      />
    </div>
  )
}
