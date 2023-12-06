import { readFileSync } from 'fs';
import * as path from 'path';

// read from file input.txt
const input = readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
const formattedInput = input.split('\n');

const getNumberArray = (curr: string) => {
  const stringSwappedForNumbers = curr
    .replace(/one/g, 'one1one')
    .replace(/two/g, 'two2two')
    .replace(/three/g, 'three3three')
    .replace(/four/g, 'four4four')
    .replace(/five/g, 'five5five')
    .replace(/six/g, 'six6six')
    .replace(/seven/g, 'seven7seven')
    .replace(/eight/g, 'eight8eight')
    .replace(/nine/g, 'nine9nine');
  return stringSwappedForNumbers.replace(/[^0-9]/g, '').split('');
};

const finalValue = formattedInput.reduce((acc, curr) => {
  const numbers = getNumberArray(curr);
  acc += Number(String(numbers[0]) + String(numbers[numbers.length - 1]));
  return acc;
}, 0);

console.log(finalValue); //?
