import { useState, useCallback, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AppHeader from './AppHeader'
import HomePage from './HomePage'
import PronunciationButton from './PronunciationButton'
import SpellingInput from './SpellingInput'
import FeedbackDisplay from './FeedbackDisplay'
import ProgressTracker from './ProgressTracker'
import WordHistory from './WordHistory'
import SettingsModal from './SettingsModal'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import Tutorial from './Tutorial'
import PropTypes from 'prop-types'

// Move word list outside component to prevent recreation
const SAMPLE_WORDS = [
  'example', 'spelling', 'practice', 'education', 'learning',
  'knowledge', 'vocabulary', 'pronunciation', 'dictionary', 'language',
  'assessment', 'feedback', 'evaluation', 'test', 'quiz',
  'homework', 'project', 'report', 'presentation', 'discussion',
]

// Helper functions for localStorage
const loadFromStorage = (key, defaultValue) => {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : defaultValue
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error)
    return defaultValue
  }
}

const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error)
  }
}

function GameContent({ 
  currentWord,
  isTransitioning,
  settings,
  handleSkipWord,
  handleSpellingAttempt,
  showFeedback,
  lastAttempt,
  setShowFeedback,
  setLastAttempt,
  progress,
  handleReset,
  history,
  setHistory
}) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Game Section */}
      <section className="space-y-8 mb-12">
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center gap-4">
            <PronunciationButton 
              word={currentWord}
              settings={settings}
              disabled={isTransitioning}
            />
            <button
              onClick={handleSkipWord}
              className="px-4 py-2 text-sm font-medium text-[#D8F3DC] hover:text-[#D8F3DC] hover:bg-[#2D6A4F] rounded-lg transition-colors duration-200 bg-[#1B4332]"
              aria-label="Skip this word"
            >
              Skip Word
            </button>
          </div>
          <SpellingInput
            word={currentWord}
            onSubmit={handleSpellingAttempt}
            disabled={isTransitioning}
          />
          {showFeedback && lastAttempt && (
            <FeedbackDisplay
              isCorrect={lastAttempt.toLowerCase() === currentWord.toLowerCase()}
              word={currentWord}
              attempt={lastAttempt}
              onDismiss={() => {
                setShowFeedback(false)
                setLastAttempt(null)
              }}
              onNextWord={handleSkipWord}
            />
          )}
        </div>
      </section>

      {/* Progress Section */}
      <div className="grid gap-8 md:grid-cols-2">
        <ProgressTracker
          correct={progress.correct}
          total={progress.total}
          target={progress.target}
          onReset={handleReset}
        />
        <WordHistory
          history={history}
          onClear={() => setHistory([])}
        />
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdate={handleSettingsUpdate}
      />
    </div>
  )
}

GameContent.propTypes = {
  currentWord: PropTypes.string.isRequired,
  isTransitioning: PropTypes.bool.isRequired,
  settings: PropTypes.object.isRequired,
  handleSkipWord: PropTypes.func.isRequired,
  handleSpellingAttempt: PropTypes.func.isRequired,
  showFeedback: PropTypes.bool.isRequired,
  lastAttempt: PropTypes.string,
  setShowFeedback: PropTypes.func.isRequired,
  setLastAttempt: PropTypes.func.isRequired,
  progress: PropTypes.shape({
    correct: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    target: PropTypes.number.isRequired
  }).isRequired,
  handleReset: PropTypes.func.isRequired,
  history: PropTypes.array.isRequired,
  setHistory: PropTypes.func.isRequired
}

export default function App() {
  // User state with localStorage
  const [user, setUser] = useState(() => loadFromStorage('currentUser', null))

  // Core game state with localStorage
  const [wordIndex, setWordIndex] = useState(() => loadFromStorage('wordIndex', 0))
  const [currentWord, setCurrentWord] = useState(() => SAMPLE_WORDS[loadFromStorage('wordIndex', 0)])
  const [lastAttempt, setLastAttempt] = useState(() => loadFromStorage('lastAttempt', null))
  const [showFeedback, setShowFeedback] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  // Progress tracking with localStorage
  const [progress, setProgress] = useState(() => loadFromStorage('progress', {
    correct: 0,
    total: 0,
    target: 100
  }))
  
  // History tracking with localStorage
  const [history, setHistory] = useState(() => loadFromStorage('history', []))
  
  // Settings state with localStorage
  const [settings, setSettings] = useState(() => loadFromStorage('settings', {
    darkMode: false,
    volume: 75,
    speechRate: '1'
  }))
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  // Save state changes to localStorage
  useEffect(() => {
    if (user) {
      saveToStorage('currentUser', user)
      
      // Update user stats in users array
      const users = loadFromStorage('users', [])
      const updatedUsers = users.map(u => 
        u.id === user.id 
          ? { 
              ...u, 
              stats: { 
                correct: progress.correct,
                total: progress.total,
                streak: user.stats?.streak || 0,
                lastPlayed: new Date().toISOString()
              } 
            }
          : u
      )
      saveToStorage('users', updatedUsers)
    }
  }, [user, progress])

  useEffect(() => {
    saveToStorage('wordIndex', wordIndex)
    saveToStorage('progress', progress)
    saveToStorage('history', history)
    saveToStorage('settings', settings)
    saveToStorage('lastAttempt', lastAttempt)
  }, [wordIndex, progress, history, settings, lastAttempt])

  // Authentication handlers
  const handleLogin = (userData) => {
    // Load user's saved progress if it exists
    const savedProgress = loadFromStorage(`progress_${userData.id}`, null)
    if (savedProgress) {
      setProgress(savedProgress)
    }
    
    const savedHistory = loadFromStorage(`history_${userData.id}`, null)
    if (savedHistory) {
      setHistory(savedHistory)
    }

    setUser(userData)
  }

  const handleLogout = () => {
    // Save user's progress before logging out
    if (user) {
      saveToStorage(`progress_${user.id}`, progress)
      saveToStorage(`history_${user.id}`, history)
    }

    localStorage.removeItem('currentUser')
    setUser(null)
    setProgress({
      correct: 0,
      total: 0,
      target: 100
    })
    setHistory([])
  }

  // Get a new random word
  const getNewWord = useCallback(() => {
    setIsTransitioning(true)
    setTimeout(() => {
      const nextIndex = (wordIndex + 1) % SAMPLE_WORDS.length
      setWordIndex(nextIndex)
      setCurrentWord(SAMPLE_WORDS[nextIndex])
      setShowFeedback(false)
      setLastAttempt(null)
      setIsTransitioning(false)
    }, 300)
  }, [wordIndex])

  // Handle spelling attempt with stats update
  const handleSpellingAttempt = (attempt, isCorrect) => {
    setLastAttempt(attempt)
    setShowFeedback(true)
    
    const newProgress = {
      ...progress,
      total: progress.total + 1,
      correct: progress.correct + (isCorrect ? 1 : 0)
    }
    setProgress(newProgress)
    
    const newHistory = [{
      word: currentWord,
      attempt,
      isCorrect,
      timestamp: Date.now(),
      onPractice: () => {
        setCurrentWord(currentWord)
        setShowFeedback(false)
        setLastAttempt(null)
      }
    }, ...history]
    setHistory(newHistory)

    // Update user stats
    if (user) {
      const updatedUser = {
        ...user,
        stats: {
          ...user.stats,
          correct: newProgress.correct,
          total: newProgress.total,
          lastPlayed: new Date().toISOString()
        }
      }
      setUser(updatedUser)
    }

    if (isCorrect) {
      setTimeout(getNewWord, 2000)
    }
  }

  // Reset progress with storage update
  const handleReset = () => {
    const newProgress = {
      correct: 0,
      total: 0,
      target: 100
    }
    setProgress(newProgress)
    setHistory([])
    
    if (user) {
      const updatedUser = {
        ...user,
        stats: {
          ...user.stats,
          correct: 0,
          total: 0
        }
      }
      setUser(updatedUser)
    }
    
    getNewWord()
  }

  // Update settings
  const handleSettingsUpdate = (newSettings) => {
    setSettings(newSettings)
    if (newSettings.resetProgress) {
      handleReset()
    }
  }

  // Add handleSkipWord function
  const handleSkipWord = useCallback(() => {
    setShowFeedback(false)
    setLastAttempt(null)
    getNewWord()
  }, [getNewWord])

  useEffect(() => {
    if (!currentWord) {
      setCurrentWord(SAMPLE_WORDS[0])
    }
  }, [currentWord])

  return (
    <Router>
      <div className={`min-h-screen ${settings.darkMode ? 'bg-[#2F3E46] text-[#CAD2C5]' : 'bg-[#CAD2C5] text-[#2F3E46]'}`}>
        <AppHeader 
          user={user} 
          onLogout={handleLogout}
          onOpenSettings={() => setIsSettingsOpen(true)} 
        />
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route 
              path="/" 
              element={<HomePage isAuthenticated={!!user} />} 
            />
            
            <Route 
              path="/practice" 
              element={
                user ? (
                  <div className="max-w-4xl mx-auto">
                    <section className="space-y-8 mb-12">
                      <div className="text-center space-y-4">
                        <div className="flex justify-center items-center gap-4">
                          <PronunciationButton 
                            word={currentWord}
                            settings={settings}
                            disabled={isTransitioning}
                          />
                          <button
                            onClick={handleSkipWord}
                            className="px-4 py-2 text-sm font-medium text-white bg-[#84A98C] hover:bg-[#52796F] rounded-md shadow-sm transition-colors duration-200"
                            aria-label="Skip this word"
                          >
                            Skip Word
                          </button>
                        </div>
                        <SpellingInput
                          word={currentWord}
                          onSubmit={handleSpellingAttempt}
                          disabled={isTransitioning}
                        />
                        {showFeedback && lastAttempt && (
                          <FeedbackDisplay
                            isCorrect={lastAttempt.toLowerCase() === currentWord.toLowerCase()}
                            word={currentWord}
                            attempt={lastAttempt}
                            onDismiss={() => {
                              setShowFeedback(false)
                              setLastAttempt(null)
                            }}
                            onNextWord={handleSkipWord}
                          />
                        )}
                      </div>
                    </section>

                    <div className="grid gap-8 md:grid-cols-2">
                      <div className="bg-[#52796F] p-6 rounded-lg shadow-md border border-[#354F52] hover:shadow-lg transition-shadow duration-200">
                        <ProgressTracker
                          correct={progress.correct}
                          total={progress.total}
                          target={progress.target}
                          onReset={handleReset}
                        />
                      </div>
                      <div className="bg-[#52796F] p-6 rounded-lg shadow-md border border-[#354F52] hover:shadow-lg transition-shadow duration-200">
                        <WordHistory
                          history={history}
                          onClear={() => setHistory([])}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            
            <Route 
              path="/login" 
              element={
                !user ? (
                  <LoginForm onLogin={handleLogin} />
                ) : (
                  <Navigate to="/practice" replace />
                )
              } 
            />
            <Route 
              path="/signup" 
              element={
                !user ? (
                  <SignupForm onSignup={handleLogin} />
                ) : (
                  <Navigate to="/practice" replace />
                )
              } 
            />
            <Route 
              path="/history" 
              element={
                user ? (
                  <div className="max-w-4xl mx-auto">
                    <WordHistory
                      history={history}
                      onClear={() => setHistory([])}
                    />
                  </div>
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            <Route 
              path="/tutorial" 
              element={<Tutorial isAuthenticated={!!user} />} 
            />
          </Routes>
        </main>

        {/* Settings Modal */}
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          settings={settings}
          onUpdate={handleSettingsUpdate}
        />
      </div>
    </Router>
  )
}