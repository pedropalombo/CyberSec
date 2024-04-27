// =| Managing Async Input-Output Files |=
// ~\           aka Node style          /~

//getting FileSystem lib
let fs = require('fs');


function getNumberSpaces() {
    //readFile() returns a callback, so we have to define its function
    // \-> fs.readFile(filePath, function callback(error, contents))
    fs.readFile(process.argv[2], (err, fileContents) => {

        //error-handling in case file has problems
        if(err) {
            return console.log(err);
        }
        
        //getting ammount of lines based on split()
        const lines = fileContents.toString().split("\n").length-1;
        
        console.log(lines);
    });
}

getNumberSpaces();