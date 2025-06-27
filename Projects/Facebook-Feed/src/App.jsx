import { useState } from 'react';
import './App.css';
import { FacebookFeedCard } from './FacebookFeedCard.jsx';

function getRandomDateFormatted() {
  const now = new Date();
  const randomDate = new Date(now.getTime() - Math.random() * 1000 * 60 * 60 * 24 * 365 * 2);

  const diffMs = now - randomDate;
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffMinutes < 60) {
    return `Hace ${diffMinutes} min`;
  }

  if (diffHours < 24 && now.getDate() === randomDate.getDate() && now.getMonth() === randomDate.getMonth() && now.getFullYear() === randomDate.getFullYear()) {
    return `Hace ${diffHours} h`;
  }

  if (now.getFullYear() === randomDate.getFullYear()) {
    return `${randomDate.toLocaleDateString('es-CO', { day: 'numeric', month: 'long' })} a las ${randomDate.toLocaleTimeString('es-CO', { hour: 'numeric', minute: '2-digit' })}`;
  }

  return `${randomDate.toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })}`;
}

function getRandomImage() {
  const randomNumber = Math.floor(Math.random() * 1000);

  return randomNumber;
}

const users = [
  {
    userName: 'midudev',
    name: 'Miguel Ángel Dúran',
    isLike: false,
    dateTime: getRandomDateFormatted(),
    feedImage: getRandomImage(),
    likesQuantity: 10,
    commentQuantity: 0,
  },
  {
    userName: 'Excentry',
    name: 'Excentry',
    isLike: true,
    dateTime: getRandomDateFormatted(),
    feedImage: getRandomImage(),
    likesQuantity: 0,
    commentQuantity: 300,
  },
  {
    userName: 'pheralb',
    name: 'Pablo H.',
    isLike: false,
    dateTime: getRandomDateFormatted(),
    feedImage: getRandomImage(),
    likesQuantity: 0,
    commentQuantity: 0,
  },
  {
    userName: 'reactjs',
    name: 'ReactJS',
    isLike: false,
    dateTime: getRandomDateFormatted(),
    feedImage: getRandomImage(),
    likesQuantity: 50,
    commentQuantity: 20,
  },
  {
    userName: 'angular',
    name: 'Angular',
    isLike: true,
    dateTime: getRandomDateFormatted(),
    feedImage: getRandomImage(),
    likesQuantity: 100,
    commentQuantity: 50,
  }
];

export function App() {
  const [state, setState] = useState(0);

  return (
    <section className='App'>
    {
      users.map(({ userName, name, isLike, dateTime, feedImage, likesQuantity, commentQuantity }) => (
        <FacebookFeedCard
          key={userName}
          userName={userName}
          initialIsLike={isLike}
          dateTime={dateTime}
          feedImage={feedImage}
          likesQuantity={likesQuantity}
          commentQuantity={commentQuantity}
        >
          {name}
        </FacebookFeedCard>
      ))
    }
    </section>
  );
}
