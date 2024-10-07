import React from 'react'
import { ThemeKey } from '../themes/themeStyles'
import Preview from '../pages/Preview'

interface ThemePreviewModalProps {
  isOpen: boolean
  onClose: () => void
  theme: ThemeKey
}

const ThemePreviewModal: React.FC<ThemePreviewModalProps> = ({ isOpen, onClose, theme }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-11/12 h-5/6 overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Theme Preview: {theme}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4 h-full overflow-y-auto">
          <Preview previewTheme={theme} />
        </div>
      </div>
    </div>
  )
}

export default ThemePreviewModal