// =| Summing-up every number value inputed into cmd |=

let total = 0;

//process == Object | argv == contains what was inputed into the cmd
process.argv.forEach(element => {
    if(!isNaN(element)) {
        //console.log('element: ', element);
        total += Number(element);
    }
});

console.log(total);