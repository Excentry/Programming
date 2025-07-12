import { Header } from './Header.jsx';
import { Footer } from './Footer.jsx';
import { useReactions } from '../../hooks/useReactions.js';
import { reactions } from '../Reactions.js';
export function FacebookFeedCard({
  postId,
  userName,
  dateTime,
  children,
  feedImage,
  ...rest
}) {
  const {
    reactionsState: {
      isLike,
      likes,
      likeSelected,
      showReactionsMenu,
      reactionsCount,
      isDark,
    },
    handlers: { handleLikeClick, handleEmojiClick, setShowReactionsMenu },
    cardStyles: {
      footerTheme,
      cardTheme,
      cardColor,
      buttonLikeColor,
      actionButtonsColor,
      underlineTheme,
    },
    displayTexts: { likesText, commentsText },
    visibility: { showLikes, showComments, showContainer },
  } = useReactions({ postId, ...rest });

  const numberFormat = new Intl.NumberFormat('en-US');
  const getTopReactions = () => {
    const top = Object.entries(reactionsCount)
      .filter(([emoji, count]) => count > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    return top.map(([emoji, count], index) => {
      const reaction = reactions.find((r) => r.emoji === emoji);

      return (
        <div
          key={index}
          className='reaction-wrapper'
          style={{ zIndex: top.length - index }}  
        >
          <div className='reaction-count-bubble'>
            <strong>{reaction.text}</strong>
            <div>{numberFormat.format(count)}</div>
          </div>
          <span
            className='reaction-icon'
            style={{
              border: `1px solid ${cardColor}`,
              background: cardColor,
            }}
          >
            {emoji}
          </span>
        </div>
      );
    });
  };

  return (
    <article
      className={`fb-feedCard ${cardTheme}`}
      style={{ background: cardColor }}
    >
      <Header userName={userName} dateTime={dateTime}>
        {children}
      </Header>

      <main className='fb-feedCard-content'>
        <img
          className='fb-feedCard-image'
          src={`https://picsum.photos/seed/${feedImage}/600/500.webp?${Date.now()}`}
          loading='lazy'
          alt='feed-img no loading...'
          onError={(e) => {
            if (!e.target.dataset.fallback) {
              e.target.src = '/image-missing.svg';
              e.target.alt =
                'image not found, reload the page if the problem persists.';
              e.target.dataset.fallback = true;
            }
          }}
        />
      </main>

      <Footer
        showContainer={showContainer}
        showLikes={showLikes}
        getTopReactions={getTopReactions}
        likesText={likesText}
        showComments={showComments}
        commentsText={commentsText}
        footerTheme={footerTheme}
        underlineTheme={underlineTheme}
        likeButtonProps={{
          isLike,
          likeSelected,
          buttonLikeColor,
          handleLikeClick,
          handleEmojiClick,
          reactions,
          showReactionsMenu,
          setShowReactionsMenu,
          cardColor,
          isDark,
          actionButtonsColor,
        }}
      />
    </article>
  );
}
