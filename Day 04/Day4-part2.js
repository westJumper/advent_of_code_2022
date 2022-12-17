const f = require("fs");
const readline = require("readline");
var inputFile = "input.txt";

var reader = readline.createInterface({
  input: f.createReadStream(inputFile),
});
var counter = 0;
reader.on("line", function (line) {
  console.log("line: " + line);
  var firstDwarf = [
    Number(line.split(",")[0].split("-")[0]),
    Number(line.split(",")[0].split("-")[1]),
  ];
  var secondDwarf = [
    Number(line.split(",")[1].split("-")[0]),
    Number(line.split(",")[1].split("-")[1]),
  ];

  if (
    firstDwarf[0] == secondDwarf[0] ||
    firstDwarf[1] == secondDwarf[1] ||
    firstDwarf[0] == secondDwarf[1] ||
    firstDwarf[1] == secondDwarf[0]
  ) {
    counter = counter + 1;
  } else if (
    firstDwarf[0] <= secondDwarf[0] &&
    firstDwarf[1] >= secondDwarf[1]
  ) {
    counter = counter + 1;
  } else if (
    secondDwarf[0] <= firstDwarf[0] &&
    secondDwarf[1] >= firstDwarf[1]
  ) {
    counter = counter + 1;
  } else if (
    firstDwarf[0] >= secondDwarf[0] &&
    firstDwarf[0] <= secondDwarf[1]
  ) {
    counter = counter + 1;
  } else if (
    secondDwarf[0] >= firstDwarf[0] &&
    secondDwarf[0] <= firstDwarf[1]
  ) {
    counter = counter + 1;
  } else if (
    secondDwarf[1] >= firstDwarf[0] &&
    secondDwarf[1] <= firstDwarf[1]
  ) {
    counter = counter + 1;
  } else if (
    firstDwarf[1] >= secondDwarf[0] &&
    firstDwarf[1] <= secondDwarf[1]
  ) {
    counter = counter + 1;
  }

  console.log(counter);
});
