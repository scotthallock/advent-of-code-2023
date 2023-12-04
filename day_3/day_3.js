const fs = require('fs');

const schematic = fs
  .readFileSync('day_3/day_3_file.txt')
  .toString()
  .split('\n')
  .map((r) => r.split(''));

let result = 0;

const isNumber = (char) => /^[0-9]/.test(char);

/**
 * Return an array of numbers adjacent to arr[r][c]
 *
 *    123.456      ..123..
 *    ...*...      ...*...
 *    321.654      .456...
 */
const getAdjacentNumbers = (arrOriginal, r, c) => {
  const arr = arrOriginal.slice();
  const numbers = [];

  const growNumber = (r, c) => {
    // Found a number, need to find all digits that make it up
    let numberString = arr[r][c];
    // Clear the array (copy) as we go
    arr[r][c] = '.';

    // Grow to the left
    let col = c;
    while (isNumber(arr[r][--col])) {
      numberString = arr[r][col] + numberString;
      arr[r][col] = '.';
    }

    // Grow to the right
    col = c;
    while (isNumber(arr[r][++col])) {
      numberString = numberString + arr[r][col];
      arr[r][col] = '.';
    }

    numbers.push(parseInt(numberString));
  };

  // Find all the adjacent numbers...
  // ...in the row above
  if (arr?.[r - 1]?.[c - 1] && isNumber(arr[r - 1][c - 1])) growNumber(r - 1, c - 1);
  if (arr?.[r - 1]?.[c] && isNumber(arr[r - 1][c])) growNumber(r - 1, c);
  if (arr?.[r - 1]?.[c + 1] && isNumber(arr[r - 1][c + 1])) growNumber(r - 1, c + 1);
  // ...in the same row
  if (arr?.[r]?.[c - 1] && isNumber(arr[r][c - 1])) growNumber(r, c - 1);
  if (arr?.[r]?.[c + 1] && isNumber(arr[r][c + 1])) growNumber(r, c + 1);
  // ...in the row below
  if (arr?.[r + 1]?.[c - 1] && isNumber(arr[r + 1][c - 1])) growNumber(r + 1, c - 1);
  if (arr?.[r + 1]?.[c] && isNumber(arr[r + 1][c])) growNumber(r + 1, c);
  if (arr?.[r + 1]?.[c + 1] && isNumber(arr[r + 1][c + 1])) growNumber(r + 1, c + 1);

  return numbers;
};

// const sampleArr = [
//   ['.', '3', '3', '3', '.', '.', '.'],
//   ['.', '.', '6', '*', '9', '9', '.'],
//   ['1', '2', '3', '.', '4', '5', '6'],
// ];
// console.log(getAdjacentNumbers(sampleArr, 1, 3));

// Calculate the sum of all gear ratios
for (let r = 0; r < schematic.length; r++) {
  for (let c = 0; c < schematic[0].length; c++) {
    if (schematic[r][c] == '*') {
      // Found a potential gear
      const nums = getAdjacentNumbers(schematic, r, c);

      if (nums.length == 2) {
        // There are exactly 2 adjacent numbers, so this is a gear
        result += nums[0] * nums[1];
      }
    }
  }
}

console.log(`The sum of the gear ratios is ${result}`);
