import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function LoginForm({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(u => u.email === formData.email && u.password === formData.password)

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user))
      onLogin(user)
      navigate('/')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2F3E46] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-[#CAD2C5]">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-[#84A98C]">
            Or{' '}
            <Link to="/signup" className="font-medium text-[#84A98C] hover:text-[#CAD2C5] transition-colors duration-200">
              create a new account
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
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-[#354F52] placeholder-[#84A98C] text-[#CAD2C5] bg-[#2F3E46] focus:outline-none focus:ring-2 focus:ring-[#84A98C] focus:border-[#84A98C] focus:z-10 sm:text-sm"
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
                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-[#354F52] placeholder-[#84A98C] text-[#CAD2C5] bg-[#2F3E46] focus:outline-none focus:ring-2 focus:ring-[#84A98C] focus:border-[#84A98C] focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#84A98C] hover:bg-[#52796F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#84A98C] transition-colors duration-200"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired
} 