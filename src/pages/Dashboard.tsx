import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { PlusCircle, Palette, Globe } from 'lucide-react'
import Preview from './Preview'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../translations'

const Dashboard: React.FC = () => {
  const [deployedUrl, setDeployedUrl] = useState<string | null>(null)
  const { language } = useLanguage()
  const t = translations[language]

  // In a real application, you would fetch this from your backend
  React.useEffect(() => {
    // Simulating an API call to get the deployed URL
    setTimeout(() => {
      setDeployedUrl('https://user-123abc.recipes.com')
    }, 1000)
  }, [])

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">{t.welcomeDashboard}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title={t.createNewRecipe}
          description={t.createNewRecipeDesc}
          icon={<PlusCircle className="w-8 h-8" />}
          link="/editor"
        />
        <DashboardCard
          title={t.themes}
          description={t.themesDesc}
          icon={<Palette className="w-8 h-8" />}
          link="/themes"
        />
        <DashboardCard
          title={t.deploy}
          description={t.deployDesc}
          icon={<Globe className="w-8 h-8" />}
          link="/deploy"
        />
      </div>
      {deployedUrl && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
          <p className="font-bold">{t.blogLive}</p>
          <p>{t.visitBlogAt} <a href={deployedUrl} target="_blank" rel="noopener noreferrer" className="underline">{deployedUrl}</a></p>
        </div>
      )}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">{t.blogPreview}</h2>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <Preview />
        </div>
      </div>
    </div>
  )
}

interface DashboardCardProps {
  title: string
  description: string
  icon: React.ReactNode
  link: string
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, icon, link }) => {
  return (
    <Link to={link} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        {icon}
        <h2 className="text-xl font-semibold ml-2">{title}</h2>
      </div>
      <p className="text-gray-600">{description}</p>
    </Link>
  )
}

export default Dashboard