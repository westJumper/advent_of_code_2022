const f = require('fs');
const readline = require('readline');
var inputFile = 'input.txt';

var reader = readline.createInterface({
    input : f.createReadStream(inputFile)
});
var lineCounter = 0
var map = new Map()
reader.on('line', function (line) {

    
    var lineLength = line.length
    console.log("processing line: " + lineCounter)
    
    // create stacks
    if(lineCounter<8){
        // create arrays
        var column = 0
        for(var i = 1; i < 36; i=i+4){
            if(lineCounter==0){
                map.set(column,[])
                console.log("setting map of column: " + column)
                console.log(map.get(column))
            }
            if(line[i] != " "){
                console.log("getting map column: " + column)
                var currentColumn = map.get(column)
                console.log(currentColumn)
                currentColumn.push(line[i])
                map.set(column,currentColumn)
            }
            column+=1
        }
    }

    // invert order stacks
    if(lineCounter == 8){
        for(var i = 0; i < 9; i=i+1){
            var currentStack = map.get(i)
            var reversedStack = currentStack.reverse()
            map.set(i,reversedStack)
        }   
    }

    if(lineCounter > 9){
        var onlyNumbers = line.replace("move ","").replace("from ","").replace("to ","")
        console.log(onlyNumbers)
        var howManyToMove = Number(onlyNumbers.split(" ")[0])
        var fromStack = Number(onlyNumbers.split(" ")[1])-1
        var toStack = Number(onlyNumbers.split(" ")[2])-1

        var fromArray = map.get(fromStack)
        var toArray = map.get(toStack)

        // move
        var allContainersInCraneArray = []
        for(i=0;i<howManyToMove;i=i+1){
            allContainersInCraneArray.push(fromArray.pop())
            //toArray.push(poppedContainer)
            //map.set(fromStack, fromArray)
            //map.set(toStack, toArray)
        }

        map.set(fromStack, fromArray)
        var containerLength = allContainersInCraneArray.length
        for(l=0;l<containerLength;l=l+1){
            toArray.push(allContainersInCraneArray.pop())
        }

        map.set(toStack, toArray)




    }

    if(lineCounter == 512){
        console.log("last line")
        var result = ""
        for(var x=0; x<9; x=x+1){
            result = result + map.get(x).pop()
        }
        console.log("result: " + result)
    }

    lineCounter+=1
    console.log(map)
    console.log('--------------------')
});