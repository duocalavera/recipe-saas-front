import React, { useState, useMemo, useEffect } from 'react'
import { themeStyles, ThemeKey } from '../themes/themeStyles'
import { Search, Smartphone, Monitor } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useRecipes } from '../context/RecipesContext'
import { Link } from 'react-router-dom'

interface PreviewProps {
  previewTheme?: ThemeKey
}

const Preview: React.FC<PreviewProps> = ({ previewTheme }) => {
  const { currentTheme } = useTheme()
  const { recipes } = useRecipes()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [blogName, setBlogName] = useState('')
  const [showAbout, setShowAbout] = useState(false)
  const [aboutContent, setAboutContent] = useState('')
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop')

  useEffect(() => {
    const savedBlogName = localStorage.getItem('blogName') || 'My Recipe Blog'
    setBlogName(savedBlogName)
    const savedAboutContent = localStorage.getItem('aboutContent') || ''
    setAboutContent(savedAboutContent)
  }, [])

  const theme = themeStyles[previewTheme || currentTheme || 'modernMinimalist']

  const categories = useMemo(() => {
    return ['All', ...new Set(recipes.map(recipe => recipe.category))]
  }, [recipes])

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === null || selectedCategory === 'All' || recipe.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [recipes, searchQuery, selectedCategory])

  const containerStyle = viewMode === 'mobile' 
    ? { maxWidth: '375px', margin: '0 auto', border: '10px solid #333', borderRadius: '20px', height: '80vh', overflowY: 'auto' }
    : {}

  const isMobile = viewMode === 'mobile'

  return (
    <div className="relative">
      <div className="flex justify-center space-x-4 mb-4">
        <button 
          onClick={() => setViewMode('desktop')} 
          className={`p-2 rounded ${viewMode === 'desktop' ? 'bg-gray-200' : ''}`}
          title="Desktop view"
        >
          <Monitor size={24} />
        </button>
        <button 
          onClick={() => setViewMode('mobile')} 
          className={`p-2 rounded ${viewMode === 'mobile' ? 'bg-gray-200' : ''}`}
          title="Mobile view"
        >
          <Smartphone size={24} />
        </button>
      </div>
      <div style={containerStyle} className={`${theme.body} min-h-screen flex flex-col`}>
        <header className={`${theme.header} py-6`}>
          <div className="container mx-auto px-4">
            <h1 className={`${theme.blogName} text-center ${isMobile ? 'text-2xl' : 'text-4xl'}`}>{blogName}</h1>
            <nav className="mt-4 flex justify-center space-x-4">
              <button onClick={() => setShowAbout(false)} className={`${theme.navLink}`}>Home</button>
              <button onClick={() => setShowAbout(true)} className={`${theme.navLink}`}>About</button>
            </nav>
          </div>
        </header>

        <main className={`flex-grow container mx-auto px-4 py-8 ${isMobile ? 'space-y-4' : ''}`}>
          {showAbout ? (
            <div className={`${theme.card} p-6`}>
              <h2 className={`${theme.heading} ${isMobile ? 'text-xl' : 'text-2xl'} mb-4`}>About Us</h2>
              <p>{aboutContent}</p>
            </div>
          ) : (
            <>
              <div className={`mb-8 ${isMobile ? 'space-y-4' : 'flex items-center justify-between'}`}>
                <div className={`relative ${isMobile ? 'w-full' : 'w-1/3'}`}>
                  <input
                    type="text"
                    placeholder="Search recipes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`${theme.input} w-full pl-10 pr-4 py-2`}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
                <select
                  value={selectedCategory || ''}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                  className={`${theme.select} px-4 py-2 ${isMobile ? 'w-full' : ''}`}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-8`}>
                {filteredRecipes.map(recipe => (
                  <div key={recipe.id} className={`${theme.card} overflow-hidden group relative`}>
                    <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-48 object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Link to={`/recipe/${recipe.id}`} className="text-white text-lg font-semibold">
                        View Recipe
                      </Link>
                    </div>
                    <div className="p-4">
                      <h2 className={`${theme.heading} ${isMobile ? 'text-lg' : 'text-xl'} mb-2`}>{recipe.title}</h2>
                      <p className={`${theme.category} mb-2`}>{recipe.category}</p>
                      <p className={`text-gray-600 mb-4 ${isMobile ? 'text-sm' : ''}`}>{recipe.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>

        <footer className={`${theme.footer} py-6`}>
          <div className="container mx-auto px-4 text-center">
            <p className={isMobile ? 'text-sm' : ''}>&copy; {new Date().getFullYear()} {blogName}. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Preview