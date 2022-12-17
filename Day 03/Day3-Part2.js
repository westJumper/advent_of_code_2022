const f = require("fs");
const { toASCII } = require("punycode");
const readline = require("readline");
var inputFile = "input.txt";

var reader = readline.createInterface({
  input: f.createReadStream(inputFile),
});

var score = 0;
var counter = 0;
var oneGroup = ["", "", ""];
reader.on("line", function (line) {
  if (counter % 3 == 0 || counter == 299) {
    if (counter != 0) {
      if (counter == 299) oneGroup[2] = line;
      // process one group
      console.log("processing one group");
      if (oneGroup.length == 3) console.log(oneGroup);

      // loop through first dwarf inventory and find common character with second
      for (var i = 0; i < oneGroup[0].length; i++) {
        if (oneGroup[1].indexOf(oneGroup[0][i]) != -1) {
          //console.log("first and second in common: " + oneGroup[0][i])
          if (oneGroup[2].indexOf(oneGroup[0][i]) != -1) {
            console.log(
              "first and second and third in common: " + oneGroup[0][i]
            );

            if (oneGroup[0][i].charCodeAt(0) >= 97) {
              console.log("char score: " + (oneGroup[0][i].charCodeAt(0) - 96));
              score = score + (oneGroup[0][i].charCodeAt(0) - 96);
            } else {
              console.log("char score: " + (oneGroup[0][i].charCodeAt(0) - 38));
              score = score + (oneGroup[0][i].charCodeAt(0) - 38);
            }
            break; // skip to next line/group
          }
        }
      }
    }
    oneGroup = ["", "", ""];
    oneGroup[0] = line; // first from the group
    //console.log("modulo 0: " + oneGroup)
  } else {
    // second and third from the group
    console.log("not complete group");
    if (counter == 299) console.log(oneGroup);
    oneGroup[counter % 3] = line;
  }
  console.log("after line: " + counter);
  console.log("score after line: " + score);
  console.log("---------------------------------------------");
  counter += 1;
});
