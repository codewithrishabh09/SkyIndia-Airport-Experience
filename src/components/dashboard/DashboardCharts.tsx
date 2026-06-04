import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

const COLORS = ['#38bdf8', '#fbbf24', '#34d399', '#fb7185']

interface ChartData {
  hourly: { hour: string; flights: number; passengers: number }[]
  weekly: { day: string; revenue: number; delays: number }[]
  terminals: { name: string; value: number }[]
}

export function DashboardCharts({ data }: { data: ChartData }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="glass rounded-2xl p-6">
        <h3 className="font-display text-lg mb-4">Hourly Traffic</h3>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={data.hourly}>
            <defs>
              <linearGradient id="colorFlights" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="hour" stroke="#64748b" fontSize={12} />
            <YAxis stroke="#64748b" fontSize={12} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="flights"
              stroke="#38bdf8"
              fill="url(#colorFlights)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="glass rounded-2xl p-6">
        <h3 className="font-display text-lg mb-4">Weekly Revenue (₹M)</h3>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data.weekly}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
            <YAxis stroke="#64748b" fontSize={12} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#fbbf24"
              strokeWidth={2}
              dot={{ fill: '#fbbf24' }}
            />
            <Line
              type="monotone"
              dataKey="delays"
              stroke="#fb7185"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="glass rounded-2xl p-6">
        <h3 className="font-display text-lg mb-4">Delays by Day</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data.weekly}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
            <YAxis stroke="#64748b" fontSize={12} />
            <Tooltip />
            <Bar dataKey="delays" fill="#fb7185" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="glass rounded-2xl p-6">
        <h3 className="font-display text-lg mb-4">Terminal Distribution</h3>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={data.terminals}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
              }
            >
              {data.terminals.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export function HeatMapGrid({
  data,
}: {
  data: { day: number; hour: number; value: number }[]
}) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="glass rounded-2xl p-6 overflow-x-auto">
      <h3 className="font-display text-lg mb-4">Traffic Heat Map</h3>
      <div className="inline-grid gap-0.5 grid-cols-[40px_repeat(24,1fr)]">
        <div />
        {Array.from({ length: 24 }, (_, h) => (
          <div key={h} className="text-[8px] text-sky-600 text-center w-3">
            {h}
          </div>
        ))}
        {days.map((day, d) => (
          <div key={day} className="contents">
            <div className="text-xs text-sky-500 pr-2 flex items-center">
              {day}
            </div>
            {Array.from({ length: 24 }, (_, h) => {
              const cell = data.find((c) => c.day === d && c.hour === h)
              const v = cell?.value ?? 0
              return (
                <div
                  key={`${d}-${h}`}
                  className={`w-3 h-3 rounded-sm heatmap-cell heat-level-${Math.round(v / 10)}`}
                  title={`${day} ${h}:00 — ${v}%`}
                />
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
