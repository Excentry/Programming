import { useEffect, useState } from 'react';
import {
  FaGlobeAmericas,
  FaThumbsUp,
  FaComment,
  FaShare
} from 'react-icons/fa';

export function FacebookFeedCard({
  children,
  userName,
  initialIsLike,
  dateTime,
  feedImage,
  likesQuantity,
  commentQuantity,
  likesIcon,
  isDark
}) {
  const [isLike, setIsLike] = useState(initialIsLike);
  const [likes, setLikesQuantity] = useState(likesQuantity);

  useEffect(() => {
    if (initialIsLike && likesQuantity === 0) {
      setLikesQuantity(1);
    }
  }, [initialIsLike, likesQuantity]);

  const buttonLikeColor = isLike && likes > 0 ? '#1e76ff' : !isLike && isDark ? '#b0b3b8' : '#65686c';
  const actionButtonsColor = isDark ? '#b0b3b8' : '#65686c';

  const handleLikeClick = () => {
    isLike ? setLikesQuantity(likes - 1) : setLikesQuantity(likes + 1);

    setIsLike(!isLike);
  };

  const cardTheme = isDark ? '' : 'feedCard-Color-Light';
  const cardColor = isDark ? '#252728' : '#fff'

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
      ? (likes / 1000) + ' mil'
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
    <article className={`fb-feedCard ${cardTheme}`} style={{ background: cardColor }}>
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

      <div className='fb-feedCard-content'>
        <img
          className='fb-feedCard-image'
          src={`https://picsum.photos/seed/${feedImage}/600/500`}
          alt='imagen del feed'
        />
      </div>

      <footer className='fb-feedCard-footer'>
        <section className={showContainer}>
          <div className='fb-feedCard-footer-likes-comments'>
            <span className={showLikes}>
              {likesIcon}
              <span>{likesText}</span>
            </span>
            <span className={showComments}>
              <span>{commentsText}</span>
            </span>
          </div>
          <hr className='fb-feedCard-footer-divider' />
        </section>
        <div className='fb-feedCard-footer-actions'>
          <span className='fb-feedCard-footer-likes' onClick={handleLikeClick}>
            <FaThumbsUp className='fb-Fa-Icons' color={buttonLikeColor} />
            <span style={{ color: buttonLikeColor }}>Me gusta</span>
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
