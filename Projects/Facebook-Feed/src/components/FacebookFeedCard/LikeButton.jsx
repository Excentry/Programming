import { FaThumbsUp } from 'react-icons/fa';
import { LikesMenu } from './LikesMenu.jsx';
export function LikesButton({
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
}) {
  return (
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
      <LikesMenu
          reactions={reactions}
          handleEmojiClick={handleEmojiClick}
          cardColor={cardColor}
          showReactionsMenu={showReactionsMenu}
        />
    </span>
  );
}
