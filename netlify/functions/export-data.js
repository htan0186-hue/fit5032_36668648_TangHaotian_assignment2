const csvEscape = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`

export const handler = async (event) => {
  const payload = JSON.parse(event.body || '{}')
  const rows = Array.isArray(payload.rows) ? payload.rows : []
  const columns = Array.isArray(payload.columns) ? payload.columns : []
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
}
