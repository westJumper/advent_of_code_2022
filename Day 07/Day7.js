const f = require('fs');
const readline = require('readline');
var inputFile = 'input.txt';

var reader = readline.createInterface({
    input : f.createReadStream(inputFile)
});
var lineCounter = 1
var dirStructure = []
var filesAndFolderInCurrentDir = []
var currentDirName = "/"
var listOfParentDirectories = []
reader.on('line', function (line) {
  

        if(line.startsWith("$ cd") && !line.startsWith("$ cd ..")){
            // go inside directory
            
            // previous directory becomes one of parent
            // current dir is changed to name in current line
            // add previous directory we were in to list of parents
            
            currentDirName = line.split(" ").pop() // set new current dir name

            dirStructure.push(
                {
                    dirName: currentDirName,
                    dirPath: listOfParentDirectories.map((x) => x).toString()+","+currentDirName,
                    parentDirectories: listOfParentDirectories.map((x) => x),
                    parentDirectoriesAsString: listOfParentDirectories.map((x) => x).toString(),
                    size: 0
                }
            )
            listOfParentDirectories.push(currentDirName)
        
        } else

        if(line.startsWith("$ cd ..")){
            // move one directory up
            currentDirName = listOfParentDirectories.pop()// remove last dir from list of parents and assign it as current directory
        } else

        if(line.startsWith("$ ls")){
            // list current dir - start new dir in next line, reset files and folders
            filesAndFolderInCurrentDir = []
        } else

        if(line.startsWith("dir")){
            // directory
            // just skip, not needed
        } else

        if(!isNaN(line[0])){
            // file

            var currentFileSize = Number(line.split(" ").shift())

            // add size to each parent
            for(z=0;z<dirStructure.length;z=z+1){
                // if current dir path starts with any of previously stored directories (is parent)
                if(dirStructure[dirStructure.length-1].dirPath.startsWith(dirStructure[z].dirPath)){
                    dirStructure[z].size = Number(dirStructure[z].size + currentFileSize)
                }
            }

        } else {
            console.log("line not recognized")
        }
        
        // // calculate result when on the last line
        // if(lineCounter == 1079){

            console.log("hello")

        // }
       lineCounter = lineCounter + 1

});

// after file is read through
reader.on('close', function() {
    var totalSize = 0
            for(k=0;k<dirStructure.length;k=k+1){
                if(dirStructure[k].size <= 100000){
                    totalSize = totalSize + dirStructure[k].size
                }
            }
            console.log("total size of directories with less than 100000 size: " + totalSize) // 1350966
})
