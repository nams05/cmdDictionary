'use strict';

const dictionary = require('../controllers/dictionary');
const utils = require('../utils/utils');

module.exports = function(input, gameMode, callback){
    let program = input[0];
    let commandInput = input[1];
    let word = input[2];

    if (program && program == "./dict") {
        switch (commandInput) {
            case 'def':
            dictionary.defineWord(word, callback);
            break;
            case 'syn':
            dictionary.getWordSynonym(word, callback);
            break;
            case 'ant':
            dictionary.getWordAntonym(word, callback);
            break;
            case 'ex':
            dictionary.getWordExamples(word, callback);
            break;
            case 'play':
            utils.startGame(gameMode);
            break;
            case 'help':
            utils.displayHelp(callback);
            break;
            default:
            if (commandInput) {
                dictionary.showCompleteWordDetails(commandInput, callback);
            } else {
                dictionary.getWordOfTheDay(callback);
            }
        }
    } else{
        if (callback) callback();
    }
}

