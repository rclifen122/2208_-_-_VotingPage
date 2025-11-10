import restaurantInfoRaw from '../../restaurant_infor.txt?raw'

const restaurantInfo = JSON.parse(restaurantInfoRaw)

const menuImagesGlob = import.meta.glob('../../imagemenu/**/*.{png,jpg,jpeg,JPG,JPEG,PNG}', {
  eager: true,
  import: 'default',
})

const menuImages = Object.entries(menuImagesGlob).map(([path, url]) => ({
  path: path.replace('../..', '').replace(/\\/g, '/'),
  url,
}))

let fallbackImageId = 0

export const restaurants = restaurantInfo.map((info) => {
  const matchedImages = menuImages
    .filter((image) => image.path.includes(info.menuFolder))
    .sort((a, b) => a.path.localeCompare(b.path))
    .map((image) => ({
      id: `local-${fallbackImageId++}`,
      url: image.url,
      sortOrder: fallbackImageId,
    }))

  return {
    id: info.id,
    name: info.name,
    aka: info.aka,
    rating: info.rating ?? 0,
    reviewCount: info.reviewCount ?? 0,
    address: info.address,
    shortDescription: info.shortDescription,
    badge: info.badge,
    badgeNote: info.badgeNote,
    coverImage: info.featuredImage ?? matchedImages[0]?.url ?? '',
    votes: info.initialVotes ?? 0,
    mapUrl: info.mapUrl || info.googleMapsUrl || info.mapsLink || '',
    menuImages: matchedImages,
  }
})

export const totalMenuImages = menuImages.length
