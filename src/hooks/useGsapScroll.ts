import { useEffect } from 'react'
import {
  initParallax,
  initScrollReveal,
  initStaggerReveal,
  initTextReveal,
  ScrollTrigger,
} from '@/animations/gsap'

export function useGsapScroll(enabled = true) {
  useEffect(() => {
    if (!enabled) return

    initScrollReveal('[data-reveal]')
    initTextReveal('[data-text-reveal]')
    initStaggerReveal('[data-stagger]', '[data-stagger-item]')
    initParallax('[data-parallax]', 0.15)

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [enabled])
}
