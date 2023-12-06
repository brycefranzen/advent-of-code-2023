import { readFileSync } from 'fs';
import * as path from 'path';

const input = readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');

const formattedInput = input.split('\n').map((row) => {
  const rowItems = row.split(': ')[1].split(' | ');
  return {
    winning: rowItems[0]
      .trim()
      .split(' ')
      .filter((i) => i !== ''),
    inputs: rowItems[1]
      .trim()
      .split(' ')
      .filter((i) => i !== ''),
  };
});

const getCardPoints = (card: { winning: string[]; inputs: string[] }) => {
  return card.inputs.reduce((acc, input) => {
    if (card.winning.includes(input)) {
      return acc === 0 ? 1 : acc * 2;
    }
    return acc;
  }, 0);
};

const totalPoints = formattedInput.reduce(
  (acc, card) => (acc += getCardPoints(card)),
  0
);

console.log(totalPoints);
