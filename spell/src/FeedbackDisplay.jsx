import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

export default function FeedbackDisplay({ isCorrect, word, attempt, onDismiss, onNextWord }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    if (isCorrect) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onDismiss()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isCorrect, onDismiss])

  return (
    <div 
      className={`mt-4 p-4 rounded-lg transition-all duration-300 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      } ${isCorrect ? 'bg-[#52796F]' : 'bg-[#2F3E46]'} border border-[#354F52]`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {isCorrect ? (
            <svg 
              className="w-6 h-6 text-[#84A98C] mr-2" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                clipRule="evenodd" 
              />
            </svg>
          ) : (
            <svg 
              className="w-6 h-6 text-red-500 mr-2" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
                clipRule="evenodd" 
              />
            </svg>
          )}
          <p className={`text-lg font-medium text-[#CAD2C5]`}>
            {isCorrect ? 'Excellent!' : 'Keep trying!'}
          </p>
        </div>

        {!isCorrect && (
          <button
            onClick={onDismiss}
            className="text-[#CAD2C5] hover:text-[#84A98C] transition-colors duration-200 p-1 rounded-full"
            aria-label="Close feedback"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      <div className="mt-2 space-y-2">
        <p className="text-sm text-[#CAD2C5]">
          {isCorrect ? (
            <>
              <span className="font-medium">Well done!</span> You&apos;ve spelled it correctly!
            </>
          ) : (
            <>
              <span className="font-medium">The correct spelling is:</span>
              <span className="ml-1 font-bold">{word}</span>
            </>
          )}
        </p>
        
        {!isCorrect && attempt && (
          <p className="text-sm text-[#84A98C]">
            You wrote: <span className="font-medium">{attempt}</span>
          </p>
        )}
        
        {!isCorrect && (
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={onDismiss}
              className="text-sm text-[#84A98C] hover:text-[#CAD2C5] transition-colors duration-200"
            >
              Try Again
            </button>
            <button
              onClick={onNextWord}
              className="text-sm text-[#84A98C] hover:text-[#CAD2C5] transition-colors duration-200"
            >
              Next Word →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

FeedbackDisplay.propTypes = {
  isCorrect: PropTypes.bool.isRequired,
  word: PropTypes.string.isRequired,
  attempt: PropTypes.string.isRequired,
  onDismiss: PropTypes.func.isRequired,
  onNextWord: PropTypes.func.isRequired
}
