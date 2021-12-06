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

// This version of the function uses the three-measurement window.
function getNumberOfIncreases(data) {
  const inputLines =  data.split(/\r?\n/);
  let thisTotal;
  inputLines.reduce((previousValue, currentValue, currentIndex) => { 
    const thisReading = parseInt(currentValue);
    if (currentIndex <= inputLines.length - 3) {
      const nextReading = parseInt(inputLines[currentIndex + 1]);
      const nextNextReading = parseInt(inputLines[currentIndex + 2]);
      // For each array item, add the values of this item and the next two items.
      thisTotal = thisReading + nextReading + nextNextReading;
    }

    if (thisTotal) {
      if (previousReading) {
        thisTotal > previousReading ? numberOfIncreases++ : "";
      } else {
        numberOfIncreases++;
      }
      
      // Set the new previousReading to this total.
      previousReading = thisTotal;
    }

  });
  console.log(numberOfIncreases);
  return numberOfIncreases;
}

