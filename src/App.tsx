import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import ThemeSelector from './pages/ThemeSelector'
import RecipeEditor from './pages/RecipeEditor'
import RecipeList from './pages/RecipeList'
import DeploymentPage from './pages/DeploymentPage'
import ProfilePage from './pages/ProfilePage'
import PricingPage from './pages/PricingPage'
import LoggedInPricingPage from './pages/LoggedInPricingPage'
import MonetizationPage from './pages/MonetizationPage'
import AboutEditor from './pages/AboutEditor'
import RecipeDetail from './pages/RecipeDetail'
import AnalyticsPage from './pages/AnalyticsPage'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import PasswordResetPage from './pages/PasswordResetPage'
import FAQPage from './pages/FAQPage'
import { ThemeProvider as CustomThemeProvider } from './context/ThemeContext'
import { RecipesProvider } from './context/RecipesContext'
import { NotificationProvider } from './context/NotificationContext'
import { LanguageProvider } from './context/LanguageContext'
import theme from './theme'

const Layout = ({ isLoggedIn, setIsLoggedIn }: { isLoggedIn: boolean; setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>> }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar setIsLoggedIn={setIsLoggedIn} />
      <div className="flex-1 overflow-hidden">
        <main className="h-full overflow-y-auto bg-gray-200 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true'
    setIsLoggedIn(loggedInStatus)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CustomThemeProvider>
        <RecipesProvider>
          <NotificationProvider>
            <LanguageProvider>
              <CssBaseline />
              <Router>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/reset-password" element={<PasswordResetPage />} />
                  <Route path="/pricing" element={isLoggedIn ? <Navigate to="/dashboard/pricing" replace /> : <PricingPage />} />
                  <Route path="/monetization" element={<MonetizationPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route element={<Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/recipes" element={<RecipeList />} />
                    <Route path="/editor" element={<RecipeEditor />} />
                    <Route path="/editor/:id" element={<RecipeEditor />} />
                    <Route path="/themes" element={<ThemeSelector />} />
                    <Route path="/deploy" element={<DeploymentPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/dashboard/pricing" element={<LoggedInPricingPage />} />
                    <Route path="/about-editor" element={<AboutEditor />} />
                    <Route path="/recipe/:id" element={<RecipeDetail />} />
                    <Route path="/analytics" element={<AnalyticsPage />} />
                  </Route>
                </Routes>
              </Router>
            </LanguageProvider>
          </NotificationProvider>
        </RecipesProvider>
      </CustomThemeProvider>
    </ThemeProvider>
  )
}

export default App