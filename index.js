'use strict';

/*
* Author: namrata.gupta05@gmail.com
*/

const messages = require('./configuration/messages');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
process.on('uncaughtException', function (err) {
  console.error(err);
});

var gameMode = {
  answering: false,
  randomWord: '',
  playing: false,
  hintsTaken: 0,
};

function main(input, callback) {
  console.log(gameMode);
  if (!gameMode.playing) {
    input = input.split(' ');
    require('./routes/routes')(input, gameMode, callback);
  } else {
    require('./routes/play.routes')(input, gameMode, callback);
  }
}

var recursiveAsyncReadLine = function (message) {
  if (!message) message = messages.enterCommand;

  rl.question(message, (input) => {
    if (input == 'exit')
      return rl.close();
    try {
      main(input, function (_message) {
        recursiveAsyncReadLine(_message);
      });
    } catch (e) {
      console.log(e);
      recursiveAsyncReadLine(messages.enterCommand);
    }
  });
};

recursiveAsyncReadLine(messages.enterCommand);