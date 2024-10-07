import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Home, BookOpen, Palette, Globe, User, DollarSign, BarChart2, Menu, X, Utensils, LogOut, Languages } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../translations'

interface SidebarProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar: React.FC<SidebarProps> = ({ setIsLoggedIn }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language, setLanguage } = useLanguage()
  const t = translations[language]

  const navItems = [
    { to: '/dashboard', icon: Home, label: t.home },
    { to: '/recipes', icon: BookOpen, label: t.recipes },
    { to: '/themes', icon: Palette, label: t.themes },
    { to: '/deploy', icon: Globe, label: t.deploy },
    { to: '/profile', icon: User, label: t.profile },
    { to: '/dashboard/pricing', icon: DollarSign, label: t.pricing },
    { to: '/analytics', icon: BarChart2, label: t.analytics },
  ]

  const handleLogoClick = () => {
    navigate('/dashboard')
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false)
    navigate('/')
  }

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en')
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="bg-white shadow-md w-64 h-screen flex flex-col">
        <div className="p-4">
          <button onClick={handleLogoClick} className="flex items-center text-xl font-bold text-indigo-600">
            <Utensils className="mr-2" />
            RecipeBlogr
          </button>
        </div>
        <nav className="flex-grow overflow-y-auto">
          <ul className="space-y-2 py-4">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`flex items-center px-4 py-2 text-sm font-medium ${
                    location.pathname === item.to
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
                  }`}
                >
                  <item.icon className="mr-3 h-6 w-6" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 mt-auto">
          <button
            onClick={toggleLanguage}
            className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md mb-2"
          >
            <Languages className="mr-3 h-6 w-6" />
            {t.language}: {language === 'en' ? t.english : t.spanish}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md"
          >
            <LogOut className="mr-3 h-6 w-6" />
            {t.logout}
          </button>
        </div>
      </aside>

      {/* Mobile menu button */}
      <div className="md:hidden fixed top-0 left-0 m-4 z-20">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="mobile-menu-button p-2 rounded-md bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-10 bg-gray-800 bg-opacity-75">
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-md p-4">
            <div className="flex items-center justify-between mb-4">
              <button onClick={handleLogoClick} className="flex items-center text-xl font-bold text-indigo-600">
                <Utensils className="mr-2" />
                RecipeBlogr
              </button>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                        location.pathname === item.to
                          ? 'text-indigo-600 bg-indigo-50'
                          : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
                      }`}
                    >
                      <item.icon className="mr-3 h-6 w-6" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-auto pt-4">
              <button
                onClick={toggleLanguage}
                className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md mb-2"
              >
                <Languages className="mr-3 h-6 w-6" />
                {t.language}: {language === 'en' ? t.english : t.spanish}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md"
              >
                <LogOut className="mr-3 h-6 w-6" />
                {t.logout}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Sidebar