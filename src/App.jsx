import { useState, useEffect, useCallback } from 'react'
import RestaurantCard from './components/RestaurantCard'
import VoteResults from './components/VoteResults'
import LanguageToggle from './components/LanguageToggle'
import { LanguageProvider, useLanguage } from './context/LanguageContext'
import { restaurants as initialRestaurants } from './data/restaurants'
import { fetchVoteCounts, isApiConfigured } from './services/votingApi'

function AppContent() {
  const [restaurants, setRestaurants] = useState(initialRestaurants)
  const [votedRestaurants, setVotedRestaurants] = useState(new Set())
  const [isLoadingVotes, setIsLoadingVotes] = useState(false)
  const [lastFetchTime, setLastFetchTime] = useState(null)
  const { t, language } = useLanguage()

  // Calculate total votes across all restaurants
  const totalVotes = restaurants.reduce((sum, restaurant) => sum + restaurant.votes, 0)

  // Fetch vote counts from API
  const loadVoteCounts = useCallback(async () => {
    if (!isApiConfigured()) return; // Skip if API not configured
    
    setIsLoadingVotes(true);
    try {
      const result = await fetchVoteCounts();
      if (result.success && result.data) {
        setRestaurants(prevRestaurants => 
          prevRestaurants.map(restaurant => {
            const apiData = result.data.find(item => item.id === restaurant.id);
            return {
              ...restaurant,
              votes: apiData ? apiData.votes : restaurant.votes
            };
          })
        );
        setLastFetchTime(new Date());
      }
    } catch (error) {
      console.error('Failed to load vote counts:', error);
    } finally {
      setIsLoadingVotes(false);
    }
  }, []);

  // Load data from localStorage and API on component mount
  useEffect(() => {
    const savedVotes = localStorage.getItem('votedRestaurants')
    if (savedVotes) {
      setVotedRestaurants(new Set(JSON.parse(savedVotes)))
    }
    
    // If API is not configured, load from localStorage
    if (!isApiConfigured()) {
      const savedRestaurantVotes = localStorage.getItem('restaurantVotes')
      if (savedRestaurantVotes) {
        const parsedVotes = JSON.parse(savedRestaurantVotes)
        setRestaurants(prevRestaurants => 
          prevRestaurants.map(restaurant => ({
            ...restaurant,
            votes: parsedVotes[restaurant.id] || 0
          }))
        )
      }
    } else {
      // Load from API if configured
      loadVoteCounts();
    }
  }, [loadVoteCounts])

  // Periodic vote count refresh (every 30 seconds if API is configured)
  useEffect(() => {
    if (!isApiConfigured()) return;
    
    const interval = setInterval(loadVoteCounts, 30000);
    return () => clearInterval(interval);
  }, [loadVoteCounts]);

  const handleVote = (restaurantId, newVoteCount) => {
    if (votedRestaurants.size >= 3 && !votedRestaurants.has(restaurantId)) {
      alert(language === 'vi' ? 'Bạn đã bình chọn cho 3 nhà hàng. Không thể bình chọn thêm.' : 'すでに3つのレストランに投票しました。これ以上投票できません。');
      return;
    }
    // Update restaurant vote count with the value from API
    setRestaurants(prevRestaurants => {
      const updatedRestaurants = prevRestaurants.map(restaurant =>
        restaurant.id === restaurantId
          ? { ...restaurant, votes: newVoteCount || restaurant.votes + 1 }
          : restaurant
      )
      
      // Save restaurant votes to localStorage (backup)
      if (!isApiConfigured()) {
        const restaurantVotes = {}
        updatedRestaurants.forEach(restaurant => {
          restaurantVotes[restaurant.id] = restaurant.votes
        })
        localStorage.setItem('restaurantVotes', JSON.stringify(restaurantVotes))
      }
      
      return updatedRestaurants
    })

    // Update user's voted restaurants
    const newVotedRestaurants = new Set([...votedRestaurants, restaurantId])
    setVotedRestaurants(newVotedRestaurants)
    
    // Save to localStorage
    localStorage.setItem('votedRestaurants', JSON.stringify([...newVotedRestaurants]))
  }

  const resetVotes = () => {
    if (window.confirm(t('confirmReset'))) {
      setVotedRestaurants(new Set())
      setRestaurants(prevRestaurants => 
        prevRestaurants.map(restaurant => ({ ...restaurant, votes: 0 }))
      )
      localStorage.removeItem('votedRestaurants')
      localStorage.removeItem('restaurantVotes')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1"></div>
            <div className="flex-1 text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                🍽️ {t('title')}
              </h1>
              {language === 'vi' && (
                <p className="text-lg text-gray-600 italic mb-2">
                  {t('titleJa')}
                </p>
              )}
            </div>
            <div className="flex-1 flex justify-end">
              <LanguageToggle />
            </div>
          </div>
          
          <p className="text-lg text-gray-600 mb-4">
            {t('subtitle')}
          </p>
          {language === 'vi' && (
            <p className="text-sm text-gray-500 italic mb-4">
              {t('subtitleJa')}
            </p>
          )}
          
          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-md p-4 inline-block mb-6">
            <div className="flex items-center gap-6 text-sm">
              <div className="text-center">
                <div className="font-bold text-2xl text-blue-600">{restaurants.length}</div>
                <div className="text-gray-600">{t('restaurants')}</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-2xl text-green-600">{votedRestaurants.size}</div>
                <div className="text-gray-600">{t('yourVotes')}</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-2xl text-purple-600">{totalVotes}</div>
                <div className="text-gray-600">{t('totalVotes')}</div>
              </div>
              {votedRestaurants.size > 0 && (
                <button
                  onClick={resetVotes}
                  className="text-red-600 hover:text-red-700 text-xs underline"
                >
                  {t('resetVotes')}
                </button>
              )}
            </div>
            
            {/* API Status Indicator */}
            <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-center">
              <div className={`flex items-center text-xs ${isApiConfigured() ? 'text-green-600' : 'text-orange-600'}`}>
                <span className="mr-1">
                  {isApiConfigured() ? '🟢' : '🟡'}
                </span>
                {isApiConfigured() 
                  ? (language === 'vi' ? 'API đã kết nối' : 'API接続済み')
                  : (language === 'vi' ? 'Chế độ demo' : 'デモモード')
                }
                {isLoadingVotes && (
                  <span className="ml-2">
                    ⏳ {language === 'vi' ? 'Đang tải...' : '読み込み中...'}
                  </span>
                )}
                {lastFetchTime && isApiConfigured() && (
                  <span className="ml-2 text-gray-500">
                    ({language === 'vi' ? 'Cập nhật lúc' : '更新時刻'}: {lastFetchTime.toLocaleTimeString()})
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Vote Results */}
        <VoteResults restaurants={restaurants} totalVotes={totalVotes} />

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-start">
            <span className="text-blue-600 text-xl mr-3">ℹ️</span>
            <div>
              <h3 className="font-semibold text-blue-800 mb-1">{t('howToVote')}</h3>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>{t('instruction1')}</li>
                <li>{t('instruction2')}</li>
                <li>{t('instruction3')}</li>
                <li>{t('instruction4')}</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onVote={handleVote}
              hasVoted={votedRestaurants.has(restaurant.id)}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>{t('footer')}</p>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}

export default App
