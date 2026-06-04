import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import type { Mesh } from 'three'

function AirplaneMesh() {
  const ref = useRef<Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.3
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={ref} scale={1.2}>
        <coneGeometry args={[0.4, 1.2, 4]} />
        <meshStandardMaterial color="#38bdf8" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, -0.3]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[1.8, 0.08, 0.4]} />
        <meshStandardMaterial color="#0ea5e9" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.2, 0.2]}>
        <boxGeometry args={[0.3, 0.5, 0.6]} />
        <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.4} />
      </mesh>
    </Float>
  )
}

export function Airplane3D({ className }: { className?: string }) {
  return (
    <div className={className} style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} color="#fbbf24" intensity={0.5} />
        <AirplaneMesh />
      </Canvas>
    </div>
  )
}

export function FloatingGlobe({ className }: { className?: string }) {
  return (
    <div className={className} style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 0, 3.5], fov: 50 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1}>
          <mesh>
            <sphereGeometry args={[1, 64, 64]} />
            <MeshDistortMaterial
              color="#0ea5e9"
              attach="material"
              distort={0.15}
              speed={2}
              roughness={0.4}
              metalness={0.6}
            />
          </mesh>
        </Float>
        {[...Array(8)].map((_, i) => {
          const phi = (i / 8) * Math.PI * 2
          return (
            <mesh
              key={i}
              position={[
                Math.cos(phi) * 1.4,
                Math.sin(phi * 2) * 0.3,
                Math.sin(phi) * 1.4,
              ]}
            >
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshBasicMaterial color="#fbbf24" />
            </mesh>
          )
        })}
      </Canvas>
    </div>
  )
}
