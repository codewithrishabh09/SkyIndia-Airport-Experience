import { motion } from 'framer-motion'
import { Building2, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface AirportCardProps {
  title: string
  description: string
  icon?: React.ReactNode
  href?: string
  price?: number
  index?: number
}

export function AirportCard({
  title,
  description,
  icon,
  href = '/airport-services',
  price,
  index = 0,
}: AirportCardProps) {
  return (
    <motion.div
      data-stagger-item
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -6 }}
    >
      <Card className="h-full group hover:border-gold/30 transition-all">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="h-12 w-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-4 group-hover:scale-110 transition-transform">
            {icon ?? <Building2 className="h-6 w-6" />}
          </div>
          <h3 className="font-display text-xl font-semibold mb-2">{title}</h3>
          <p className="text-sm text-sky-400 flex-1">{description}</p>
          {price !== undefined && (
            <p className="mt-4 text-gold font-semibold">
              {price === 0 ? 'Complimentary' : `From ₹${price.toLocaleString('en-IN')}`}
            </p>
          )}
          <Link to={href} className="mt-4">
            <Button variant="outline" size="sm" className="w-full group/btn">
              Learn More
              <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  )
}
