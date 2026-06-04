import { Modal } from '@/components/ui/modal'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast'

interface BookingModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  serviceTitle: string
}

export function BookingModal({
  open,
  onOpenChange,
  serviceTitle,
}: BookingModalProps) {
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast(`${serviceTitle} booking confirmed (demo)`, 'success')
    onOpenChange(false)
  }

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={`Book ${serviceTitle}`}
      description="Complete the form below. "
    >
      <form onSubmit={handleSubmit} className="space-y-4 mt-2">
        <div>
          <label className="text-xs text-sky-500">Full Name</label>
          <Input required placeholder="Your name" className="mt-1" />
        </div>
        <div>
          <label className="text-xs text-sky-500">Flight Number</label>
          <Input required placeholder="SI101" className="mt-1" />
        </div>
        <div>
          <label className="text-xs text-sky-500">Date & Time</label>
          <Input type="datetime-local" required className="mt-1" />
        </div>
        <div>
          <label className="text-xs text-sky-500">Phone</label>
          <Input required placeholder="+91" className="mt-1" />
        </div>
        <Button type="submit" className="w-full">
          Confirm Booking
        </Button>
      </form>
    </Modal>
  )
}
