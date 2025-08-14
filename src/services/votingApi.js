// Voting API service for Google Sheets integration
// 22/08 歓迎会＋送別会 Restaurant Voting

// Replace this URL with your actual Google Apps Script deployment URL
const API_URL = import.meta.env.VITE_API_URL;

export const submitVote = async (restaurantId) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        restaurantId: restaurantId
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Vote submission error:', error);
    return {
      success: false,
      message: 'ネットワークエラーです。もう一度お試しください。(Network error. Please try again.)'
    };
  }
};

export const fetchVoteCounts = async () => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Vote fetch error:', error);
    return {
      success: false,
      message: 'Could not fetch vote counts.',
      data: []
    };
  }
};

// Check if API is configured
export const isApiConfigured = () => {
  return !!API_URL; // Checks if API_URL is not null, undefined, or empty
};

// Demo mode for testing without API
export const submitVoteDemo = async (restaurantId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    success: true,
    restaurantId: restaurantId,
    newVoteCount: Math.floor(Math.random() * 50) + 1,
    message: '投票が記録されました！(Vote recorded!)'
  };
};
