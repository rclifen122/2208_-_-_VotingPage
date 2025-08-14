import { supabase } from './supabase'

// Check if Supabase is configured
export const isApiConfigured = () => {
  return import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
}

// Fetch vote counts from Supabase
export const fetchVoteCounts = async () => {
  if (!isApiConfigured()) return { success: false, data: [] }

  try {
    const { data, error } = await supabase
      .from('restaurants')
      .select('id, name, votes')
      .order('id')

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error('Error fetching vote counts:', error)
    return { success: false, message: error.message, data: [] }
  }
}

// Submit a vote to Supabase
export const submitVote = async (restaurantId) => {
  if (!isApiConfigured()) return { success: false }

  try {
    const { error } = await supabase.rpc('increment_vote', {
      restaurant_id: restaurantId,
    })

    if (error) throw error

    // After a successful vote, fetch the latest counts to get the new number
    const { data: updatedRestaurants, error: fetchError } = await supabase
      .from('restaurants')
      .select('id, votes')
    
    if (fetchError) throw fetchError

    const updatedRestaurant = updatedRestaurants.find(r => r.id === restaurantId)

    return {
      success: true,
      newVoteCount: updatedRestaurant ? updatedRestaurant.votes : 0,
      message: 'Vote recorded successfully!',
    }
  } catch (error) {
    console.error('Error submitting vote:', error)
    return { success: false, message: error.message }
  }
}

// Demo mode for local testing without API keys
export const submitVoteDemo = async (restaurantId) => {
  console.log('Running in demo mode')
  await new Promise((resolve) => setTimeout(resolve, 500))
  return {
    success: true,
    restaurantId: restaurantId,
    newVoteCount: Math.floor(Math.random() * 50) + 1,
    message: '投票が記録されました！(Vote recorded!)',
  }
}