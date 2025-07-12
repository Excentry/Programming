import { FaMoon, FaSun } from 'react-icons/fa';

export function ButtonChangeTheme({ isDark, btnChangeTheme }) {
  const buttonIcon = isDark ? <FaMoon /> : <FaSun />;
  const changeThemeClass = isDark ? '' : 'btn-theme-light';

  return (
    <button
      onKeyDown={(e) => e.preventDefault()}
      className={`btn-theme ${changeThemeClass}`}
      onClick={btnChangeTheme}
    >
      {buttonIcon}
    </button>
  );
}
