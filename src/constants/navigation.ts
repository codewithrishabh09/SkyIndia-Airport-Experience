import {
  Plane,
  MapPin,
  Building2,
  Compass,
  Crown,
  LayoutDashboard,
  Headphones,
  Mail,
  Home,
} from 'lucide-react'

export const NAV_LINKS = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Flights', path: '/flights', icon: Plane },
  { label: 'Tracker', path: '/flight-tracker', icon: Compass },
  { label: 'Destinations', path: '/destinations', icon: MapPin },
  { label: 'Services', path: '/airport-services', icon: Building2 },
  { label: 'Terminal', path: '/terminal-guide', icon: Compass },
  { label: 'Lounges', path: '/lounges', icon: Crown },
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Support', path: '/support', icon: Headphones },
  { label: 'Contact', path: '/contact', icon: Mail },
] as const

export const MOBILE_NAV = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'Flights', path: '/flights', icon: Plane },
  { label: 'Tracker', path: '/flight-tracker', icon: Compass },
  { label: 'Lounges', path: '/lounges', icon: Crown },
  { label: 'More', path: '/support', icon: Headphones },
] as const
