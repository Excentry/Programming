function getStorageKey(postId) {
  return `FacebookFeedLikes-${postId}`;
}

export function saveLikeToStorage(postId, state) {
  const storageKey = getStorageKey(postId);
  localStorage.setItem(storageKey, JSON.stringify(state));
}

export function getLikeForUser(postId) {
  const storageKey = getStorageKey(postId);
  const likes = localStorage.getItem(storageKey);
  return likes ? JSON.parse(likes) : null;
}
