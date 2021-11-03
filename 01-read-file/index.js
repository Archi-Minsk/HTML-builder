const fs = require('fs');
const path = require('path');

let readStream = fs.createReadStream(path.resolve(__dirname, 'text.txt'),'utf-8');

readStream.on('data', (data) => { console.log(data) });