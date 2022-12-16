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
    var scenicScores = []
    // calculate visible trees in the middle
    for(c=1;c<lines[0].length-1;c=c+1){
        for(l=1;l<lines[c].length-1;l=l+1){
           //var currentTreeIsVisible = true
            var viewLeft = 0, viewRight = 0, viewTop = 0, viewBottom = 0
            var currentTreeHeight = lines[c][l]
            //console.log("current tree position - line: " + (c+1) + " column: " + (l+1))
            //console.log("currentTreeHeight: " + currentTreeHeight)

            // loop through trees from different directions to the edge to see if the tree is visible

            // loop to left
            //console.log("checking left")
            for(t=l-1;t>=0;t=t-1){
                var viewTreeHeight = lines[c][t]
                if(viewTreeHeight < currentTreeHeight) {
                    viewLeft = viewLeft + 1
                } else {
                    viewLeft = viewLeft + 1
                    break
                }
            }
            //console.log("visible from left: " + currentTreeIsVisible)
            

            // continue only if we do not have confirmation it is visible
            
                // loop to right
                //console.log("checking right")
                for(t=l+1;t<lines[0].length;t=t+1){
                    var viewTreeHeight = lines[c][t]
                    //console.log("comparing viewTreeHeight " + viewTreeHeight + " vs " + currentTreeHeight)
                if(viewTreeHeight < currentTreeHeight) {
                    viewRight = viewRight + 1
                } else {
                    viewRight = viewRight + 1
                    break
                }
                }
                //console.log("viewRight: " + viewRight)

                //console.log("visible from right: " + currentTreeIsVisible)
            
            

            // continue only if we do not have confirmation it is visible
            
                // loop to top
                //console.log("checking top")
                for(t=c-1;t>=0;t=t-1){
                    var viewTreeHeight = lines[t][l]
                if(viewTreeHeight < currentTreeHeight) {
                    viewTop = viewTop + 1
                } else {
                    viewTop = viewTop + 1
                    break
                }
                }

                //console.log("visible from top: " + currentTreeIsVisible)
            
            

            // continue only if we do not have confirmation it is visible
            
                // loop to top
                //console.log("checking bottom")
                for(t=c+1;t<lines.length;t=t+1){
                      var viewTreeHeight = lines[t][l]
                if(viewTreeHeight < currentTreeHeight) {
                    viewBottom = viewBottom + 1
                } else {
                    viewBottom = viewBottom + 1
                    break
                }
                }


                //console.log("scores left, right, top, bottom: " + viewLeft + " " + viewRight + " " + viewTop + " " + viewBottom)
                var currentScenicScore = viewLeft * viewRight * viewTop * viewBottom
                scenicScores.push(currentScenicScore)
                
                //console.log("visible from bottom: " + currentTreeIsVisible)
            

            //count scenic view

            //console.log("-------------next column-------------")
        } 
        //console.log("--------------next line--------------")
    }

    console.log("Scenic scores: " + scenicScores)
    console.log("maximum scenic score: " + Math.max(...scenicScores))

})
