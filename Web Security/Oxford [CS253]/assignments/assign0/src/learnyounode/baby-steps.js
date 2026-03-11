// get parameters from CLI input and sum-'em-up
let userInput = process.argv.slice(2);  //removing the directories' paths

readParameters(userInput)

function readParameters(userInput){
    let numberSum = 0;
    userInput.forEach(input => {
        if(!isNaN(input)){
            numberSum+= Number(input);
        }
    });

    console.log(numberSum);
}