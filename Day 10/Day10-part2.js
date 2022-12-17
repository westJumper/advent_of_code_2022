const f = require("fs");
const readline = require("readline");
var inputFile = "input.txt";

var reader = readline.createInterface({
  input: f.createReadStream(inputFile),
});

var x = 1 // x is first Register position
var addToX = 0
var loop = 0
var cycle = 1
var image = []

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

    // draw here
    if(cycle == x || cycle == x+1 || cycle == x+2){
      image.push("#")
    } else {
      image.push(".")
    }

    // last loop of line => add to X
    // for noop it is just one iteration, for other it is two
    if(i == loop - 1){      
      x = x + addToX
    } else {
      // first loop
    }

     cycle++

     // reset cycle to start from first position on new line
     if(cycle%41==0){
      cycle = 1
     }
  }

});

// after file is read through
reader.on("close", function () {
  for(i = 0; i< 240; i=i+40){
    console.log(image.join("").substring(i, i+40))
  }
});
