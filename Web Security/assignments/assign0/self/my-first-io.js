// =| Managing Sync Input-Output Files |=
// ~\           aka JS style           /~

//getting the 'Filesystem' module from Node lib
//OBS: 'fs' is used to manage files
const fs = require('fs');

//getting the file path based on input from cmd
// \-> FS methods always return a 'Buffer' object
const content = fs.readFileSync(process.argv[2])

//turning object into string, and counting number of new lines based on split() length
const lines = content.toString().split('\n').length-1;

console.log(lines);

/*single-line response
console.log((fs.readFileSync(process.argv[2]).toString().split('\n').length)-1)
*/