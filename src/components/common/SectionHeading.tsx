import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' && 'text-center mx-auto max-w-3xl',
        className
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {eyebrow && (
        <span className="font-accent text-xs tracking-[0.25em] uppercase text-accent mb-3 block">
          {eyebrow}
        </span>
      )}
      <h2
        className="font-display text-3xl md:text-5xl font-semibold text-balance gradient-text"
        data-text-reveal
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-sky-400 text-lg">{subtitle}</p>
      )}
    </motion.div>
  )
}
