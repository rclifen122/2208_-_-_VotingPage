import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('vi'); // Default to Vietnamese

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'vi' ? 'ja' : 'vi');
  };

  // Translation object
  const translations = {
    vi: {
      title: "22/08 歓迎会＋送別会",
      titleJa: "22/08 Tiệc Chào Mừng + Tiệc Chia Tay",
      subtitle: "Hãy bình chọn cho nhà hàng yêu thích để tổ chức tiệc công ty sắp tới!",
      subtitleJa: "今度の会社パーティーのお気に入りのレストランに投票してください！",
      restaurants: "Nhà Hàng",
      restaurantsJa: "レストラン",
      yourVotes: "Lượt Bình Chọn",
      yourVotesJa: "あなたの投票",
      totalVotes: "Tổng Bình Chọn",
      totalVotesJa: "総投票数",
      voteResults: "Kết Quả Bình Chọn",
      voteResultsJa: "投票結果",
      realTimeResults: "Kết quả theo thời gian thực",
      realTimeResultsJa: "リアルタイム結果",
      howToVote: "Cách Bình Chọn:",
      howToVoteJa: "投票方法：",
      instruction1: "• Duyệt qua các lựa chọn nhà hàng bên dưới",
      instruction1Ja: "• 下記のレストランオプションを閲覧",
      instruction2: "• Nhấn 'Bình Chọn Ngay' để gửi phiếu bầu qua Google Forms",
      instruction2Ja: "• 「今すぐ投票」をクリックしてGoogleフォーム経由で投票",
      instruction3: "• Bạn có thể bình chọn cho nhiều nhà hàng",
      instruction3Ja: "• 複数のレストランに投票可能",
      instruction4: "• Nhấn 'Bản Đồ' để xem vị trí nhà hàng",
      instruction4Ja: "• 「地図」をクリックしてレストランの場所を確認",
      voteNow: "🗳️ Bình Chọn Ngay",
      voteNowJa: "🗳️ 今すぐ投票",
      voted: "✓ Đã Bình Chọn",
      votedJa: "✓ 投票済み",
      showMap: "📍 Bản Đồ",
      showMapJa: "📍 地図",
      hideMap: "📍 Ẩn",
      hideMapJa: "📍 非表示",
      phone: "Điện thoại:",
      phoneJa: "電話：",
      rating: "Đánh giá:",
      ratingJa: "評価：",
      reviews: "đánh giá",
      reviewsJa: "レビュー",
      specialties: "Đặc sản:",
      specialtiesJa: "特別料理：",
      priceRange: "Giá:",
      priceRangeJa: "価格：",
      capacity: "Sức chứa:",
      capacityJa: "収容人数：",
      resetVotes: "Xóa Phiếu Bầu",
      resetVotesJa: "投票をリセット",
      thankYou: "Cảm ơn bạn đã bình chọn! Phiếu bầu đã được gửi.",
      thankYouJa: "投票ありがとうございます！投票が送信されました。",
      confirmReset: "Bạn có chắc chắn muốn xóa tất cả phiếu bầu? Hành động này không thể hoàn tác.",
      confirmResetJa: "すべての投票をリセットしてもよろしいですか？この操作は取り消せません。",
      footer: "Được xây dựng với ❤️ cho kế hoạch tiệc công ty của chúng ta",
      footerJa: "私たちの会社パーティー企画のために❤️で作成",
      votes: "phiếu",
      votesJa: "票"
    },
    ja: {
      title: "22/08 歓迎会＋送別会",
      titleJa: "22/08 歓迎会＋送別会",
      subtitle: "今度の会社パーティーのお気に入りのレストランに投票してください！",
      subtitleJa: "今度の会社パーティーのお気に入りのレストランに投票してください！",
      restaurants: "レストラン",
      restaurantsJa: "レストラン",
      yourVotes: "あなたの投票",
      yourVotesJa: "あなたの投票",
      totalVotes: "総投票数",
      totalVotesJa: "総投票数",
      voteResults: "投票結果",
      voteResultsJa: "投票結果",
      realTimeResults: "リアルタイム結果",
      realTimeResultsJa: "リアルタイム結果",
      howToVote: "投票方法：",
      howToVoteJa: "投票方法：",
      instruction1: "• 下記のレストランオプションを閲覧",
      instruction1Ja: "• 下記のレストランオプションを閲覧",
      instruction2: "• 「今すぐ投票」をクリックしてGoogleフォーム経由で投票",
      instruction2Ja: "• 「今すぐ投票」をクリックしてGoogleフォーム経由で投票",
      instruction3: "• 複数のレストランに投票可能",
      instruction3Ja: "• 複数のレストランに投票可能",
      instruction4: "• 「地図」をクリックしてレストランの場所を確認",
      instruction4Ja: "• 「地図」をクリックしてレストランの場所を確認",
      voteNow: "🗳️ 今すぐ投票",
      voteNowJa: "🗳️ 今すぐ投票",
      voted: "✓ 投票済み",
      votedJa: "✓ 投票済み",
      showMap: "📍 地図",
      showMapJa: "📍 地図",
      hideMap: "📍 非表示",
      hideMapJa: "📍 非表示",
      phone: "電話：",
      phoneJa: "電話：",
      rating: "評価：",
      ratingJa: "評価：",
      reviews: "レビュー",
      reviewsJa: "レビュー",
      specialties: "特別料理：",
      specialtiesJa: "特別料理：",
      priceRange: "価格：",
      priceRangeJa: "価格：",
      capacity: "収容人数：",
      capacityJa: "収容人数：",
      resetVotes: "投票をリセット",
      resetVotesJa: "投票をリセット",
      thankYou: "投票ありがとうございます！投票が送信されました。",
      thankYouJa: "投票ありがとうございます！投票が送信されました。",
      confirmReset: "すべての投票をリセットしてもよろしいですか？この操作は取り消せません。",
      confirmResetJa: "すべての投票をリセットしてもよろしいですか？この操作は取り消せません。",
      footer: "私たちの会社パーティー企画のために❤️で作成",
      footerJa: "私たちの会社パーティー企画のために❤️で作成",
      votes: "票",
      votesJa: "票"
    }
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
