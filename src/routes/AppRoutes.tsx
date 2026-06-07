import { Routes, Route, Navigate, useNavigate, useLocation, Outlet } from 'react-router-dom'
import { MainLayout } from '@layouts/MainLayout'
import { AdminLayout } from '@components/admin/AdminLayout'
import { HomePage } from '@pages/HomePage'
import { AboutPage } from '@pages/AboutPage'
import { ServicesPage } from '@pages/ServicesPage'
import { DoctorsPage } from '@pages/DoctorsPage'
import { GalleryPage } from '@pages/GalleryPage'
import { PackagesPage } from '@pages/PackagesPage'
import { PackageDetailPage } from '@pages/PackageDetailPage'
import { CareersPage } from '@pages/CareersPage'
import { ContactPage } from '@pages/ContactPage'
import { InsightsPage } from '@pages/InsightsPage'
import { InsightDetailPage } from '@pages/InsightDetailPage'
import { AdminLogin } from '@pages/admin/AdminLogin'
import { AdminDashboard } from '@pages/admin/AdminDashboard'
import { AdminCollection } from '@pages/admin/AdminCollection'
import { AdminInbox } from '@pages/admin/AdminInbox'
import { AdminSettings } from '@pages/admin/AdminSettings'
import { AdminDepartments } from '@pages/admin/AdminDepartments'
import { AdminUsers } from '@pages/admin/AdminUsers'
import { AdminSecurity } from '@pages/admin/AdminSecurity'
import { useAdmin, SCHEMAS, INBOXES, SETTINGS } from '@contexts/AdminContext'
import { useEffect } from 'react'

function AdminLogout() {
  const { logout } = useAdmin()
  const navigate = useNavigate()
  useEffect(() => { logout(); navigate('/admin/login', { replace: true }) }, [logout, navigate])
  return null
}

function AdminHomeRedirect() {
  const { authed } = useAdmin()
  return <Navigate to={authed ? '/admin/dashboard' : '/admin/login'} replace />
}

function RequireAuth() {
  const { authed } = useAdmin()
  const location = useLocation()
  if (!authed) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }
  return <Outlet />
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/insights/:id" element={<InsightDetailPage />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/packages/:id" element={<PackageDetailPage />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route element={<RequireAuth />}>
          <Route index element={<AdminHomeRedirect />} />
          <Route path="dashboard" element={<AdminDashboard />} />
        {Object.keys(SCHEMAS).map((key) => (
          <Route key={key} path={key} element={<AdminCollection />} />
        ))}
        {Object.keys(INBOXES).map((key) => (
          <Route key={key} path={`inbox-${key}`} element={<AdminInbox />} />
        ))}
        {Object.keys(SETTINGS).map((key) => (
          <Route key={key} path={`settings-${key}`} element={<AdminSettings />} />
        ))}
        <Route path="departments" element={<AdminDepartments />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="security" element={<AdminSecurity />} />
        <Route path="logout" element={<AdminLogout />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
