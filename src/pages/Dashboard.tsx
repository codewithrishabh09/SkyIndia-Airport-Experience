import { useQuery } from '@tanstack/react-query'
import { Plane, Activity, Users, IndianRupee, Clock, BarChart3, Download } from 'lucide-react'
import { fetchDashboardStats, fetchChartData } from '@/services/api'
import { SectionHeading } from '@/components/common/SectionHeading'
import { AnalyticsCard } from '@/components/dashboard/AnalyticsCard'
import { DashboardCharts, HeatMapGrid } from '@/components/dashboard/DashboardCharts'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/toast'

export default function Dashboard() {
  const { toast } = useToast()
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: fetchDashboardStats,
  })

  const { data: charts, isLoading: chartsLoading } = useQuery({
    queryKey: ['dashboard-charts'],
    queryFn: fetchChartData,
  })

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <SectionHeading
          eyebrow="Operations"
          title="Airport Dashboard"
          subtitle="Real-time analytics and performance metrics."
          align="left"
          className="mb-0"
        />
        <div className="flex gap-2">
          <select className="h-10 rounded-xl border border-white/10 bg-white/5 px-4 text-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Today</option>
          </select>
          <Button
            variant="outline"
            onClick={() => toast('Export started (demo)', 'success')}
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {statsLoading ? (
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      ) : stats ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-12">
          <AnalyticsCard
            title="Total Flights"
            value={stats.totalFlights}
            icon={Plane}
            change="+12% vs last week"
            trend="up"
            index={0}
          />
          <AnalyticsCard
            title="Active Flights"
            value={stats.activeFlights}
            icon={Activity}
            change="Live"
            trend="neutral"
            index={1}
          />
          <AnalyticsCard
            title="Passengers"
            value={stats.passengers}
            icon={Users}
            change="+8%"
            trend="up"
            index={2}
          />
          <AnalyticsCard
            title="Revenue"
            value={Math.round(stats.revenue / 100000)}
            prefix="₹"
            suffix="L"
            icon={IndianRupee}
            change="+24%"
            trend="up"
            index={3}
          />
          <AnalyticsCard
            title="Delays"
            value={stats.delays}
            icon={Clock}
            change="-3%"
            trend="down"
            index={4}
          />
          <AnalyticsCard
            title="Traffic"
            value={stats.traffic}
            suffix="%"
            icon={BarChart3}
            change="Peak hours"
            trend="neutral"
            index={5}
          />
        </div>
      ) : null}

      {chartsLoading ? (
        <Skeleton className="h-96 w-full" />
      ) : charts ? (
        <>
          <DashboardCharts data={charts} />
          <div className="mt-6">
            <HeatMapGrid data={charts.heatmap} />
          </div>
        </>
      ) : null}
    </div>
  )
}
