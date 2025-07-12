import { useState, useEffect } from 'react';
import { getStorageTheme, saveTheme } from './logic/storage/Theme.js';
import { users } from './logic/storage/Users.js';
import { FacebookFeedCard } from './components/FacebookFeedCard/FacebookFeedCard.jsx';
import { ButtonChangeTheme } from './components/ButtonChangeTheme/ButtonChangeTheme.jsx';
import { Toaster, toast } from 'sonner';
import { FaSun, FaMoon } from 'react-icons/fa';

export function App() {
  const [isDark, setColor] = useState(getStorageTheme);

  function changingMode() {
    return new Promise((resolve) => setTimeout(resolve, 800));
  }

  const btnChangeTheme = () => {
    setColor(!isDark);
    toast.promise(changingMode(), {
      loading: 'Cambiando . . .',
      success: `Tema cambiado a ${isDark ? 'Claro' : 'Oscuro'}`,
      error: 'Error al cambiar el tema',
      duration: 600,
      position: 'top-left',
      style: {
        width: '15rem',
        background: isDark ? '#ecececff' : '#1c1c1d',
        color: isDark ? 'black' : 'white',
        border: `1px solid ${isDark ? 'black' : '#ecececff'}`,
      },
    });
  };

  useEffect(() => {
    saveTheme(isDark);
    document.body.style.background = isDark ? '#1c1c1d' : '#cccccc';
  }, [isDark]);

  return (
    <section className='App'>
      <ButtonChangeTheme isDark={isDark} btnChangeTheme={btnChangeTheme} />

      {users.map(
        ({
          id,
          userName,
          name,
          isLike,
          dateTime,
          feedImage,
          likesQuantity,
          commentQuantity,
          reactionsCount,
        }) => (
          <FacebookFeedCard
            key={id}
            postId={id}
            userName={userName}
            initialIsLike={isLike}
            dateTime={dateTime}
            feedImage={feedImage}
            likesQuantity={likesQuantity}
            commentQuantity={commentQuantity}
            initialReactionsCount={reactionsCount}
            isDark={isDark}
            toast={toast}
          >
            {name}
          </FacebookFeedCard>
        )
      )}

      <Toaster richColors />
    </section>
  );
}
