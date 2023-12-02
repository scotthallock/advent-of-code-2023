const fs = require('fs');

const fileContent = fs.readFileSync('day_2/day_2_file.txt').toString();

// The answer to the puzzle
result = 0;

for (game of fileContent.split('\n')) {
  // A game string looks like this:
  // "Game 1: 1 green, 6 red, 4 blue; 2 blue, 6 green, 7 red"

  // The fewest number of cubes of each color that could have been
  // in the bag to make the game possible
  minCubes = {
    red: 0,
    green: 0,
    blue: 0,
  };

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

      if (color === 'red') minCubes.red = Math.max(minCubes.red, amount);
      else if (color === 'blue') minCubes.blue = Math.max(minCubes.blue, amount);
      else if (color === 'green') minCubes.green = Math.max(minCubes.green, amount);
    }
  }

  // Calculate the power
  const power = minCubes.red * minCubes.green * minCubes.blue;

  result += power;
}

console.log(`The result is ${result}`);
