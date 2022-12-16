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

    var fourteenCharacters = []
    for(i=0;i<line.length;i=i+1){

        
        fourteenCharacters.push(line[i])
        if(fourteenCharacters.length == 15){
            fourteenCharacters.shift()
    
                
            var unique = fourteenCharacters.filter((v, i, a) => a.indexOf(v) === i);
            if(unique.length == 14){
                console.log("Found result: " + unique)
                console.log("Last index of result in input: " + Number(i+1))
                break
            }
            
        }

        
       

    }
});