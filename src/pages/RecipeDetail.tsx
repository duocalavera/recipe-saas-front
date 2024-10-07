import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useRecipes } from '../context/RecipesContext'
import { useTheme } from '../context/ThemeContext'
import { ThemeKey, themeStyles } from '../themes/themeStyles'

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { recipes } = useRecipes()
  const { currentTheme } = useTheme()
  const [servings, setServings] = useState(1)
  const theme = themeStyles[currentTheme as ThemeKey]

  const recipe = recipes.find(r => r.id === Number(id))

  if (!recipe) {
    return <div>Recipe not found</div>
  }

  const scaleIngredient = (amount: number, scale: number) => {
    return (amount * scale).toFixed(1)
  }

  const scaledNutritionalInfo = recipe.nutritionalInfo
    ? {
        calories: Math.round(recipe.nutritionalInfo.calories * servings),
        protein: Math.round(recipe.nutritionalInfo.protein * servings),
        carbs: Math.round(recipe.nutritionalInfo.carbs * servings),
        fat: Math.round(recipe.nutritionalInfo.fat * servings)
      }
    : null

  return (
    <div className={`${theme.body} min-h-screen flex flex-col`}>
      <header className={`${theme.header} py-6`}>
        <div className="container mx-auto px-4">
          <h1 className={`${theme.blogName} text-center text-4xl`}>Recipe Details</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <Link to="/recipes" className={`${theme.button} inline-block mb-4`}>
          Back to Recipes
        </Link>
        
        <article className={`${theme.card} overflow-hidden`}>
          <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-64 object-cover" />
          <div className="p-6">
            <h2 className={`${theme.heading} text-3xl mb-2`}>{recipe.title}</h2>
            <p className={`${theme.category} mb-4`}>{recipe.category}</p>
            <p className={`text-gray-600 mb-6`}>{recipe.description}</p>

            <div className="mb-6">
              <label htmlFor="servings" className={`${theme.label} block mb-2`}>Servings:</label>
              <input
                type="number"
                id="servings"
                min="1"
                value={servings}
                onChange={(e) => setServings(Math.max(1, parseInt(e.target.value)))}
                className={`${theme.input} w-20`}
              />
            </div>

            <section className="mb-8">
              <h3 className={`${theme.heading} text-2xl mb-4`}>Ingredients</h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{ingredient.name}</span>
                    <span className="font-medium">
                      {scaleIngredient(ingredient.amount, servings)} {ingredient.unit}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mb-8">
              <h3 className={`${theme.heading} text-2xl mb-4`}>Instructions</h3>
              <ol className="list-decimal list-inside space-y-2">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </section>

            {scaledNutritionalInfo && (
              <section className="mb-8">
                <h3 className={`${theme.heading} text-2xl mb-4`}>Nutritional Information</h3>
                <p>Per {servings} serving{servings > 1 ? 's' : ''}:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Calories: {scaledNutritionalInfo.calories}</li>
                  <li>Protein: {scaledNutritionalInfo.protein}g</li>
                  <li>Carbs: {scaledNutritionalInfo.carbs}g</li>
                  <li>Fat: {scaledNutritionalInfo.fat}g</li>
                </ul>
              </section>
            )}
          </div>
        </article>
      </main>

      <footer className={`${theme.footer} py-6`}>
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Recipe Blog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default RecipeDetail