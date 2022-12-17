const f = require('fs');
const readline = require('readline');
var inputFile = 'input.txt';

var reader = readline.createInterface({
    input : f.createReadStream(inputFile)
});
var lineCounter = 0
reader.on('line', function (line) {

    
    var lineLength = line.length
    console.log("processing line: " + lineCounter)

    var fourCharacters = []
    for(i=0;i<line.length;i=i+1){

        
        fourCharacters.push(line[i])
        if(fourCharacters.length == 5){
            fourCharacters.shift()
    
                
            var unique = fourCharacters.filter((v, i, a) => a.indexOf(v) === i);
            if(unique.length == 4){
                console.log("Found result: " + unique)
                console.log("Last index of result in input: " + Number(i+1))
                break
            }
            
        }
    }
});