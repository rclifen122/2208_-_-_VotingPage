import { useState } from 'react'
import MenuGallery from './MenuGallery'

const RestaurantCard = ({ restaurant, onVote, onToggleMenu, isExpanded, hasVoted }) => {
  const [feedback, setFeedback] = useState('')
  const [isVoting, setIsVoting] = useState(false)

  const handleVote = async () => {
    if (isVoting) return
    setIsVoting(true)
    const result = await Promise.resolve(onVote(restaurant.id))
    setIsVoting(false)
    if (result?.message) {
      setFeedback(result.message)
      setTimeout(() => setFeedback(''), 3000)
    }
  }

  const renderStars = (rating) =>
    Array.from({ length: 5 }).map((_, index) => {
      const value = index + 1
      const isFilled = value <= Math.round(rating)
      return (
        <span key={value} className={isFilled ? 'text-amber-400' : 'text-slate-300'}>
          {'\u2605'}
        </span>
      )
    })

  return (
    <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg shadow-slate-200/40 backdrop-blur">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="md:w-1/3">
          <div className="overflow-hidden rounded-2xl border border-slate-100">
            <img
              src={restaurant.coverImage}
              alt={restaurant.name}
              className="h-48 w-full object-cover transition duration-500 hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>

        <div className="md:w-2/3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-400">
            {restaurant.aka}
          </div>
          <h3 className="mt-2 text-2xl font-bold text-slate-900">{restaurant.name}</h3>
          <p className="mt-2 text-sm text-slate-500">{restaurant.shortDescription}</p>

          <div className="mt-4 flex flex-wrap gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-base font-semibold text-amber-500">
                {renderStars(restaurant.rating)}
              </div>
              <span className="text-slate-500">
                {restaurant.rating.toFixed(1)} / {restaurant.reviewCount} reviews
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-slate-400" aria-hidden="true" />
              <span>{restaurant.address}</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={handleVote}
              disabled={hasVoted}
              className={`rounded-full px-6 py-2 text-sm font-semibold transition-all ${
                hasVoted
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-slate-900 text-white hover:-translate-y-0.5 hover:bg-slate-800'
              } ${isVoting ? 'opacity-70' : ''}`}
            >
              {hasVoted ? 'Thanks for voting' : isVoting ? 'Counting...' : 'Vote for this venue'}
            </button>

            <button
              onClick={() => onToggleMenu(restaurant.id)}
              className="rounded-full border border-slate-300 px-6 py-2 text-sm font-semibold text-slate-600 transition hover:-translate-y-0.5 hover:border-slate-400 hover:text-slate-900"
            >
              {isExpanded ? 'Hide menu' : 'View menu'}
            </button>
          </div>

          {feedback && (
            <p className="mt-3 text-sm font-medium text-emerald-600" role="status">
              {feedback}
            </p>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="mt-6 rounded-3xl border border-slate-100 bg-slate-50/60 p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Menu Preview</p>
              <p className="text-base font-semibold text-slate-900">
                {restaurant.menuImages.length} uploaded pages
              </p>
            </div>
            <span className="text-sm text-slate-500">
              Tap an image to open the full-resolution file.
            </span>
          </div>
          <MenuGallery images={restaurant.menuImages} restaurantName={restaurant.name} />
        </div>
      )}
    </div>
  )
}

export default RestaurantCard
