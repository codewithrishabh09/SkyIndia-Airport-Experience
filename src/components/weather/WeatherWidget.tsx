import { Cloud, Droplets, Thermometer } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface WeatherWidgetProps {
  temp: number
  condition: string
  humidity: number
  city?: string
  className?: string
}

export function WeatherWidget({
  temp,
  condition,
  humidity,
  city,
  className,
}: WeatherWidgetProps) {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardContent className="p-4">
        {city && (
          <p className="text-xs text-sky-500 uppercase tracking-wider mb-2">
            {city}
          </p>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-accent/10">
              <Cloud className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-3xl font-display font-semibold">{temp}°C</p>
              <p className="text-sm text-sky-400">{condition}</p>
            </div>
          </div>
          <div className="text-right space-y-2 text-xs text-sky-500">
            <div className="flex items-center gap-1 justify-end">
              <Thermometer className="h-3 w-3" />
              Feels {temp + 2}°
            </div>
            <div className="flex items-center gap-1 justify-end">
              <Droplets className="h-3 w-3" />
              {humidity}% humidity
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
