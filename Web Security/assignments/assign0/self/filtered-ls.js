// =| Showing files that match given extension type |=

const fs = require('fs');

function getNumberOfFiles() {
    //reading the directory and its files
    // \-> PS: readdir()'s callback is an array of file names as strings
    fs.readdir(process.argv[2], (err, listOfFiles) => {
        
        //error-handling
        if(err){
            console.error(err);
        }

        //setting the given extension type
        let extension = "." + process.argv[3];

        //going through the array of file names
        listOfFiles.forEach(element => {

            //checking if the given file has the given extension
            if(element.includes(extension)){
                console.log(element);
            }
        });
    })
}

getNumberOfFiles();