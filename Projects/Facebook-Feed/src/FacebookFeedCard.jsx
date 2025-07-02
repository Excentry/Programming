import { act, useEffect, useState } from 'react';
import {
  FaGlobeAmericas,
  FaThumbsUp,
  FaComment,
  FaShare,
} from 'react-icons/fa';

export function FacebookFeedCard({
  children,
  userName,
  initialIsLike,
  dateTime,
  feedImage,
  likesQuantity,
  commentQuantity,
  initialReactionsCount,
  isDark,
}) {
  const [isLike, setIsLike] = useState(initialIsLike);
  const [likes, setLikesQuantity] = useState(likesQuantity);
  const [likeSelected, setLikeSelected] = useState(null);
  const [showReactionsMenu, setShowReactionsMenu] = useState(false);
  const [reactionsCount, setReactionsCount] = useState(initialReactionsCount);

  const reactions = [
    { emoji: '👍', color: '#2374E1', text: 'Me gusta' },
    { emoji: '❤️', color: '#f66666', text: 'Me encanta' },
    { emoji: '🥰', color: '#f66666', text: 'Me importa' },
    { emoji: '😄', color: '#f9d31a', text: 'Me divierte' },
    { emoji: '😲', color: '#f9d31a', text: 'Me asombra' },
    { emoji: '😢', color: '#f9d31a', text: 'Me entristece' },
    { emoji: '😠', color: '#f56666', text: 'Me enoja' },
  ];

  useEffect(() => {
    if (initialIsLike && likesQuantity === 0) {
      setLikesQuantity(1);
    }
  }, [initialIsLike, likesQuantity]);

  const buttonLikeColor =
    isLike && likes > 0
      ? likeSelected
        ? likeSelected.color
        : '#2374E1'
      : !isLike && isDark
      ? '#b0b3b8'
      : '#65686c';

  const actionButtonsColor = isDark ? '#b0b3b8' : '#65686c';

  const handleLikeClick = () => {
    isLike
      ? (setLikesQuantity(likes - 1),
        setIsLike(false),
        setLikeSelected(null),
        setReactionsCount((prev) => ({
          ...prev,
          [likeSelected.emoji]: prev[likeSelected.emoji] - 1,
        })))
      : (setLikesQuantity(likes + 1),
        setIsLike(true),
        setLikeSelected(reactions[0]),
        setReactionsCount((prev) => ({
          ...prev,
          ['👍']: prev['👍'] + 1,
        })));
  };

  const handleEmojiClick = (e, reaction) => {
    e.stopPropagation();

    if (isLike && likeSelected.emoji === reaction.emoji) return;

    likeSelected !== null
      ? (setLikeSelected(reaction),
        setReactionsCount((prev) => ({
          ...prev,
          [likeSelected.emoji]: prev[likeSelected.emoji] - 1,
          [reaction.emoji]: (prev[reaction.emoji] || 0) + 1,
        })))
      : (setLikesQuantity(likes + 1),
        setIsLike(true),
        setLikeSelected(reaction),
        setReactionsCount((prev) => ({
          ...prev,
          [reaction.emoji]: (prev[reaction.emoji] || 0) + 1,
        })));

    setShowReactionsMenu(false);
  };

  const getTopReactions = () => {
    const top = Object.entries(reactionsCount)
      .filter(([emoji, count]) => count > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    return top.map(([emoji], index) => (
      <span
        key={index}
        className='reaction-icon'
        style={{
          border: `1px solid ${cardColor}`,
          background: `${cardColor}`,
          zIndex: top.length - index, // El primero tendrá el mayor z-index
        }}
      >
        {emoji}
      </span>
    ));
  };

  const footerTheme = isDark ? '' : 'actions-hover-color-light';
  const cardTheme = isDark ? '' : 'feedCard-color-light';
  const cardColor = isDark ? '#252728' : '#fff';

  const likesText =
    likes === 1 && isLike
      ? 'Tú'
      : likes === 1 && !isLike
      ? '1'
      : likes < 1000 && isLike
      ? 'Tú y ' +
        (likes - 1) +
        (likes - 1 === 1 ? ' persona más' : ' personas más')
      : likes < 1000 && !isLike
      ? likes.toString()
      : likes < 1000000 && isLike
      ? 'Tú y ' +
        ((likes - 1) / 1000).toFixed(1).replace('.', ',') +
        ' mil personas más'
      : likes < 1000000 && !isLike
      ? likes / 1000 + ' mil'
      : (likes / 1000000).toFixed(1).replace('.', ',') + ' mill.';

  const commentsText =
    commentQuantity === 1
      ? '1 comentario'
      : commentQuantity < 1000
      ? commentQuantity + ' comentarios'
      : commentQuantity < 1000000
      ? (commentQuantity / 1000).toFixed(1).replace('.', ',') +
        ' mil comentarios'
      : (commentQuantity / 1000000).toFixed(1).replace('.', ',') +
        ' mill. comentarios';

  const showLikes =
    likes > 0
      ? 'fb-feedCard-footer-likes-quantity'
      : 'fb-feedCard-footer-likes-quantity-empty';

  const showComments =
    commentQuantity > 0
      ? 'fb-feedCard-footer-comments-quantity'
      : 'fb-feedCard-footer-comments-quantity-empty';

  const showContainer =
    (likes > 0 && commentQuantity > 0) || likes > 0 || commentQuantity > 0
      ? 'fb-feedCard-footer-likes-comments-container'
      : 'fb-feedCard-footer-likes-comments-container-empty';

  return (
    <article
      className={`fb-feedCard ${cardTheme}`}
      style={{ background: cardColor }}
    >
      <header className='fb-feedCard-header'>
        <img
          className='fb-feedCard-avatar'
          alt='Avatar del Usuario'
          src={`https://unavatar.io/${userName}`}
        />
        <div className='fb-feedCard-info'>
          <strong>{children}</strong>

          <div className='fb-feedCard-subInfo'>
            <span className='fb-feedCard-date'>{dateTime}</span>
            <span className='fb-feedCard-Type'>
              <FaGlobeAmericas size={12} />
            </span>
          </div>
        </div>
      </header>

      <main className='fb-feedCard-content'>
        <img
          className='fb-feedCard-image'
          src={`https://picsum.photos/seed/${feedImage}/600/500`}
          alt='imagen del feed'
        />
      </main>

      <footer className='fb-feedCard-footer'>
        <section className={showContainer}>
          <div className='fb-feedCard-footer-likes-comments'>
            <span className={showLikes}>
              <div className='reaction-group'>{getTopReactions()}</div>
              <span>{likesText}</span>
            </span>
            <span className={showComments}>
              <span>{commentsText}</span>
            </span>
          </div>
          <hr className='fb-feedCard-footer-divider' />
        </section>
        <div className={`fb-feedCard-footer-actions ${footerTheme}`}>
          <span
            className='fb-feedCard-footer-likes'
            onClick={handleLikeClick}
            onMouseEnter={() => setShowReactionsMenu(true)}
            onMouseLeave={() => setShowReactionsMenu(false)}
          >
            {likeSelected && likeSelected.emoji !== '👍' ? (
              <span className='fb-Fa-Icons'>{likeSelected.emoji}</span>
            ) : (
              <FaThumbsUp className='fb-Fa-Icons' color={buttonLikeColor} />
            )}
            <span style={{ color: buttonLikeColor }}>
              {likeSelected && likeSelected.emoji !== '👍'
                ? likeSelected.text
                : 'Me gusta'}
            </span>
            <div
              className={`fb-feedCard-footer-likes-menu ${
                showReactionsMenu ? 'show' : ''
              }`}
              style={{ background: cardColor }}
            >
              {reactions.map((reaction, index) => (
                <span
                  key={index}
                  onClick={(e) => handleEmojiClick(e, reaction)}
                >
                  {reaction.emoji}
                </span>
              ))}
            </div>
          </span>
          <span className='fb-feedCard-footer-comments'>
            <FaComment className='fb-Fa-Icons' color={actionButtonsColor} />
            <span>Comentarios</span>
          </span>
          <span className='fb-feedCard-footer-shares'>
            <FaShare className='fb-Fa-Icons' color={actionButtonsColor} />
            <span>Compartir</span>
          </span>
        </div>
      </footer>
    </article>
  );
}
