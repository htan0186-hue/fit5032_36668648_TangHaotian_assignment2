const csvEscape = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`
const json = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-SilverLink-Admin',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  },
  body: JSON.stringify(body)
})

const allowedColumns = new Set(['name', 'category', 'suburb', 'location', 'cost', 'phone', 'date'])
const hasAdminHeader = (event) =>
  process.env.SILVERLINK_EXPORT_TOKEN &&
  event.headers['x-silverlink-admin'] === process.env.SILVERLINK_EXPORT_TOKEN

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return json(200, { ok: true })
  }

  if (event.httpMethod !== 'POST') {
    return json(405, { ok: false, error: 'Method not allowed' })
  }

  if (process.env.SILVERLINK_EXPORT_TOKEN && !hasAdminHeader(event)) {
    return json(403, { ok: false, error: 'Admin export token is required.' })
  }

  try {
    const payload = JSON.parse(event.body || '{}')
    const rows = Array.isArray(payload.rows) ? payload.rows.slice(0, 100) : []
    const columns = Array.isArray(payload.columns)
      ? payload.columns.filter((column) => allowedColumns.has(column)).slice(0, 8)
      : []

    if (columns.length === 0) {
      return json(400, { ok: false, error: 'At least one allowed column is required.' })
    }

    const header = columns.map(csvEscape).join(',')
    const body = rows
      .map((row) => columns.map((column) => csvEscape(row[column])).join(','))
      .join('\n')

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="silverlink-export.csv"'
      },
      body: `${header}\n${body}`
    }
  } catch {
    return json(400, { ok: false, error: 'Invalid JSON payload.' })
  }
}
