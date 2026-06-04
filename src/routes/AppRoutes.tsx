import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { Skeleton } from '@/components/ui/skeleton'

const Home = lazy(() => import('@/pages/Home'))
const Flights = lazy(() => import('@/pages/Flights'))
const FlightTracker = lazy(() => import('@/pages/FlightTracker'))
const Destinations = lazy(() => import('@/pages/Destinations'))
const AirportServices = lazy(() => import('@/pages/AirportServices'))
const TerminalGuide = lazy(() => import('@/pages/TerminalGuide'))
const Lounges = lazy(() => import('@/pages/Lounges'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Support = lazy(() => import('@/pages/Support'))
const Contact = lazy(() => import('@/pages/Contact'))

function PageLoader() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-32 space-y-4">
      <Skeleton className="h-12 w-1/3" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-40 w-full" />
    </div>
  )
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          index
          element={
            <Suspense fallback={<PageLoader />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="flights"
          element={
            <Suspense fallback={<PageLoader />}>
              <Flights />
            </Suspense>
          }
        />
        <Route
          path="flight-tracker"
          element={
            <Suspense fallback={<PageLoader />}>
              <FlightTracker />
            </Suspense>
          }
        />
        <Route
          path="destinations"
          element={
            <Suspense fallback={<PageLoader />}>
              <Destinations />
            </Suspense>
          }
        />
        <Route
          path="airport-services"
          element={
            <Suspense fallback={<PageLoader />}>
              <AirportServices />
            </Suspense>
          }
        />
        <Route
          path="terminal-guide"
          element={
            <Suspense fallback={<PageLoader />}>
              <TerminalGuide />
            </Suspense>
          }
        />
        <Route
          path="lounges"
          element={
            <Suspense fallback={<PageLoader />}>
              <Lounges />
            </Suspense>
          }
        />
        <Route
          path="dashboard"
          element={
            <Suspense fallback={<PageLoader />}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path="support"
          element={
            <Suspense fallback={<PageLoader />}>
              <Support />
            </Suspense>
          }
        />
        <Route
          path="contact"
          element={
            <Suspense fallback={<PageLoader />}>
              <Contact />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}
