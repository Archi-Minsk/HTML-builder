const fs = require('fs');
const path = require('path');
const readline = require('readline');
const EOL = require("os").EOL;

const goodbye = () => {
    console.log(`${EOL}goodbye!`);
    process.exit(0);
}

const filePath = path.resolve(__dirname, 'text.txt');

fs.open(filePath, 'w', (err) => {
    if (err) throw err;
    console.log('Enter text: ');
    rline.prompt();
});

const rline = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '--> ',
});

rline.on('line', (data) => {
    if (data.trim() === 'exit') execExit();
    fs.appendFile(filePath, `${data}${EOL}`, (err) => {
        if (err) throw err;
    });
    rline.prompt();
});

rline.on('SIGINT', () => {
    console.log('Ctrl + C');
    goodbye();
})