import { useState } from 'react'
import PropTypes from 'prop-types'

export default function PronunciationButton({ 
  word, 
  onPlay,
  settings,
  disabled 
}) {
  const [isPlaying, setIsPlaying] = useState(false)

  const pronounceWord = () => {
    if (!word || disabled) return

    setIsPlaying(true)
    const utterance = new SpeechSynthesisUtterance(word)
    
    // Apply settings
    if (settings) {
      utterance.rate = parseFloat(settings.speechRate)
      utterance.volume = settings.volume / 100
    }

    utterance.onend = () => setIsPlaying(false)
    utterance.onerror = () => {
      setIsPlaying(false)
      console.error('Error playing pronunciation')
    }

    onPlay?.()
    window.speechSynthesis.speak(utterance)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={pronounceWord}
        disabled={isPlaying || disabled || !word}
        aria-label={word ? `Pronounce the word ${word}` : 'Loading next word...'}
        className={`relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium 
          text-white bg-[#84A98C] hover:bg-[#52796F] 
          rounded-md shadow-sm transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#84A98C]`}
      >
        {isPlaying ? (
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-2 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z" />
            </svg>
            Playing...
          </span>
        ) : (
          <span className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
            </svg>
            {word ? 'Pronounce' : 'Loading...'}
          </span>
        )}
      </button>
    </div>
  )
}

PronunciationButton.propTypes = {
  word: PropTypes.string,
  onPlay: PropTypes.func,
  settings: PropTypes.shape({
    volume: PropTypes.number.isRequired,
    speechRate: PropTypes.string.isRequired
  }),
  disabled: PropTypes.bool
}

PronunciationButton.defaultProps = {
  disabled: false,
  settings: {
    volume: 75,
    speechRate: '1'
  }
}
