const fs = require('fs');

const cards = fs
  .readFileSync('day_4/day_4_file.txt')
  .toString()
  .split('\n')
  .map((row) => row.split(': ')[1])
  .map((row) => row.split(' | '))
  .map(([winningNumbers, myNumbers]) => {
    return {
      winningNumbers: winningNumbers
        .split(' ')
        .filter((e) => e)
        .map((e) => parseInt(e)),
      myNumbers: myNumbers
        .split(' ')
        .filter((e) => e)
        .map((e) => parseInt(e)),
    };
  });

let result = 0;

for (const card of cards) {
  const { winningNumbers, myNumbers } = card;
  let matches = 0;

  const winningNumbersDict = {};

  for (const n of winningNumbers) {
    winningNumbersDict[n] = (winningNumbersDict[n] || 0) + 1;
  }

  for (const n of myNumbers) {
    if (winningNumbersDict[n]) matches += 1;
    delete winningNumbersDict[n];
  }

  result += matches ? Math.pow(2, matches - 1) : 0;
}

console.log(`The result is ${result}`);
