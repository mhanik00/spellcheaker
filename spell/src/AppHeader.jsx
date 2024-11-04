import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function AppHeader({ user, onLogout, onOpenSettings }) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    onLogout()
    navigate('/login')
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className="bg-[#52796F] shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Title */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-[#CAD2C5] hover:text-white transition-colors duration-200">
              Spelling Checker
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden relative z-10">
            <button 
              onClick={toggleMobileMenu} 
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} 
              className="text-[#CAD2C5] hover:text-white focus:outline-none transition-colors duration-200 p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50" onClick={closeMobileMenu}>
              <div className="bg-[#2F3E46] rounded-lg shadow-lg p-6 relative max-w-sm w-full mx-4" onClick={(e) => e.stopPropagation()}>
                <button 
                  onClick={closeMobileMenu} 
                  className="absolute top-4 right-4 text-[#CAD2C5] hover:text-white transition-colors duration-200"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <nav className="flex flex-col space-y-4">
                  {user ? (
                    <>
                      <Link 
                        to="/tutorial" 
                        className="text-[#CAD2C5] hover:bg-[#84A98C] p-3 rounded-md transition-colors duration-200"
                      >
                        Tutorial
                      </Link>
                      <Link 
                        to="/history" 
                        className="text-[#CAD2C5] hover:bg-[#84A98C] p-3 rounded-md transition-colors duration-200"
                      >
                        History
                      </Link>
                      <button 
                        onClick={onOpenSettings} 
                        className="text-[#CAD2C5] hover:bg-[#84A98C] p-3 rounded-md transition-colors duration-200 text-left"
                      >
                        Settings
                      </button>
                      <div className="flex justify-between items-center p-3 bg-[#354F52] rounded-md">
                        <span className="text-[#CAD2C5] flex items-center gap-2">
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {user.name}
                        </span>
                        <button 
                          onClick={handleLogout}
                          className="text-[#CAD2C5] hover:bg-[#84A98C] px-3 py-1 rounded-md transition-colors duration-200"
                        >
                          Logout
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Link 
                        to="/login" 
                        className="text-[#CAD2C5] hover:bg-[#84A98C] p-3 rounded-md transition-colors duration-200"
                      >
                        Login
                      </Link>
                      <Link 
                        to="/signup" 
                        className="text-[#CAD2C5] hover:bg-[#84A98C] p-3 rounded-md transition-colors duration-200"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </nav>
              </div>
            </div>
          )}

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <Link 
                  to="/tutorial" 
                  className="text-[#CAD2C5] hover:text-white transition-colors duration-200"
                >
                  Tutorial
                </Link>
                <Link 
                  to="/history" 
                  className="text-[#CAD2C5] hover:text-white transition-colors duration-200"
                >
                  History
                </Link>
                <button 
                  onClick={onOpenSettings}
                  className="text-[#CAD2C5] hover:text-white transition-colors duration-200"
                >
                  Settings
                </button>
                <div className="flex items-center space-x-4 pl-4 border-l border-[#354F52]">
                  <span className="text-[#CAD2C5]">{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-[#84A98C] text-white px-4 py-2 rounded-md hover:bg-[#52796F] transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login"
                  className="text-[#CAD2C5] hover:text-white transition-colors duration-200"
                >
                  Login
                </Link>
                <Link 
                  to="/signup"
                  className="bg-[#84A98C] text-white px-4 py-2 rounded-md hover:bg-[#52796F] transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

AppHeader.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }),
  onLogout: PropTypes.func.isRequired,
  onOpenSettings: PropTypes.func.isRequired
}
