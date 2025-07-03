import { FaComment, FaShare } from 'react-icons/fa';
import { LikesButton } from './LikeButton.jsx';
export function Footer({
  showContainer,
  showLikes,
  getTopReactions,
  likesText,
  showComments,
  commentsText,
  footerTheme,
  actionButtonsColor,
  likeButtonProps
}) {
  return (
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
        <LikesButton {...likeButtonProps} />
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
  );
}
