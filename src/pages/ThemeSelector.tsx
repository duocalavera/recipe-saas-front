import React, { useState } from 'react'
import { themeStyles, ThemeKey } from '../themes/themeStyles'
import { useTheme } from '../context/ThemeContext'
import ThemePreviewModal from '../components/ThemePreviewModal'
import { useNotification } from '../context/NotificationContext'

const themes: { id: ThemeKey; name: string; preview: string }[] = [
  { id: 'modernMinimalist', name: 'Modern Minimalist', preview: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
  { id: 'vibrantFoodie', name: 'Vibrant Foodie', preview: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
  { id: 'elegant', name: 'Elegant', preview: 'https://images.unsplash.com/photo-1515511856280-7b23f68d2996?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
  { id: 'vibrant', name: 'Vibrant', preview: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
  { id: 'rusticCharm', name: 'Rustic Charm', preview: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
  { id: 'modernGourmet', name: 'Modern Gourmet', preview: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
]

const ThemeSelector: React.FC = () => {
  const { currentTheme, setCurrentTheme } = useTheme()
  const [selectedTheme, setSelectedTheme] = useState<ThemeKey>(currentTheme)
  const [previewTheme, setPreviewTheme] = useState<ThemeKey | null>(null)
  const { showNotification } = useNotification()

  const handleThemeSelect = (themeId: ThemeKey) => {
    setSelectedTheme(themeId)
  }

  const handleSaveTheme = () => {
    setCurrentTheme(selectedTheme)
    localStorage.setItem('selectedTheme', selectedTheme)
    showNotification(`Theme "${selectedTheme}" has been saved!`)
  }

  const openPreview = (themeId: ThemeKey) => {
    setPreviewTheme(themeId)
  }

  const closePreview = () => {
    setPreviewTheme(null)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Choose Your Blog Theme</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme) => (
          <div
            key={theme.id}
            className={`bg-white p-4 rounded-lg shadow-md cursor-pointer transition duration-300 ${
              selectedTheme === theme.id ? 'ring-2 ring-indigo-500' : 'hover:shadow-lg'
            }`}
            onClick={() => handleThemeSelect(theme.id)}
          >
            <img src={theme.preview} alt={theme.name} className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-lg font-semibold mb-2">{theme.name}</h3>
            <div className="flex justify-between">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  openPreview(theme.id)
                }}
                className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md hover:bg-gray-300 text-sm"
              >
                Preview
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          onClick={handleSaveTheme}
        >
          Save Theme
        </button>
      </div>
      {previewTheme && (
        <ThemePreviewModal
          isOpen={true}
          onClose={closePreview}
          theme={previewTheme}
        />
      )}
    </div>
  )
}

export default ThemeSelector