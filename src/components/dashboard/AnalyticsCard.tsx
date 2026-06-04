import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { AnimatedNumber } from '@/components/common/AnimatedNumber'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface AnalyticsCardProps {
  title: string
  value: number
  prefix?: string
  suffix?: string
  change?: string
  icon: LucideIcon
  trend?: 'up' | 'down' | 'neutral'
  index?: number
}

export function AnalyticsCard({
  title,
  value,
  prefix,
  suffix,
  change,
  icon: Icon,
  trend = 'neutral',
  index = 0,
}: AnalyticsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="hover:border-accent/20 transition-colors">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-sky-500">{title}</p>
              <p className="text-3xl font-display font-semibold mt-2">
                <AnimatedNumber value={value} prefix={prefix} suffix={suffix} />
              </p>
              {change && (
                <p
                  className={cn(
                    'text-xs mt-2',
                    trend === 'up' && 'text-emerald',
                    trend === 'down' && 'text-rose',
                    trend === 'neutral' && 'text-sky-500'
                  )}
                >
                  {change}
                </p>
              )}
            </div>
            <div className="p-3 rounded-xl bg-accent/10">
              <Icon className="h-5 w-5 text-accent" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
