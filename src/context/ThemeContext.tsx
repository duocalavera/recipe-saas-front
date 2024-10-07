import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react'
import { ThemeKey, themeStyles } from '../themes/themeStyles'

interface ThemeContextType {
  currentTheme: ThemeKey
  setCurrentTheme: (theme: ThemeKey) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>('modernMinimalist')

  useEffect(() => {
    const savedTheme = localStorage.getItem('selectedTheme') as ThemeKey | null
    if (savedTheme && themeStyles[savedTheme]) {
      setCurrentTheme(savedTheme)
    }
  }, [])

  const updateTheme = (theme: ThemeKey) => {
    setCurrentTheme(theme)
    localStorage.setItem('selectedTheme', theme)
  }

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme: updateTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}