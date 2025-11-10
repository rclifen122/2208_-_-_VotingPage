import { useState } from 'react'

const MenuGallery = ({ images = [], restaurantName }) => {
  const [showAll, setShowAll] = useState(false)

  if (images.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
        Menu images will appear here once they are uploaded.
      </div>
    )
  }

  const visibleImages = showAll ? images : images.slice(0, 6)

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-3">
        {visibleImages.map((src, index) => (
          <div
            key={src}
            className="group relative overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm"
          >
            <img
              src={src}
              alt={`${restaurantName} menu page ${index + 1}`}
              loading="lazy"
              className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-slate-900/0 transition group-hover:bg-slate-900/10" />
          </div>
        ))}
      </div>

      {images.length > 6 && (
        <button
          onClick={() => setShowAll((prev) => !prev)}
          className="w-full rounded-xl border border-slate-200 bg-white py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
        >
          {showAll ? 'Hide extra menu pages' : `Show all ${images.length} menu images`}
        </button>
      )}
    </div>
  )
}

export default MenuGallery
