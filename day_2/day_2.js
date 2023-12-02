const fs = require('fs');

/**
 * Determine which games would have been possible if the bag had been
 * loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes.
 * What is the sum of the IDs of those games?
 */

const BAG = {
  red: 12,
  green: 13,
  blue: 14,
};

const fileContent = fs.readFileSync('day_2/day_2_file.txt').toString();

// The answer to the puzzle
result = 0;

gameId = 1;

for (game of fileContent.split('\n')) {
  // A game string looks like this:
  // "Game 1: 1 green, 6 red, 4 blue; 2 blue, 6 green, 7 red"

  gameIsValid = true;

  // Trim the "Game X: " from the string
  game = game.slice(game.indexOf(':') + 2);

  bagReveals = game.split('; ');

  for (bagReveal of bagReveals) {
    // bagReveal looks like this: "9 blue, 7 green, 8 red"
    draws = bagReveal.split(', ');

    for (draw of draws) {
      // draw looks like this: "9 blue"
      [amountString, color] = draw.split(' ');
      amount = parseInt(amountString);

      if (color === 'red' && amount > BAG['red']) gameIsValid = false;
      else if (color === 'blue' && amount > BAG['blue']) gameIsValid = false;
      else if (color === 'green' && amount > BAG['green']) gameIsValid = false;
    }
  }

  // If the game is valid, add the gameId to the result
  if (gameIsValid) {
    result += gameId;
  }

  gameId += 1;
}

console.log(`The result is ${result}`);
