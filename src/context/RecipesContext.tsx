import React, { createContext, useState, useContext, ReactNode } from 'react'

export interface NutritionalInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

export interface Recipe {
  id: number
  title: string
  description: string
  imageUrl: string
  category: string
  ingredients: Ingredient[]
  instructions: string[]
  nutritionalInfo?: NutritionalInfo
  lastUpdated?: Date
}

interface RecipesContextType {
  recipes: Recipe[]
  addRecipe: (recipe: Recipe) => void
  updateRecipe: (id: number, updatedRecipe: Recipe) => void
  deleteRecipe: (id: number) => void
}

const RecipesContext = createContext<RecipesContextType | undefined>(undefined)

export const RecipesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      id: 1,
      title: 'Classic Margherita Pizza',
      description: 'A simple yet delicious Italian favorite.',
      imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=200&fit=crop',
      category: 'Italian',
      ingredients: [
        { name: 'Pizza dough', amount: 250, unit: 'g' },
        { name: 'San Marzano tomatoes', amount: 200, unit: 'g' },
        { name: 'Fresh mozzarella', amount: 150, unit: 'g' },
        { name: 'Fresh basil', amount: 10, unit: 'leaves' },
        { name: 'Extra-virgin olive oil', amount: 2, unit: 'tbsp' },
        { name: 'Salt', amount: 1, unit: 'pinch' }
      ],
      instructions: [
        'Preheat oven to 500°F (260°C).',
        'Roll out the pizza dough.',
        'Spread crushed tomatoes on the dough.',
        'Add torn mozzarella pieces.',
        'Bake for 8-10 minutes.',
        'Top with fresh basil leaves and a drizzle of olive oil.'
      ],
      nutritionalInfo: {
        calories: 285,
        protein: 12,
        carbs: 36,
        fat: 10
      },
      lastUpdated: new Date('2023-05-15')
    },
    // ... (add more sample recipes if needed)
  ])

  const addRecipe = (recipe: Recipe) => {
    setRecipes([...recipes, { ...recipe, id: Date.now(), lastUpdated: new Date() }])
  }

  const updateRecipe = (id: number, updatedRecipe: Recipe) => {
    setRecipes(recipes.map(recipe => 
      recipe.id === id ? { ...updatedRecipe, lastUpdated: new Date() } : recipe
    ))
  }

  const deleteRecipe = (id: number) => {
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

  return (
    <RecipesContext.Provider value={{ recipes, addRecipe, updateRecipe, deleteRecipe }}>
      {children}
    </RecipesContext.Provider>
  )
}

export const useRecipes = () => {
  const context = useContext(RecipesContext)
  if (context === undefined) {
    throw new Error('useRecipes must be used within a RecipesProvider')
  }
  return context
}