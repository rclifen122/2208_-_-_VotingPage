import { useLanguage } from '../context/LanguageContext';

const VoteResults = ({ restaurants, totalVotes }) => {
  const { t } = useLanguage();

  // Calculate vote percentages
  const restaurantsWithPercentage = restaurants.map(restaurant => ({
    ...restaurant,
    percentage: totalVotes > 0 ? ((restaurant.votes / totalVotes) * 100).toFixed(1) : 0
  }));

  // Sort by votes (highest first)
  const sortedRestaurants = restaurantsWithPercentage.sort((a, b) => b.votes - a.votes);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {t('voteResults')} {t('language') === 'vi' && `(${t('voteResultsJa')})`}
        </h2>
        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
          {t('realTimeResults')} {t('language') === 'vi' && `(${t('realTimeResultsJa')})`}
        </div>
      </div>

      {totalVotes === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">📊</div>
          <p>{t('language') === 'vi' ? 'Chưa có phiếu bầu nào. Hãy bắt đầu bình chọn!' : 'まだ投票がありません。投票を開始してください！'}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedRestaurants.map((restaurant, index) => (
            <div key={restaurant.id} className="relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 ${
                    index === 0 ? 'bg-yellow-500' : 
                    index === 1 ? 'bg-gray-400' : 
                    index === 2 ? 'bg-orange-600' : 'bg-blue-500'
                  }`}>
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-800">{restaurant.name}</h3>
                    {t('language') === 'vi' && (
                      <p className="text-sm text-gray-600">{restaurant.nameJa}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg text-gray-800">
                    {restaurant.votes} {t('votes')}
                  </div>
                  <div className="text-sm text-gray-600">
                    {restaurant.percentage}%
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ease-out ${
                    index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 
                    index === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-500' : 
                    index === 2 ? 'bg-gradient-to-r from-orange-400 to-orange-600' : 
                    'bg-gradient-to-r from-blue-400 to-blue-600'
                  }`}
                  style={{ width: `${restaurant.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-blue-600">{restaurants.length}</div>
            <div className="text-sm text-blue-800">{t('restaurants')}</div>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-green-600">{totalVotes}</div>
            <div className="text-sm text-green-800">{t('totalVotes')}</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-purple-600">
              {sortedRestaurants[0]?.votes || 0}
            </div>
            <div className="text-sm text-purple-800">{t('language') === 'vi' ? 'Cao nhất' : '最高得票'}</div>
          </div>
          <div className="bg-orange-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-orange-600">
              {totalVotes > 0 ? Math.round(totalVotes / restaurants.length) : 0}
            </div>
            <div className="text-sm text-orange-800">{t('language') === 'vi' ? 'Trung bình' : '平均'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteResults;
