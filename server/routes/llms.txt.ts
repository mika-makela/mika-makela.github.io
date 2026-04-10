import { readFileSync } from 'fs'
import { join } from 'path'

export default defineEventHandler((event) => {
  setResponseHeader(event, 'Content-Type', 'text/plain; charset=utf-8')

  const cv = JSON.parse(readFileSync(join(process.cwd(), 'public', 'cv.json'), 'utf-8'))
  const decode = (b64: string) => Buffer.from(b64, 'base64').toString('utf-8')

  const experience = cv.experience.map((e: any) => [
    `### ${e.role} — ${e.company} (${e.location})`,
    `${e.startDate} to ${e.current ? 'Present' : e.endDate}`,
    '',
    e.description,
    ...(e.highlights?.length ? ['', ...e.highlights.map((h: string) => `- ${h}`)] : []),
    '',
  ].join('\n')).join('\n')

  const education = cv.education.map((e: any) => [
    `### ${e.degree} in ${e.field} — ${e.institution}`,
    `${e.startDate.split('-')[0]} to ${e.endDate.split('-')[0]}`,
    ...(e.notes ? ['', e.notes] : []),
    '',
  ].join('\n')).join('\n')

  const skills = cv.skills.map((g: any) =>
    `- **${g.category}**: ${g.items.join(', ')}`
  ).join('\n')

  const social = cv.basics.social.map((s: any) => `- ${s.network}: ${s.url}`).join('\n')

  return [
    `# ${cv.basics.name}`,
    '',
    `> ${cv.basics.headline} · ${cv.basics.location}`,
    '',
    '## About',
    '',
    cv.basics.summary,
    '',
    '## Contact',
    '',
    `- Email: ${decode(cv.basics.email)}`,
    `- Phone: ${decode(cv.basics.phone)}`,
    `- Website: ${cv.basics.website}`,
    social,
    '',
    '## Experience',
    '',
    experience,
    '## Education',
    '',
    education,
    '## Skills',
    '',
    skills,
    '',
    `---`,
    `Last updated: ${cv.meta.lastUpdated}`,
  ].join('\n')
})
