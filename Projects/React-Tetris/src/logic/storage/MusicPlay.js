const MUSIC_KEY = 'MusicPlay';

export function getStorageMusic() {
  try {
    const savedMusic = localStorage.getItem(MUSIC_KEY);
    return savedMusic === null ? true : JSON.parse(savedMusic) === true;
  } catch {
    return true;
  }
}

export function saveMusic(isPlay) {
  try {
    localStorage.setItem(MUSIC_KEY, JSON.stringify(isPlay));
  } catch {
    return;
  }
}
