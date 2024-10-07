import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Typography, Container, Box } from '@mui/material'
import { useNotification } from '../context/NotificationContext'
import Header from '../components/Header'

const PasswordResetPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  const { showNotification } = useNotification()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send a request to your backend to initiate the password reset process
    // For this example, we'll just show a notification
    showNotification(`Password reset link sent to ${email}`)
    navigate('/login')
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
          <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
            Reset Your Password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send Reset Link
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  )
}

export default PasswordResetPage