import { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchRestaurantsWithMenus, updateCoverImage, updateMenuOrder } from '../services/votingApi'
import { isSupabaseConfigured } from '../services/supabase'

const allowedEmail = 'zzblackstar67@gmail.com'
const adminPasscode = import.meta.env.VITE_ADMIN_PASSCODE || ''

const AdminPage = () => {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [authError, setAuthError] = useState('')
  const [isAuthed, setIsAuthed] = useState(false)
  const [restaurants, setRestaurants] = useState([])
  const [status, setStatus] = useState('idle')
  const [coverDrafts, setCoverDrafts] = useState({})
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null)
  const [menuDraft, setMenuDraft] = useState([])
  const [menuStatus, setMenuStatus] = useState('idle')
  const supabaseReady = isSupabaseConfigured()

  const selectedRestaurant = useMemo(
    () => restaurants.find((restaurant) => restaurant.id === selectedRestaurantId),
    [restaurants, selectedRestaurantId]
  )

  const loadRestaurants = useCallback(async () => {
    setStatus('loading')
    const result = await fetchRestaurantsWithMenus()
    if (result.success) {
      setRestaurants(result.data)
      setStatus('ready')
    } else {
      setStatus('error')
    }
  }, [])

  useEffect(() => {
    if (isAuthed) {
      loadRestaurants()
    }
  }, [isAuthed, loadRestaurants])

  useEffect(() => {
    if (selectedRestaurant) {
      setMenuDraft(selectedRestaurant.menuImages)
    } else {
      setMenuDraft([])
    }
  }, [selectedRestaurant])

  const handleLogin = (event) => {
    event.preventDefault()
    if (!supabaseReady) {
      setAuthError('Supabase environment variables are missing.')
      return
    }
    if (!adminPasscode) {
      setAuthError('VITE_ADMIN_PASSCODE is not set.')
      return
    }
    if (email.trim().toLowerCase() !== allowedEmail) {
      setAuthError('Only the designated admin email can access this page.')
      return
    }
    if (code.trim() !== adminPasscode) {
      setAuthError('Invalid admin passcode.')
      return
    }
    setAuthError('')
    setIsAuthed(true)
  }

  const handleCoverSave = async (restaurantId) => {
    const draftValue = coverDrafts[restaurantId]
    if (typeof draftValue === 'undefined') return
    const result = await updateCoverImage(restaurantId, draftValue)
    if (result.success) {
      await loadRestaurants()
    } else {
      alert(result.message || 'Failed to update cover image.')
    }
  }

  const moveMenuImage = (index, direction) => {
    const newOrder = [...menuDraft]
    const targetIndex = index + direction
    if (targetIndex < 0 || targetIndex >= newOrder.length) return
    const temp = newOrder[index]
    newOrder[index] = newOrder[targetIndex]
    newOrder[targetIndex] = temp
    setMenuDraft(newOrder)
  }

  const persistMenuOrder = async () => {
    if (!selectedRestaurant || menuDraft.length === 0) return
    setMenuStatus('saving')
    const orderedIds = menuDraft.map((image) => image.id)
    const result = await updateMenuOrder(orderedIds)
    if (result.success) {
      await loadRestaurants()
      setMenuStatus('ready')
    } else {
      setMenuStatus('error')
      alert(result.message || 'Unable to update menu order.')
    }
  }

  if (!supabaseReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Supabase not configured</h1>
          <p className="mt-3 text-sm text-slate-600">
            Set <code className="font-mono text-xs">VITE_SUPABASE_URL</code> and{' '}
            <code className="font-mono text-xs">VITE_SUPABASE_ANON_KEY</code> to use the admin tools.
          </p>
        </div>
      </div>
    )
  }

  if (!isAuthed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/70 p-8 text-white shadow-2xl backdrop-blur"
        >
          <h1 className="text-3xl font-bold">Admin Console</h1>
          <p className="mt-2 text-sm text-slate-300">
            Sign in with your company email and the admin passcode stored as <code>VITE_ADMIN_PASSCODE</code>.
          </p>
          <label className="mt-6 block text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none"
              placeholder="you@email.com"
              required
            />
          </label>
          <label className="mt-4 block text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
            Admin Passcode
            <input
              type="password"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-slate-400 focus:border-indigo-400 focus:outline-none"
              placeholder="••••••"
              required
            />
          </label>
          {authError && <p className="mt-4 rounded-xl bg-red-500/20 px-4 py-2 text-sm text-red-200">{authError}</p>}
          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-white py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5"
          >
            Enter dashboard
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Admin</p>
          <h1 className="text-3xl font-bold text-slate-900">Restaurant configuration</h1>
          <p className="text-sm text-slate-600">
            Update cover images and reorder menu pages. Changes sync instantly to Supabase.
          </p>
        </header>

        {status === 'loading' && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
            Loading restaurants...
          </div>
        )}

        {status === 'error' && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-600">
            Unable to load data. Refresh the page or verify your Supabase rules.
          </div>
        )}

        <div className="grid gap-6">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{restaurant.aka}</p>
                  <h2 className="text-2xl font-semibold text-slate-900">{restaurant.name}</h2>
                  <p className="text-sm text-slate-500">{restaurant.address}</p>
                </div>
                <button
                  onClick={() => setSelectedRestaurantId(restaurant.id)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    selectedRestaurantId === restaurant.id
                      ? 'bg-slate-900 text-white'
                      : 'border border-slate-300 text-slate-600 hover:border-slate-400 hover:text-slate-900'
                  }`}
                >
                  Configure menu order
                </button>
              </div>

              <div className="mt-4 space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Cover image URL
                </label>
                <input
                  type="url"
                  placeholder="https://images..."
                  value={coverDrafts[restaurant.id] ?? restaurant.coverImage ?? ''}
                  onChange={(event) =>
                    setCoverDrafts((prev) => ({
                      ...prev,
                      [restaurant.id]: event.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-slate-400 focus:outline-none"
                />
                <button
                  onClick={() => handleCoverSave(restaurant.id)}
                  className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                >
                  Save cover image
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedRestaurant && (
          <div className="rounded-3xl border border-indigo-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-indigo-400">Menu order</p>
                <h3 className="text-xl font-semibold text-slate-900">{selectedRestaurant.name}</h3>
              </div>
              <button
                onClick={persistMenuOrder}
                disabled={menuStatus === 'saving'}
                className="rounded-full bg-indigo-600 px-6 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {menuStatus === 'saving' ? 'Saving...' : 'Save new order'}
              </button>
            </div>

            {menuDraft.length === 0 ? (
              <p className="mt-4 text-sm text-slate-500">No menu images found for this restaurant.</p>
            ) : (
              <ol className="mt-4 space-y-3">
                {menuDraft.map((image, index) => (
                  <li
                    key={image.id}
                    className="flex items-center gap-4 rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-600"
                  >
                    <span className="text-xs font-semibold text-slate-400">#{index + 1}</span>
                    <img src={image.url} alt="" className="h-16 w-16 rounded-lg object-cover" />
                    <span className="flex-1 truncate">{image.url}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => moveMenuImage(index, -1)}
                        className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-600 disabled:opacity-40"
                        disabled={index === 0}
                      >
                        Up
                      </button>
                      <button
                        onClick={() => moveMenuImage(index, 1)}
                        className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-600 disabled:opacity-40"
                        disabled={index === menuDraft.length - 1}
                      >
                        Down
                      </button>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPage
