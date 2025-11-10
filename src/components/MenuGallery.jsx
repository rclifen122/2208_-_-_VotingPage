import { useMemo, useState } from 'react'

const normalizeImages = (images = []) =>
  images.map((image, index) =>
    typeof image === 'string'
      ? { id: `fallback-${index}`, url: image, sortOrder: index }
      : { id: image.id ?? `img-${index}`, url: image.url, sortOrder: image.sortOrder ?? index }
  )

const MenuGallery = ({ images = [], restaurantName }) => {
  const [showAll, setShowAll] = useState(false)
  const [activeImage, setActiveImage] = useState(null)
  const normalizedImages = useMemo(() => normalizeImages(images), [images])

  if (normalizedImages.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
        Menu images will appear here once they are uploaded.
      </div>
    )
  }

  const visibleImages = showAll ? normalizedImages : normalizedImages.slice(0, 6)

  return (
    <>
      <div className="space-y-4">
        <div className="grid gap-3 md:grid-cols-3">
          {visibleImages.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActiveImage(image)}
              className="group relative overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm focus:outline-none"
            >
              <img
                src={image.url}
                alt={`${restaurantName} menu page ${index + 1}`}
                loading="lazy"
                className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-slate-900/0 transition group-hover:bg-slate-900/10" />
            </button>
          ))}
        </div>

        {normalizedImages.length > 6 && (
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
          >
            {showAll ? 'Hide extra menu pages' : `Show all ${normalizedImages.length} menu images`}
          </button>
        )}
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 px-4 py-6"
          role="dialog"
          aria-label="Full-size menu preview"
        >
          <div className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <button
              onClick={() => setActiveImage(null)}
              className="absolute right-4 top-4 rounded-full bg-white/80 px-3 py-1 text-sm font-semibold text-slate-600 hover:bg-white"
            >
              Close
            </button>
            <img src={activeImage.url} alt="Full-size menu page" className="h-full w-full object-contain" />
            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-3 text-xs text-slate-500">
              <span>{restaurantName}</span>
              <button
                onClick={() => window.open(activeImage.url, '_blank', 'noopener')}
                className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Open original
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MenuGallery
