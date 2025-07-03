import {
  getRandomDateFormatted,
  getRandomImage,
  getRandomReactions,
} from '../funtions/RandomFuntions.js';
import { generatePostId } from './postId.js';

export const users = (() => {
  let ids = {};
  return [
    {
      id: generatePostId('midudev', ids),
      userName: 'midudev',
      name: 'Miguel Ángel Dúran',
      dateTime: getRandomDateFormatted(),
      feedImage: getRandomImage(),
      likesQuantity: 1000000,
      commentQuantity: 0,
      reactionsCount: getRandomReactions(1000000),
    },
    {
      id: generatePostId('Excentry', ids),
      userName: 'Excentry',
      name: 'Excentry',
      dateTime: getRandomDateFormatted(),
      feedImage: getRandomImage(),
      likesQuantity: 2,
      commentQuantity: 3000,
      reactionsCount: getRandomReactions(2),
    },
    {
      id: generatePostId('pheralb', ids),
      userName: 'pheralb',
      name: 'Pablo H.',
      dateTime: getRandomDateFormatted(),
      feedImage: getRandomImage(),
      likesQuantity: 0,
      commentQuantity: 0,
      reactionsCount: getRandomReactions(0),
    },
    {
      id: generatePostId('reactjs', ids),
      userName: 'reactjs',
      name: 'ReactJS',
      dateTime: getRandomDateFormatted(),
      feedImage: getRandomImage(),
      likesQuantity: 1200,
      commentQuantity: 1000000,
      reactionsCount: getRandomReactions(1200),
    },
    {
      id: generatePostId('angular', ids),
      userName: 'angular',
      name: 'Angular',
      dateTime: getRandomDateFormatted(),
      feedImage: getRandomImage(),
      likesQuantity: 100,
      commentQuantity: 1,
      reactionsCount: getRandomReactions(100),
    },
    {
      id: generatePostId('Excentry', ids),
      userName: 'Excentry',
      name: 'Excentry',
      dateTime: getRandomDateFormatted(),
      feedImage: getRandomImage(),
      likesQuantity: 15,
      commentQuantity: 30,
      reactionsCount: getRandomReactions(15),
    },
  ];
})();
