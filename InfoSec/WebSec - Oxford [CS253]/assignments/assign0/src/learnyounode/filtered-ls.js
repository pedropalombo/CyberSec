// filter file names in a directory (async) based on the given extension

const fs = require('fs');
const path = require('path');

//console.log('here are all the args: ', process.argv);

fs.readdir(process.argv[2], (err, list) => {

    if (err) return console.error(err); //pseudo error-handling

    list.forEach(element => {
        if (path.extname(element) === '.' + process.argv[3]) {
            console.log(element);
        }
    });
});