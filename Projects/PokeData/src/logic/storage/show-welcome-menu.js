const MENU_KEY = 'ShowWelcomePage';

export function getShowWelcomePage() {
  const savedMenu = localStorage.getItem(MENU_KEY);
  return savedMenu ? JSON.parse(savedMenu) : true;
}

export function saveShowWelcomePage(show) {
  localStorage.setItem(MENU_KEY, JSON.stringify(show));
}