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

export const restaurants = restaurantInfo.map((info) => {
  const matchedImages = menuImages
    .filter((image) => image.path.includes(info.menuFolder))
    .sort((a, b) => a.path.localeCompare(b.path))
    .map((image) => image.url)

  return {
    ...info,
    votes: info.initialVotes ?? 0,
    menuImages: matchedImages,
    coverImage: info.featuredImage ?? matchedImages[0] ?? '',
  }
})

export const totalMenuImages = menuImages.length
