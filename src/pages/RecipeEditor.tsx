import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useRecipes, Recipe, NutritionalInfo, Ingredient } from '../context/RecipesContext'
import { useNotification } from '../context/NotificationContext'
import { Plus, Trash2 } from 'lucide-react'
import { TextField, Button, Typography, Box, Paper, Grid, Checkbox, FormControlLabel } from '@mui/material'

const RecipeEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { recipes, addRecipe, updateRecipe } = useRecipes()
  const { showNotification } = useNotification()

  const [recipe, setRecipe] = useState<Recipe>({
    id: 0,
    title: '',
    description: '',
    imageUrl: '',
    category: '',
    ingredients: [],
    instructions: [''],
    nutritionalInfo: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    }
  })

  const [includeNutritionalInfo, setIncludeNutritionalInfo] = useState(false)

  useEffect(() => {
    if (id) {
      const existingRecipe = recipes.find(r => r.id === Number(id))
      if (existingRecipe) {
        setRecipe(existingRecipe)
        setIncludeNutritionalInfo(!!existingRecipe.nutritionalInfo)
      }
    }
  }, [id, recipes])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setRecipe(prev => ({ ...prev, [name]: value }))
  }

  const handleNutritionalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRecipe(prev => ({
      ...prev,
      nutritionalInfo: {
        ...prev.nutritionalInfo,
        [name]: parseFloat(value) || 0
      }
    }))
  }

  const handleIngredientChange = (index: number, field: keyof Ingredient, value: string) => {
    const updatedIngredients = [...recipe.ingredients]
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      [field]: field === 'amount' ? parseFloat(value) || 0 : value
    }
    setRecipe(prev => ({ ...prev, ingredients: updatedIngredients }))
  }

  const addIngredient = () => {
    setRecipe(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: '', amount: 0, unit: '' }]
    }))
  }

  const removeIngredient = (index: number) => {
    setRecipe(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }))
  }

  const handleInstructionChange = (index: number, value: string) => {
    const updatedInstructions = [...recipe.instructions]
    updatedInstructions[index] = value
    setRecipe(prev => ({ ...prev, instructions: updatedInstructions }))
  }

  const addInstruction = () => {
    setRecipe(prev => ({ ...prev, instructions: [...prev.instructions, ''] }))
  }

  const removeInstruction = (index: number) => {
    setRecipe(prev => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const recipeToSave = {
      ...recipe,
      nutritionalInfo: includeNutritionalInfo ? recipe.nutritionalInfo : undefined
    }
    if (id) {
      updateRecipe(Number(id), recipeToSave)
      showNotification('Recipe updated successfully!')
    } else {
      addRecipe(recipeToSave)
      showNotification('Recipe added successfully!')
    }
    navigate('/recipes')
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {id ? 'Edit Recipe' : 'Create New Recipe'}
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={recipe.title}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={recipe.description}
              onChange={handleChange}
              multiline
              rows={3}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Image URL"
              name="imageUrl"
              value={recipe.imageUrl}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Category"
              name="category"
              value={recipe.category}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Ingredients
            </Typography>
            {recipe.ingredients.map((ingredient, index) => (
              <Box key={index} sx={{ display: 'flex', mb: 2 }}>
                <TextField
                  sx={{ mr: 1 }}
                  label="Name"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                  required
                />
                <TextField
                  sx={{ mr: 1, width: '100px' }}
                  label="Amount"
                  type="number"
                  value={ingredient.amount}
                  onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                  required
                />
                <TextField
                  sx={{ mr: 1, width: '100px' }}
                  label="Unit"
                  value={ingredient.unit}
                  onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                  required
                />
                <Button
                  onClick={() => removeIngredient(index)}
                  variant="outlined"
                  color="error"
                  sx={{ minWidth: 'auto' }}
                >
                  <Trash2 size={16} />
                </Button>
              </Box>
            ))}
            <Button
              onClick={addIngredient}
              startIcon={<Plus size={16} />}
              variant="outlined"
              color="primary"
            >
              Add Ingredient
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Instructions
            </Typography>
            {recipe.instructions.map((instruction, index) => (
              <Box key={index} sx={{ display: 'flex', mb: 2 }}>
                <TextField
                  fullWidth
                  value={instruction}
                  onChange={(e) => handleInstructionChange(index, e.target.value)}
                  placeholder={`Step ${index + 1}`}
                  sx={{ mr: 2 }}
                />
                <Button
                  onClick={() => removeInstruction(index)}
                  variant="outlined"
                  color="error"
                  sx={{ minWidth: 'auto' }}
                >
                  <Trash2 size={16} />
                </Button>
              </Box>
            ))}
            <Button
              onClick={addInstruction}
              startIcon={<Plus size={16} />}
              variant="outlined"
              color="primary"
            >
              Add Step
            </Button>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={includeNutritionalInfo}
                  onChange={(e) => setIncludeNutritionalInfo(e.target.checked)}
                  name="includeNutritionalInfo"
                />
              }
              label="Include Nutritional Information"
            />
          </Grid>
          {includeNutritionalInfo && (
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Nutritional Information (per serving)
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Calories"
                    name="calories"
                    type="number"
                    value={recipe.nutritionalInfo.calories}
                    onChange={handleNutritionalInfoChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Protein (g)"
                    name="protein"
                    type="number"
                    value={recipe.nutritionalInfo.protein}
                    onChange={handleNutritionalInfoChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Carbs (g)"
                    name="carbs"
                    type="number"
                    value={recipe.nutritionalInfo.carbs}
                    onChange={handleNutritionalInfoChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Fat (g)"
                    name="fat"
                    type="number"
                    value={recipe.nutritionalInfo.fat}
                    onChange={handleNutritionalInfoChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Paper>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
      >
        {id ? 'Update Recipe' : 'Save Recipe'}
      </Button>
    </Box>
  )
}

export default RecipeEditor