import PropTypes from 'prop-types'

export default function WordHistory({ history, onClear }) {
  if (!history.length) {
    return (
      <div className="bg-[#2F3E46] p-6 rounded-xl shadow-md border border-[#354F52] text-center">
        <p className="text-[#CAD2C5]">No words attempted yet</p>
      </div>
    )
  }

  return (
    <div className="bg-[#2F3E46] p-6 rounded-xl shadow-md border border-[#354F52]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-[#CAD2C5]">Word History</h2>
        <button
          onClick={onClear}
          className="text-sm text-[#84A98C] hover:text-[#CAD2C5] transition-colors duration-200"
          aria-label="Clear history"
        >
          Clear All
        </button>
      </div>

      {/* Scrollable History List */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#52796F] scrollbar-track-[#354F52]">
        {history.map((entry, index) => (
          <div
            key={entry.timestamp}
            className={`p-4 rounded-lg border transition-colors duration-200 ${
              index === 0 ? 'bg-[#354F52] border-[#52796F]' : 'bg-[#354F52] border-[#52796F]'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[#CAD2C5]">{entry.word}</span>
                  {entry.isCorrect ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#84A98C] text-[#CAD2C5]">
                      Correct
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-500 bg-opacity-20 text-red-100">
                      Incorrect
                    </span>
                  )}
                </div>
                {!entry.isCorrect && (
                  <p className="mt-1 text-sm text-[#84A98C]">
                    Attempted: <span className="font-medium">{entry.attempt}</span>
                  </p>
                )}
              </div>
              <time className="text-xs text-[#84A98C]" dateTime={entry.timestamp}>
                {new Date(entry.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </time>
            </div>
            
            {/* Additional Details */}
            <div className="mt-2 flex items-center gap-4 text-sm">
              <button 
                className="text-[#84A98C] hover:text-[#CAD2C5] transition-colors duration-200"
                onClick={() => entry.onPractice?.(entry.word)}
              >
                Practice Again
              </button>
              <span className="text-[#354F52]">•</span>
              <span className="text-[#84A98C]">
                {new Date(entry.timestamp).toLocaleDateString([], {
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

WordHistory.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      word: PropTypes.string.isRequired,
      attempt: PropTypes.string.isRequired,
      isCorrect: PropTypes.bool.isRequired,
      timestamp: PropTypes.number.isRequired,
      onPractice: PropTypes.func
    })
  ).isRequired,
  onClear: PropTypes.func.isRequired
}
