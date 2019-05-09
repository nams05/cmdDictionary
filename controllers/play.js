'use strict';

const wordnikApi = require('../services/wordnik');
const messages = require('../configuration/messages');
const playUtils = require('../utils/play.utils');
const waterfall = require('async-waterfall');

module.exports = (function () {

    function getRandomSyn(word, cb) {
        wordnikApi.getWordSynonym(word, function (err, json) {
            if (err) return console.log(messages.wordnikApiError, err);
            if (json.length === 0) {
                return cb(true, word);
            } else {
                let result = json[0].words[playUtils.random(json[0].words.length)];
                cb(null, result);
            }
        });
    }

    function getRandomAnt(word, cb) {
        wordnikApi.getWordAntonym(word, function (err, json) {
            if (err) return console.log(messages.wordnikApiError, err);
            if (json.length === 0) {
                return cb(true, word);
            } else {
                let result = json[0].words[playUtils.random(json[0].words.length)];
                cb(null, result);
            }
        });
    }

    function getRandomDef(word, cb) {
        wordnikApi.getWordDefinition(word, function (err, json) {
            if (err) return console.log(messages.wordnikApiError, err);
            if (json.length === 0) {
                return cb(true, word);
            } else {
                let result = json[playUtils.random(json.length)].text;
                cb(null, result);
            }
        });
    }


    /*
    Public funcitons
    */
    const that = {};

    that.getQuestion = function (_callback) {

        waterfall([
            function (callback) {
                wordnikApi.getRandomWord((err, json) => {
                    if (err) return callback(messages.wordnikApiError);
                    if (json.word == null) return callback('Question Could not be fetched');

                    callback(null, json.word);
                });
            },
            function (word, callback) {

                switch (playUtils.random(3)) {
                    case 0:
                        getRandomDef(word, (err, result) => {
                            if (err) return console.log(` Sorry unable to fetch question currently`);
                            callback(null, {
                                'word': word,
                                'question': `Definition - ${result}`
                            });
                        });
                        break;
                    case 1:
                        getRandomSyn(word, (err, result) => {
                            if (err) {
                                return getRandomDef(result, (err, _result) => {
                                    if (err) return console.log(` Sorry unable to fetch question currently`);
                                    callback(null, {
                                        'word': word,
                                        'question': `Definition - ${_result}`
                                    });
                                });
                            }
                            callback(null, {
                                'word': word,
                                'question': `Synonym - ${result}`
                            });
                        });
                        break;
                    case 2:
                        getRandomAnt(word, (err, result) => {
                            if (err) {
                                return getRandomDef(result, (err, _result) => {
                                    if (err) return console.log(` Sorry unable to fetch question currently`);
                                    callback(null, {
                                        'word': word,
                                        'question': `Definition - ${_result}`
                                    });
                                });
                            }
                            callback(null, {
                                'word': word,
                                'question': `Antonym - ${result}`
                            });
                        });
                        break;
                }
            }

        ], function (err, result) {
            if (err) return _callback(err);

            _callback(null, result);
        });

    };

    that.checkAnswer = function (input, gameMode, callback) {
        if (input.toLowerCase() === gameMode.randomWord.toLowerCase()) {
            console.log('Correct! Getting on to next question.');

            that.getQuestion(function (err, result) {
                if (err) return console.log(messages.wordnikApiError, err);

                gameMode.randomWord = result.word;
                gameMode.hintsTaken = 0;

                console.log(`Question: ${result.question}`);
                if (callback) callback(messages.gameMessage1);
            });

        } else {
            console.log('Incorrect!');
            console.log(messages.choices);
            gameMode.answering = false;
            if (callback) callback(messages.enterChoice);
        }
    };


    that.displayHint = function (gameMode, callback) {
        let hint = gameMode.hintsTaken;
        let word = gameMode.randomWord;

        switch (hint) {
            case 0:
                console.log(` - Jumbled Correct Word: ${playUtils.jumbleWord(word)}`);
                break;
            case 1:
                getRandomDef(word, (err, result) => {
                    if (err) return console.log(` - Jumbled Correct Word: ${playUtils.jumbleWord(word)}`);
                    console.log(`\nDefinitions: ${result} \n`);
                });
                break;
            case 2:
                getRandomSyn(word, (err, result) => {
                    if (err) return console.log(` - Jumbled Correct Word: ${playUtils.jumbleWord(word)}`);
                    console.log(` - Synonym: ${result}`);
                });
                break;
            case 3:
                getRandomAnt(word, (err, result) => {
                    if (err) return console.log(` - Jumbled Correct Word: ${playUtils.jumbleWord(word)}`);
                    console.log(` - Antonym: ${result}`);
                });
                break;
        }
        gameMode.hintsTaken = (hint + 1) % 4;
        gameMode.answering = true;
        if (callback) callback(messages.gameMessage1);
    }


    return that;

})();
