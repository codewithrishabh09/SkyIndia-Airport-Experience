import { motion } from 'framer-motion'
import { Cloud } from 'lucide-react'
import { Airplane3D } from './Airplane3D'
import heroVideo from '@/Gallery/14197749_1920_1080_120fps.mp4'

export function HeroVideo() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        src={heroVideo}
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-sky-950/80 via-sky-950/60 to-sky-950" />
      <FloatingClouds />
    </div>
  )
}

function FloatingClouds() {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-white/10"
          style={{
            top: `${10 + i * 15}%`,
            left: `${-10 + i * 20}%`,
          }}
          animate={{
            x: [0, 100, 0],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <Cloud className="h-24 w-24 md:h-40 md:w-40" />
        </motion.div>
      ))}
    </>
  )
}

export function Hero3DAccent() {
  return (
    <div className="absolute right-0 top-1/4 w-[300px] h-[300px] md:w-[450px] md:h-[450px] opacity-60 pointer-events-none hidden lg:block">
      <Airplane3D />
    </div>
  )
}
