import axios from "axios";
import { parse } from "dotenv";
import {
  sessionID
} from "../../utils/cookies.js";

const aocDay = 3;

const inputURL = getInputURL(aocDay);

let gammaRateValues = [];
let epsilonRateValues = [];
let sums = [];

let gammaRate = 0;
let epsilonRate = 0;

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
  const inputLines = input.split(/\r?\n/);
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
      gammaRateValues[index] = "0";
      epsilonRateValues[index] = "1";
    } else {
      // Most common value is 1. Enter in arrays.
      gammaRateValues[index] = "1";
      epsilonRateValues[index] = "0";
    }
  });
  console.log({gammaRateValues});
  console.log({epsilonRateValues});
  gammaRate = gammaRateValues.join("");
  console.log({gammaRate});
  epsilonRate = epsilonRateValues.join("");
  console.log({epsilonRate});
  gammaRate = parseInt(gammaRate, 2);
  epsilonRate = parseInt(epsilonRate, 2);
}

function outputAnswer() {
  const answer = gammaRate * epsilonRate;
  console.log({answer});
}

