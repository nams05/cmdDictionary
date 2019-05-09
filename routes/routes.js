'use strict';

const dictionary = require('../controllers/dictionary');
const utils = require('../utils/utils');
const play = require('../controllers/play');
const messages = require('../configuration/messages');

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
            play.getQuestion(function(err, result){
                if(err) return console.log('Error while fetching Question', err);
                gameMode.playing=true;
                gameMode.randomWord = result.word;
                gameMode.answering = true;
                gameMode.hintsTaken=0;
                console.log('-----------------Word Play Mode-------------------');
                console.log(`Enter the correct word for definition, synonym, or antonym of the word.\n`);
                console.log(`Question: ${result.question}`);
                callback(messages.gameMessage1);
            });
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

