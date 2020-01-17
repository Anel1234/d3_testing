//import $ from './node_modules/jquery'
//let $ = require('jQuery');
const fs = require('fs')
const json = require('./utms.json');

const json2 = require('./sortedUTMS.json');
console.log(JSON.stringify(json2));
// return;

// console.log(json);

let sortedJSON = {};

json.forEach(projectMonth => {
    sortedJSON[projectMonth.year] = sortedJSON[projectMonth.year] || [];
    sortedJSON[projectMonth.year][projectMonth.month] = sortedJSON[projectMonth.year][projectMonth.month] || [];
    sortedJSON[projectMonth.year][projectMonth.month].push(projectMonth);
})

fs.writeFile('./sortedUTMS2.json', JSON.stringify(sortedJSON))


//console.log(JSON.stringify(sortedJSON));