import { delay } from '@/lib/utils'
import flightsData from '@/data/flights.json'
import destinationsData from '@/data/destinations.json'
import servicesData from '@/data/services.json'
import loungesData from '@/data/lounges.json'
import airportsData from '@/data/airports.json'

export type Flight = (typeof flightsData)[number]
export type Destination = (typeof destinationsData)[number]
export type AirportService = (typeof servicesData)[number]
export type Lounge = (typeof loungesData)[number]
export type Airport = (typeof airportsData)[number]

export async function fetchFlights() {
  await delay(600)
  return flightsData as Flight[]
}

export async function searchFlights(_params: Record<string, string>) {
  await delay(900)
  return flightsData as Flight[]
}

export async function fetchDestinations() {
  await delay(400)
  return destinationsData as Destination[]
}

export async function fetchServices() {
  await delay(350)
  return servicesData as AirportService[]
}

export async function fetchLounges() {
  await delay(350)
  return loungesData as Lounge[]
}

export async function fetchAirports(query = '') {
  await delay(200)
  const q = query.toLowerCase()
  return (airportsData as Airport[]).filter(
    (a) =>
      a.code.toLowerCase().includes(q) ||
      a.city.toLowerCase().includes(q) ||
      a.name.toLowerCase().includes(q)
  )
}

export async function fetchDashboardStats() {
  await delay(500)
  return {
    totalFlights: 1247,
    activeFlights: 89,
    passengers: 45620,
    revenue: 12_450_000,
    delays: 12,
    traffic: 78,
  }
}

export async function fetchChartData() {
  await delay(400)
  return {
    hourly: [
      { hour: '00', flights: 12, passengers: 1200 },
      { hour: '04', flights: 8, passengers: 800 },
      { hour: '08', flights: 45, passengers: 5200 },
      { hour: '12', flights: 62, passengers: 7800 },
      { hour: '16', flights: 58, passengers: 7100 },
      { hour: '20', flights: 38, passengers: 4500 },
    ],
    weekly: [
      { day: 'Mon', revenue: 1.8, delays: 8 },
      { day: 'Tue', revenue: 2.1, delays: 5 },
      { day: 'Wed', revenue: 2.4, delays: 12 },
      { day: 'Thu', revenue: 2.2, delays: 7 },
      { day: 'Fri', revenue: 2.8, delays: 15 },
      { day: 'Sat', revenue: 3.1, delays: 9 },
      { day: 'Sun', revenue: 2.6, delays: 6 },
    ],
    terminals: [
      { name: 'T1', value: 28 },
      { name: 'T2', value: 35 },
      { name: 'T3', value: 37 },
    ],
    heatmap: Array.from({ length: 7 }, (_, d) =>
      Array.from({ length: 24 }, (_, h) => ({
        day: d,
        hour: h,
        value: Math.floor(Math.random() * 100),
      }))
    ).flat(),
  }
}

const CHAT_RESPONSES: Record<string, string> = {
  default:
    'I can help with flights, lounge access, terminal navigation, and travel tips. What would you like to know?',
  flight:
    'SkyIndia operates 120+ daily flights across India and international hubs. Check the Flights page for live search.',
  lounge:
    'Premium lounges are available at DEL T3, BOM T2, and BLR T1. Day passes start from ₹4,500.',
  terminal:
    'Use our Terminal Guide to search gates, restaurants, and find the shortest path with interactive maps.',
  weather:
    'Destination weather is shown on each city card. Delhi is currently 32°C with hazy sun.',
}

export async function sendChatMessage(message: string) {
  await delay(800)
  const lower = message.toLowerCase()
  if (lower.includes('flight')) return CHAT_RESPONSES.flight
  if (lower.includes('lounge')) return CHAT_RESPONSES.lounge
  if (lower.includes('terminal') || lower.includes('gate'))
    return CHAT_RESPONSES.terminal
  if (lower.includes('weather')) return CHAT_RESPONSES.weather
  return CHAT_RESPONSES.default
}
