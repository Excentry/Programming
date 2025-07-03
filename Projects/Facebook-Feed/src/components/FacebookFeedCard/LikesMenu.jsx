export function LikesMenu({ reactions, handleEmojiClick, cardColor, showReactionsMenu }) {
  return (
    <div
      className={`fb-feedCard-footer-likes-menu ${
        showReactionsMenu ? 'show' : ''
      }`}
      style={{ background: cardColor }}
    >
      {reactions.map((reaction, index) => (
        <span key={index} onClick={(e) => handleEmojiClick(e, reaction)}>
          {reaction.emoji}
        </span>
      ))}
    </div>
  );
}
