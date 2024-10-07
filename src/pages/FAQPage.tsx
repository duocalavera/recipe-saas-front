import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../translations'

const FAQPage: React.FC = () => {
  const { language } = useLanguage()
  const t = translations[language]

  const faqs = [
    {
      question: t.whatIsRecipeBlogr,
      answer: t.recipeBlogrDescription
    },
    {
      question: t.howToGetStarted,
      answer: t.getStartedDescription
    },
    {
      question: t.isRecipeBlogrFree,
      answer: t.pricingDescription
    },
    {
      question: t.canIMonetize,
      answer: t.monetizationDescription
    },
    {
      question: t.howToCustomize,
      answer: t.customizationDescription
    },
    {
      question: t.canIImportRecipes,
      answer: t.importDescription
    },
    {
      question: t.isContentProtected,
      answer: t.contentProtectionDescription
    },
    {
      question: t.howToGrowAudience,
      answer: t.growAudienceDescription
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">{t.frequentlyAskedQuestions}</h1>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-gray-900">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-indigo-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-indigo-500" />
        )}
      </button>
      {isOpen && (
        <div className="mt-2 text-gray-700">
          <p>{answer}</p>
        </div>
      )}
    </div>
  )
}

export default FAQPage