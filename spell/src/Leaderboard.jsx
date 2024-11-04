import { useState } from 'react'
import PropTypes from 'prop-types'

const SORT_OPTIONS = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  ALL_TIME: 'all-time'
}

export default function Leaderboard({ users }) {
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.WEEKLY)

  const getBadgeEmoji = (rank) => {
    switch (rank) {
      case 1: return '🥇'
      case 2: return '🥈'
      case 3: return '🥉'
      default: return null
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Top Spellers</h2>
        
        {/* Sort Controls */}
        <div className="flex gap-2">
          {Object.values(SORT_OPTIONS).map((option) => (
            <button
              key={option}
              onClick={() => setSortBy(option)}
              className={`px-3 py-1 text-sm rounded-full transition-colors duration-200 
                ${sortBy === option
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-3 text-left text-sm font-semibold text-gray-600 w-16">Rank</th>
              <th className="py-3 text-left text-sm font-semibold text-gray-600">User</th>
              <th className="py-3 text-right text-sm font-semibold text-gray-600">Words</th>
              <th className="py-3 text-right text-sm font-semibold text-gray-600">Accuracy</th>
              <th className="py-3 text-right text-sm font-semibold text-gray-600">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user, index) => (
              <tr 
                key={user.id}
                className={`transition-colors duration-200 hover:bg-gray-50 
                  ${index === 0 ? 'bg-yellow-50' : ''}`}
              >
                <td className="py-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">
                      {index + 1}
                    </span>
                    <span className="text-lg">{getBadgeEmoji(index + 1)}</span>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-indigo-700">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
                      {user.streak > 0 && (
                        <div className="text-xs text-gray-500">
                          🔥 {user.streak} day streak
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-4 text-right">
                  <span className="text-sm font-medium text-gray-900">
                    {user.wordsCompleted}
                  </span>
                </td>
                <td className="py-4 text-right">
                  <span className="text-sm font-medium text-gray-900">
                    {user.accuracy}%
                  </span>
                </td>
                <td className="py-4 text-right">
                  <span className="text-sm font-medium text-gray-900">
                    {user.score}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No data available for this time period</p>
        </div>
      )}
    </div>
  )
}

Leaderboard.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      wordsCompleted: PropTypes.number.isRequired,
      accuracy: PropTypes.number.isRequired,
      score: PropTypes.number.isRequired,
      streak: PropTypes.number.isRequired
    })
  ).isRequired
}
