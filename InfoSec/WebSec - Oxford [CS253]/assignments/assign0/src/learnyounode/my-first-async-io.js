// count ammount of \n in a file (async)

const fs = require('fs');

readContents();

function readContents(){
    fs.readFile(process.argv[2], 'utf8', (err, file) => {   //TIP: always remember the encodying when reading files!!
        console.log(file.split('\n').length-1);
    })
}