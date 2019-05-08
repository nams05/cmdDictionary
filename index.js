'use strict';

/*
* Author: namrata.gupta05@gmail.com
*/

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var gameMode = {
  answering:0,
  randomWord:'',
  playing:false,
  hintsTaken:0,
};

function main(input, callback) {
  if(!gameMode.playing){
    input = input.split(' ');
    require('./routes/routes')(input, gameMode, callback);
  }
}

var recursiveAsyncReadLine = function () {
  rl.question('Enter a command. (use "./dict help" for help.) ', (input) => {
    if (input == 'exit') 
      return rl.close(); 
    main(input, function(){
      recursiveAsyncReadLine();  
    });
  });
};

recursiveAsyncReadLine();