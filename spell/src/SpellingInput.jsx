import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

export default function SpellingInput({ word, onSubmit, disabled }) {
  const [input, setInput] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const isCorrect = input.toLowerCase() === word.toLowerCase()

  useEffect(() => {
    setInput('')
    setShowFeedback(false)
  }, [word])

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowFeedback(true)
    onSubmit(input, isCorrect)

    if (isCorrect) {
      setTimeout(() => {
        setInput('')
        setShowFeedback(false)
      }, 2000)
    }
  }

  return (
    <div className="transition-opacity duration-300">
      <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              setShowFeedback(false)
            }}
            className={`w-full px-4 py-2 text-lg border-2 rounded-md focus:outline-none transition-colors duration-200
              ${showFeedback
                ? isCorrect
                  ? 'border-[#84A98C] bg-[#CAD2C5]'
                  : 'border-red-500 bg-red-50'
                : 'border-[#354F52] focus:border-[#52796F]'
              } 
              bg-[#2F3E46] text-[#CAD2C5] placeholder-[#84A98C]`}
            placeholder="Type the word here..."
            disabled={disabled}
            aria-label={`Type the spelling of the word ${word}`}
          />
          <div className="mt-2 text-sm text-[#84A98C]">
            Characters: {input.length} {word && `(Word length: ${word.length})`}
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-4 px-6 py-2 text-white bg-[#84A98C] rounded-md hover:bg-[#52796F] focus:outline-none transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          disabled={!input.length || disabled}
        >
          Check Spelling
        </button>
      </form>
    </div>
  )
}

SpellingInput.propTypes = {
  word: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

SpellingInput.defaultProps = {
  disabled: false
}
