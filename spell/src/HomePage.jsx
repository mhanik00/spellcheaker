import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function HomePage({ isAuthenticated }) {
  return (
    <div className="min-h-screen bg-[#2f3e46]">
      {/* Hero Section */}
      <div 
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')"
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#2F3E46] bg-opacity-65" />

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#CAD2C5] mb-6 text-center">
            Master Your Spelling Skills
          </h1>
          <p className="text-xl text-[#CAD2C5] mb-8 text-center max-w-2xl">
            Improve your spelling through interactive pronunciation practice and instant feedback
          </p>
          <Link
            to={isAuthenticated ? "/practice" : "/login"}
            className="inline-flex items-center px-8 py-3 text-lg font-medium rounded-md text-white bg-[#84A98C] hover:bg-[#52796F] transition-all duration-200 transform hover:scale-105"
          >
            Start Checking Spelling
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 mt-6 bg-[#52796F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#CAD2C5] sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-xl text-[#CAD2C5]">
              Three simple steps to improve your spelling
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Feature cards with updated styling */}
              <div className="bg-[#2F3E46] p-6 rounded-lg shadow-md border border-[#354F52] hover:shadow-lg transition-all duration-200">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#84A98C] text-white mb-4">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-[#CAD2C5] mb-2">Listen</h3>
                <p className="text-[#CAD2C5]">
                  Click to hear the word pronounced clearly and accurately
                </p>
              </div>
              <div className="bg-[#2F3E46] p-6 rounded-lg shadow-md border border-[#354F52] hover:shadow-lg transition-all duration-200">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#84A98C] text-white mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
</svg>

                </div>
                <h3 className="text-lg font-medium text-[#CAD2C5] mb-2">Practice</h3>
                <p className="text-[#CAD2C5]">
                  Engage in interactive exercises to reinforce your learning
                </p>
              </div>
              <div className="bg-[#2F3E46] p-6 rounded-lg shadow-md border border-[#354F52] hover:shadow-lg transition-all duration-200">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#84A98C] text-white mb-4">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-[#CAD2C5] mb-2">Feedback</h3>
                <p className="text-[#CAD2C5]">
                  Receive instant feedback on your spelling attempts
                </p>
              </div>
               
              {/* Additional feature cards... */}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#354F52] mt-6 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#CAD2C5] sm:text-4xl">
            Ready to improve your spelling?
          </h2>
          <p className="mt-4 text-xl text-[#CAD2C5]">
            Join thousands of users who have enhanced their spelling skills
          </p>
          <div className="mt-8">
            <Link
              to={isAuthenticated ? "/practice" : "/signup"}
              className="inline-flex items-center px-8 py-3 text-lg font-medium rounded-md text-white bg-[#84A98C] hover:bg-[#52796F] transition-all duration-200 transform hover:scale-105"
            >
              {isAuthenticated ? 'Start Practice' : 'Sign Up Now'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool
}

HomePage.defaultProps = {
  isAuthenticated: false
}
