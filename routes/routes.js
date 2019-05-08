'use strict';

const dictionary = require('../controllers/dictionary');

module.exports = function(input, gameMode){
    let program = input[0];
    let commandInput = input[1];
    let word = input[2];

    if (program && program == "./dict") {
      console.log(word);
      console.log(commandInput);
    }

}