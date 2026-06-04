import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { MapPin, Hotel, Image as ImageIcon } from 'lucide-react'
import { fetchDestinations } from '@/services/api'
import { SectionHeading } from '@/components/common/SectionHeading'
import { WeatherWidget } from '@/components/weather/WeatherWidget'
import { Skeleton } from '@/components/ui/skeleton'
import { FloatingGlobe } from '@/components/animations/Airplane3D'
import mumbaiImage from '@/Gallery/mumbai.jpg'
import bangloreImage from '@/Gallery/banglore.jpg'
import hydrabadImage from '@/Gallery/hydrabad.jpg'
import jaipurImage from '@/Gallery/jaipur.jpg'

const CITY_IMAGES: Record<string, string> = {
  mumbai: mumbaiImage,
  bengaluru: bangloreImage,
  hyderabad: hydrabadImage,
  jaipur: jaipurImage,
}

export default function Destinations() {
  const { data: destinations = [], isLoading } = useQuery({
    queryKey: ['destinations'],
    queryFn: fetchDestinations,
  })

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
        <SectionHeading
          eyebrow="India"
          title="Destinations"
          subtitle="Eight iconic cities with weather, attractions, and luxury hotels."
          align="left"
          className="mb-0"
        />
        <div className="h-[280px] hidden lg:block">
          <FloatingGlobe />
        </div>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-96" />
          ))}
        </div>
      ) : (
        <div className="space-y-24">
          {/* Gallery Grid Section */}
          <section className="mb-20">
            <div className="flex items-center gap-2 mb-8">
              <ImageIcon className="h-5 w-5 text-accent" />
              <h2 className="text-2xl font-display font-semibold">Visual Gallery</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {destinations.map((dest, i) => (
                <motion.div
                  key={`gallery-${dest.id}`}
                  className="relative aspect-square rounded-2xl overflow-hidden glass group cursor-pointer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={CITY_IMAGES[dest.id] || dest.image}
                    alt={dest.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 translate-y-4 group-hover:translate-y-0 transition-transform">
                    <p className="text-white font-medium text-sm">{dest.name}</p>
                    <p className="text-accent text-[10px] uppercase tracking-wider">{dest.tagline}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Detailed articles */}
          <div className="space-y-16">
            {destinations.map((dest, i) => (
              <motion.article
                key={dest.id}
                className="grid md:grid-cols-2 gap-8 items-center glass rounded-3xl overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                data-reveal
              >
                <div
                  className={`relative aspect-[4/3] md:aspect-auto md:min-h-[360px] overflow-hidden ${i % 2 === 1 ? 'md:order-2' : ''}`}
                >
                  <img
                    src={CITY_IMAGES[dest.id] || dest.image}
                    alt={dest.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-950/60 to-transparent md:hidden" />
                </div>
                <div className={`p-8 md:p-10 ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                  <span className="text-accent text-sm font-accent uppercase tracking-wider">
                    {dest.tagline}
                  </span>
                  <h2 className="font-display text-4xl font-semibold mt-2">
                    {dest.name}
                  </h2>
                  <WeatherWidget
                    temp={dest.weather.temp}
                    condition={dest.weather.condition}
                    humidity={dest.weather.humidity}
                    className="mt-6"
                  />
                  <div className="mt-6">
                    <div className="flex items-center gap-2 text-sm text-sky-400 mb-2">
                      <MapPin className="h-4 w-4 text-accent" />
                      Top Attractions
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {dest.attractions.map((a) => (
                        <span
                          key={a}
                          className="px-3 py-1 rounded-full bg-white/5 text-sm"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="flex items-center gap-2 text-sm text-sky-400 mb-2">
                      <Hotel className="h-4 w-4 text-gold" />
                      Luxury Hotels
                    </div>
                    <ul className="space-y-1 text-sky-300">
                      {dest.hotels.map((h) => (
                        <li key={h}>· {h}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
