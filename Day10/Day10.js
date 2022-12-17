const f = require("fs");
const readline = require("readline");
var inputFile = "input.txt";

var reader = readline.createInterface({
  input: f.createReadStream(inputFile),
});

var x = 1
var addToX = 0
var loop = 0
var cycle = 1
var sumOfMainValues = 0
var iterationsToSumUp = [20, 60, 100, 140, 180, 220]

reader.on("line", function (line) {

  if (line == "noop") {
    // no addition to x, just increase loop
    addToX = 0
    loop = 1
  } else {
    // addition to x number that is in the line and looping twice of the cycle
    addToX = Number(line.split(" ")[1])
    loop = 2
  }

  // looping the cycle based on line input
  for (i = 0; i < loop; i++) {

    // sum on cycle positions that is predefined
    if(iterationsToSumUp.includes(cycle)){
      console.log("summing up in iteration: " + cycle)
      console.log("value x during this iteration: " + x)
      console.log("line: " + line)
      console.log("----------------------")
      sumOfMainValues = sumOfMainValues + (x * cycle) 
    }

    // last loop of line => add to X
    // for noop it is just one iteration, for other it is two
    if(i == loop - 1){      
      x = x + addToX
    }

     cycle++
  }

});

// after file is read through
reader.on("close", function () {
  console.log("sum of main values: " + sumOfMainValues) // 14820 too high
});
