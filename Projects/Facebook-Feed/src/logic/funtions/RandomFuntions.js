export function getRandomDateFormatted() {
  const now = new Date();
  const randomDate = new Date(
    now.getTime() - Math.random() * 1000 * 60 * 60 * 24 * 365 * 2
  );

  const diffMs = now - randomDate;
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffMinutes < 60) {
    return `Hace ${diffMinutes} min`;
  }

  if (
    diffHours < 24 &&
    now.getDate() === randomDate.getDate() &&
    now.getMonth() === randomDate.getMonth() &&
    now.getFullYear() === randomDate.getFullYear()
  ) {
    return `Hace ${diffHours} h`;
  }

  if (now.getFullYear() === randomDate.getFullYear()) {
    return `${randomDate.toLocaleDateString('es-CO', {
      day: 'numeric',
      month: 'long',
    })} a las ${randomDate.toLocaleTimeString('es-CO', {
      hour: 'numeric',
      minute: '2-digit',
    })}`;
  }

  return `${randomDate.toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })}`;
}

export function getRandomImage() {
  const randomNumber = Math.floor(Math.random() * 1000);
  return randomNumber;
}

export function getRandomReactions(likesQuantity) {
  const emojis = ['👍', '❤️', '🥰', '😄', '😲', '😢', '😠'];

  if (likesQuantity === 0) {
    return emojis.reduce((acc, emoji) => {
      acc[emoji] = 0;
      return acc;
    }, {});
  }

  const minReactions = likesQuantity < 100 ? 2 : likesQuantity < 5000 ? 3 : 4;
  const maxReactions = emojis.length;

  const numberOfReactions =
    Math.floor(Math.random() * (maxReactions - minReactions + 1)) +
    minReactions;

  const shuffledEmojis = [...emojis].sort(() => 0.5 - Math.random());
  const selectedEmojis = shuffledEmojis.slice(0, numberOfReactions);

  let remainingLikes = likesQuantity;

  const reactionsCount = emojis.reduce((acc, emoji) => {
    acc[emoji] = 0;
    return acc;
  }, {});

  selectedEmojis.forEach((emoji, index) => {
    if (index === selectedEmojis.length - 1) {
      reactionsCount[emoji] = remainingLikes;
    } else {
      const likesForThisEmoji = Math.floor(
        Math.random() * (remainingLikes + 1)
      );
      reactionsCount[emoji] = likesForThisEmoji;
      remainingLikes -= likesForThisEmoji;
    }
  });

  return reactionsCount;
}


