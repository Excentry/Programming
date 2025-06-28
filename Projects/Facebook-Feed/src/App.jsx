import { useState } from 'react';
import './App.css';
import { FacebookFeedCard } from './FacebookFeedCard.jsx';

function getRandomDateFormatted() {
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

function getRandomImage() {
  const randomNumber = Math.floor(Math.random() * 1000);
  return randomNumber;
}

function getRandomLikes() {
  const icons = ['❤️', '👍', '😮', '😂', '😢', '😡'];
  const randomIcon = icons[Math.floor(Math.random() * icons.length)];

  return randomIcon;
}

const users = [
  {
    userName: 'midudev',
    name: 'Miguel Ángel Dúran',
    isLike: false,
    dateTime: getRandomDateFormatted(),
    feedImage: getRandomImage(),
    likesQuantity: 1000000,
    commentQuantity: 0,
    likesIcon: getRandomLikes()
  },
  {
    userName: 'Excentry',
    name: 'Excentry',
    isLike: true,
    dateTime: getRandomDateFormatted(),
    feedImage: getRandomImage(),
    likesQuantity: 2,
    commentQuantity: 3000,
    likesIcon: getRandomLikes()
  },
  {
    userName: 'pheralb',
    name: 'Pablo H.',
    isLike: false,
    dateTime: getRandomDateFormatted(),
    feedImage: getRandomImage(),
    likesQuantity: 0,
    commentQuantity: 0,
    likesIcon: getRandomLikes()
  },
  {
    userName: 'reactjs',
    name: 'ReactJS',
    isLike: false,
    dateTime: getRandomDateFormatted(),
    feedImage: getRandomImage(),
    likesQuantity: 1200,
    commentQuantity: 1000000,
    likesIcon: getRandomLikes()
  },
  {
    userName: 'angular',
    name: 'Angular',
    isLike: true,
    dateTime: getRandomDateFormatted(),
    feedImage: getRandomImage(),
    likesQuantity: 100,
    commentQuantity: 1,
    likesIcon: getRandomLikes()
  },
];

export function App() {
  return (
    <section className='App'>
      {users.map(
        ({
          userName,
          name,
          isLike,
          dateTime,
          feedImage,
          likesQuantity,
          commentQuantity,
          likesIcon
        }) => (
          <FacebookFeedCard
            key={userName}
            userName={userName}
            initialIsLike={isLike}
            dateTime={dateTime}
            feedImage={feedImage}
            likesQuantity={likesQuantity}
            commentQuantity={commentQuantity}
            likesIcon={likesIcon}
          >
            {name}
          </FacebookFeedCard>
        )
      )}
    </section>
  );
}
