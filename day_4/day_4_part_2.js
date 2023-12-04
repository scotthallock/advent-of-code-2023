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

const numberOfMatches = ({ winningNumbers, myNumbers }) => {
  let matches = 0;
  const winningNumbersDict = {};

  for (const n of winningNumbers) {
    winningNumbersDict[n] = (winningNumbersDict[n] || 0) + 1;
  }

  for (const n of myNumbers) {
    if (winningNumbersDict[n]) matches += 1;
    delete winningNumbersDict[n];
  }

  return matches;
};

const matches = cards.map(numberOfMatches);
let instances = Array(cards.length).fill(1);

for (let i = 0; i < instances.length; i++) {
  for (let j = 1; j <= matches[i]; j++) {
    instances[i + j] += instances[i];
  }
}

const sumInstances = instances.reduce((acc, e) => acc + e);
console.log(`The number of instances is ${sumInstances}`);
