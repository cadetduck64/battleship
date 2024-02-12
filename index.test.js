import {player1Gameboard} from './index.js';
import { cruiser } from './index.js';

// mock.Fn.mockReturnValueOnce(gameboard)

// test('adds 1 + 2 to equal 3', () => {
//   expect(sum(1, 2)).toBe(3);
// });

test('hits ship', () => {
  expect(player1Gameboard.receiveAttack(cruiser, [3, 'a'])).toBe
  ('hit')
})

test('tracks missed shots', () => {
  expect(player1Gameboard.receiveAttack(cruiser, [2, 'a'])).toBe
  ('miss')
})