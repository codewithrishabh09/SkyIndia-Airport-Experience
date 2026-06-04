import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Sparkles, Wifi, Coffee, ShowerHead } from 'lucide-react'
import { fetchLounges } from '@/services/api'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { formatCurrency } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import roomImage from '@/Gallery/room.jpg'

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  Spa: <Sparkles className="h-4 w-4" />,
  WiFi: <Wifi className="h-4 w-4" />,
  Bar: <Coffee className="h-4 w-4" />,
  Showers: <ShowerHead className="h-4 w-4" />,
}

function getLoungeImage(lounge: { id: string; name: string; image: string }, index: number) {
  if (
    index === 1 ||
    lounge.id === 'horizon-bom' ||
    lounge.name === 'Horizon Business Club'
  ) {
    return roomImage
  }
  return lounge.image
}

export default function Lounges() {
  const [tourOpen, setTourOpen] = useState<string | null>(null)
  const { data: lounges = [], isLoading } = useQuery({
    queryKey: ['lounges'],
    queryFn: fetchLounges,
  })

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <SectionHeading
        eyebrow="Luxury"
        title="Premium Lounges"
        subtitle="Virtual tours, membership plans, and world-class amenities."
        align="left"
      />

      {isLoading ? (
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[500px]" />
          ))}
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {lounges.map((lounge, i) => (
            <motion.div
              key={lounge.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-3xl overflow-hidden group"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <motion.img
                  src={getLoungeImage(lounge, i)}
                  alt={lounge.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6 }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-950 via-transparent to-transparent" />
                <Button
                  variant="glass"
                  size="sm"
                  className="absolute bottom-4 left-4"
                  onClick={() => setTourOpen(lounge.id)}
                >
                  <Play className="h-4 w-4" />
                  Virtual Tour
                </Button>
              </div>
              <div className="p-6">
                <div className="flex justify-between">
                  <h3 className="font-display text-xl">{lounge.name}</h3>
                  <span className="text-gold">★ {lounge.rating}</span>
                </div>
                <p className="text-sm text-sky-500">{lounge.terminal}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {lounge.amenities.map((a) => (
                    <span
                      key={a}
                      className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 text-xs text-sky-300"
                    >
                      {AMENITY_ICONS[a.split(' ')[0]] ?? <Sparkles className="h-4 w-4" />}
                      {a}
                    </span>
                  ))}
                </div>
                <Tabs defaultValue="day" className="mt-6">
                  <TabsList className="w-full">
                    <TabsTrigger value="day" className="flex-1">
                      Day Pass
                    </TabsTrigger>
                    <TabsTrigger value="annual" className="flex-1">
                      Annual
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="day">
                    <p className="text-2xl font-display text-gold mt-2">
                      {formatCurrency(lounge.membership.day)}
                    </p>
                  </TabsContent>
                  <TabsContent value="annual">
                    <p className="text-2xl font-display text-gold mt-2">
                      {formatCurrency(lounge.membership.annual)}
                    </p>
                  </TabsContent>
                </Tabs>
                <Button className="w-full mt-4" variant="gold">
                  Join Membership
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {tourOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
            onClick={() => setTourOpen(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="glass-strong rounded-2xl p-8 max-w-lg text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Play className="h-16 w-16 text-accent mx-auto mb-4" />
              <h3 className="font-display text-2xl">Virtual Tour</h3>
              <p className="text-sky-400 mt-2">
                360° lounge experience preview. Full tour available in production build.
              </p>
              <Button className="mt-6" onClick={() => setTourOpen(null)}>
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
