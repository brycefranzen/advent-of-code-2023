import { readFileSync } from 'fs';
import * as path from 'path';

// read from file input.txt
const input = readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
const formattedInput = input.split('\n');

const finalValue = formattedInput.reduce((acc, curr) => {
  const numbers = curr.replace(/[^0-9]/g, '');
  acc += Number(`${numbers[0]}${numbers[numbers.length - 1]}`);
  return acc;
}, 0);

console.log(finalValue); //?
