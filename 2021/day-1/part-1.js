import axios from "axios";
import sessionID from "../../utils/getSessionID.js";

const inputURL = "https://adventofcode.com/2021/day/1/input";
let numberOfIncreases = 0;
let previousReading;

axios.get(inputURL, {
  headers: {
    "Cookie": `session=${sessionID}`
  }
}).then(function (response) {
  getNumberOfIncreases(response.data);
}).catch(function (error) {
  console.log(error);
});

function getNumberOfIncreases(data) {
  const inputLines =  data.split(/\r?\n/);
  inputLines.reduce((previousValue, currentValue) => { 
    const thisReading = parseInt(currentValue);
    if (previousReading) {
      thisReading > previousReading ? numberOfIncreases++ : "";
    } else {
      // If the very first number is not 0, count that as an increase.
      numberOfIncreases++;
    }
    // Set the new previousReading to this reading.
    previousReading = thisReading;
  });
  console.log(numberOfIncreases);
  return numberOfIncreases;
}

