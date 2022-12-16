const f = require('fs');
const readline = require('readline');
var inputFile = 'input.txt';

var reader = readline.createInterface({
    input : f.createReadStream(inputFile)
});

var lines = []
reader.on('line', function (line) {
  
    var oneLine = line.split('')
    lines.push(oneLine)

});

// after file is read through
reader.on('close', function() {
    var middleTrees = 0
    // calculate visible trees in the middle
    for(c=1;c<lines[0].length-1;c=c+1){
        for(l=1;l<lines[c].length-1;l=l+1){
            var currentTreeIsVisible = true
            var currentTreeHeight = lines[c][l]
            //console.log("current tree position - line: " + (c+1) + " column: " + (l+1))
            //console.log("currentTreeHeight: " + currentTreeHeight)

            // loop through trees from different directions to the edge to see if the tree is visible

            // loop to left
            //console.log("checking left")
            var leftTrees = []
            for(t=l-1;t>=0;t=t-1){
                //console.log("left: " + lines[c][t])
                leftTrees.push(lines[c][t])
            }
            currentTreeIsVisible = leftTrees.every(function(treeInAwayHeight){
                return treeInAwayHeight < currentTreeHeight  
            })
            //console.log("visible from left: " + currentTreeIsVisible)
            

            // continue only if we do not have confirmation it is visible
            if(!currentTreeIsVisible) {
                // loop to right
                //console.log("checking right")
                var rightTrees = []
                for(t=l+1;t<lines[0].length;t=t+1){
                    //console.log("right: " + lines[c][t])
                    rightTrees.push(lines[c][t])
                }
                currentTreeIsVisible = rightTrees.every(function(treeInAwayHeight){
                    return treeInAwayHeight < currentTreeHeight  
                })

                //console.log("visible from right: " + currentTreeIsVisible)
            }
            

            // continue only if we do not have confirmation it is visible
            if(!currentTreeIsVisible) {
                // loop to top
                //console.log("checking top")
                var topTrees = []
                for(t=c-1;t>=0;t=t-1){
                    //console.log("top: " + lines[t][l])
                    topTrees.push(lines[t][l])
                }
                currentTreeIsVisible = topTrees.every(function(treeInAwayHeight){
                    return treeInAwayHeight < currentTreeHeight  
                })

                //console.log("visible from top: " + currentTreeIsVisible)
            }
            

            // continue only if we do not have confirmation it is visible
            if(!currentTreeIsVisible) {
                // loop to top
                //console.log("checking bottom")
                var topTrees = []
                for(t=c+1;t<lines.length;t=t+1){
                    //console.log("bottom: " + lines[t][l])
                    topTrees.push(lines[t][l])
                }
                currentTreeIsVisible = topTrees.every(function(treeInAwayHeight){
                    return treeInAwayHeight < currentTreeHeight  
                })

                //console.log("visible from bottom: " + currentTreeIsVisible)
            }

            // if tree is visible add one to count of middle trees visible
            if(currentTreeIsVisible){
                middleTrees = middleTrees + 1
            }

            //console.log("-------------next column-------------")
        } 
        //console.log("--------------next line--------------")
    }

    var edgeTrees = (lines[0].length * 2) + (lines.length * 2) - 4
    console.log("edge trees count: " + edgeTrees)
    console.log("middle trees count: " + middleTrees)
    console.log("all visible trees: " + (edgeTrees+middleTrees))

})
