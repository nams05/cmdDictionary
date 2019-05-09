'use strict';

const play = require('../controllers/play');
const dictionary = require('../controllers/dictionary');
const messages = require('../configuration/messages');

module.exports = function(input, gameMode, callback){
    if(gameMode.answering){
        play.checkAnswer(input, gameMode, callback);
    } else {
        switch(input){
            case '1':
            gameMode.answering=true;
            callback(messages.gameMessage1);
            break;
            case '2':
            console.log(messages.gameMessage2);
            play.displayHint(gameMode, callback);
            break;
            case '3':
            console.log(messages.gameMessage3);
            dictionary.showCompleteWordDetails(gameMode.randomWord);
            gameMode.playing = false;
            gameMode.randomWord = '';
            gameMode.answering = false;
            gameMode.hintsTaken = 0;
            callback(messages.enterCommand);
            break;
            default:
            callback(messages.gameChoiceError)
        }
    }
};
