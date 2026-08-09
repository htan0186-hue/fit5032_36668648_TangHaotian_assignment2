const json = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  },
  body: JSON.stringify(body)
})

const clean = (value = '') =>
  String(value)
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<\/?[^>]+>/g, '')
    .replace(/javascript:/gi, '')
    .trim()

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return json(200, { ok: true })
  }

  if (event.httpMethod !== 'POST') {
    return json(405, { ok: false, error: 'Method not allowed' })
  }

  try {
    const payload = JSON.parse(event.body || '{}')
    const to = clean(payload.to)
    const subject = clean(payload.subject)
    const message = clean(payload.message)
    const attachment = payload.attachment || null

    if (!to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
      return json(400, { ok: false, error: 'A valid recipient email is required.' })
    }

    if (!subject || !message) {
      return json(400, { ok: false, error: 'Subject and message are required.' })
    }

    const safeAttachment = attachment
      ? {
          filename: clean(attachment.filename || 'silverlink-attachment.txt'),
          contentType: clean(attachment.contentType || 'text/plain'),
          size: Number(attachment.size || 0),
          contentBase64: String(attachment.contentBase64 || '').slice(0, 1500000)
        }
      : null

    if (process.env.RESEND_API_KEY) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || 'SilverLink <onboarding@resend.dev>',
          to,
          subject,
          text: message,
          attachments: safeAttachment
            ? [
                {
                  filename: safeAttachment.filename,
                  content: safeAttachment.contentBase64
                }
              ]
            : []
        })
      })

      const result = await response.json().catch(() => ({}))
      return json(response.ok ? 200 : 502, {
        ok: response.ok,
        provider: 'resend',
        result
      })
    }

    return json(200, {
      ok: true,
      provider: 'demo',
      message: 'Email request validated by serverless function. Add RESEND_API_KEY to send for real.',
      email: {
        to,
        subject,
        message,
        attachment: safeAttachment
          ? {
              filename: safeAttachment.filename,
              contentType: safeAttachment.contentType,
              size: safeAttachment.size
            }
          : null
      }
    })
  } catch (error) {
    return json(500, { ok: false, error: error.message || 'Unexpected server error.' })
  }
}
