import { readFileSync } from 'fs';
import * as path from 'path';

const input = readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
const formattedInput = input.split('\n').map((row) => row.split(''));


const getPartNumbersInRow = (schematic: string[][]) => {
  const partNumbers = schematic.reduce((baseAcc: any[], row, rowIndex) => {
    const rowParts = row.reduce((rowAcc: any[], item, colIndex) => {
      if(item.match(/[0-9]/)) {
        if(
          // check previous row
          ((!schematic?.[rowIndex - 1]?.[colIndex]?.match(/^([0-9].)/) || !schematic?.[rowIndex - 1]?.[colIndex - 1]?.match(/^([0-9].)/) || !schematic?.[rowIndex - 1]?.[colIndex + 1]?.match(/^([0-9].)/)))

          // check current row
          || (!schematic?.[rowIndex]?.[colIndex - 1]?.match(/^([0-9].)/) || !schematic?.[rowIndex]?.[colIndex + 1]?.match(/^([0-9].)/))

          // check next row
          || ((!schematic?.[rowIndex + 1]?.[colIndex]?.match(/^([0-9].)/) || !schematic?.[rowIndex + 1]?.[colIndex - 1]?.match(/^([0-9].)/) || !schematic?.[rowIndex + 1]?.[colIndex + 1]?.match(/^([0-9].)/)))
          ) {
          rowAcc.push({index: colIndex, valid: true, partNumber: item});
        }

        return rowAcc;
      }
      return rowAcc;
    }, [])

    baseAcc.push(rowParts);
    return baseAcc;
  }, [])

  return partNumbers;
}

getPartNumbersInRow(formattedInput); //?