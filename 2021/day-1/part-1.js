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

