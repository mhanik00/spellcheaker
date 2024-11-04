import PropTypes from 'prop-types'

export default function ProgressTracker({ correct, total, target = 100, onReset }) {
  const percentage = Math.round((correct / target) * 100) || 0
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0

  return (
    <div className="bg-[#2F3E46] p-6 rounded-xl shadow-md border border-[#354F52]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-[#CAD2C5]">Your Progress</h2>
        <button
          onClick={onReset}
          className="text-sm text-[#84A98C] hover:text-[#CAD2C5] transition-colors duration-200"
          aria-label="Reset progress"
        >
          Reset
        </button>
      </div>

      {/* Progress Bar */}
      <div className="h-3 mb-6 bg-[#354F52] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#84A98C] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#354F52] p-4 rounded-lg">
          <div className="text-sm text-[#CAD2C5] mb-1">Correct Words</div>
          <div className="text-2xl font-bold text-[#CAD2C5]">
            {correct}
          </div>
        </div>
        
        <div className="bg-[#354F52] p-4 rounded-lg">
          <div className="text-sm text-[#CAD2C5] mb-1">Total Attempts</div>
          <div className="text-2xl font-bold text-[#CAD2C5]">
            {total}
          </div>
        </div>

        <div className="col-span-2 bg-[#354F52] p-4 rounded-lg">
          <div className="text-sm text-[#CAD2C5] mb-1">Accuracy Rate</div>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-[#CAD2C5]">
              {accuracy}%
            </span>
          </div>
        </div>
      </div>

      {/* Motivational Message */}
      {total > 0 && (
        <div className="mt-6 text-center">
          <p className="text-sm text-[#84A98C]">
            {percentage >= 100 ? (
              '🎉 Congratulations! You have reached your target!'
            ) : accuracy >= 80 ? (
              '🌟 Great work! Keep it up!'
            ) : accuracy >= 50 ? (
              '💪 You are making good progress!'
            ) : (
              '🎯 Keep practicing, you will get better!'
            )}
          </p>
        </div>
      )}
    </div>
  )
}

ProgressTracker.propTypes = {
  correct: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  target: PropTypes.number,
  onReset: PropTypes.func.isRequired
}
