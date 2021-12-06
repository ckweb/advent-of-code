import axios from "axios";

const inputURL = "https://adventofcode.com/2021/day/1/input";
let numberOfIncreases = 0;
let previousReading;

axios.get(inputURL, {
  headers: {
    "Cookie": "session=53616c7465645f5fb7bcbdf752c176551a2bca843c53fa661c5df0c06e6855dce73ad8f20d8c03095665e94c3e89773b"
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

