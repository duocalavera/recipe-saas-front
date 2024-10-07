import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Utensils } from 'lucide-react'
import { useNotification } from '../context/NotificationContext'
import { TextField, Button, Typography, Container, Box } from '@mui/material'
import Header from '../components/Header'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../translations'

interface LoginPageProps {
  setIsLoggedIn: (value: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { showNotification } = useNotification()
  const { language } = useLanguage()
  const t = translations[language]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock login logic
    if (email === 'user@example.com' && password === 'password') {
      localStorage.setItem('isLoggedIn', 'true')
      setIsLoggedIn(true)
      showNotification(t.loggedInSuccess)
      navigate('/dashboard')
    } else {
      showNotification(t.invalidCredentials)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Container component="main" maxWidth="xs" className="flex-grow">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Utensils className="text-indigo-600" size={48} />
          <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
            {t.signInToRecipeBlogr}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={t.emailAddress}
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t.password}
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {t.signIn}
            </Button>
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <Button
                fullWidth
                variant="outlined"
              >
                {t.createAccount}
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </div>
  )
}

export default LoginPage