export interface SiteInfo {
  name: string
  tagline: string
  established: string
  heroEyebrow: string
  heroTitle: string
  heroAccent: string
  heroLead: string
  phone: string
  emergencyPhone: string
  email: string
  address: string
  addressFull: string
  footerBlurb: string
  accreditationLine: string
}

export interface Stat {
  id: string
  value: string
  label: string
}

export interface Doctor {
  id: string
  name: string
  designation: string
  department: string
  photo: string
  bio: string
  featured: boolean
}

export interface Service {
  id: string
  title: string
  icon: string
  desc: string
  cta: string
}

export interface CriticalCare {
  id: string
  title: string
  desc: string
  tag?: string
  cta?: string
  features?: string[]
  note?: string
  highlight?: boolean
}

export interface Package {
  id: string
  name: string
  desc: string
  oldPrice: string
  price: string
  features: string[]
  featured: boolean
  badge?: string
  image?: string
}

export interface Insight {
  id: string
  category: string
  title: string
  excerpt: string
  content?: string
  date: string
  image: string
}

export interface Value {
  id: string
  icon: string
  title: string
  desc: string
}

export interface Accreditation {
  id: string
  icon: string
  label: string
}

export interface AboutData {
  heroEyebrow: string
  heroTitle: string
  heroAccent: string
  heroImage: string
  vision: string
  mission: string
  journeyTitle: string
  journeyImage: string
  journeyBody: string
  leadershipQuote: string
}

export interface CareersData {
  heroBadge: string
  heroTitle: string
  heroLead: string
  heroImage: string
  recruitmentEmail: string
  recruitmentPhone: string
}

export interface Benefit {
  id: string
  icon: string
  title: string
  desc: string
}

export interface Job {
  id: string
  title: string
  type: string
  category: string
  location: string
  desc: string
}

export interface GalleryItem {
  id: string
  category: string
  caption: string
  image: string
}

export interface SiteData {
  site: SiteInfo
  stats: Stat[]
  doctors: Doctor[]
  services: Service[]
  criticalCare: CriticalCare[]
  packages: Package[]
  insights: Insight[]
  values: Value[]
  accreditations: Accreditation[]
  about: AboutData
  careers: CareersData
  benefits: Benefit[]
  jobs: Job[]
  gallery: GalleryItem[]
  departments: string[]
}
