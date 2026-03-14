// count ammount of \n in a file (sync)

const fs = require('fs');

console.log(
    fs.readFileSync(process.argv[2], 'utf8')
    .split('\n')
    .length-1
);

/*countSpaces(fs.readFileSync(process.argv[2]));

function countSpaces(file){
    let spaceSum = 0;
    
    userInput.forEach(input => {
        if(!isNaN(input)){
            spaceSum+= Number(input);
        }
    });

    console.log(numberSum);
}*/