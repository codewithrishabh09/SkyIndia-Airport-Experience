import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import {
  Plane,
  TrendingUp,
  Users,
  Award,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { HeroVideo, Hero3DAccent } from '@/components/animations/HeroScene'
import { SearchForm } from '@/components/flight/SearchForm'
import { SectionHeading } from '@/components/common/SectionHeading'
import { AnimatedNumber } from '@/components/common/AnimatedNumber'
import { FlightCard } from '@/components/flight/FlightCard'
import { AirportCard } from '@/components/airport/AirportCard'
import { Carousel } from '@/components/common/Carousel'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { fetchFlights, fetchDestinations } from '@/services/api'
import destinationsData from '@/data/destinations.json'
import testimonialsData from '@/data/testimonials.json'
import newsData from '@/data/news.json'
import faqData from '@/data/faq.json'
import servicesData from '@/data/services.json'
import loungesData from '@/data/lounges.json'
import mumbaiImage from '@/Gallery/mumbai.jpg'
import bangloreImage from '@/Gallery/banglore.jpg'
import hydrabadImage from '@/Gallery/hydrabad.jpg'
import jaipurImage from '@/Gallery/jaipur.jpg'
import roomImage from '@/Gallery/room.jpg'
import biomaticImage from '@/Gallery/biomatic.jpg'
import recordPassengerNewsImage from '@/Gallery/record passenger news.png'
import { Crown, Luggage, Car } from 'lucide-react'

const newsImages: Record<string, string> = {
  '2': biomaticImage,
  '3': recordPassengerNewsImage,
}

const STATS = [
  { label: 'Daily Flights', value: 1200, suffix: '+' },
  { label: 'Happy Passengers', value: 2, suffix: 'M+' },
  { label: 'Premium Lounges', value: 48, suffix: '' },
  { label: 'On-Time Rate', value: 94, suffix: '%' },
]

function getLoungeImage(lounge: (typeof loungesData)[number], index: number) {
  if (
    index === 1 ||
    lounge.id === 'horizon-bom' ||
    lounge.name === 'Horizon Business Club'
  ) {
    return roomImage
  }
  return lounge.image
}

export default function Home() {
  const { data: flights = [] } = useQuery({
    queryKey: ['flights'],
    queryFn: fetchFlights,
  })

  const { data: destinations = destinationsData } = useQuery({
    queryKey: ['destinations-home'],
    queryFn: fetchDestinations,
  })

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center">
        <HeroVideo />
        <Hero3DAccent />
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full pt-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mb-10"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-accent tracking-widest uppercase text-accent mb-6">
              <Sparkles className="h-3 w-3" />
              Ultra Premium Aviation
            </span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight text-balance">
              The Future of{' '}
              <span className="gradient-text">Indian Aviation</span>
            </h1>
            <p className="mt-6 text-lg text-sky-400 max-w-xl">
              Experience world-class airports, live flight intelligence, premium
              lounges, and seamless journeys across India.
            </p>
          </motion.div>

          <SearchForm />

          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
            data-stagger
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                data-stagger-item
                className="glass rounded-xl p-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <p className="text-2xl md:text-3xl font-display font-semibold text-accent">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-xs text-sky-500 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Explore India"
          title="Popular Destinations"
          subtitle="Discover iconic cities with weather, attractions, and premium stays."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" data-stagger>
          {destinations.slice(0, 8).map((dest) => (
            <motion.div
              key={dest.id}
              data-stagger-item
              whileHover={{ y: -8 }}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] glass"
            >
              <img
                src={
                  dest.id === 'mumbai'
                    ? mumbaiImage
                    : dest.id === 'bengaluru'
                      ? bangloreImage
                      : dest.id === 'hyderabad'
                        ? hydrabadImage
                        : dest.id === 'jaipur'
                          ? jaipurImage
                      : dest.image
                }
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-950 via-sky-950/40 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <p className="text-xs text-accent uppercase tracking-wider">
                  {dest.tagline}
                </p>
                <h3 className="font-display text-2xl font-semibold">
                  {dest.name}
                </h3>
                <p className="text-sm text-sky-400 mt-1">
                  {dest.weather.temp}°C · {dest.weather.condition}
                </p>
              </div>
              <Link
                to="/destinations"
                className="absolute inset-0"
                aria-label={`Explore ${dest.name}`}
              />
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/destinations">
            <Button variant="outline">
              View All Destinations
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Live Flight Status */}
      <section className="py-24 px-4 md:px-8 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Real-time"
            title="Live Flight Status"
            subtitle="Track departures, arrivals, and gate updates."
          />
          <div className="space-y-4">
            {flights.slice(0, 3).map((f, i) => (
              <FlightCard key={f.id} flight={f} index={i} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/flight-tracker">
              <Button>
                <Plane className="h-4 w-4" />
                Open Flight Tracker
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Airport Services */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Concierge"
          title="Airport Services"
          subtitle="VIP assistance, transfers, and premium care at every touchpoint."
        />
        <div className="grid md:grid-cols-3 gap-6" data-stagger>
          {servicesData.slice(0, 3).map((s, i) => (
            <AirportCard
              key={s.id}
              title={s.title}
              description={s.description}
              price={s.price}
              index={i}
              icon={
                i === 0 ? (
                  <Crown className="h-6 w-6" />
                ) : i === 1 ? (
                  <Luggage className="h-6 w-6" />
                ) : (
                  <Car className="h-6 w-6" />
                )
              }
            />
          ))}
        </div>
      </section>

      {/* Premium Lounges */}
      <section className="py-24 px-4 md:px-8 bg-gradient-to-b from-transparent via-accent/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Luxury"
            title="Premium Lounges"
            subtitle="Spa, fine dining, and private suites at India's finest terminals."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {loungesData.map((lounge, i) => (
              <motion.div
                key={lounge.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl overflow-hidden group"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={getLoungeImage(lounge, i)}
                    alt={lounge.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="font-display text-xl">{lounge.name}</h3>
                    <span className="text-gold text-sm">★ {lounge.rating}</span>
                  </div>
                  <p className="text-sm text-sky-500 mt-1">{lounge.terminal}</p>
                  <p className="text-gold mt-3 font-semibold">
                    From ₹{lounge.membership.day.toLocaleString('en-IN')}/day
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/lounges">
              <Button variant="gold">Explore Lounges</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Analytics preview */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto" data-reveal>
        <SectionHeading
          eyebrow="Intelligence"
          title="Airport Analytics"
          subtitle="Enterprise-grade insights for operations and revenue."
        />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: TrendingUp, label: 'Revenue Growth', value: '+24%' },
            { icon: Users, label: 'Passenger Flow', value: '45.6K' },
            { icon: Award, label: 'Service Score', value: '4.9/5' },
          ].map((item) => (
            <Card key={item.label}>
              <CardContent className="p-8 flex items-center gap-4">
                <item.icon className="h-10 w-10 text-accent" />
                <div>
                  <p className="text-3xl font-display font-semibold">
                    {item.value}
                  </p>
                  <p className="text-sky-500">{item.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/dashboard">
            <Button variant="glass">View Full Dashboard</Button>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 md:px-8 max-w-4xl mx-auto">
        <SectionHeading title="What Travelers Say" />
        <Carousel
          items={testimonialsData.map((t) => (
            <Card key={t.id}>
              <CardContent className="p-8 text-center">
                <p className="text-lg text-sky-200 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center font-accent text-accent">
                    {t.avatar}
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{t.name}</p>
                    <p className="text-sm text-sky-500">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        />
      </section>

      {/* News */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <SectionHeading eyebrow="Aviation" title="Latest News" />
        <div className="grid md:grid-cols-3 gap-6">
          {newsData.map((article, i) => (
            <motion.article
              key={article.id}
              className="glass rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <img
                src={newsImages[article.id] ?? article.image}
                alt={article.title}
                className="aspect-video w-full object-cover"
                loading="lazy"
              />
              <div className="p-6">
                <span className="text-xs text-accent">{article.category}</span>
                <h3 className="font-display text-lg mt-2">{article.title}</h3>
                <p className="text-xs text-sky-500 mt-2">{article.date}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 md:px-8 max-w-3xl mx-auto">
        <SectionHeading title="Frequently Asked Questions" />
        <Accordion type="single" collapsible>
          {faqData.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  )
}
