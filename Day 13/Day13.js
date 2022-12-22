const f = require("fs");
const readline = require("readline");
var inputFile = "input.txt";

var reader = readline.createInterface({
  input: f.createReadStream(inputFile),
});

var pairs = []
var counter = 0
var pair = []

// create grid and set starting position
reader.on("line", function (line) {
  
  if(line != ""){
    pair.push(JSON.parse(line))
  }

  if(pair.length==2){
    pairs.push(pair)
    pair = []
  }
  
});

// after file is read through
reader.on("close", function () {
  console.log(pairs)
  var sum = 0

  pairs.forEach(function(pair, i){
    if (compare(pair[0], pair[1])) sum += i + 1;
  })

  console.log("result solution 1::" + sum)

});

// recursive function
function compare(a, b) {
 
	if (typeof a === 'number' && typeof b === 'number') { // if pair is numbers compare them
		return a > b ? false : a < b ? true : undefined;
	} else if (Array.isArray(a) !== Array.isArray(b)) { // if one is not array run comparison again with transfered number to array
		return compare(Array.isArray(a) ? a : [a], Array.isArray(b) ? b : [b]);
	}

  // compare each element in array
	for (let i = 0, end = Math.max(a.length, b.length); i < end; i++) {
		if (a[i] === undefined) return true; // right is longer array
		if (b[i] === undefined) return false; // left is longer array
		const result = compare(a[i], b[i]); // compare numbers in the same index of array
		if (result !== undefined) return result;
	}
	return undefined;
}