import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, X, Minimize2 } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { sendChatMessage } from '@/services/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ChatWidgetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const SUGGESTIONS = [
  'Find flights to Mumbai',
  'Lounge access at Delhi T3',
  'Terminal gate navigation',
  'Weather in Goa',
]

export function ChatWidget({ open, onOpenChange }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Welcome to SkyIndia AI Travel Assistant. I can help with flights, lounges, terminals, and travel tips.',
    },
  ])
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  const mutation = useMutation({
    mutationFn: sendChatMessage,
    onSuccess: (reply) => {
      setMessages((m) => [...m, { role: 'assistant', content: reply }])
    },
  })

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [messages])

  const send = (text: string) => {
    if (!text.trim()) return
    setMessages((m) => [...m, { role: 'user', content: text }])
    setInput('')
    mutation.mutate(text)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-24 md:bottom-8 left-4 right-4 md:left-auto md:right-24 md:w-[400px] z-50 glass-strong rounded-2xl shadow-2xl flex flex-col max-h-[70vh]"
        >
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-accent/20">
                <Bot className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="font-medium text-sm">AI Travel Assistant</p>
                <p className="text-xs text-emerald">Online · Mock responses</p>
              </div>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[280px]">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  'flex gap-2',
                  msg.role === 'user' && 'flex-row-reverse'
                )}
              >
                <div
                  className={cn(
                    'shrink-0 h-8 w-8 rounded-lg flex items-center justify-center',
                    msg.role === 'assistant'
                      ? 'bg-accent/20'
                      : 'bg-gold/20'
                  )}
                >
                  {msg.role === 'assistant' ? (
                    <Bot className="h-4 w-4 text-accent" />
                  ) : (
                    <User className="h-4 w-4 text-gold" />
                  )}
                </div>
                <div
                  className={cn(
                    'rounded-xl px-4 py-2 text-sm max-w-[85%]',
                    msg.role === 'assistant'
                      ? 'bg-white/5 text-sky-200'
                      : 'bg-accent/20 text-sky-100'
                  )}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {mutation.isPending && (
              <div className="flex gap-2">
                <div className="h-8 w-8 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-accent animate-pulse" />
                </div>
                <div className="bg-white/5 rounded-xl px-4 py-2 text-sm text-sky-500">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-white/10">
            <div className="flex flex-wrap gap-2 mb-3">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="text-xs px-2 py-1 rounded-lg bg-white/5 text-sky-400 hover:bg-accent/10 hover:text-accent transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about flights, lounges..."
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={mutation.isPending}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
