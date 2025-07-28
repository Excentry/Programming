const MUSIC_KEY = 'MusicPlay';

export function getStorageMusic() {
  const savedMusic = localStorage.getItem(MUSIC_KEY);
  return savedMusic ? JSON.parse(savedMusic) : true;
}

export function saveMusic(isPlay) {
  localStorage.setItem(MUSIC_KEY, JSON.stringify(isPlay));
}