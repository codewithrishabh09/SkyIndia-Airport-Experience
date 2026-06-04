import { SectionHeading } from '@/components/common/SectionHeading'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Bot, Phone, Mail, MessageCircle } from 'lucide-react'
import faqData from '@/data/faq.json'
import { Link } from 'react-router-dom'

export default function Support() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <SectionHeading
        eyebrow="Help Center"
        title="Support"
        subtitle="AI assistant, FAQs, and 24/7 concierge channels."
        align="left"
      />

      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {[
          {
            icon: Bot,
            title: 'AI Travel Assistant',
            desc: 'Instant answers for flights, lounges, and terminals.',
            action: 'Use chat button (bottom right)',
          },
          {
            icon: Phone,
            title: '24/7 Hotline',
            desc: '+91 1800 SKY INDIA',
            action: 'Call now',
          },
          {
            icon: Mail,
            title: 'Email Support',
            desc: 'concierge@skyindia.aero',
            action: 'Send email',
          },
        ].map((item) => (
          <Card key={item.title}>
            <CardContent className="p-6">
              <item.icon className="h-8 w-8 text-accent mb-4" />
              <h3 className="font-display text-lg">{item.title}</h3>
              <p className="text-sm text-sky-400 mt-2">{item.desc}</p>
              <p className="text-xs text-accent mt-4">{item.action}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <SectionHeading title="FAQ" align="left" className="mb-8" />
      <Accordion type="single" collapsible className="max-w-3xl">
        {faqData.map((item, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Card className="mt-16">
        <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <MessageCircle className="h-10 w-10 text-accent" />
            <div>
              <h3 className="font-display text-xl">Need more help?</h3>
              <p className="text-sky-400">Our team responds within 2 hours.</p>
            </div>
          </div>
          <Link to="/contact">
            <Button>Contact Us</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
