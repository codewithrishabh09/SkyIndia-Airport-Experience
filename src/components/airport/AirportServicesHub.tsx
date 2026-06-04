import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
    Utensils,
    ShoppingBag,
    Armchair,
    Bath,
    Wallet,
    ArrowRight,
    Clock,
    MapPin,
    CheckCircle2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Assets
import foodCourtImg from '@/assets/services/food_court.png'
import shoppingImg from '@/assets/services/shopping.png'
import loungeImg from '@/assets/services/lounge.png'
import restroomsImg from '@/assets/services/restrooms.png'
import atmImg from '@/assets/services/atm.png'

const SERVICES = [
    {
        id: 'food',
        icon: Utensils,
        title: 'Food Court',
        description: 'Gourmet dining and international cuisines.',
        stats: '25+ Restaurants',
        detail: 'Multi-Cuisine Dining',
        availability: 'Open 24 Hours',
        image: foodCourtImg,
        color: 'accent',
        location: { x: 30, y: 40 },
        terminal: 'Terminal 1',
        features: ['International Chains', 'Fine Dining', 'Quick Bites', 'Specialty Cafes']
    },
    {
        id: 'shopping',
        icon: ShoppingBag,
        title: 'Shopping',
        description: 'Duty-free luxury and essential travel retail.',
        stats: '120+ Stores',
        detail: 'International Brands',
        availability: 'Open 24 Hours',
        image: shoppingImg,
        color: 'gold',
        location: { x: 70, y: 35 },
        terminal: 'Terminal 2',
        features: ['Luxury Boutiques', 'Duty-Free', 'Indian Souvenirs', 'Tech & Gadgets']
    },
    {
        id: 'lounges',
        icon: Armchair,
        title: 'Premium Lounges',
        description: 'Elite comfort with panoramic runway views.',
        stats: '20+ Lounges',
        detail: 'VIP Experiences',
        availability: 'Members Only',
        image: loungeImg,
        color: 'accent',
        location: { x: 50, y: 65 },
        terminal: 'Terminal 3',
        features: ['Shower Facilities', 'Fine Dining Buffet', 'Quiet Zones', 'Business Centers']
    },
    {
        id: 'restrooms',
        icon: Bath,
        title: 'Restrooms',
        description: 'Modern, high-end cleaning and hygiene.',
        stats: '75+ Restrooms',
        detail: 'Smart Facilities',
        availability: 'Complimentary',
        image: restroomsImg,
        color: 'sky-400',
        location: { x: 20, y: 75 },
        terminal: 'All Terminals',
        features: ['Touchless Systems', 'Baby Care Rooms', 'Accessibility Support', 'Premium Amenities']
    },
    {
        id: 'atm',
        icon: Wallet,
        title: 'ATM Locator',
        description: 'Secure, accessible banking across all wings.',
        stats: '40+ Machines',
        detail: '24/7 Access',
        image: atmImg,
        color: 'emerald-400',
        location: { x: 85, y: 70 },
        terminal: 'All Gates',
        features: ['Multi-Bank Access', 'Currency Exchange', 'Zero Fees for Premium Members', 'Secure Booths']
    }
]

const STATS = [
    { label: 'Restaurants', value: 50, suffix: '+' },
    { label: 'Stores', value: 120, suffix: '+' },
    { label: 'Lounges', value: 20, suffix: '+' },
    { label: 'Restrooms', value: 75, suffix: '+' },
    { label: 'ATM Machines', value: 40, suffix: '+' },
]

interface AirportServicesHubProps {
    onBook?: (service: string) => void
}

export function AirportServicesHub({ onBook }: AirportServicesHubProps) {
    const [hoveredMarker, setHoveredMarker] = useState<string | null>(null)
    const [selectedMarker, setSelectedMarker] = useState<string | null>(null)

    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

    return (
        <div ref={containerRef} className="relative w-full space-y-32 py-20 overflow-hidden">
            {/* Background Visual Effects */}
            <motion.div style={{ opacity }} className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-sky-950 via-transparent to-sky-950" />

                {/* Animated Light Beams */}
                <motion.div
                    style={{ y: backgroundY }}
                    className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-accent/20 to-transparent blur-sm"
                />
                <motion.div
                    style={{ y: backgroundY }}
                    className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-accent/10 to-transparent blur-sm"
                />

                {/* Aurora Glow */}
                <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-accent/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gold/5 rounded-full blur-[120px] animate-pulse" />
            </motion.div>

            {/* Header Section */}
            <section className="px-4 md:px-8 max-w-7xl mx-auto text-center" data-reveal>
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-accent text-xs tracking-[0.3em] uppercase text-accent mb-4 block"
                >
                    Airport Facilities
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="font-display text-4xl md:text-6xl font-semibold mb-6 gradient-text"
                >
                    Explore Airport Services
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="max-w-2xl mx-auto text-sky-400 text-lg md:text-xl"
                >
                    Discover dining, shopping, lounges, restrooms, and banking services across the airport.
                </motion.p>
            </section>

            {/* Interactive Service Grid */}
            <section className="px-4 md:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
                    {SERVICES.map((service, i) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -8 }}
                            onClick={() => {
                                document.getElementById(`showcase-${service.id}`)?.scrollIntoView({ behavior: 'smooth' })
                            }}
                            className="group relative cursor-pointer"
                        >
                            <div className="glass rounded-2xl p-6 h-full transition-all duration-500 group-hover:border-accent/30 group-hover:bg-white/[0.08] relative overflow-hidden">
                                {/* Floating Particles on Hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    {[...Array(3)].map((_, j) => (
                                        <motion.div
                                            key={j}
                                            animate={{
                                                y: [-10, -30],
                                                opacity: [0, 1, 0],
                                                x: [j * 20, j * 20 + (Math.random() - 0.5) * 20]
                                            }}
                                            transition={{ duration: 2, repeat: Infinity, delay: j * 0.5 }}
                                            className="absolute bottom-4 left-1/2 w-1 h-1 bg-accent/40 rounded-full"
                                        />
                                    ))}
                                </div>

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className={cn(
                                        "w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6",
                                        service.id === 'food' ? "bg-accent/20 text-accent" :
                                            service.id === 'shopping' ? "bg-gold/20 text-gold" :
                                                "bg-sky-500/20 text-sky-300"
                                    )}>
                                        <service.icon className="h-6 w-6" />
                                    </div>

                                    <h3 className="font-display text-xl mb-2 group-hover:text-accent transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-sm text-sky-500/80 mb-6 flex-grow">
                                        {service.description}
                                    </p>

                                    <div className="mt-auto border-t border-white/5 pt-4">
                                        <p className="text-xs text-accent font-semibold">{service.stats}</p>
                                        <p className="text-[10px] text-sky-600 uppercase tracking-widest mt-1">{service.detail}</p>
                                    </div>
                                </div>

                                {/* Border Glow */}
                                <div className="absolute inset-0 border border-transparent group-hover:border-accent/20 rounded-2xl transition-all duration-500 pointer-events-none" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Terminal Preview Map */}
            <section className="px-4 md:px-8 max-w-7xl mx-auto">
                <div className="relative glass rounded-3xl overflow-hidden p-8 lg:p-12 border border-accent/10">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <div className="lg:w-1/3">
                            <span className="text-accent text-xs font-accent tracking-widest mb-2 block uppercase">Live Terminal Hub</span>
                            <h3 className="font-display text-3xl mb-4">Interactive Navigation</h3>
                            <p className="text-sky-400 mb-8">
                                Visualize all facilities in real-time. Select a marker on the terminal map to see specific service details.
                            </p>

                            <div className="space-y-3">
                                {SERVICES.map(s => (
                                    <button
                                        key={`map-btn-${s.id}`}
                                        onMouseEnter={() => setHoveredMarker(s.id)}
                                        onMouseLeave={() => setHoveredMarker(null)}
                                        onClick={() => {
                                            setSelectedMarker(s.id)
                                        }}
                                        className={cn(
                                            "flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all",
                                            (hoveredMarker === s.id || selectedMarker === s.id) ? "bg-accent/20 text-accent translate-x-2" : "hover:bg-white/5"
                                        )}
                                    >
                                        <s.icon className="h-4 w-4" />
                                        <span className="text-sm font-medium">{s.title}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="lg:w-2/3 relative aspect-[16/9] w-full bg-sky-950/40 rounded-2xl border border-white/5 p-4 overflow-hidden shadow-inner">
                            {/* Terminal Blueprint */}
                            <svg viewBox="0 0 800 450" className="w-full h-full opacity-30 fill-none stroke-accent/40 stroke-[1]">
                                <path d="M100 100 L700 100 L750 200 L700 350 L100 350 L50 225 Z" />
                                <path d="M100 225 L700 225" />
                                <path d="M400 100 L400 350" />
                                <circle cx="400" cy="225" r="50" />
                            </svg>

                            {/* Markers */}
                            {SERVICES.map(s => {
                                const markerStyle = {
                                    '--x': `${s.location.x}%`,
                                    '--y': `${s.location.y}%`
                                } as React.CSSProperties;

                                return (
                                    <div
                                        key={`marker-${s.id}`}
                                        className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 marker-pos"
                                        style={markerStyle}
                                        onMouseEnter={() => setHoveredMarker(s.id)}
                                        onMouseLeave={() => setHoveredMarker(null)}
                                        onClick={() => {
                                            setSelectedMarker(s.id)
                                        }}
                                    >
                                        <div className="relative">
                                            <motion.div
                                                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                className={cn(
                                                    "absolute -inset-4 rounded-full blur-sm",
                                                    s.id === 'food' ? "bg-accent" : s.id === 'shopping' ? "bg-gold" : "bg-sky-400"
                                                )}
                                            />
                                            <motion.div
                                                animate={selectedMarker === s.id ? { scale: 1.2 } : { scale: 1 }}
                                                className={cn(
                                                    "relative w-6 h-6 rounded-full border-2 border-white flex items-center justify-center transition-all z-10",
                                                    (hoveredMarker === s.id || selectedMarker === s.id) ? "bg-white text-sky-950 scale-125" : "bg-sky-900"
                                                )}
                                            >
                                                <s.icon className="h-3 w-3" />
                                            </motion.div>
                                        </div>

                                        <AnimatePresence>
                                            {(hoveredMarker === s.id || selectedMarker === s.id) && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                                                    className="absolute bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-sky-950 px-3 py-1.5 rounded-lg text-xs font-bold shadow-2xl z-20"
                                                >
                                                    {s.title}
                                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Premium Statistics Row */}
            < section className="px-4 md:px-8 max-w-7xl mx-auto py-12" >
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    {STATS.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="text-center"
                        >
                            <div className="text-4xl md:text-5xl font-display font-semibold gradient-text mb-2">
                                {stat.value}{stat.suffix}
                            </div>
                            <p className="text-sm text-sky-500 uppercase tracking-widest">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section >

            {/* Detailed Service Showcase */}
            < section className="px-4 md:px-8 max-w-7xl mx-auto space-y-32" >
                {
                    SERVICES.map((s, i) => (
                        <div
                            id={`showcase-${s.id}`}
                            key={`showcase-${s.id}`}
                            className={cn(
                                "flex flex-col gap-12 lg:gap-20 items-center",
                                i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                            )}
                        >
                            <motion.div
                                initial={{ opacity: 0, x: i % 2 === 1 ? 50 : -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="lg:w-1/2 relative group"
                            >
                                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden glass p-2 border border-white/10 shadow-2xl">
                                    <img
                                        src={s.image}
                                        alt={s.title}
                                        className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-sky-950/80 via-transparent to-transparent opacity-60" />

                                    {/* Decorative Elements */}
                                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
                                    <div className="absolute -top-6 -left-6 w-32 h-32 bg-gold/10 rounded-full blur-3xl" />
                                </div>

                                {/* Floating Badge */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="absolute -top-4 -right-4 md:top-10 md:-right-10 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl z-10"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                                            <Clock className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-sky-400 uppercase tracking-tighter">Availability</p>
                                            <p className="text-sm font-bold text-white">{s.availability}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: i % 2 === 1 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="lg:w-1/2 space-y-8"
                            >
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="h-[1px] w-12 bg-accent" />
                                        <span className="text-accent text-xs font-accent tracking-widest uppercase">Premium Facilities</span>
                                    </div>
                                    <h3 className="font-display text-4xl md:text-5xl font-semibold mb-6">{s.title}</h3>
                                    <p className="text-sky-400 text-lg leading-relaxed">
                                        {s.description} Experience the next generation of airport hospitality with our
                                        exclusive {s.title.toLowerCase()} service at {s.terminal}.
                                        Each location is designed with a futuristic aesthetic and premium comfort in mind.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {s.features.map((feature, j) => (
                                        <motion.div
                                            key={feature}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: j * 0.1 }}
                                            className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 border border-white/5"
                                        >
                                            <CheckCircle2 className="h-4 w-4 text-accent" />
                                            <span className="text-sm font-medium">{feature}</span>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="flex flex-wrap gap-4 pt-6">
                                    <Button size="lg" className="group" onClick={() => onBook?.(s.title)}>
                                        Book VIP Experience
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                    <Button variant="outline" size="lg" className="group">
                                        <MapPin className="mr-2 h-4 w-4" />
                                        View on Map
                                    </Button>
                                </div>
                            </motion.div>
                        </div>
                    ))}
            </section>

            {/* Final Call to Action */}
            <section className="px-4 md:px-8 max-w-4xl mx-auto py-20 text-center relative overflow-hidden rounded-[3rem] glass border border-accent/20">
                <div className="absolute inset-0 bg-accent/5 -z-10 blur-3xl" />
                <h3 className="font-display text-3xl md:text-4xl mb-6">Experience Indian Hospitality</h3>
                <p className="text-sky-400 mb-10 text-lg">
                    Our concierge team is available 24/7 to assist with any of your terminal needs.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                    <Button size="lg" variant="gold">Contact Concierge</Button>
                    <Button size="lg" variant="glass">Download Terminal Guide</Button>
                </div>
            </section>
        </div>
    )
}
