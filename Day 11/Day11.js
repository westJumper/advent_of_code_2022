const f = require("fs");
const readline = require("readline");
var inputFile = "input.txt";

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
  
for(round = 0; round < 20; round++){
  monkeys.forEach(function(monkey){
    //console.log("monkey id: " + monkey.id)
    //console.log(monkey)
    monkey.items.forEach(function(item){
      
      // add one to inspected item for current monkey
      monkey.inspectedItemsCount++

      // calculate worry level
      //console.log("item: " + item)
      var worryLevel = eval(monkey.operation.replaceAll("old", item))
      var afterMonkeyIsBored = Math.floor(worryLevel / 3)
      //console.log("worry level: " + worryLevel)
      //console.log("after monkey is bored: " + afterMonkeyIsBored)

      // evaluate condition to throw item
      //monkey.items.shift()
      if(afterMonkeyIsBored % monkey.testDivisibleBy == 0) {
        // throw based on true
        monkeys[monkey.trueThrowTo].items.push(afterMonkeyIsBored)
      } else {
        // throw based on false
        monkeys[monkey.falseThrowTo].items.push(afterMonkeyIsBored)
      }
      //console.log("after removing: " + monkey.items)
    })
    
    var monkeyItems = monkey.items.length
    for(m=0;m<monkeyItems;m++){
     monkey.items.shift()
    }
    //console.log("after removing: " + monkey.items)
    //console.log(monkeys)
    //console.log("---------------")
  })

}
console.log("monkeys after 20 rounds")
console.log(monkeys)

monkeys.forEach(function(monkey){
  console.log("Monkey " + monkey.id + " inspected items " + monkey.inspectedItemsCount + " times.")
})

// result 117640 (multiplied by calculator after displaying results :D)

});