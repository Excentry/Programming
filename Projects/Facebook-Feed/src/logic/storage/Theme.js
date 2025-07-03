const THEME_KEY = 'ThemeDark';

export function getStorageTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  return savedTheme ? JSON.parse(savedTheme) : true;
}

export function saveTheme(isDark) {
  localStorage.setItem(THEME_KEY, JSON.stringify(isDark));
}