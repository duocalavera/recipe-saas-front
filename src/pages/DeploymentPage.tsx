import React, { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useNotification } from '../context/NotificationContext'
import { TextField, Button, Typography, Box, Paper } from '@mui/material'

const DeploymentPage: React.FC = () => {
  const { currentTheme } = useTheme()
  const { showNotification } = useNotification()
  const [isDeploying, setIsDeploying] = useState(false)
  const [deployedUrl, setDeployedUrl] = useState<string | null>(null)
  const [blogName, setBlogName] = useState('')

  useEffect(() => {
    const savedBlogName = localStorage.getItem('blogName') || ''
    setBlogName(savedBlogName)
  }, [])

  const handleDeploy = async () => {
    if (!blogName.trim()) {
      showNotification('Please enter a blog name before deploying.')
      return
    }

    setIsDeploying(true)
    
    try {
      // Simulate deployment process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Generate subdomain based on blog name
      const subdomain = blogName.toLowerCase().replace(/[^a-z0-9]/g, '-')
      const newUrl = `https://${subdomain}.netlify.app`
      
      setDeployedUrl(newUrl)
      showNotification('Deployment successful!')
      
      // Save blog name
      localStorage.setItem('blogName', blogName)
    } catch (error) {
      showNotification('Deployment failed. Please try again.')
    } finally {
      setIsDeploying(false)
    }
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Deploy Your Recipe Blog
      </Typography>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Current Configuration
        </Typography>
        <Typography><strong>Theme:</strong> {currentTheme}</Typography>
        <Typography><strong>Number of Recipes:</strong> 10</Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="blogName"
          label="Blog Name"
          value={blogName}
          onChange={(e) => setBlogName(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Button
          variant="contained"
          onClick={handleDeploy}
          disabled={isDeploying}
          sx={{ mt: 2 }}
        >
          {isDeploying ? 'Deploying...' : 'Deploy Changes'}
        </Button>
      </Paper>
      {deployedUrl && (
        <Paper sx={{ p: 3, bgcolor: 'success.light' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Deployment Successful!
          </Typography>
          <Typography>
            Your blog is now live at:{' '}
            <a href={deployedUrl} target="_blank" rel="noopener noreferrer">
              {deployedUrl}
            </a>
          </Typography>
        </Paper>
      )}
    </Box>
  )
}

export default DeploymentPage