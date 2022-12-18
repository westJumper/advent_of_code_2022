// IMPORTANT
// CODE IN VISUAL STUDIO CODE WORKS SLOW, WHEN RUNNING IN BROWSER EG MIRIO IT WORKS FAST - WHY?

const f = require("fs");
const readline = require("readline");
var inputFile = "sample.txt";

var reader = readline.createInterface({
  input: f.createReadStream(inputFile),
});

// parse input
var monkeys = []
var monkey = {}

reader.on("line", function (line) {

  if(line.startsWith("Monkey")){
    monkey.id = line.split(" ")[1].split(":")[0]
  } else if (line.indexOf("Starting items:") != -1){
    monkey.items = line.slice(18).split(", ")
  } else if (line.indexOf("Operation:") != -1){
    monkey.operation = line.split("new = ")[1]
  } else if (line.indexOf("Test:") != -1){
    monkey.testDivisibleBy = line.split(" ")[line.split(" ").length-1]
  } else if (line.indexOf("If true") != -1) {
    monkey.trueThrowTo = Number(line.split(" ")[line.split(" ").length-1])
  } else if (line.indexOf("If false") != -1 ) {
    monkey.falseThrowTo = Number(line.split(" ")[line.split(" ").length-1])

    monkey.inspectedItemsCount = 0

    // end of monkey, push to global
    monkeys.push(monkey)
    monkey = {}
  }

});

// after file is read through
reader.on("close", function () {
  
var modulo = monkeys.reduce((a, b) => a * b.testDivisibleBy, 1)
console.log("modulo: " + modulo)

var rounds = 10000
for(round = 0; round < rounds; round++){
  
  // loop through monkeys
  for(m=0; m < monkeys.length; m++) {
   
    // loop through items of one monkey
    for(i=0; i < monkeys[m].items.length; i++) {

      // add one to inspected item for current monkey
      monkeys[m].inspectedItemsCount = monkeys[m].inspectedItemsCount + 1

      // calculate worry level
      var worryLevel = eval(monkeys[m].operation.replaceAll("old", monkeys[m].items[i]))
      var value = worryLevel % modulo
      
      // evaluate condition to throw item
      if(value % monkeys[m].testDivisibleBy == 0) {
        // throw based on true
        monkeys[monkeys[m].trueThrowTo].items.push(value)
      } else {
        // throw based on false
        monkeys[monkeys[m].falseThrowTo].items.push(value)
      }

    }

    // remove all items from inspected monkey
    monkeys[m].items = []

  }

}

console.log("monkeys after "+rounds+" rounds")
console.log(monkeys)

monkeys.forEach(function(monkey){
  console.log("Monkey " + monkey.id + " inspected items " + monkey.inspectedItemsCount + " times.")
})

// result is 30616425600 after multiplied in calculator :)

});