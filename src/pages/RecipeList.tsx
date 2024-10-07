import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useRecipes } from '../context/RecipesContext'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../translations'

type SortOption = 'title' | 'category' | 'lastUpdated'

const RecipeList: React.FC = () => {
  const { recipes, deleteRecipe } = useRecipes()
  const [sortBy, setSortBy] = useState<SortOption>('lastUpdated')
  const { language } = useLanguage()
  const t = translations[language]

  const sortedRecipes = useMemo(() => {
    return [...recipes].sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title)
        case 'category':
          return a.category.localeCompare(b.category)
        case 'lastUpdated':
          return (b.lastUpdated?.getTime() || 0) - (a.lastUpdated?.getTime() || 0)
        default:
          return 0
      }
    })
  }, [recipes, sortBy])

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t.yourRecipes}</h1>
        <div className="flex items-center space-x-2">
          <label htmlFor="sort" className="text-sm font-medium text-gray-700">{t.sortBy}</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="lastUpdated">{t.lastUpdated}</option>
            <option value="title">{t.title}</option>
            <option value="category">{t.category}</option>
          </select>
        </div>
      </div>
      <div className="grid gap-6">
        {sortedRecipes.map((recipe) => (
          <div key={recipe.id} className="bg-white p-6 rounded-lg shadow-md flex">
            <img src={recipe.imageUrl} alt={recipe.title} className="w-32 h-32 object-cover rounded-md mr-6" />
            <div className="flex-grow">
              <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
              <p className="text-gray-600 mb-2">{recipe.description}</p>
              <p className="text-sm text-gray-500 mb-4">{t.category}: {recipe.category}</p>
              <div className="flex justify-between items-center">
                <Link to={`/editor/${recipe.id}`} className="text-indigo-600 hover:text-indigo-800">
                  {t.editRecipe}
                </Link>
                <button 
                  onClick={() => deleteRecipe(recipe.id)} 
                  className="text-red-600 hover:text-red-800"
                >
                  {t.delete}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link to="/editor" className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
        {t.createNewRecipe}
      </Link>
    </div>
  )
}

export default RecipeList