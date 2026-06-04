import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Navbar } from '@/components/navigation/Navbar'
import { Footer } from '@/components/navigation/Footer'
import { BottomNav } from '@/components/navigation/BottomNav'
import { FloatingNav } from '@/components/navigation/FloatingNav'
import { ChatWidget } from '@/components/support/ChatWidget'
import { ParticleBackground } from '@/components/common/ParticleBackground'
import { CustomCursor } from '@/components/common/CustomCursor'
import { useGsapScroll } from '@/hooks/useGsapScroll'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { pageTransition } from '@/animations/variants'

export function MainLayout() {
  const [chatOpen, setChatOpen] = useState(false)
  const location = useLocation()
  useSmoothScroll()
  useGsapScroll()

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      <CustomCursor />
      <Navbar />
      <main className="pt-20 pb-24 md:pb-0">
        <AnimatePresence mode="wait">
          <motion.div key={location.pathname} {...pageTransition}>
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <BottomNav />
      <FloatingNav onChatOpen={() => setChatOpen(true)} />
      <ChatWidget open={chatOpen} onOpenChange={setChatOpen} />
    </div>
  )
}
