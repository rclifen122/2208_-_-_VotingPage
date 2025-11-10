import { supabase, isSupabaseConfigured } from './supabase'

export const fetchRestaurantsWithMenus = async () => {
  if (!isSupabaseConfigured()) return { success: false, reason: 'not_configured' }

  const { data, error } = await supabase
    .from('restaurants')
    .select(
      `
        id,
        name,
        aka,
        rating,
        review_count,
        address,
        short_description,
        badge,
        badge_note,
        map_url,
        cover_image,
        votes,
        menu_images (
          id,
          image_url,
          sort_order
        )
      `
    )
    .order('name', { ascending: true })

  if (error) {
    console.error('Failed to fetch restaurants:', error)
    return { success: false, message: error.message }
  }

  const normalized = data.map((restaurant) => ({
    id: restaurant.id,
    name: restaurant.name,
    aka: restaurant.aka,
    rating: restaurant.rating ?? 0,
    reviewCount: restaurant.review_count ?? 0,
    address: restaurant.address,
    shortDescription: restaurant.short_description,
    badge: restaurant.badge,
    badgeNote: restaurant.badge_note,
    mapUrl: restaurant.map_url,
    coverImage: restaurant.cover_image,
    votes: restaurant.votes ?? 0,
    menuImages: (restaurant.menu_images ?? [])
      .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
      .map((image) => ({
        id: image.id,
        url: image.image_url,
        sortOrder: image.sort_order ?? 0,
      })),
  }))

  return { success: true, data: normalized }
}

export const submitVote = async (restaurantId) => {
  if (!isSupabaseConfigured()) return { success: false, reason: 'not_configured' }

  const { data, error } = await supabase.rpc('increment_vote', { restaurant_id: restaurantId })

  if (error) {
    console.error('Vote RPC error:', error)
    return { success: false, message: error.message }
  }

  return { success: true, newVoteCount: data ?? 0 }
}

export const updateCoverImage = async (restaurantId, coverImage) => {
  if (!isSupabaseConfigured()) return { success: false, reason: 'not_configured' }

  const { error } = await supabase
    .from('restaurants')
    .update({ cover_image: coverImage })
    .eq('id', restaurantId)

  if (error) {
    console.error('Failed to update cover image:', error)
    return { success: false, message: error.message }
  }

  return { success: true }
}

export const updateMenuOrder = async (orderedImageIds) => {
  if (!isSupabaseConfigured()) return { success: false, reason: 'not_configured' }

  const responses = await Promise.all(
    orderedImageIds.map((imageId, index) =>
      supabase.from('menu_images').update({ sort_order: index }).eq('id', imageId)
    )
  )

  const failed = responses.find(({ error }) => error)
  if (failed?.error) {
    console.error('Failed to update menu order:', failed.error)
    return { success: false, message: failed.error.message }
  }

  return { success: true }
}
