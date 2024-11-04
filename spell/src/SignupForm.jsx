import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function SignupForm({ onSignup }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]')
    if (users.some(user => user.email === formData.email)) {
      setError('Email already exists')
      return
    }

    const newUser = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      password: formData.password,
      stats: {
        correct: 0,
        total: 0,
        streak: 0,
        lastPlayed: null
      }
    }

    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    localStorage.setItem('currentUser', JSON.stringify(newUser))
    
    onSignup(newUser)
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2F3E46] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-[#CAD2C5]">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-[#84A98C]">
            Or{' '}
            <Link to="/login" className="font-medium text-[#84A98C] hover:text-[#CAD2C5] transition-colors duration-200">
              sign in to existing account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-[#354F52] placeholder-[#84A98C] text-[#CAD2C5] bg-[#2F3E46] focus:outline-none focus:ring-2 focus:ring-[#84A98C] focus:border-[#84A98C] focus:z-10 sm:text-sm"
                placeholder="Full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-[#354F52] placeholder-[#84A98C] text-[#CAD2C5] bg-[#2F3E46] focus:outline-none focus:ring-2 focus:ring-[#84A98C] focus:border-[#84A98C] focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-[#354F52] placeholder-[#84A98C] text-[#CAD2C5] bg-[#2F3E46] focus:outline-none focus:ring-2 focus:ring-[#84A98C] focus:border-[#84A98C] focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                required
                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-[#354F52] placeholder-[#84A98C] text-[#CAD2C5] bg-[#2F3E46] focus:outline-none focus:ring-2 focus:ring-[#84A98C] focus:border-[#84A98C] focus:z-10 sm:text-sm"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#84A98C] hover:bg-[#52796F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#84A98C] transition-colors duration-200"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

SignupForm.propTypes = {
  onSignup: PropTypes.func.isRequired
} 