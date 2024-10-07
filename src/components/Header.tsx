import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Utensils, User, Menu, X, ChevronDown } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../translations'

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
  const { language, setLanguage } = useLanguage()
  const t = translations[language]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
  }

  const changeLanguage = (lang: 'en' | 'es') => {
    setLanguage(lang)
    setIsLanguageDropdownOpen(false)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center text-xl font-bold text-indigo-600">
            <Utensils className="mr-2" />
            RecipeBlogr
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/pricing" className="text-gray-700 hover:text-indigo-600">{t.pricing}</Link>
            <Link to="/monetization" className="text-gray-700 hover:text-indigo-600">{t.monetization}</Link>
            <div className="relative">
              <button
                onClick={toggleLanguageDropdown}
                className="flex items-center text-gray-700 hover:text-indigo-600"
              >
                {language === 'en' ? 'English' : 'Español'}
                <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                  <button
                    onClick={() => changeLanguage('en')}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white w-full text-left"
                  >
                    English
                  </button>
                  <button
                    onClick={() => changeLanguage('es')}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white w-full text-left"
                  >
                    Español
                  </button>
                </div>
              )}
            </div>
            <Link to="/login" className="text-gray-700 hover:text-indigo-600">{t.login}</Link>
            <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300">
              {t.signUp}
            </Link>
          </div>
          <button className="md:hidden" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <Link to="/pricing" className="block py-2 px-4 text-sm hover:bg-gray-200">{t.pricing}</Link>
          <Link to="/monetization" className="block py-2 px-4 text-sm hover:bg-gray-200">{t.monetization}</Link>
          <button
            onClick={() => changeLanguage(language === 'en' ? 'es' : 'en')}
            className="block w-full text-left py-2 px-4 text-sm hover:bg-gray-200"
          >
            {language === 'en' ? 'Español' : 'English'}
          </button>
          <Link to="/login" className="block py-2 px-4 text-sm hover:bg-gray-200">{t.login}</Link>
          <Link to="/register" className="block py-2 px-4 text-sm hover:bg-gray-200">{t.signUp}</Link>
        </div>
      )}
    </header>
  )
}

export default Header