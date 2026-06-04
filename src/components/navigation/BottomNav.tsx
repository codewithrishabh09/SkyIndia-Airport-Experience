import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { MOBILE_NAV } from '@/constants/navigation'

export function BottomNav() {
  const location = useLocation()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-white/10 safe-area-pb">
      <div className="flex justify-around items-center h-16 px-2">
        {MOBILE_NAV.map((item) => {
          const active = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center gap-0.5 py-2 px-3 rounded-xl transition-colors min-w-[56px]',
                active ? 'text-accent' : 'text-sky-500'
              )}
            >
              <item.icon className={cn('h-5 w-5', active && 'drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]')} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
