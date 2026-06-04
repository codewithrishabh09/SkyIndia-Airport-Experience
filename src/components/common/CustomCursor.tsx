import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useIsMobile } from '@/hooks/useMediaQuery'

export function CustomCursor() {
  const isMobile = useIsMobile()
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    if (isMobile) return

    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setHovering(
        !!target.closest('a, button, [data-magnetic], input, select, textarea')
      )
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', onOver)
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[9999] mix-blend-difference hidden md:block"
        animate={{ x: pos.x - 6, y: pos.y - 6 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      >
        <div className="h-3 w-3 rounded-full bg-white" />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed z-[9998] hidden md:block border border-accent/50 rounded-full"
        animate={{
          x: pos.x - (hovering ? 24 : 16),
          y: pos.y - (hovering ? 24 : 16),
          width: hovering ? 48 : 32,
          height: hovering ? 48 : 32,
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
      />
    </>
  )
}
