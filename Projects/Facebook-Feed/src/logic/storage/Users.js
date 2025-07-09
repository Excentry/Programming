import {
  getRandomDateFormatted,
  getRandomImage,
  getRandomReactions,
} from '../funtions/RandomFuntions.js';
import { generatePostId } from './postId.js';

export const users = (() => {
  let ids = {};
  return [
    (() => {
      const likesQuantity = 1_000_000;
      return {
        id: generatePostId('midudev', ids),
        userName: 'midudev',
        name: 'Miguel Ángel Dúran',
        dateTime: getRandomDateFormatted(),
        feedImage: getRandomImage(),
        likesQuantity,
        commentQuantity: 0,
        reactionsCount: getRandomReactions(likesQuantity),
      };
    })(),
    (() => {
      const likesQuantity = 2;
      return {
        id: generatePostId('Excentry', ids),
        userName: 'Excentry',
        name: 'Excentry',
        dateTime: getRandomDateFormatted(),
        feedImage: getRandomImage(),
        likesQuantity,
        commentQuantity: 3_000,
        reactionsCount: getRandomReactions(likesQuantity),
      };
    })(),
    (() => {
      const likesQuantity = 0;
      return {
        id: generatePostId('pheralb', ids),
        userName: 'pheralb',
        name: 'Pablo H.',
        dateTime: getRandomDateFormatted(),
        feedImage: getRandomImage(),
        likesQuantity,
        commentQuantity: 0,
        reactionsCount: getRandomReactions(likesQuantity),
      };
    })(),
    (() => {
      const likesQuantity = 1_200;
      return {
        id: generatePostId('reactjs', ids),
        userName: 'reactjs',
        name: 'ReactJS',
        dateTime: getRandomDateFormatted(),
        feedImage: getRandomImage(),
        likesQuantity,
        commentQuantity: 1_000_000,
        reactionsCount: getRandomReactions(likesQuantity),
      };
    })(),
    (() => {
      const likesQuantity = 100;
      return {
        id: generatePostId('angular', ids),
        userName: 'angular',
        name: 'Angular',
        dateTime: getRandomDateFormatted(),
        feedImage: getRandomImage(),
        likesQuantity,
        commentQuantity: 1,
        reactionsCount: getRandomReactions(likesQuantity),
      };
    })(),
    (() => {
      const likesQuantity = 15;
      return {
        id: generatePostId('Excentry', ids),
        userName: 'Excentry',
        name: 'Excentry',
        dateTime: getRandomDateFormatted(),
        feedImage: getRandomImage(),
        likesQuantity,
        commentQuantity: 30,
        reactionsCount: getRandomReactions(likesQuantity),
      };
    })(),
    (() => {
      const likesQuantity = 100_000_000;
      return {
        id: generatePostId('Facebook', ids),
        userName: 'Facebook',
        name: 'Facebook',
        dateTime: getRandomDateFormatted(),
        feedImage: getRandomImage(),
        likesQuantity,
        commentQuantity: 100_000_000,
        reactionsCount: getRandomReactions(likesQuantity),
      };
    })(),
  ];
})();
