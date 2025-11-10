import { useEffect, useMemo, useRef, useState } from 'react'
import CoverSection from './components/CoverSection'
import RestaurantCard from './components/RestaurantCard'
import { restaurants as restaurantData, totalMenuImages } from './data/restaurants'

const heroContent = {
  eyebrow: 'Company Social - August 22',
  title: 'Help pick the dinner venue',
  subtitle: 'Modern Vietnamese x Continental mash-up, you make the final call.',
  description:
    'Review each venue, skim through their real menus, and cast your vote. We will lock the booking based on the live tally before Friday noon. Your pick shapes the mood, the flavors, and the stories we will tell on Monday.',
  ctaLabel: 'Browse restaurants',
  ctaHint: 'Scroll to see the contenders and their full menus.',
}

const getStoredObject = (key, fallback) => {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch (error) {
    console.warn(`Failed to parse ${key} from localStorage`, error)
    return fallback
  }
}

function App() {
  const [restaurants, setRestaurants] = useState(() => restaurantData.map((restaurant) => ({ ...restaurant })))
  const [userVotes, setUserVotes] = useState(() => getStoredObject('userVotes', {}))
  const [expandedRestaurant, setExpandedRestaurant] = useState(null)
  const listRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const storedCounts = getStoredObject('voteCounts', {})
    if (Object.keys(storedCounts).length === 0) return
    setRestaurants((prev) =>
      prev.map((restaurant) => ({
        ...restaurant,
        votes: storedCounts[restaurant.id] ?? restaurant.votes ?? 0,
      }))
    )
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('userVotes', JSON.stringify(userVotes))
  }, [userVotes])

  const totalVotes = useMemo(() => restaurants.reduce((sum, restaurant) => sum + (restaurant.votes ?? 0), 0), [restaurants])

  const heroStats = useMemo(
    () => [
      { label: 'Restaurants shortlisted', value: restaurants.length },
      { label: 'Local vote count', value: totalVotes },
      { label: 'Menu images attached', value: totalMenuImages },
    ],
    [restaurants.length, totalVotes]
  )

  const handleVote = (restaurantId) => {
    if (userVotes[restaurantId]) {
      return { message: 'You already voted for this venue.' }
    }

    setRestaurants((prev) => {
      const updated = prev.map((restaurant) =>
        restaurant.id === restaurantId ? { ...restaurant, votes: (restaurant.votes ?? 0) + 1 } : restaurant
      )

      if (typeof window !== 'undefined') {
        const payload = updated.reduce((acc, restaurant) => {
          acc[restaurant.id] = restaurant.votes ?? 0
          return acc
        }, {})
        window.localStorage.setItem('voteCounts', JSON.stringify(payload))
      }

      return updated
    })

    setUserVotes((prev) => ({ ...prev, [restaurantId]: true }))
    return { message: 'Vote locked in. Thank you!' }
  }

  const toggleMenu = (restaurantId) => {
    setExpandedRestaurant((current) => (current === restaurantId ? null : restaurantId))
  }

  const resetLocalData = () => {
    if (typeof window === 'undefined') return
    if (!window.confirm('Clear your local vote history? This only affects your browser.')) return
    window.localStorage.removeItem('userVotes')
    window.localStorage.removeItem('voteCounts')
    setUserVotes({})
    setRestaurants(restaurantData.map((restaurant) => ({ ...restaurant })))
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

        <section ref={listRef} className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Shortlist</p>
              <h2 className="text-3xl font-bold text-slate-900">Restaurants & live menus</h2>
            </div>
            <button
              onClick={resetLocalData}
              className="text-sm font-semibold text-slate-500 transition hover:text-slate-900"
            >
              Reset local votes
            </button>
          </div>

          <div className="grid gap-8">
            {restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onVote={handleVote}
                onToggleMenu={toggleMenu}
                isExpanded={expandedRestaurant === restaurant.id}
                hasVoted={Boolean(userVotes[restaurant.id])}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
