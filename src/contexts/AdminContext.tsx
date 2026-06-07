/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { useSiteData } from '@contexts/SiteContext'
import type { SiteData } from '@app-types/index'

export interface User {
  id: string
  name: string
  username: string
  email: string
  role: string
  password: string
  status: string
}

export interface SchemaField {
  name: string
  label: string
  type: string
  required?: boolean
  placeholder?: string
  options?: Array<{ value: string; label: string }> | (() => Array<{ value: string; label: string }>)
}

export interface SchemaColumn {
  type: string
  field: string
  sub?: string
  label?: string
}

export interface Schema {
  label: string
  singular: string
  icon: string
  collection: keyof SiteData
  group: string
  desc: string
  columns: SchemaColumn[]
  fields: SchemaField[]
}

export interface Inbox {
  label: string
  icon: string
  collection: string
  fields: string[]
}

export interface SettingSchema {
  label: string
  object: string
  fields: SchemaField[]
}

interface AdminState {
  authed: boolean
  user: User | null
  users: User[]
  drawerOpen: boolean
  drawerTitle: string
  drawerBody: ReactNode | null
  drawerSaveCb: (() => void) | null
  activeView: string
  sidebarOpen: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
  setActiveView: (v: string) => void
  openDrawer: (title: string, body: ReactNode, onSave?: () => void) => void
  closeDrawer: () => void
  toggleSidebar: () => void
  closeMobileSidebar: () => void
  getCollection: <T>(key: string) => T[]
  addItem: (key: string, item: Record<string, unknown>) => void
  updateItem: (key: string, id: string, patch: Record<string, unknown>) => void
  removeItem: (key: string, id: string) => void
  moveItem: (key: string, id: string, dir: number) => void
  saveItem: (key: string, data: unknown) => void
  getUsers: () => User[]
  saveUsers: (users: User[]) => void
  currentUser: () => User | null
}

const DEMO_PASS = 'shubham'
const AUTH_KEY = 'shubham_admin_auth'
const USERS_KEY = 'shubham_admin_users'
const CURRENT_KEY = 'shubham_admin_current'

const ROLES = ['Super Admin', 'Administrator', 'Editor', 'Viewer']

const ICON_OPTIONS = ['stethoscope', 'flask', 'scan', 'wave', 'pill', 'kidney', 'shield', 'heart', 'chart', 'plus', 'growth', 'people', 'emergency', 'medal', 'star', 'leaf', 'eye', 'rocket']

function defaultUsers(): User[] {
  return [{ id: 'u1', name: 'Administrator', username: 'admin', email: 'admin@shubham.intl', role: 'Super Admin', password: DEMO_PASS, status: 'active' }]
}

function loadUsers(): User[] {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    if (!raw) { const seed = defaultUsers(); saveUsersToStorage(seed); return seed }
    const arr = JSON.parse(raw) as User[]
    return Array.isArray(arr) && arr.length ? arr : defaultUsers()
  } catch { return defaultUsers() }
}

function saveUsersToStorage(arr: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(arr))
}

function currentUserFromStorage(): User | null {
  const id = sessionStorage.getItem(CURRENT_KEY)
  if (!id) return null
  const users = loadUsers()
  return users.find((u) => u.id === id) || null
}

export function deptOptions(): Array<{ value: string; label: string }> {
  try {
    const raw = localStorage.getItem('shubham_cms_v1')
    if (raw) {
      const data = JSON.parse(raw)
      const depts = data.departments
      if (Array.isArray(depts) && depts.length) return depts.map((d: string) => ({ value: d, label: d }))
    }
  } catch { /* */ }
  return [{ value: 'Cardiology', label: 'Cardiology' }, { value: 'Neurology', label: 'Neurology' }, { value: 'Pediatrics', label: 'Pediatrics' }, { value: 'General Surgery', label: 'General Surgery' }, { value: 'Oncology', label: 'Oncology' }, { value: 'Orthopedics', label: 'Orthopedics' }, { value: 'Urology', label: 'Urology' }, { value: 'Radiology', label: 'Radiology' }]
}

const jobTypeOptions = [{ value: 'Full Time', label: 'Full Time' }, { value: 'Part Time', label: 'Part Time' }, { value: 'Day Shift', label: 'Day Shift' }, { value: 'Contract', label: 'Contract' }]
const jobCategoryOptions = [{ value: 'Medical', label: 'Medical' }, { value: 'Nursing', label: 'Nursing' }, { value: 'Administration', label: 'Administration' }, { value: 'Support', label: 'Support' }]
const accreditationIconOptions = [{ value: 'shield', label: 'shield' }, { value: 'medal', label: 'medal' }, { value: 'star', label: 'star' }, { value: 'leaf', label: 'leaf' }, { value: 'check-circle', label: 'check-circle' }, { value: 'heart', label: 'heart' }]

export const iconSelect = ICON_OPTIONS.map((i) => ({ value: i, label: i }))

export const SCHEMAS: Record<string, Schema> = {
  doctors: {
    label: 'Doctors', singular: 'Doctor', icon: 'people', collection: 'doctors', group: 'Medical',
    desc: 'Manage your medical practitioners and their profiles.',
    columns: [
      { type: 'thumb', field: 'photo' },
      { type: 'title', field: 'name', sub: 'designation' },
      { type: 'text', field: 'department' },
      { type: 'flag', field: 'featured', label: 'Featured' },
    ],
    fields: [
      { name: 'photo', label: 'Photo', type: 'image' },
      { name: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'Dr. John Smith' },
      { name: 'designation', label: 'Designation', type: 'text', placeholder: 'e.g. Chief of Cardiology' },
      { name: 'department', label: 'Department', type: 'select', options: deptOptions },
      { name: 'bio', label: 'Short Bio', type: 'textarea', placeholder: 'Professional background and expertise…' },
      { name: 'featured', label: 'Feature on homepage & leadership section', type: 'toggle' },
    ],
  },
  services: {
    label: 'Services', singular: 'Service', icon: 'stethoscope', collection: 'services', group: 'Content',
    desc: 'Clinical specialties and medical services offered.',
    columns: [
      { type: 'icon', field: 'icon' },
      { type: 'title', field: 'title', sub: 'cta' },
    ],
    fields: [
      { name: 'title', label: 'Service Title', type: 'text', required: true },
      { name: 'icon', label: 'Icon', type: 'select', options: iconSelect },
      { name: 'desc', label: 'Description', type: 'textarea' },
      { name: 'cta', label: 'CTA Text', type: 'text', placeholder: 'Learn More' },
    ],
  },
  'critical-care': {
    label: 'Critical Care', singular: 'Unit', icon: 'emergency', collection: 'criticalCare', group: 'Content',
    desc: 'ICU, HDU, and emergency care units.',
    columns: [
      { type: 'title', field: 'title', sub: 'tag' },
      { type: 'flag', field: 'highlight', label: 'Highlight' },
    ],
    fields: [
      { name: 'title', label: 'Unit Title', type: 'text', required: true },
      { name: 'desc', label: 'Description', type: 'textarea' },
      { name: 'tag', label: 'Tag', type: 'text', placeholder: '24/7' },
      { name: 'cta', label: 'CTA Label', type: 'text' },
      { name: 'features', label: 'Features', type: 'list' },
      { name: 'note', label: 'Note', type: 'text', placeholder: 'Additional info…' },
      { name: 'highlight', label: 'Highlight this unit', type: 'toggle' },
    ],
  },
  packages: {
    label: 'Health Packages', singular: 'Package', icon: 'shield', collection: 'packages', group: 'Content',
    desc: 'Health check-up and treatment packages.',
    columns: [
      { type: 'title', field: 'name', sub: 'price' },
      { type: 'flag', field: 'featured', label: 'Featured' },
      { type: 'pill', field: 'badge' },
    ],
    fields: [
      { name: 'name', label: 'Package Name', type: 'text', required: true },
      { name: 'desc', label: 'Description', type: 'textarea' },
      { name: 'oldPrice', label: 'Original Price', type: 'text', placeholder: '₹15,000' },
      { name: 'price', label: 'Discounted Price', type: 'text', placeholder: '₹7,999' },
      { name: 'features', label: 'Inclusions', type: 'list' },
      { name: 'image', label: 'Image', type: 'image' },
      { name: 'featured', label: 'Featured highlight', type: 'toggle' },
      { name: 'badge', label: 'Badge Text', type: 'text', placeholder: 'Best Seller' },
    ],
  },
  jobs: {
    label: 'Job Openings', singular: 'Job', icon: 'briefcase', collection: 'jobs', group: 'Careers',
    desc: 'Current job listings and open positions.',
    columns: [
      { type: 'title', field: 'title', sub: 'location' },
      { type: 'pill', field: 'type' },
      { type: 'pill', field: 'category' },
    ],
    fields: [
      { name: 'title', label: 'Job Title', type: 'text', required: true },
      { name: 'type', label: 'Type', type: 'select', options: jobTypeOptions },
      { name: 'category', label: 'Category', type: 'select', options: jobCategoryOptions },
      { name: 'location', label: 'Location', type: 'text', placeholder: 'Main Campus, Kathmandu' },
      { name: 'desc', label: 'Description', type: 'textarea' },
    ],
  },
  insights: {
    label: 'Health Insights', singular: 'Article', icon: 'chart', collection: 'insights', group: 'Content',
    desc: 'Blog posts, news, and health articles.',
    columns: [
      { type: 'pill', field: 'category' },
      { type: 'title', field: 'title', sub: 'date' },
    ],
    fields: [
      { name: 'category', label: 'Category', type: 'text', placeholder: 'Wellness' },
      { name: 'title', label: 'Article Title', type: 'text', required: true },
      { name: 'excerpt', label: 'Excerpt', type: 'textarea' },
      { name: 'content', label: 'Full Content', type: 'textarea' },
      { name: 'date', label: 'Publish Date', type: 'date' },
      { name: 'image', label: 'Featured Image', type: 'image' },
    ],
  },
  gallery: {
    label: 'Gallery', singular: 'Image', icon: 'image', collection: 'gallery', group: 'Media',
    desc: 'Photos from the hospital campus and events.',
    columns: [
      { type: 'thumb', field: 'image' },
      { type: 'title', field: 'caption' },
      { type: 'pill', field: 'category' },
    ],
    fields: [
      { name: 'category', label: 'Category', type: 'text', placeholder: 'Infrastructure' },
      { name: 'caption', label: 'Caption', type: 'text' },
      { name: 'image', label: 'Image File', type: 'image' },
    ],
  },
  values: {
    label: 'Values', singular: 'Value', icon: 'heart', collection: 'values', group: 'Content',
    desc: 'Core values displayed on the homepage.',
    columns: [
      { type: 'icon', field: 'icon' },
      { type: 'title', field: 'title' },
    ],
    fields: [
      { name: 'title', label: 'Value Title', type: 'text', required: true },
      { name: 'icon', label: 'Icon', type: 'select', options: iconSelect },
      { name: 'desc', label: 'Description', type: 'textarea' },
    ],
  },
  stats: {
    label: 'Statistics', singular: 'Stat', icon: 'chart', collection: 'stats', group: 'Page Sections',
    desc: 'The headline counters (Years of Care, Surgeries, etc.).',
    columns: [
      { type: 'title', field: 'value', sub: 'label' },
    ],
    fields: [
      { name: 'value', label: 'Value', type: 'text', required: true, placeholder: 'e.g. 500+' },
      { name: 'label', label: 'Label', type: 'text', required: true, placeholder: 'e.g. Surgeries' },
    ],
  },
  accreditations: {
    label: 'Accreditations', singular: 'Badge', icon: 'medal', collection: 'accreditations', group: 'Media',
    desc: 'Accreditation and certification badges.',
    columns: [
      { type: 'icon', field: 'icon' },
      { type: 'title', field: 'label' },
    ],
    fields: [
      { name: 'icon', label: 'Icon', type: 'select', options: accreditationIconOptions },
      { name: 'label', label: 'Label', type: 'text', required: true },
    ],
  },
  benefits: {
    label: 'Benefits', singular: 'Benefit', icon: 'growth', collection: 'benefits', group: 'Careers',
    desc: 'Employee benefits shown on the careers page.',
    columns: [
      { type: 'icon', field: 'icon' },
      { type: 'title', field: 'title' },
    ],
    fields: [
      { name: 'title', label: 'Benefit Title', type: 'text', required: true },
      { name: 'icon', label: 'Icon', type: 'select', options: iconSelect },
      { name: 'desc', label: 'Description', type: 'textarea' },
    ],
  },
}

export const INBOXES: Record<string, Inbox> = {
  appointments: { label: 'Appointments', icon: 'calendar', collection: 'appointments', fields: ['name', 'phone', 'email', 'department', 'doctor', 'date', 'reason'] },
  inquiries: { label: 'Inquiries', icon: 'mail', collection: 'inquiries', fields: ['name', 'email', 'message'] },
  applications: { label: 'Applications', icon: 'briefcase', collection: 'applications', fields: ['name', 'email', 'department', 'role', 'resumeName'] },
}

export const SETTINGS: Record<string, SettingSchema> = {
  site: {
    label: 'Site & Contact', object: 'site',
    fields: [
      { name: 'name', label: 'Hospital Name', type: 'text' },
      { name: 'tagline', label: 'Tagline', type: 'text' },
      { name: 'established', label: 'Established Year', type: 'text' },
      { name: 'heroEyebrow', label: 'Homepage Hero — Eyebrow', type: 'text' },
      { name: 'heroTitle', label: 'Homepage Hero — Title', type: 'text' },
      { name: 'heroAccent', label: 'Homepage Hero — Accent Word', type: 'text' },
      { name: 'heroLead', label: 'Homepage Hero — Lead', type: 'textarea' },
      { name: 'phone', label: 'Main Phone', type: 'text' },
      { name: 'emergencyPhone', label: 'Emergency Phone', type: 'text' },
      { name: 'email', label: 'Email', type: 'text' },
      { name: 'address', label: 'Short Address', type: 'text' },
      { name: 'addressFull', label: 'Full Address', type: 'textarea' },
      { name: 'footerBlurb', label: 'Footer Blurb', type: 'textarea' },
      { name: 'accreditationLine', label: 'Footer Accreditation Line', type: 'text' },
    ],
  },
  about: {
    label: 'About Page', object: 'about',
    fields: [
      { name: 'heroEyebrow', label: 'Hero Eyebrow', type: 'text' },
      { name: 'heroTitle', label: 'Hero Title', type: 'text' },
      { name: 'heroAccent', label: 'Hero Accent', type: 'text' },
      { name: 'heroImage', label: 'Hero Image', type: 'image' },
      { name: 'vision', label: 'Our Vision', type: 'textarea' },
      { name: 'mission', label: 'Our Mission', type: 'textarea' },
      { name: 'journeyTitle', label: 'Journey Title', type: 'text' },
      { name: 'journeyImage', label: 'Heritage Image', type: 'image' },
      { name: 'journeyBody', label: 'Journey Body', type: 'textarea' },
      { name: 'leadershipQuote', label: 'Leadership Quote', type: 'textarea' },
    ],
  },
  careers: {
    label: 'Careers Page', object: 'careers',
    fields: [
      { name: 'heroBadge', label: 'Hero Badge', type: 'text' },
      { name: 'heroTitle', label: 'Hero Title', type: 'text' },
      { name: 'heroLead', label: 'Hero Lead', type: 'textarea' },
      { name: 'heroImage', label: 'Hero Image', type: 'image' },
      { name: 'recruitmentEmail', label: 'Recruitment Email', type: 'text' },
      { name: 'recruitmentPhone', label: 'Recruitment Phone', type: 'text' },
    ],
  },
}

const AdminContext = createContext<AdminState | null>(null)

function uid(prefix: string): string {
  return (prefix || 'id') + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
}

export function AdminProvider({ children }: { children: ReactNode }) {
  const siteData = useSiteData()
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === '1' && !!currentUserFromStorage())
  const [user, setUser] = useState<User | null>(() => currentUserFromStorage())
  const [users, setUsersState] = useState<User[]>(() => loadUsers())
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerTitle, setDrawerTitle] = useState('')
  const [drawerBody, setDrawerBody] = useState<ReactNode>(null)
  const [drawerSaveCb, setDrawerSaveCb] = useState<(() => void) | null>(null)
  const [activeView, setActiveView] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const login = useCallback((username: string, password: string): boolean => {
    const u = loadUsers().find((x) => {
      return x.status === 'active' && (x.username.toLowerCase() === username.toLowerCase() || x.email?.toLowerCase() === username.toLowerCase()) && x.password === password
    })
    if (u) {
      sessionStorage.setItem(AUTH_KEY, '1')
      sessionStorage.setItem(CURRENT_KEY, u.id)
      setAuthed(true)
      setUser(u)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem(AUTH_KEY)
    sessionStorage.removeItem(CURRENT_KEY)
    setAuthed(false)
    setUser(null)
    setActiveView('dashboard')
  }, [])

  const updateUsers = useCallback((newUsers: User[]) => {
    saveUsersToStorage(newUsers)
    setUsersState(newUsers)
    const cu = currentUserFromStorage()
    if (cu) setUser(cu)
  }, [])

  const openDrawer = useCallback((title: string, body: ReactNode, onSave?: () => void) => {
    setDrawerTitle(title)
    setDrawerBody(body)
    setDrawerSaveCb(() => onSave || null)
    setDrawerOpen(true)
  }, [])

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false)
    setDrawerTitle('')
    setDrawerBody(null)
    setDrawerSaveCb(null)
  }, [])

  const toggleSidebar = useCallback(() => setSidebarOpen((p) => !p), [])
  const closeMobileSidebar = useCallback(() => setSidebarOpen(false), [])

  const getCollection = useCallback(<T,>(key: string): T[] => {
    const data = (siteData as unknown as Record<string, unknown>)[key]
    return (data as T[]) || []
  }, [siteData])

  const storeKey = 'shubham_cms_v1'

  const addItem = useCallback((key: string, item: Record<string, unknown>) => {
    try {
      const raw = localStorage.getItem(storeKey)
      if (raw) {
        const data = JSON.parse(raw)
        if (!Array.isArray(data[key])) data[key] = []
        item.id = uid(key.slice(0, 2))
        data[key].unshift(item)
        localStorage.setItem(storeKey, JSON.stringify(data))
      }
    } catch { /* ignore */ }
  }, [])

  const updateItem = useCallback((key: string, id: string, patch: Record<string, unknown>) => {
    try {
      const raw = localStorage.getItem(storeKey)
      if (raw) {
        const data = JSON.parse(raw)
        const arr = data[key] || []
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].id === id) { arr[i] = { ...arr[i], ...patch }; break }
        }
        data[key] = arr
        localStorage.setItem(storeKey, JSON.stringify(data))
      }
    } catch { /* ignore */ }
  }, [])

  const removeItem = useCallback((key: string, id: string) => {
    try {
      const raw = localStorage.getItem(storeKey)
      if (raw) {
        const data = JSON.parse(raw)
        data[key] = (data[key] || []).filter((x: Record<string, unknown>) => x.id !== id)
        localStorage.setItem(storeKey, JSON.stringify(data))
      }
    } catch { /* ignore */ }
  }, [])

  const saveItem = useCallback((key: string, data: unknown) => {
    try {
      const raw = localStorage.getItem(storeKey)
      const store = raw ? JSON.parse(raw) : {}
      store[key] = data
      localStorage.setItem(storeKey, JSON.stringify(store))
    } catch { /* */ }
  }, [])

  const moveItem = useCallback((key: string, id: string, dir: number) => {
    try {
      const raw = localStorage.getItem(storeKey)
      if (raw) {
        const data = JSON.parse(raw)
        const arr = data[key] || []
        const i = arr.findIndex((x: Record<string, unknown>) => x.id === id)
        if (i < 0) return
        const j = i + dir
        if (j < 0 || j >= arr.length) return
        const tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp
        data[key] = arr
        localStorage.setItem(storeKey, JSON.stringify(data))
      }
    } catch { /* ignore */ }
  }, [])

  const value: AdminState = {
    authed, user, users, drawerOpen, drawerTitle, drawerBody, drawerSaveCb, activeView, sidebarOpen,
    login, logout, setActiveView, openDrawer, closeDrawer, toggleSidebar, closeMobileSidebar,
    getCollection, addItem, updateItem, removeItem, moveItem, saveItem,
    getUsers: loadUsers, saveUsers: updateUsers, currentUser: currentUserFromStorage,
  }

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
}

export function useAdmin(): AdminState {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider')
  return ctx
}

export { ROLES }
