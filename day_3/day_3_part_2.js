const fs = require('fs');

const schematic = fs.readFileSync('day_3/day_3_file.txt').toString().split('\n');

let result = 0;

const isNumber = (char) => /^[0-9]/.test(char);
const isNumberOrPeriod = (char) => /^[0-9.]/.test(char);
