import { Link } from 'react-router-dom'
import { Plane, Mail, Phone, MapPin } from 'lucide-react'
import { NAV_LINKS } from '@/constants/navigation'

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-sky-950/80 backdrop-blur-xl mt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Plane className="h-6 w-6 text-accent" />
              <span className="font-accent font-bold text-xl">SkyIndia</span>
            </div>
            <p className="text-sky-400 text-sm leading-relaxed">
              Ultra-premium airport experience platform. Flights, lounges,
              terminal guides, and live aviation intelligence.
            </p>
          </div>
          <div>
            <h4 className="font-display text-lg mb-4">Explore</h4>
            <ul className="space-y-2">
              {NAV_LINKS.slice(0, 6).map((l) => (
                <li key={l.path}>
                  <Link
                    to={l.path}
                    className="text-sm text-sky-400 hover:text-accent transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-sky-400">
              <li>VIP Assistance</li>
              <li>Premium Lounges</li>
              <li>Flight Tracking</li>
              <li>AI Travel Assistant</li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-lg mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-sky-400">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" />
                skyindiaexplore@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" />
                +91 1800 1222 333
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                12th Floor, Oberoi Towers, Mumbai 400021
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-sky-500">
          <p>© 2026 SkyIndia Airport Experience.</p>
          <div className="flex gap-6">
            <Link to="/support" className="hover:text-accent">
              Privacy
            </Link>
            <Link to="/contact" className="hover:text-accent">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
