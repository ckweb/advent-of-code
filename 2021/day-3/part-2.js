import axios from "axios";
import { parse } from "dotenv";
import {
  sessionID
} from "../../utils/cookies.js";

const aocDay = 3;

const inputURL = getInputURL(aocDay);
let inputLines;

let mostCommonBits = [];
let leastCommonBits = [];
let sums = [];

let oxygenRating = 0;
let co2Rating = 0;

axios.get(inputURL, {
  headers: {
    "Cookie": `session=${sessionID}`
  }
}).then(function (response) {
  processInput(response.data);
}).catch(function (error) {
  console.log(error);
});

function processInput(input) {
  inputLines = input.split(/\r?\n/);
  // Remove last line from array, because it's a blank line.
  inputLines.pop();
  inputLines.forEach(function (element, index) {
    if (!element.length) return;
    [...element].forEach(function (character, characterIndex) {
      if (index === 0) {
        sums[characterIndex] = 0;
      }
      sums[characterIndex] += parseInt(character);
    });
  });
  console.log(inputLines.length);
  console.log(sums);
  processSums(inputLines.length);
  calculateOxygenRating();
  calculateCO2Rating();
  oxygenRating = parseInt(oxygenRating, 2);
  co2Rating = parseInt(co2Rating, 2);
  console.log({oxygenRating});
  console.log({co2Rating});
  outputAnswer();
}

function getInputURL(aocDay) {
  return `https://adventofcode.com/2021/day/${aocDay}/input`;
}

function processSums(inputLength) {
  const halfLength = inputLength / 2;
  console.log({halfLength});
  // Read each value and compare it to inputLength/2.
  sums.forEach(function (element, index) {
    if (element < halfLength) {
      // Most common value is 0. Enter that in the gamma and epsilon arrays.
      mostCommonBits[index] = "0";
      leastCommonBits[index] = "1";
    } else {
      // Most common value is 1. Enter in arrays.
      mostCommonBits[index] = "1";
      leastCommonBits[index] = "0";
    }
  });
  console.log({mostCommonBits});
  console.log({leastCommonBits});
}

function calculateOxygenRating() {
  let filteredLines = inputLines;
  let bitToKeep = "";

  
  mostCommonBits.forEach(function(element, index) {
    if (index === 0) {
      // For the first run, use the first most common bit that we saved in the array.
      bitToKeep = element;
    } else {
      bitToKeep = getMostCommonBit(filteredLines, index);
    }

    if (filteredLines.length > 1) {
      filteredLines = saveLinesWithBitAtPosition(filteredLines, bitToKeep, index);
    }

    console.log({filteredLines});
  });
  oxygenRating = filteredLines[0];
}

function calculateCO2Rating() {
  let filteredLines = inputLines;
  let bitToKeep = "";

  console.log({leastCommonBits});
  
  leastCommonBits.forEach(function(element, index) {
    if (index === 0) {
      // For the first run, use the first least common bit that we saved in the array.
      bitToKeep = element;
    } else {
      bitToKeep = getLeastCommonBit(filteredLines, index);
    }

    if (filteredLines.length > 1) {
      filteredLines = saveLinesWithBitAtPosition(filteredLines, bitToKeep, index);
    }

    console.log({filteredLines});
  });
  co2Rating = filteredLines[0];
}

function getMostCommonBit(lines, position) {
  let mostCommonBit = "";
  let sumAllValues = 0;
  const halfLength = lines.length / 2;
  lines.forEach(function (element) {
    if (!element.length) return;
    [...element].forEach(function (character, characterIndex) {
      if (characterIndex === position) {
        sumAllValues += parseInt(character);
      }
    });
  });

  if (sumAllValues < halfLength) {
    mostCommonBit = "0";
  } else {
    mostCommonBit = "1";
  }

  return mostCommonBit;
  
}

function getLeastCommonBit(lines, position) {
  let leastCommonBit = "";
  let sumAllValues = 0;
  const halfLength = lines.length / 2;
  lines.forEach(function (element) {
    if (!element.length) return;
    [...element].forEach(function (character, characterIndex) {
      if (characterIndex === position) {
        sumAllValues += parseInt(character);
      }
    });
  });

  if (sumAllValues < halfLength) {
    leastCommonBit = "1";
  } else {
    leastCommonBit = "0";
  }

  return leastCommonBit;
  
}

function saveLinesWithBitAtPosition(lines, bitValue, position) {
  let savedLines = lines.filter(line => line[position] === bitValue);
  return savedLines;
}

function outputAnswer() {
  const answer = oxygenRating * co2Rating;
  console.log({answer});
}

