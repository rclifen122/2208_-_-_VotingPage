const VoteDashboard = ({ restaurants = [], totalVotes = 0, userVote }) => {
  const sorted = [...restaurants].sort((a, b) => (b.votes ?? 0) - (a.votes ?? 0))
  const leaders = sorted.slice(0, 2)

  const votePercent = (votes) => {
    if (!totalVotes) return '0%'
    return `${((votes / totalVotes) * 100).toFixed(1)}%`
  }

  return (
    <section className="rounded-3xl border border-indigo-100 bg-white/90 p-6 shadow-md shadow-indigo-50">
      <div className="grid gap-4 text-sm text-slate-600 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Restaurants</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{restaurants.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Total Votes</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{totalVotes}</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Your Choice</p>
          <p className="mt-2 text-base font-semibold text-slate-900">
            {userVote ? restaurants.find((restaurant) => restaurant.id === userVote)?.name ?? 'Locked' : 'Select one venue'}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {leaders.map((restaurant, index) => (
          <div
            key={restaurant.id}
            className="rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-white px-4 py-3"
          >
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-500">
                Leader #{index + 1}
              </span>
              <span className="text-xs font-semibold text-indigo-600">{votePercent(restaurant.votes ?? 0)}</span>
            </div>
            <p className="mt-1 text-base font-semibold text-slate-900">{restaurant.name}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {restaurants.map((restaurant) => {
          const votes = restaurant.votes ?? 0
          const isUserPick = userVote === restaurant.id
          const percent = totalVotes ? (votes / totalVotes) * 100 : 0
          return (
            <div
              key={restaurant.id}
              className={`rounded-2xl border px-4 py-3 ${
                isUserPick ? 'border-slate-900 bg-slate-900/5' : 'border-slate-100 bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-slate-900">{restaurant.name}</p>
                  {isUserPick && (
                    <span className="rounded-full bg-slate-900 px-2 py-0.5 text-xs font-semibold text-white">Your Vote</span>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-base font-semibold text-slate-900">{votes}</p>
                  <p className="text-xs text-slate-500">{votePercent(votes)}</p>
                </div>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-slate-900 transition-all" style={{ width: `${percent}%` }} />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default VoteDashboard
