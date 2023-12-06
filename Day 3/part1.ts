import { readFileSync } from 'fs';
import * as path from 'path';

const input = readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
const formattedInput = input.split('\n').map((row) => row.split(''));

const symbolRegex = /[^0-9.]/;

const getFullNumberAtPosition = (rowIndex: number, index: number): number => {
  const row = formattedInput[rowIndex];
  let fullNumber = [row[index]];

  // go backwards
  let i = index - 1;
  while(row[i]?.match(/[0-9]/) && i >= 0) {
    fullNumber = [row[i], ...fullNumber];
    i--;
  }

  // go forwards
  let k = index + 1;
  while(row[k]?.match(/[0-9]/) && i <= row.length) {
    fullNumber = [...fullNumber, row[k]];
    k++;
  }

  return Number(fullNumber.join(''));
}

const getValidNumbersInRow = (rowIndex: number): number[] => {
  const row: string[] = formattedInput[rowIndex];
  // if you find a number, disable subsequent numbers until a symbol is found, then re-enable
  // this will remove duplicates of the same number
  let foundNearSymbol = false;

  const validPartNumbers = row.reduce((acc: number[], value, index) => {
    // if a number
    if(value.match(/[0-9]/)) {
      if(!foundNearSymbol) {
        //check if next to a symbol in same row
        if(row[index - 1]?.match(symbolRegex) || row[index + 1]?.match(symbolRegex)) {
          // get full number from row
          acc.push(getFullNumberAtPosition(rowIndex, index));
          foundNearSymbol = true;
        }
        // check if next to a symbol on previous row
        else if (formattedInput?.[rowIndex - 1]?.[index]?.match(symbolRegex) || formattedInput?.[rowIndex - 1]?.[index - 1]?.match(symbolRegex) || formattedInput?.[rowIndex - 1]?.[index + 1]?.match(symbolRegex)) {
          acc.push(getFullNumberAtPosition(rowIndex, index));
          foundNearSymbol = true;
        }
        // check if next to a symbol on next row
        else if (formattedInput?.[rowIndex + 1]?.[index]?.match(symbolRegex) || formattedInput?.[rowIndex + 1]?.[index - 1]?.match(symbolRegex) || formattedInput?.[rowIndex + 1]?.[index + 1]?.match(symbolRegex)) {
          acc.push(getFullNumberAtPosition(rowIndex, index));
          foundNearSymbol = true;
        }
      }
    } else {
      foundNearSymbol = false;
    }
    return acc;
  }, []);
  return validPartNumbers;
}

const finalSum = formattedInput.reduce((acc, row, rowIndex) => {
  const rowTotal = getValidNumbersInRow(rowIndex).reduce((acc, num) => acc + num);
  return acc + rowTotal;
}, 0);

console.log(finalSum);