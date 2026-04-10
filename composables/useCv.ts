const CV_URL = '/api/cv'

export interface Social {
  network: string
  url: string
}

export interface Basics {
  name: string
  headline: string
  email: string
  phone: string
  location: string
  website: string
  summary: string
  avatar: string
  social: Social[]
}

export interface Experience {
  company: string
  role: string
  location: string
  startDate: string
  endDate: string | null
  current: boolean
  description: string
  highlights: string[]
}

export interface Education {
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  grade: string | null
  notes: string | null
}

export interface SkillGroup {
  category: string
  items: string[]
}

export interface Certification {
  name: string
  issuer: string
  issued: string
  expires: string | null
  credentialId: string
  credentialUrl: string
}

export interface Project {
  name: string
  description: string
  url: string | null
  repo: string | null
  tech: string[]
  pinned: boolean
}

export interface Language {
  language: string
  proficiency: string
}

export interface CvData {
  meta: { lastUpdated: string }
  basics: Basics
  experience: Experience[]
  certifications: Certification[]
  projects: Project[]
  education: Education[]
  languages: Language[]
  skills: SkillGroup[]
}

export const useCv = () => {
  return useFetch<CvData>(CV_URL, {
    key: 'cv-data',
  })
}

export const formatDateRange = (start: string, end: string | null, current: boolean): string => {
  const fmt = (d: string) => {
    const [year, month] = d.split('-')
    return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString('en-GB', {
      month: 'short',
      year: 'numeric',
    })
  }
  return `${fmt(start)} — ${current || !end ? 'Present' : fmt(end)}`
}
