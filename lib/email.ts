import { PROFILE_DESCRIPTIONS, DISC_COLORS, DISC_LABELS, scoreToPercent } from './disc-data'
import type { DiscType, DiscScores } from './disc-data'

const FROM = process.env.RESEND_FROM ?? 'Perfil DISC <onboarding@resend.dev>'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://disc-profile-sigma.vercel.app'

function scoreBar(type: DiscType, scores: DiscScores): string {
  const pct = scoreToPercent(scores[type])
  const color = DISC_COLORS[type]
  const label = DISC_LABELS[type]
  return `
    <tr>
      <td style="width:80px;padding:4px 0;font-size:13px;color:#374151;font-weight:600;">
        ${type} — ${label}
      </td>
      <td style="padding:4px 8px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="background:#f3f4f6;border-radius:99px;height:10px;overflow:hidden;">
              <div style="background:${color};width:${pct}%;height:10px;border-radius:99px;"></div>
            </td>
          </tr>
        </table>
      </td>
      <td style="width:40px;padding:4px 0;font-size:13px;font-weight:700;color:${color};text-align:right;">
        ${pct}%
      </td>
    </tr>
  `
}

function buildHtml(params: {
  name: string
  naturalProfile: string
  adaptedProfile: string
  naturalScores: DiscScores
  resultUrl: string
}): string {
  const { name, naturalProfile, adaptedProfile, naturalScores, resultUrl } = params
  const primaryType = naturalProfile.split('_')[0] as DiscType
  const primaryColor = DISC_COLORS[primaryType]
  const profileDesc = PROFILE_DESCRIPTIONS[naturalProfile] ?? PROFILE_DESCRIPTIONS[primaryType]
  const profileTitle = profileDesc?.title ?? naturalProfile
  const profileSummary = profileDesc?.summary ?? ''
  const showAdapted = adaptedProfile !== naturalProfile
  const adaptedDesc = PROFILE_DESCRIPTIONS[adaptedProfile] ?? PROFILE_DESCRIPTIONS[adaptedProfile.split('_')[0] as DiscType]

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#1d4ed8;border-radius:16px 16px 0 0;padding:32px 32px 24px;text-align:center;">
              <p style="margin:0 0 4px;font-size:12px;font-weight:600;letter-spacing:2px;color:#bfdbfe;text-transform:uppercase;">Resultado DISC</p>
              <h1 style="margin:0;font-size:24px;font-weight:800;color:#ffffff;">Perfil de ${name}</h1>
            </td>
          </tr>

          <!-- Profile badge -->
          <tr>
            <td style="background:#ffffff;padding:28px 32px 8px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background:${primaryColor};border-radius:12px;padding:12px 18px;text-align:center;font-size:20px;font-weight:900;color:#fff;letter-spacing:1px;">
                    ${naturalProfile.replace(/_/g, '+')}
                  </td>
                  <td style="padding-left:16px;">
                    <p style="margin:0;font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Perfil Natural</p>
                    <p style="margin:4px 0 0;font-size:20px;font-weight:800;color:#111827;">${profileTitle}</p>
                    ${profileDesc?.label ? `<p style="margin:2px 0 0;font-size:13px;color:#6b7280;">"${profileDesc.label}"</p>` : ''}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Summary -->
          <tr>
            <td style="background:#ffffff;padding:16px 32px;">
              <p style="margin:0;font-size:14px;line-height:1.7;color:#374151;">${profileSummary}</p>
            </td>
          </tr>

          <!-- Scores -->
          <tr>
            <td style="background:#ffffff;padding:8px 32px 24px;">
              <p style="margin:0 0 12px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">Suas pontuações</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${(['D', 'I', 'S', 'C'] as DiscType[]).map((t) => scoreBar(t, naturalScores)).join('')}
              </table>
            </td>
          </tr>

          ${showAdapted ? `
          <!-- Adapted profile -->
          <tr>
            <td style="background:#f9fafb;border-top:1px solid #f3f4f6;padding:20px 32px;">
              <p style="margin:0 0 4px;font-size:11px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;">Perfil Adaptado (trabalho/pressão)</p>
              <p style="margin:0;font-size:16px;font-weight:700;color:#111827;">${adaptedDesc?.title ?? adaptedProfile}</p>
              ${adaptedDesc?.summary ? `<p style="margin:6px 0 0;font-size:13px;color:#6b7280;line-height:1.6;">${adaptedDesc.summary}</p>` : ''}
            </td>
          </tr>` : ''}

          <!-- CTA -->
          <tr>
            <td style="background:#ffffff;${showAdapted ? '' : 'border-top:1px solid #f3f4f6;'}padding:24px 32px;text-align:center;">
              <a href="${resultUrl}" style="display:inline-block;background:#1d4ed8;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:12px;">
                Ver resultado completo →
              </a>
              <p style="margin:12px 0 0;font-size:12px;color:#9ca3af;">Gráfico, dicas de comunicação e mais detalhes no link acima.</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f3f4f6;border-radius:0 0 16px 16px;padding:20px 32px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#9ca3af;">
                Você recebeu este e-mail porque concluiu o teste DISC.<br>
                <a href="${BASE_URL}" style="color:#1d4ed8;text-decoration:none;">disc-profile-sigma.vercel.app</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export async function sendResultEmail(params: {
  name: string
  email: string
  naturalProfile: string
  adaptedProfile: string
  naturalScores: DiscScores
  resultId: string
}): Promise<void> {
  if (!process.env.RESEND_API_KEY) return

  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)

  const resultUrl = `${BASE_URL}/resultado/${params.resultId}`
  const primaryType = params.naturalProfile.split('_')[0] as DiscType
  const profileDesc = PROFILE_DESCRIPTIONS[params.naturalProfile] ?? PROFILE_DESCRIPTIONS[primaryType]
  const profileTitle = profileDesc?.title ?? params.naturalProfile

  await resend.emails.send({
    from: FROM,
    to: params.email,
    subject: `Seu perfil DISC: ${profileTitle}`,
    html: buildHtml({ ...params, resultUrl }),
  })
}
