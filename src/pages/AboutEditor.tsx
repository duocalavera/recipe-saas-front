import React, { useState, useEffect } from 'react'
import { useNotification } from '../context/NotificationContext'
import { TextField, Button, Typography, Box, Paper } from '@mui/material'

const AboutEditor: React.FC = () => {
  const [aboutContent, setAboutContent] = useState('')
  const { showNotification } = useNotification()

  useEffect(() => {
    const savedContent = localStorage.getItem('aboutContent')
    if (savedContent) {
      setAboutContent(savedContent)
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem('aboutContent', aboutContent)
    showNotification('About page content saved successfully!')
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit About Page
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={10}
          value={aboutContent}
          onChange={(e) => setAboutContent(e.target.value)}
          placeholder="Write your about page content here..."
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
        >
          Save About Page
        </Button>
      </Paper>
    </Box>
  )
}

export default AboutEditor