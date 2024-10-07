import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Utensils, ChefHat, Coffee, Cake, Pizza, Carrot, ArrowRight, DollarSign, TrendingUp, Users, Brush, ShoppingBag, PieChart } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../translations'

const LandingPage: React.FC = () => {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-indigo-50 to-white py-20 md:py-32">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-8">
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  <span className="text-gray-900">{t.cook} {t.share}</span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400"> {t.inspire}</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8">{t.heroDescription}</p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/register" className="bg-indigo-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-indigo-700 transition duration-300">
                    {t.getStarted}
                  </Link>
                </motion.div>
              </div>
              <div className="md:w-1/2 mt-8 md:mt-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-lg transform rotate-3"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                    alt={t.deliciousBurger} 
                    className="rounded-lg shadow-2xl object-cover w-full h-[400px] relative z-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-8">{t.powerfulFeatures}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<ChefHat className="w-8 h-8 text-indigo-500" />}
                title={t.easyRecipeManagement}
                description={t.easyRecipeManagementDesc}
              />
              <FeatureCard
                icon={<Brush className="w-8 h-8 text-indigo-500" />}
                title={t.customizableThemes}
                description={t.customizableThemesDesc}
              />
              <FeatureCard
                icon={<TrendingUp className="w-8 h-8 text-indigo-500" />}
                title={t.seoOptimization}
                description={t.seoOptimizationDesc}
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-indigo-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-8">{t.whatUsersSay}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <TestimonialCard
                quote={t.testimonial1}
                author={t.testimonial1Author}
              />
              <TestimonialCard
                quote={t.testimonial2}
                author={t.testimonial2Author}
              />
            </div>
          </div>
        </section>

        {/* Monetization Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-8">{t.monetizeYourPassion}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<DollarSign className="w-8 h-8 text-indigo-500" />}
                title={t.googleAdsense}
                description={t.googleAdsenseDesc}
              />
              <FeatureCard
                icon={<Users className="w-8 h-8 text-indigo-500" />}
                title={t.sponsoredContent}
                description={t.sponsoredContentDesc}
              />
              <FeatureCard
                icon={<ShoppingBag className="w-8 h-8 text-indigo-500" />}
                title={t.affiliateMarketing}
                description={t.affiliateMarketingDesc}
              />
            </div>
            <div className="text-center mt-12">
              <Link to="/monetization" className="text-indigo-600 hover:text-indigo-800 font-semibold">
                {t.learnMoreMonetization} <ArrowRight className="inline-block w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-indigo-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-4">{t.readyToStart}</h2>
            <p className="text-xl mb-8">{t.joinThousands}</p>
            <Link to="/register" className="bg-white text-indigo-600 px-8 py-3 rounded-md font-semibold hover:bg-indigo-100 transition duration-300">
              {t.getStartedFree}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="text-indigo-500 mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
)

const TestimonialCard: React.FC<{ quote: string; author: string }> = ({ quote, author }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <p className="text-gray-600 italic mb-4">"{quote}"</p>
    <p className="font-semibold">{author}</p>
  </div>
)

export default LandingPage