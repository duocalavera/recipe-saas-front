import React, { useState, useEffect } from 'react'
import { useNotification } from '../context/NotificationContext'
import { TextField, Button, Typography, Box, Paper, Grid } from '@mui/material'

const ProfilePage: React.FC = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [blogName, setBlogName] = useState('')
  const { showNotification } = useNotification()

  useEffect(() => {
    // In a real app, you'd fetch this data from your backend
    setUsername('JohnDoe')
    setEmail('john.doe@example.com')
    const savedBlogName = localStorage.getItem('blogName') || ''
    setBlogName(savedBlogName)
  }, [])

  const handleSave = () => {
    // In a real app, you'd send this data to your backend
    localStorage.setItem('blogName', blogName)
    showNotification('Profile updated successfully!')
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Profile
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Blog Name"
              value={blogName}
              onChange={(e) => setBlogName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={handleSave}
              variant="contained"
              color="primary"
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Subscription
        </Typography>
        <Typography paragraph>
          Current Plan: <strong>Pro</strong>
        </Typography>
        <Button
          variant="outlined"
          color="primary"
        >
          Manage Subscription
        </Button>
      </Paper>
    </Box>
  )
}

export default ProfilePage