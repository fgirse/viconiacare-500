import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const bodySchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().max(30).optional(),
  message: z.string().min(10).max(2000),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = bodySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Ungültige Eingabe' }, { status: 400 })
    }

    const { name, email, phone, message } = parsed.data

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'noreply@viconiacare.de',
      to: ['info@viconiacare.de'],
      replyTo: email,
      subject: `Neue Kontaktanfrage von ${name}`,
      html: `
        <h2>Neue Kontaktanfrage – ViconiaCare</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
        <p><strong>Nachricht:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Interner Fehler' }, { status: 500 })
  }
}
