import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface TimelineItem {
  time: string
  title: string
  description?: string
  status?: 'completed' | 'current' | 'upcoming'
}

interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn('space-y-0', className)}>
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="flex gap-4 pb-8 last:pb-0"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'h-3 w-3 rounded-full ring-4 ring-sky-950',
                item.status === 'completed' && 'bg-emerald',
                item.status === 'current' && 'bg-accent animate-pulse',
                item.status === 'upcoming' && 'bg-sky-600'
              )}
            />
            {i < items.length - 1 && (
              <div className="w-px flex-1 bg-white/10 min-h-[2rem] mt-1" />
            )}
          </div>
          <div className="pt-0">
            <span className="text-xs text-accent font-mono">{item.time}</span>
            <h4 className="font-medium text-sky-100">{item.title}</h4>
            {item.description && (
              <p className="text-sm text-sky-500 mt-1">{item.description}</p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
