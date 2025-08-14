import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { submitVote, submitVoteDemo, isApiConfigured } from '../services/votingApi';

const RestaurantCard = ({ restaurant, onVote, hasVoted }) => {
  const [showMap, setShowMap] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const { t, language } = useLanguage();

  const handleVote = async () => {
    if (isVoting || hasVoted) return;
    
    setIsVoting(true);
    
    try {
      // Use demo mode if API not configured, otherwise use real API
      const result = isApiConfigured() 
        ? await submitVote(restaurant.id)
        : await submitVoteDemo(restaurant.id);
      
      if (result.success) {
        // Update local state
        onVote(restaurant.id, result.newVoteCount);
        
        // Show success message
        alert(result.message || t('thankYou'));
      } else {
        // Show error message
        alert(result.message || (language === 'vi' ? 'Có lỗi xảy ra. Vui lòng thử lại.' : 'エラーが発生しました。もう一度お試しください。'));
      }
    } catch (error) {
      console.error('Vote error:', error);
      alert(language === 'vi' ? 'Có lỗi xảy ra. Vui lòng thử lại.' : 'エラーが発生しました。もう一度お試しください。');
    } finally {
      setIsVoting(false);
    }
  };

  const toggleMap = () => {
    setShowMap(!showMap);
  };

  // Generate star rating display
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <span key={i} className="text-yellow-400">⭐</span>
        ))}
        {hasHalfStar && <span className="text-yellow-400">⭐</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={i} className="text-gray-300">⭐</span>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Restaurant Image */}
      <div className="relative h-48 bg-gray-200">
        {!imageError ? (
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <div className="text-center text-gray-400">
              <div className="text-4xl mb-2">🍽️</div>
              <div className="text-sm">{language === 'vi' ? 'Hình ảnh không có sẵn' : '画像が利用できません'}</div>
            </div>
          </div>
        )}
        
        {/* Cuisine Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {restaurant.cuisine}
          </span>
        </div>
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3">
          <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center">
            ⭐ {restaurant.rating}
          </div>
        </div>

        {/* Vote Count Badge */}
        {restaurant.votes > 0 && (
          <div className="absolute bottom-3 right-3">
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {restaurant.votes} {t('votes')}
            </span>
          </div>
        )}
      </div>

      {/* Restaurant Info */}
      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-800 mb-1">{restaurant.name}</h3>
          {language === 'vi' && restaurant.nameJa && (
            <p className="text-sm text-gray-600 italic">{restaurant.nameJa}</p>
          )}
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            {renderStars(restaurant.rating)}
            <span className="ml-2 text-sm text-gray-600">
              {restaurant.rating} ({restaurant.reviewCount} {t('reviews')})
            </span>
          </div>
        </div>
        
        {/* Address */}
        <div className="mb-3">
          <div className="flex items-center text-gray-600 mb-1">
            <span className="mr-2">📍</span>
            <span className="text-sm">{restaurant.address}</span>
          </div>
          {language === 'vi' && restaurant.addressJa && (
            <div className="text-xs text-gray-500 ml-6">{restaurant.addressJa}</div>
          )}
        </div>

        {/* Phone */}
        <div className="flex items-center text-gray-600 mb-3">
          <span className="mr-2">📞</span>
          <span className="text-sm font-medium">{restaurant.phone}</span>
        </div>

        {/* Price Range */}
        <div className="mb-3">
          <div className="flex items-center text-gray-600">
            <span className="mr-2">💰</span>
            <span className="text-sm font-medium">{restaurant.priceRange}</span>
          </div>
          {language === 'vi' && restaurant.priceRangeJa && (
            <div className="text-xs text-gray-500 ml-6">{restaurant.priceRangeJa}</div>
          )}
        </div>
        
        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {restaurant.description}
        </p>

        {/* Capacity Info */}
        <div className="flex items-center text-gray-600 mb-3">
          <span className="mr-2">👥</span>
          <span className="text-sm font-medium">{restaurant.capacity}</span>
        </div>

        {/* Specialties */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">{t('specialties')}</h4>
          <div className="flex flex-wrap gap-2">
            {restaurant.specialties.map((specialty, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleVote}
            disabled={hasVoted || isVoting}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors duration-200 ${
              hasVoted
                ? 'bg-green-500 text-white cursor-default'
                : isVoting
                ? 'bg-blue-400 text-white cursor-wait'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {hasVoted 
              ? t('voted') 
              : isVoting 
              ? (language === 'vi' ? '⏳ Đang gửi...' : '⏳ 送信中...') 
              : t('voteNow')
            }
          </button>
          
          <button
            onClick={toggleMap}
            className="px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            {showMap ? t('hideMap') : t('showMap')}
          </button>
        </div>
        
        {/* Google Maps Embed */}
        {showMap && (
          <div className="mt-4 rounded-lg overflow-hidden border">
            <iframe
              src={restaurant.mapEmbedUrl}
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map for ${restaurant.name}`}
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantCard;
