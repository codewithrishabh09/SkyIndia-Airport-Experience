import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane, Calendar, Users, ChevronDown, MapPin, Search, Sparkles, Clock, Ticket, ArrowLeftRight } from 'lucide-react';
import airportsData from '@/data/airports.json';

interface Airport {
    code: string;
    name: string;
    city: string;
    country: string;
}

interface Stat {
    label: string;
    value: number;
    current: number;
    icon: React.ReactNode;
    suffix?: string;
}

const airports: Airport[] = airportsData;

const HeroSection = () => {
    const navigate = useNavigate();

    // -- Search state (mirrors original SearchForm) --
    const [fromCode, setFromCode] = useState('DEL');
    const [toCode, setToCode] = useState('BOM');
    const [fromInput, setFromInput] = useState('DEL');
    const [toInput, setToInput] = useState('BOM');
    const [fromSuggestions, setFromSuggestions] = useState<Airport[]>([]);
    const [toSuggestions, setToSuggestions] = useState<Airport[]>([]);
    const [tripType, setTripType] = useState<'oneway' | 'round' | 'multi'>('oneway');
    const [passengers, setPassengers] = useState(1);
    const [travelClass, setTravelClass] = useState('Economy');
    const [searching, setSearching] = useState(false);

    // -- Live boarding time --
    const [boardingTime, setBoardingTime] = useState('');

    // -- Stats --
    const [stats, setStats] = useState<Stat[]>([
        { label: 'Daily Flights', value: 1200, current: 0, icon: <Plane className="w-5 h-5" /> },
        { label: 'Happy Passengers', value: 2000000, current: 0, icon: <Users className="w-5 h-5" />, suffix: 'M+' },
        { label: 'Premium Lounges', value: 48, current: 0, icon: <Sparkles className="w-5 h-5" /> },
        { label: 'On-Time Rate', value: 94, current: 0, icon: <Clock className="w-5 h-5" />, suffix: '%' },
    ]);
    const statsRef = useRef<HTMLDivElement>(null);

    // Derive city name from code
    const getAirport = (code: string): Airport | undefined =>
        airports.find((a) => a.code === code);

    const fromAirport = getAirport(fromCode);
    const toAirport = getAirport(toCode);

    // Filter suggestions based on input
    const filterAirports = (query: string): Airport[] => {
        const q = query.toLowerCase();
        return airports.filter(
            (a) =>
                a.code.toLowerCase().includes(q) ||
                a.city.toLowerCase().includes(q) ||
                a.name.toLowerCase().includes(q)
        );
    };

    const handleFromInput = (val: string) => {
        setFromInput(val.toUpperCase());
        setFromSuggestions(val.length >= 1 ? filterAirports(val) : []);
        // If exact code match, set it
        const exact = airports.find((a) => a.code === val.toUpperCase());
        if (exact) setFromCode(exact.code);
    };

    const handleToInput = (val: string) => {
        setToInput(val.toUpperCase());
        setToSuggestions(val.length >= 1 ? filterAirports(val) : []);
        const exact = airports.find((a) => a.code === val.toUpperCase());
        if (exact) setToCode(exact.code);
    };

    const selectFrom = (airport: Airport) => {
        setFromCode(airport.code);
        setFromInput(airport.code);
        setFromSuggestions([]);
    };

    const selectTo = (airport: Airport) => {
        setToCode(airport.code);
        setToInput(airport.code);
        setToSuggestions([]);
    };

    const swapCities = () => {
        setFromCode(toCode);
        setToCode(fromCode);
        setFromInput(toCode);
        setToInput(fromCode);
    };

    const handleSearch = async () => {
        setSearching(true);
        await new Promise((r) => setTimeout(r, 600));
        setSearching(false);
        navigate('/flights');
    };

    // Live boarding time (now + 2 hours)
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            now.setHours(now.getHours() + 2);
            setBoardingTime(
                now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
            );
        };
        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    // Stats count-up on scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    const duration = 2000;
                    const totalFrames = Math.round(duration / (1000 / 60));
                    let frame = 0;
                    const timer = setInterval(() => {
                        frame++;
                        const progress = frame / totalFrames;
                        setStats((prev) =>
                            prev.map((stat) => ({ ...stat, current: Math.floor(stat.value * progress) }))
                        );
                        if (frame === totalFrames) clearInterval(timer);
                    }, 1000 / 60);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        if (statsRef.current) observer.observe(statsRef.current);
        return () => observer.disconnect();
    }, []);

    const formatStatValue = (stat: Stat) => {
        if (stat.label === 'Happy Passengers') return (stat.current / 1000000).toFixed(1);
        if (stat.label === 'Daily Flights') return stat.current.toLocaleString('en-IN');
        return stat.current;
    };

    return (
        <section className="relative min-h-screen bg-[#0a0f1e] overflow-hidden flex flex-col items-center justify-center pt-20 px-4">
            {/* Blurred runway background */}
            <div
                className="absolute inset-0 z-0 opacity-40 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage:
                        'url("https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&q=80&w=2070")',
                    filter: 'blur(4px)',
                    transform: 'scale(1.05)',
                }}
            />
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0a0f1e]/80 via-transparent to-[#0a0f1e]" />

            <style>{`
        @keyframes planeMove {
          from { transform: translateX(-10px); }
          to   { transform: translateX(10px); }
        }
        @keyframes ticketGlow {
          0%   { box-shadow: 0 0 15px rgba(59,130,246,0.2); border-color: rgba(59,130,246,0.2); }
          100% { box-shadow: 0 0 30px rgba(59,130,246,0.6); border-color: rgba(59,130,246,0.45); }
        }
        @keyframes qrPulse {
          0%,100% { transform: scale(1);    opacity: 0.9; }
          50%      { transform: scale(1.03); opacity: 1;   }
        }
        @keyframes heroEntrance {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .hero-entrance  { animation: heroEntrance 0.6s ease-out forwards; }
        .plane-fly      { animation: planeMove 2s ease-in-out infinite alternate; }
        .ticket-glow    { animation: ticketGlow 2s ease-in-out infinite alternate; }
        .qr-pulse       { animation: qrPulse 2s ease-in-out infinite; }
        .suggestion-list { position: absolute; top: calc(100% + 4px); left: 0; right: 0;
                           background: #0d1f3c; border: 1px solid rgba(59,130,246,0.25);
                           border-radius: 0.75rem; z-index: 50; max-height: 180px; overflow-y: auto; }
        .suggestion-item { padding: 8px 12px; cursor: pointer; font-size: 0.8rem; color: #cbd5e1;
                           display: flex; gap: 10px; align-items: center; }
        .suggestion-item:hover { background: rgba(59,130,246,0.15); }
        .suggestion-code { font-weight: 700; color: #60a5fa; min-width: 36px; }
      `}</style>

            {/* ── Hero Content ── */}
            <div className="relative z-20 max-w-7xl w-full flex flex-col lg:flex-row items-center gap-12 mb-16 hero-entrance">

                {/* Left: Headline */}
                <div className="flex-1 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-6">
                        <Sparkles className="w-3 h-3 text-yellow-500" />
                        Ultra Premium Aviation
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
                        The Future of <br />
                        <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Indian</span>{' '}
                        <span className="text-yellow-500">Aviation</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto lg:mx-0">
                        Elevating your journey with seamless intelligence, premium comfort, and world-class hospitality across the Indian skies.
                    </p>
                </div>

                {/* ── Boarding Pass Card ── */}
                <div className="relative flex flex-col md:flex-row bg-[#0d1526] rounded-3xl border border-blue-500/30 overflow-visible ticket-glow w-full max-w-4xl shadow-2xl">

                    {/* LEFT: Search form */}
                    <div className="flex-1 p-8 md:p-10 space-y-6">

                        {/* City code display */}
                        <div className="flex items-center justify-between gap-4 mb-2">
                            <div className="flex-1">
                                <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-1">From</p>
                                <h2 className="text-5xl font-black text-white leading-none">{fromCode}</h2>
                                <p className="text-gray-300 font-medium text-sm mt-1">
                                    {fromAirport ? fromAirport.city : '—'}
                                </p>
                                <p className="text-gray-500 text-xs">
                                    {fromAirport ? fromAirport.name : ''}
                                </p>
                            </div>

                            <div className="flex flex-col items-center gap-2 flex-shrink-0">
                                <div className="w-full flex items-center gap-2">
                                    <div className="h-[1px] w-10 border-t border-dashed border-gray-600" />
                                    <Plane className="w-6 h-6 text-blue-400 plane-fly" />
                                    <div className="h-[1px] w-10 border-t border-dashed border-gray-600" />
                                </div>
                                <button
                                    onClick={swapCities}
                                    title="Swap cities"
                                    aria-label="Swap cities"
                                    className="p-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-blue-500/20 transition-colors"
                                >
                                    <ArrowLeftRight className="w-3.5 h-3.5 text-gray-400" />
                                </button>
                            </div>

                            <div className="flex-1 text-right">
                                <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-1">To</p>
                                <h2 className="text-5xl font-black text-white leading-none">{toCode}</h2>
                                <p className="text-gray-300 font-medium text-sm mt-1">
                                    {toAirport ? toAirport.city : '—'}
                                </p>
                                <p className="text-gray-500 text-xs">
                                    {toAirport ? toAirport.name : ''}
                                </p>
                            </div>
                        </div>

                        {/* Trip Type Tabs */}
                        <div className="flex gap-4 border-b border-white/5 pb-1">
                            {(['oneway', 'round', 'multi'] as const).map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setTripType(t)}
                                    className={`text-sm font-medium pb-2 transition-colors capitalize ${tripType === t
                                            ? 'text-blue-400 border-b-2 border-blue-400'
                                            : 'text-gray-500 hover:text-gray-300'
                                        }`}
                                >
                                    {t === 'oneway' ? 'One Way' : t === 'round' ? 'Round Trip' : 'Multi City'}
                                </button>
                            ))}
                        </div>

                        {/* Inputs grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* From input with suggestions */}
                            <div className="relative">
                                <label htmlFor="bp-from" className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-1 block">Departure Airport</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        id="bp-from"
                                        type="text"
                                        value={fromInput}
                                        onChange={(e) => handleFromInput(e.target.value)}
                                        aria-label="Departure Airport"
                                        title="Departure Airport"
                                        placeholder="City or code (e.g. DEL)"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all text-sm"
                                    />
                                    {fromSuggestions.length > 0 && (
                                        <div className="suggestion-list">
                                            {fromSuggestions.map((a) => (
                                                <div key={a.code} className="suggestion-item" onClick={() => selectFrom(a)}>
                                                    <span className="suggestion-code">{a.code}</span>
                                                    <span>{a.city} — {a.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* To input with suggestions */}
                            <div className="relative">
                                <label htmlFor="bp-to" className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-1 block">Arrival Airport</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        id="bp-to"
                                        type="text"
                                        value={toInput}
                                        onChange={(e) => handleToInput(e.target.value)}
                                        aria-label="Arrival Airport"
                                        title="Arrival Airport"
                                        placeholder="City or code (e.g. BOM)"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-all text-sm"
                                    />
                                    {toSuggestions.length > 0 && (
                                        <div className="suggestion-list">
                                            {toSuggestions.map((a) => (
                                                <div key={a.code} className="suggestion-item" onClick={() => selectTo(a)}>
                                                    <span className="suggestion-code">{a.code}</span>
                                                    <span>{a.city} — {a.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Dates */}
                            <div className="relative">
                                <label htmlFor="bp-depart" className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-1 block">Depart</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        id="bp-depart"
                                        type="date"
                                        aria-label="Departure Date"
                                        title="Departure Date"
                                        defaultValue="2026-06-15"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 text-sm"
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <label htmlFor="bp-return" className={`text-blue-400 text-xs font-bold uppercase tracking-widest mb-1 block ${tripType === 'oneway' ? 'opacity-40' : ''}`}>Return</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        id="bp-return"
                                        type="date"
                                        aria-label="Return Date"
                                        title="Return Date"
                                        disabled={tripType === 'oneway'}
                                        defaultValue="2026-06-22"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500/50 text-sm disabled:opacity-40"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Passengers + Class */}
                        <div className="flex gap-4 items-end flex-wrap">
                            <div className="flex-1">
                                <label className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2 block">Passengers</label>
                                <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
                                    <div className="flex items-center gap-2">
                                        <Users className="w-4 h-4 text-gray-500" />
                                        <span className="text-white text-sm">{passengers} {passengers === 1 ? 'Adult' : 'Adults'}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setPassengers((p) => Math.max(1, p - 1))}
                                            aria-label="Decrease passengers"
                                            className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                                        >−</button>
                                        <button
                                            type="button"
                                            onClick={() => setPassengers((p) => Math.min(9, p + 1))}
                                            aria-label="Increase passengers"
                                            className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                                        >+</button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1">
                                <label htmlFor="bp-class" className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2 block">Class</label>
                                <div className="relative">
                                    <select
                                        id="bp-class"
                                        aria-label="Flight Class"
                                        title="Flight Class"
                                        value={travelClass}
                                        onChange={(e) => setTravelClass(e.target.value)}
                                        className="appearance-none w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 pr-10 text-white text-sm focus:outline-none focus:border-blue-500/50 cursor-pointer"
                                    >
                                        {['Economy', 'Premium Economy', 'Business', 'First'].map((c) => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Search button */}
                        <button
                            onClick={handleSearch}
                            disabled={searching}
                            aria-label="Search Flights"
                            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all group overflow-hidden relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            <Search className="w-5 h-5" />
                            {searching ? 'Searching...' : 'Search Flights'}
                        </button>
                    </div>

                    {/* RIGHT: Ticket Stub */}
                    <div className="hidden md:flex flex-col w-60 bg-white/[0.02] border-l border-dashed border-white/20 p-7 flex-shrink-0">
                        <div className="flex flex-col h-full">
                            <div className="flex items-center gap-2 text-blue-400 font-bold mb-8">
                                <Ticket className="w-5 h-5" />
                                <span className="text-xs tracking-wide">SkyIndia Airways</span>
                            </div>

                            <div className="space-y-5 flex-1 text-sm">
                                <div>
                                    <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Flight</p>
                                    <p className="text-white font-black text-xl">SI 202</p>
                                    <p className="text-blue-400 text-xs font-medium">{travelClass} Class</p>
                                </div>
                                <div className="flex justify-between">
                                    <div>
                                        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Terminal</p>
                                        <p className="text-white font-bold">T3</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Gate</p>
                                        <p className="text-white font-bold">A12</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Boarding</p>
                                    <p className="text-white font-black text-2xl">{boardingTime}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Seat</p>
                                    <p className="text-white font-black text-2xl">12A</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">Passengers</p>
                                    <p className="text-white font-bold">{passengers} {passengers === 1 ? 'Adult' : 'Adults'}</p>
                                </div>
                            </div>

                            <div className="pt-6 flex flex-col items-center gap-2">
                                <div className="w-24 h-24 bg-white p-1 rounded-lg qr-pulse">
                                    <svg viewBox="0 0 100 100" className="w-full h-full">
                                        {/* QR code pattern */}
                                        {[0, 20, 40, 60, 80].flatMap((y) =>
                                            [0, 20, 40, 60, 80].map((x) =>
                                                (x + y) % 40 === 0 || x === 40 || y === 40 ? (
                                                    <rect key={`${x}-${y}`} width="14" height="14" x={x + 3} y={y + 3} fill="black" rx="1" />
                                                ) : null
                                            )
                                        )}
                                        <rect width="28" height="28" x="3" y="3" fill="none" stroke="black" strokeWidth="4" />
                                        <rect width="28" height="28" x="69" y="3" fill="none" stroke="black" strokeWidth="4" />
                                        <rect width="28" height="28" x="3" y="69" fill="none" stroke="black" strokeWidth="4" />
                                    </svg>
                                </div>
                                <p className="text-gray-600 text-[8px] uppercase tracking-widest font-bold">Priority Boarding</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Stats Bar ── */}
            <div
                ref={statsRef}
                className="relative z-20 max-w-7xl w-full grid grid-cols-2 md:grid-cols-4 gap-4 pb-20"
            >
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-all hover:bg-white/10 group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform">
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-2xl md:text-3xl font-black text-white">
                                    {formatStatValue(stat)}{stat.suffix ?? '+'}
                                </p>
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">
                                    {stat.label}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HeroSection;
