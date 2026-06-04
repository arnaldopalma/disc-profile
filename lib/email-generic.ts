// E-mail de resultado genérico (Pontos Fortes, SCARF, Temperamentos).
// Faz no-op se RESEND_API_KEY não estiver configurada (não quebra a submissão).

const FROM = process.env.RESEND_FROM ?? 'Autoconhecimento <onboarding@resend.dev>'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://disc-profile-sigma.vercel.app'

export interface EmailRow {
  label: string
  sub?: string
  value?: string
  color: string
}

function rowHtml(r: EmailRow): string {
  return `
    <tr>
      <td style="padding:6px 0;">
        <table width="100%" cellpadding="0" cellspacing="0"><tr>
          <td style="width:6px;background:${r.color};border-radius:3px;">&nbsp;</td>
          <td style="padding-left:12px;">
            <span style="font-size:15px;font-weight:700;color:#111827;">${r.label}</span>
            ${r.sub ? `<span style="font-size:13px;color:#6b7280;"> — ${r.sub}</span>` : ''}
          </td>
          ${r.value ? `<td style="text-align:right;font-size:14px;font-weight:700;color:${r.color};white-space:nowrap;">${r.value}</td>` : ''}
        </tr></table>
      </td>
    </tr>`
}

function buildHtml(params: {
  name: string
  badge: string
  heading: string
  intro?: string
  rows: EmailRow[]
  resultUrl: string
  testName: string
}): string {
  const { name, badge, heading, intro, rows, resultUrl, testName } = params
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <tr>
          <td style="background:#1d4ed8;border-radius:16px 16px 0 0;padding:32px 32px 24px;text-align:center;">
            <p style="margin:0 0 4px;font-size:12px;font-weight:600;letter-spacing:2px;color:#bfdbfe;text-transform:uppercase;">${badge}</p>
            <h1 style="margin:0;font-size:24px;font-weight:800;color:#ffffff;">${name}</h1>
          </td>
        </tr>

        <tr>
          <td style="background:#ffffff;padding:28px 32px 8px;">
            <p style="margin:0 0 4px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">${heading}</p>
            ${intro ? `<p style="margin:8px 0 0;font-size:14px;line-height:1.7;color:#374151;">${intro}</p>` : ''}
          </td>
        </tr>

        <tr>
          <td style="background:#ffffff;padding:8px 32px 20px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${rows.map(rowHtml).join('')}
            </table>
          </td>
        </tr>

        <tr>
          <td style="background:#ffffff;border-top:1px solid #f3f4f6;padding:24px 32px;text-align:center;">
            <a href="${resultUrl}" style="display:inline-block;background:#1d4ed8;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:12px;">
              Ver resultado completo →
            </a>
            <p style="margin:12px 0 0;font-size:12px;color:#9ca3af;">Descrições detalhadas e mais no link acima.</p>
          </td>
        </tr>

        <tr>
          <td style="background:#f3f4f6;border-radius:0 0 16px 16px;padding:20px 32px;text-align:center;">
            <p style="margin:0;font-size:12px;color:#9ca3af;">
              Você recebeu este e-mail porque concluiu o teste ${testName}.<br>
              <a href="${BASE_URL}" style="color:#1d4ed8;text-decoration:none;">disc-profile-sigma.vercel.app</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export async function sendGenericResultEmail(params: {
  to: string
  subject: string
  name: string
  badge: string
  heading: string
  intro?: string
  rows: EmailRow[]
  resultPath: string // ex.: 'resultado-scarf'
  resultId: string
  testName: string
}): Promise<void> {
  if (!process.env.RESEND_API_KEY) return

  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)

  const resultUrl = `${BASE_URL}/${params.resultPath}/${params.resultId}`

  await resend.emails.send({
    from: FROM,
    to: params.to,
    subject: params.subject,
    html: buildHtml({
      name: params.name,
      badge: params.badge,
      heading: params.heading,
      intro: params.intro,
      rows: params.rows,
      resultUrl,
      testName: params.testName,
    }),
  })
}
