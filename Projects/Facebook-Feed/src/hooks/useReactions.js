import { useState, useEffect } from 'react';
import { reactions } from '../components/Reactions.js';
import {
  getLikeForUser,
  saveLikeToStorage,
} from '../logic/storage/LikeStorage.js';
export function useReactions({
  postId,
  likesQuantity,
  commentQuantity,
  initialReactionsCount,
  isDark,
}) {
  const stored = getLikeForUser(postId);

  const [isLike, setIsLike] = useState(stored?.isLike ?? false);
  const [likeSelected, setLikeSelected] = useState(
    stored?.likeSelected ?? null
  );
  const [likes, setLikesQuantity] = useState(stored?.likes ?? likesQuantity);
  const [reactionsCount, setReactionsCount] = useState(
    stored?.reactionsCount ?? initialReactionsCount
  );
  const [showReactionsMenu, setShowReactionsMenu] = useState(false);

  useEffect(() => {
    saveLikeToStorage(postId, {
      isLike,
      likeSelected,
      likes,
      reactionsCount,
    });
  }, [postId, isLike, likeSelected, likes, reactionsCount]);

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

    setShowReactionsMenu(false);
  };

  const handleEmojiClick = (e, reaction) => {
    e.stopPropagation();

    if (isLike && likeSelected.emoji === reaction.emoji) {
      setShowReactionsMenu(false);
      return;
    }

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

  let likesText = '';

  if (likes === 1) {
    likesText = isLike ? 'Tú' : '1';
  } else if (likes < 1_000) {
    if (isLike) {
      likesText =
        'Tú y ' +
        (likes - 1) +
        (likes - 1 === 1 ? ' persona más' : ' personas más');
    } else {
      likesText = likes.toString();
    }
  } else if (likes < 1_000_000) {
    likesText = isLike
      ? 'Tú y ' +
        ((likes - 1) / 1_000).toFixed(1).replace('.', ',') +
        ' mil personas más'
      : likes / 1_000 + ' mil';
  } else {
    likesText = (likes / 1_000_000).toFixed(1).replace('.', ',') + ' mill.';
  }

  const buttonLikeColor =
    isLike && likes > 0
      ? likeSelected?.color || '#2374E1'
      : !isLike && isDark
      ? '#b0b3b8'
      : '#65686c';

  const commentsText =
    commentQuantity === 1
      ? '1 comentario'
      : commentQuantity < 1_000
      ? `${commentQuantity} comentarios`
      : commentQuantity < 1_000_000
      ? `${(commentQuantity / 1_000)
          .toFixed(1)
          .replace('.', ',')} mil comentarios`
      : `${(commentQuantity / 1_000_000)
          .toFixed(1)
          .replace('.', ',')} mill. comentarios`;

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

  const cardColor = isDark ? '#252728' : '#fff';
  const cardTheme = isDark ? '' : 'feedCard-color-light';
  const footerTheme = isDark ? '' : 'actions-hover-color-light';
  const actionButtonsColor = isDark ? '#b0b3b8' : '#65686c';

  return {
    reactionsState: {
      isLike,
      likes,
      likeSelected,
      showReactionsMenu,
      reactionsCount,
      isDark,
    },
    handlers: {
      handleLikeClick,
      handleEmojiClick,
      setShowReactionsMenu,
    },
    cardStyles: {
      cardColor,
      cardTheme,
      footerTheme,
      buttonLikeColor,
      actionButtonsColor,
    },
    displayTexts: {
      likesText,
      commentsText,
    },
    visibility: {
      showLikes,
      showComments,
      showContainer,
    },
  };
}
