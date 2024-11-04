import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

export default function SettingsModal({ isOpen, onClose, settings, onUpdate }) {
  const [isDarkMode, setIsDarkMode] = useState(settings.darkMode)

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
    onUpdate({ ...settings, darkMode: isDarkMode })
  }, [isDarkMode, onUpdate, settings])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-[#2F3E46] bg-opacity-75"
      aria-labelledby="settings-modal"
      role="dialog"
      aria-modal="true"
    >
      {/* Modal */}
      <div className="min-h-screen px-4 text-center">
        <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>

        <div
          className="inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-[#2F3E46] shadow-xl rounded-2xl border border-[#354F52]"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 
              id="settings-modal"
              className="text-xl font-semibold text-[#CAD2C5]"
            >
              Settings
            </h2>
            <button
              onClick={onClose}
              className="text-[#84A98C] hover:text-[#CAD2C5] transition-colors duration-200 rounded-full p-1"
              aria-label="Close settings"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Settings Content */}
          <div className="space-y-6">
            {/* Theme Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-[#CAD2C5]">Dark Mode</label>
                <p className="text-sm text-[#84A98C]">Switch between light and dark themes</p>
              </div>
              <button
                role="switch"
                aria-checked={isDarkMode}
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#84A98C] focus:ring-offset-2 ${isDarkMode ? 'bg-[#84A98C]' : 'bg-[#354F52]'}`}
              >
                <span
                  className={`${
                    isDarkMode ? 'translate-x-5' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out mt-1`}
                />
              </button>
            </div>

            {/* Sound Settings */}
            <div>
              <label className="text-sm font-medium text-[#CAD2C5]">Pronunciation Volume</label>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.volume}
                onChange={(e) => onUpdate({ ...settings, volume: Number(e.target.value) })}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer mt-2 bg-[#354F52]"
              />
              <div className="flex justify-between text-xs text-[#84A98C]">
                <span>Off</span>
                <span>Max</span>
              </div>
            </div>

            {/* Pronunciation Speed */}
            <div>
              <label className="text-sm font-medium text-[#CAD2C5]">Speech Rate</label>
              <select
                value={settings.speechRate}
                onChange={(e) => onUpdate({ ...settings, speechRate: e.target.value })}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-[#354F52] focus:outline-none focus:ring-[#84A98C] focus:border-[#84A98C] rounded-md bg-[#354F52] text-[#CAD2C5]"
              >
                <option value="0.75">Slow</option>
                <option value="1">Normal</option>
                <option value="1.25">Fast</option>
              </select>
            </div>

            {/* Reset Progress */}
            <div className="pt-4 border-t border-[#354F52]">
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
                    onUpdate({ ...settings, resetProgress: true })
                  }
                }}
                className="w-full px-4 py-2 text-sm font-medium text-[#84A98C] hover:bg-[#354F52] rounded-md transition-colors duration-200"
              >
                Reset All Progress
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

SettingsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    darkMode: PropTypes.bool.isRequired,
    volume: PropTypes.number.isRequired,
    speechRate: PropTypes.string.isRequired
  }).isRequired,
  onUpdate: PropTypes.func.isRequired
}
