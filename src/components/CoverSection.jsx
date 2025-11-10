const CoverSection = ({
  eyebrow,
  title,
  subtitle,
  description,
  ctaLabel,
  ctaHint,
  onPrimaryAction,
  stats = [],
}) => {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-900 px-8 py-12 text-white shadow-2xl">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -left-16 top-10 h-56 w-56 rounded-full bg-indigo-500 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-purple-500 blur-3xl" />
      </div>

      <div className="relative z-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-200">{eyebrow}</p>
        <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">{title}</h1>
        <p className="mt-4 text-xl text-slate-100">{subtitle}</p>
        <p className="mt-6 max-w-3xl text-base text-slate-200 md:text-lg">{description}</p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            onClick={onPrimaryAction}
            className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-100"
          >
            {ctaLabel}
          </button>
          <span className="text-sm text-indigo-100">{ctaHint}</span>
        </div>

        {stats.length > 0 && (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/10 px-6 py-5 backdrop-blur"
              >
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm uppercase tracking-wide text-slate-200">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default CoverSection
