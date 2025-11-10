import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import CoverSection from '../components/CoverSection'
import RestaurantCard from '../components/RestaurantCard'
import VoteDashboard from '../components/VoteDashboard'
import { restaurants as fallbackRestaurants } from '../data/restaurants'
import { isSupabaseConfigured } from '../services/supabase'
import { fetchRestaurantsWithMenus, submitVote } from '../services/votingApi'

const heroContent = {
  eyebrow: 'ESUTECH PARTY RESTAURANT VOTE',
  title: 'Choose the restaurant for the 15/11 party',
  subtitle: 'Two venues. One choice.',
  description: 'Browse the contenders below and lock in your one vote.',
  ctaLabel: 'See shortlist',
  ctaHint: 'Scroll to review menus and vote.',
}

const getStoredObject = (key, fallback) => {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

const MainPage = () => {
  const [restaurants, setRestaurants] = useState(() => fallbackRestaurants.map((restaurant) => ({ ...restaurant })))
  const [userVote, setUserVote] = useState(() => getStoredObject('userVote', null))
  const [expandedRestaurant, setExpandedRestaurant] = useState(null)
  const [status, setStatus] = useState(isSupabaseConfigured() ? 'loading' : 'ready')
  const [error, setError] = useState(null)
  const listRef = useRef(null)
  const supabaseReady = isSupabaseConfigured()

  const loadFromSupabase = useCallback(async () => {
    if (!supabaseReady) return
    setStatus('loading')
    const result = await fetchRestaurantsWithMenus()
    if (result.success) {
      setRestaurants(result.data)
      setError(null)
      setStatus('ready')
    } else {
      setError(result.message || 'Failed to load data from Supabase')
      setStatus('error')
    }
  }, [supabaseReady])

  useEffect(() => {
    if (supabaseReady) {
      loadFromSupabase()
    } else {
      setStatus('ready')
    }
  }, [supabaseReady, loadFromSupabase])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('userVote', JSON.stringify(userVote))
  }, [userVote])

  const totalVotes = useMemo(
    () => restaurants.reduce((sum, restaurant) => sum + (restaurant.votes ?? 0), 0),
    [restaurants]
  )

  const totalMenuImages = useMemo(
    () => restaurants.reduce((sum, restaurant) => sum + (restaurant.menuImages?.length ?? 0), 0),
    [restaurants]
  )

  const heroStats = [
    { label: 'Restaurants shortlisted', value: restaurants.length },
    { label: 'Community votes', value: totalVotes },
    { label: 'Menu images attached', value: totalMenuImages },
  ]

  const handleVote = async (restaurantId) => {
    if (userVote && userVote !== restaurantId) {
      return { message: 'You already used your vote on a different restaurant.' }
    }

    if (userVote === restaurantId) {
      return { message: 'You already voted for this venue.' }
    }

    if (supabaseReady) {
      const result = await submitVote(restaurantId)
      if (!result.success) {
        return { message: result.message || 'Unable to record your vote. Please try again.' }
      }

      setRestaurants((prev) =>
        prev.map((restaurant) =>
          restaurant.id === restaurantId ? { ...restaurant, votes: result.newVoteCount } : restaurant
        )
      )
    } else {
      setRestaurants((prev) =>
        prev.map((restaurant) =>
          restaurant.id === restaurantId ? { ...restaurant, votes: (restaurant.votes ?? 0) + 1 } : restaurant
        )
      )
    }

    setUserVote(restaurantId)
    return { message: 'Vote locked in. Thank you!' }
  }

  const toggleMenu = (restaurantId) => {
    setExpandedRestaurant((current) => (current === restaurantId ? null : restaurantId))
  }

  const resetLocalHistory = () => {
    if (typeof window === 'undefined') return
    const confirmationMessage = supabaseReady
      ? 'Clear your local vote history? Votes already stored in Supabase will stay recorded.'
      : 'Clear your local votes and counts? This only affects your browser.'
    if (!window.confirm(confirmationMessage)) return
    window.localStorage.removeItem('userVote')
    setUserVote(null)
    if (!supabaseReady) {
      setRestaurants(fallbackRestaurants.map((restaurant) => ({ ...restaurant })))
    }
    setExpandedRestaurant(null)
  }

  const scrollToRestaurants = () => {
    listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 md:px-6">
        <CoverSection
          eyebrow={heroContent.eyebrow}
          title={heroContent.title}
          subtitle={heroContent.subtitle}
          description={heroContent.description}
          ctaLabel={heroContent.ctaLabel}
          ctaHint={heroContent.ctaHint}
          onPrimaryAction={scrollToRestaurants}
          stats={heroStats}
        />

        <VoteDashboard restaurants={restaurants} totalVotes={totalVotes} userVote={userVote} />

        <section ref={listRef} className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Shortlist</p>
              <h2 className="text-3xl font-bold text-slate-900">Restaurants & live menus</h2>
            </div>
            <button
              onClick={resetLocalHistory}
              className="text-sm font-semibold text-slate-500 transition hover:text-slate-900"
            >
              Reset local votes
            </button>
          </div>

          {status === 'loading' && (
            <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 text-center text-sm text-slate-500">
              Loading live data from Supabase...
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="grid gap-8">
            {restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onVote={handleVote}
                onToggleMenu={toggleMenu}
                isExpanded={expandedRestaurant === restaurant.id}
                userVote={userVote}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default MainPage
