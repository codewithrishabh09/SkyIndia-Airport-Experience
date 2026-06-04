import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/components/ui/toast'

export default function Contact() {
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast('Message sent! We will respond shortly (demo).', 'success')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <SectionHeading
        eyebrow="Get in Touch"
        title="Contact"
        subtitle="Reach our concierge team for premium airport services."
        align="left"
      />

      <div className="grid lg:grid-cols-2 gap-12">
        <motion.form
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-8 space-y-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-sky-500">First Name</label>
              <Input required className="mt-1" />
            </div>
            <div>
              <label className="text-xs text-sky-500">Last Name</label>
              <Input required className="mt-1" />
            </div>
          </div>
          <div>
            <label className="text-xs text-sky-500">Email</label>
            <Input type="email" required className="mt-1" />
          </div>
          <div>
            <label className="text-xs text-sky-500">Subject</label>
            <Input required className="mt-1" />
          </div>
          <div>
            <label className="text-xs text-sky-500">Message</label>
            <textarea
              required
              rows={5}
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-sky-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            />
          </div>
          <Button type="submit" className="w-full">
            <Send className="h-4 w-4" />
            Send Message
          </Button>
        </motion.form>

        <div className="space-y-6">
          {[
            { icon: MapPin, title: 'Headquarters', text: 'IGI Airport Terminal 3, New Delhi 110037' },
            { icon: Phone, title: 'Phone', text: '+91 1800 2333 4444' },
            { icon: Mail, title: 'Email', text: 'skyindiaexplore@gmail.com' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card>
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-accent/10">
                    <item.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sky-400 text-sm mt-1">{item.text}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          <div className="glass rounded-2xl aspect-video flex items-center justify-center text-sky-500 text-sm">
            Map embed placeholder · Delhi T3
          </div>
        </div>
      </div>
    </div>
  )
}
