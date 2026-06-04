import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initScrollReveal(selector: string, options?: gsap.TweenVars) {
  const elements = document.querySelectorAll(selector)
  elements.forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 50,
      duration: 0.9,
      ease: 'power3.out',
      ...options,
    })
  })
}

export function initStaggerReveal(
  container: string,
  child: string,
  stagger = 0.12
) {
  const el = document.querySelector(container)
  if (!el) return

  gsap.from(el.querySelectorAll(child), {
    scrollTrigger: {
      trigger: el,
      start: 'top 80%',
    },
    opacity: 0,
    y: 40,
    stagger,
    duration: 0.7,
    ease: 'power2.out',
  })
}

export function initParallax(selector: string, speed = 0.3) {
  const el = document.querySelector(selector)
  if (!el) return

  gsap.to(el, {
    scrollTrigger: {
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
    y: () => window.innerHeight * speed,
    ease: 'none',
  })
}

export function initTextReveal(selector: string) {
  const elements = document.querySelectorAll(selector)
  elements.forEach((el) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 90%' },
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power4.out',
    })
  })
}

export { gsap, ScrollTrigger }
