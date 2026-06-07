import type { SiteConfig, Stat } from '@app-types/index'

export const SITE_CONFIG: SiteConfig = {
  name: 'Shubham International Hospital',
  tagline: 'Your Health, Our Priority',
  description: 'World-class healthcare — coming soon.',
//   address: '123 Healthcare Avenue, Medical District, City',
//   phone: '+1 (555) 123-4567',
//   email: 'contact@shubhamhospital.com',
}

export const STATS: Stat[] = [
  { id: 'stat-1', value: '24/7', label: 'Emergency Care' },
  { id: 'stat-2', value: '24/7', label: 'Pharmacy' },
  { id: 'stat-3', value: 'Modern', label: 'Facilities' },
]
