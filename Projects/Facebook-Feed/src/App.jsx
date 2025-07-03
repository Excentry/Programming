import { useState, useEffect } from 'react';
import { getStorageTheme, saveTheme } from './logic/storage/Theme.js';
import { users } from './logic/storage/Users.js';
import { FacebookFeedCard } from './components/FacebookFeedCard/FacebookFeedCard.jsx';
import { ButtonChangeTheme } from './components/ButtonChangeTheme/ButtonChangeTheme.jsx';
export function App() {
  const [isDark, setColor] = useState(getStorageTheme);

  const btnChangeTheme = () => {
    setColor(!isDark);
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
          >
            {name}
          </FacebookFeedCard>
        )
      )}
    </section>
  );
}
