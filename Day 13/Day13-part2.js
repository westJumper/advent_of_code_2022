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
  
});

// after file is read through
reader.on("close", function () {

  var divider1 = [[2]]
  var divider2 = [[6]]
  pair.push(divider1)
  pair.push(divider2)

  console.log(pair)
  var sum = 1

  pair.sort(function(a, b){
    if((compare(a, b))){
      return -1
    } else {
      return 1
    }
  })

  console.log(pair)
  pair.forEach(function(one, index){
    if(one == divider1 || one == divider2){
      sum = sum * (index + 1);
    }
    //console.log(JSON.stringify(one))
  })

  console.log(sum)

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