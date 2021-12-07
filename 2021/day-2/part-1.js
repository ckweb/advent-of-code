import axios from "axios";
import {
  sessionID
} from "../../utils/cookies.js";

const aocDay = 2;

const inputURL = getInputURL(aocDay);
const moves = [];
let currentPosition = {
  x: 0,
  y: 0
};

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
  inputLines.forEach(function (element, index) {
    const [direction, distance] = element.split(" ");
    moves[index] = {
      direction,
      distance: parseInt(distance)
    };
  });
  doMoves();
  outputAnswer();
}

function getInputURL(aocDay) {
  return `https://adventofcode.com/2021/day/${aocDay}/input`;
}

function doMoves() {
  moves.forEach((element) => {
    switch (element.direction) {
    case "forward":
      currentPosition.x += element.distance;
      break;

    case "down":
      currentPosition.y += element.distance;
      break;

    case "up":
      currentPosition.y -= element.distance;
      break;

    default:
      break;
    }
  });
  console.log({currentPosition});

}

function outputAnswer() {
  const answer =  currentPosition.x * currentPosition.y;
  console.log({answer});
}
