import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FloatingNavProps {
  onChatOpen?: () => void
}

export function FloatingNav({ onChatOpen }: FloatingNavProps) {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed right-4 bottom-24 md:bottom-8 z-40 flex flex-col gap-3">
      <AnimatePresence>
        {showTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <Button
              variant="glass"
              size="icon"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <Button
        variant="default"
        size="icon"
        className="rounded-full shadow-lg shadow-accent/30 h-12 w-12"
        onClick={onChatOpen}
        aria-label="Open chat"
        data-magnetic
      >
        <MessageCircle className="h-5 w-5" />
      </Button>
      <Link to="/flight-tracker">
        <Button variant="gold" size="sm" className="shadow-lg">
          Live Tracker
        </Button>
      </Link>
    </div>
  )
}
