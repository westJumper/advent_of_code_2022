const f = require('fs');
const readline = require('readline');
var inputFile = 'input.txt';

var reader = readline.createInterface({
    input : f.createReadStream(inputFile)
});

var myTotalScore = 0
reader.on('line', function (line) {

   var outcome = line[2] // x = lose, y = draw, z = win
   var opponentChoice = line[0]

   if(outcome == "X") { // lose
        myTotalScore = myTotalScore + 0 // for lose
        if(opponentChoice == "A") myTotalScore = myTotalScore + 3 // for choosing scissors = lose
        if(opponentChoice == "B") myTotalScore = myTotalScore + 1 // for choosing rock = lose
        if(opponentChoice == "C") myTotalScore = myTotalScore + 2 // for choosing paper = lose
   }

   if(outcome == "Y") { // draw
        myTotalScore = myTotalScore + 3 // for draw
        if(opponentChoice == "A") myTotalScore = myTotalScore + 1 // for choosing rock
        if(opponentChoice == "B") myTotalScore = myTotalScore + 2 // for choosing paper
        if(opponentChoice == "C") myTotalScore = myTotalScore + 3 // for choosing scissors
   }

   if(outcome == "Z") { // win
        myTotalScore = myTotalScore + 6 // 3 for win
        if(opponentChoice == "A") myTotalScore = myTotalScore + 2 // for choosing paper = win
        if(opponentChoice == "B") myTotalScore = myTotalScore + 3 // for choosing scissors = win
        if(opponentChoice == "C") myTotalScore = myTotalScore + 1 // for choosing rock = win
   }

   


   console.log("outcome: " + outcome)
   console.log("opponent choice: " + opponentChoice)
   console.log("my total points: " + myTotalScore) // 12272 is low
    
});