import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function Tutorial({ isAuthenticated }) {
  const [currentStep, setCurrentStep] = useState(0)
  const navigate = useNavigate()

  const steps = [
    {
      title: "Welcome to Spelling Checker",
      content: "Learn how to improve your spelling skills with our interactive app.",
      tooltip: "Let's get started!",
    },
    {
      title: "Listen to Pronunciation",
      content: "Click the 'Pronounce' button to hear the word spoken clearly.",
      tooltip: "Make sure your sound is turned on!",
    },
    {
      title: "Type Your Answer",
      content: "Enter your spelling attempt in the input field provided.",
      tooltip: "Take your time and type carefully.",
    },
    {
      title: "Get Instant Feedback",
      content: "Receive immediate feedback on your spelling attempt.",
      tooltip: "Learn from your mistakes and celebrate your successes!",
    },
    {
      title: "Track Your Progress",
      content: "Monitor your improvement with detailed statistics and history.",
      tooltip: "Watch your skills grow over time!",
    }
  ]

  const handleSkip = () => {
    navigate(isAuthenticated ? '/practice' : '/login')
  }

  const handleStart = () => {
    navigate(isAuthenticated ? '/practice' : '/login')
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-[#2F3E46] rounded-lg shadow-lg p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-[#CAD2C5]">
              Tutorial Progress: Step {currentStep + 1} of {steps.length}
            </h2>
            <button 
              onClick={handleSkip}
              className="text-sm text-[#84A98C] hover:text-[#CAD2C5] transition-colors duration-200"
              aria-label="Skip tutorial"
            >
              Skip Tutorial
            </button>
          </div>
          <div className="h-2 bg-[#354F52] rounded-full">
            <div 
              className="h-full bg-[#84A98C] rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="min-h-[200px] mb-8">
          <div
            key={currentStep}
            className="space-y-4 animate-fade-in"
          >
            <h3 className="text-2xl font-bold text-[#CAD2C5]">
              {steps[currentStep].title}
            </h3>
            <p className="text-lg text-[#CAD2C5]">
              {steps[currentStep].content}
            </p>
            <div className="text-sm text-[#84A98C] italic">
              💡 Tip: {steps[currentStep].tooltip}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button 
            onClick={() => setCurrentStep(prev => prev - 1)}
            disabled={currentStep === 0}
            className="px-4 py-2 text-[#CAD2C5] hover:text-[#84A98C] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            ← Previous
          </button>
          
          {currentStep === steps.length - 1 ? (
            <button
              onClick={handleStart}
              className="px-6 py-2 bg-[#84A98C] text-white hover:bg-[#52796F] rounded-md shadow-sm transition-all duration-200 transform hover:scale-105"
            >
              Start Practicing
            </button>
          ) : (
            <button
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="px-4 py-2 text-[#84A98C] hover:text-[#CAD2C5] transition-colors duration-200"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

Tutorial.propTypes = {
  isAuthenticated: PropTypes.bool
}

Tutorial.defaultProps = {
  isAuthenticated: false
}
