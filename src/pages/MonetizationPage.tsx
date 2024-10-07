import React from 'react'
import { Link } from 'react-router-dom'
import { DollarSign, CheckCircle, AlertCircle } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../translations'

const MonetizationPage: React.FC = () => {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8 text-center">{t.monetizeWithAdSense}</h1>
          
          <div className="bg-white shadow-lg rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <DollarSign className="mr-2 text-green-500" />
              {t.whatIsAdSense}
            </h2>
            <p className="text-gray-700 mb-4">
              {t.adSenseDescription1}
            </p>
            <p className="text-gray-700">
              {t.adSenseDescription2}
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4">{t.howToSetUpAdSense}</h2>
            <ol className="list-decimal list-inside space-y-4 text-gray-700">
              <li>{t.signUpForAdSense} <a href="https://www.google.com/adsense" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">google.com/adsense</a>.</li>
              <li>{t.getAdSenseCode}</li>
              <li>{t.loginToDashboard}</li>
              <li>{t.navigateToMonetization}</li>
              <li>{t.pasteAdSenseCode}</li>
              <li>{t.chooseAdLocations}</li>
              <li>{t.saveAndEarn}</li>
            </ol>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <CheckCircle className="mr-2 text-green-500" />
                {t.benefits}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>{t.easyToSetUp}</li>
                <li>{t.autoTargetedAds}</li>
                <li>{t.passiveIncome}</li>
                <li>{t.customizableFormats}</li>
                <li>{t.regularPayments}</li>
              </ul>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <AlertCircle className="mr-2 text-yellow-500" />
                {t.thingsToConsider}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>{t.userExperienceImpact}</li>
                <li>{t.earningsDependent}</li>
                <li>{t.policyCompliance}</li>
                <li>{t.notSuitableForAll}</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">{t.readyToMonetize}</h3>
            <p className="text-gray-600 mb-6">{t.upgradeToUnlock}</p>
            <Link to="/pricing" className="bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 transition duration-300">
              {t.viewPricingPlans}
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default MonetizationPage