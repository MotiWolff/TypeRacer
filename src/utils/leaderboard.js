// Return parsed leaderboard array from localStorage, or empty array if error or not found
export const getLeaderboard = () => {
  try {
    // localStorage stores JSON string. use "[]" as fallback to make sure JSON.parse gets valid JSON
    return JSON.parse(localStorage.getItem("leaderboard") || "[]");
  } catch {
    // If parsing fails, return empty array
    return [];
  }
};

// Add newScore to leaderboard, keep it sorted by descending word per minute (wpm), store top 5
export const updateLeaderboard = (newScore) => {
  const scores = getLeaderboard();
  scores.push(newScore);
  // Sort descending by wpm (higher first)
  scores.sort((a, b) => b.wpm - a.wpm);
  const top5 = scores.slice(0, 5);
  // Persist top 5 back to localStorage
  localStorage.setItem("leaderboard", JSON.stringify(top5));
  return top5;
};
