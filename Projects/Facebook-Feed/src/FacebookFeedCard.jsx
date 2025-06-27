import { useState } from 'react';
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
}) {
  const [isLike, setIsLike] = useState(initialIsLike);
  const [likes, setLikesQuantity] = useState(likesQuantity);

  const buttonLikeColor = isLike ? 'blue' : '#b0b3b8';
  const commentQuantityText =
    commentQuantity === 1 ? 'Comentario' : 'Comentarios';

  const handleLikeClick = () => {
    isLike ? setLikesQuantity(likes - 1) : setLikesQuantity(likes + 1);

    setIsLike(!isLike);
  };

  const showContainer = ((likes > 0 && commentQuantity > 0) || (likes > 0) || (commentQuantity > 0)) ? 'fb-feedCard-footer-likes-comments-container' : 'fb-feedCard-footer-likes-comments-container-empty';

  return (
    <article className='fb-feedCard'>
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
              <FaGlobeAmericas size={12} color='#b0b3b8' />
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
            <span className='fb-feedCard-footer-likes-quantity'>
              <span>❤️</span>
              {likes}
            </span>
            <span className='fb-feedCard-footer-comments-quantity'>
              {commentQuantity} {commentQuantityText}
            </span>
          </div>
          <hr className='fb-feedCard-footer-divider' />
        </section>
        <div className='fb-feedCard-footer-actions'>
          <span className='fb-feedCard-footer-likes' onClick={handleLikeClick}>
            <FaThumbsUp size={18} color={buttonLikeColor} />
            <span style={{ color: buttonLikeColor }}>Me gusta</span>
          </span>
          <span className='fb-feedCard-footer-comments'>
            <FaComment size={18} color='#b0b3b8' />
            <span>Comentarios</span>
          </span>
          <span className='fb-feedCard-footer-shares'>
            <FaShare size={18} color='#b0b3b8' />
            <span>Compartir</span>
          </span>
        </div>
      </footer>
    </article>
  );
}
