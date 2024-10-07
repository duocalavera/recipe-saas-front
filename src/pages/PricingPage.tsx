import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { useNotification } from '../context/NotificationContext'
import { Check } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../translations'

// Replace this with your actual Stripe publishable key
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx')

interface PricingTier {
  name: string
  price: number
  features: string[]
  stripePriceId: string
  recommended?: boolean
}

const PricingPage: React.FC = () => {
  const navigate = useNavigate()
  const { showNotification } = useNotification()
  const { language } = useLanguage()
  const t = translations[language]
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if the user is logged in
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true'
    setIsLoggedIn(loggedInStatus)
  }, [])

  const pricingTiers: PricingTier[] = [
    {
      name: t.basic,
      price: 0,
      features: [t.upTo3Recipes, t.basicThemes, t.emailSupport],
      stripePriceId: 'price_free',
    },
    {
      name: t.starter,
      price: 3.99,
      features: [t.upTo10Recipes, t.allThemes, t.priorityEmailSupport, t.storage1GB],
      stripePriceId: 'price_starter123',
    },
    {
      name: t.pro,
      price: 12.99,
      features: [t.unlimitedRecipes, t.allThemes, t.prioritySupport, t.customDomain, t.storage5GB, t.basicAnalytics],
      stripePriceId: 'price_pro456',
      recommended: true,
    },
    {
      name: t.enterprise,
      price: 15.99,
      features: [t.everythingInPro, t.whiteLabel, t.apiAccess, t.dedicatedManager, t.unlimitedStorage, t.advancedAnalytics],
      stripePriceId: 'price_enterprise789',
    },
  ]

  const handleSubscribe = async (stripePriceId: string) => {
    if (stripePriceId === 'price_free') {
      showNotification(t.selectedFreePlan)
      navigate('/register')
      return
    }

    if (!isLoggedIn) {
      showNotification(t.loginToSubscribe)
      navigate('/login')
      return
    }

    try {
      const stripe = await stripePromise
      if (!stripe) {
        throw new Error(t.failedLoadPayment)
      }

      // In a real application, you would make an API call to your backend to create a Checkout Session
      // For this example, we'll simulate the response
      const simulatedSessionId = 'cs_test_' + Math.random().toString(36).substr(2, 9)

      const { error } = await stripe.redirectToCheckout({
        sessionId: simulatedSessionId,
      })

      if (error) {
        throw error
      }

      // Normally, you wouldn't navigate here as Stripe would handle the redirect
      // This is just for demonstration purposes
      navigate('/profile')
      showNotification(t.subscriptionSuccessful)
    } catch (error) {
      showNotification(`${t.paymentFailed}: ${error instanceof Error ? error.message : t.unknownError}`)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-4 text-center">{t.chooseYourPlan}</h1>
          <p className="text-xl text-gray-600 mb-12 text-center">{t.getStartedToday}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingTiers.map((tier) => (
              <div 
                key={tier.name} 
                className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 flex flex-col ${
                  tier.recommended ? 'border-2 border-indigo-500' : ''
                }`}
              >
                {tier.recommended && (
                  <div className="bg-indigo-500 text-white text-center py-2 font-semibold">
                    {t.recommended}
                  </div>
                )}
                <div className="p-6 flex-grow">
                  <h2 className="text-xl font-bold mb-4">{tier.name}</h2>
                  <p className="text-3xl font-bold mb-6">
                    ${tier.price.toFixed(2)}
                    <span className="text-base font-normal text-gray-600">{tier.price > 0 ? t.perMonth : ''}</span>
                  </p>
                  <ul className="mb-8 space-y-3">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 pt-0">
                  <button
                    onClick={() => handleSubscribe(tier.stripePriceId)}
                    className={`w-full py-2 px-4 rounded font-semibold transition duration-200 ${
                      tier.recommended
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    {tier.price === 0 ? t.getStarted : t.subscribe}
                  </button>
                </div>
              </div>
            ))}
          </div>
          {isLoggedIn && (
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold mb-4">{t.currentPlan}</h3>
              <p className="text-gray-600 mb-4">{t.upgradePlan}</p>
              <button className="bg-indigo-100 text-indigo-700 py-2 px-4 rounded font-semibold hover:bg-indigo-200 transition duration-200">
                {t.manageBilling}
              </button>
            </div>
          )}
          {!isLoggedIn && (
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold mb-4">{t.notSureWhichPlan}</h3>
              <p className="text-gray-600 mb-4">{t.contactSalesTeam}</p>
              <button className="bg-indigo-100 text-indigo-700 py-2 px-4 rounded font-semibold hover:bg-indigo-200 transition duration-200">
                {t.contactSales}
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default PricingPage