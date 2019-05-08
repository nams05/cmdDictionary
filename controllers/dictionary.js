'use strict';

const wordnikService = require('../services/wordnik');
const utils = require('../utils/utils');
const async = require('async');
const messages = require('../configuration/messages');

module.exports = (function(){
    /*
    Public functions
    */
    const that ={};

    that.defineWord = function(word, mainCallback, callback){
        if(!word) return console.log("lol");

        wordnikService.getWordDefinition(word, function(err, json){
            if(err) return console.log(messages.wordnikApiError, err);
            if(utils.isEmpty(json)){
                console.log(messages.notFound + word);
            } else{
                utils.formatDefinition(word, json);
            }

            if(callback) callback(null,word);
            if (mainCallback) mainCallback();
        });
    };

    that.getWordSynonym = function(word, mainCallback, callback){
        if(!word) return console.log(output.errBlankWord);

        wordnikService.getWordSynonym(word,function(err, json){
            if(err) return console.log(messages.wordnikApiError, err);
            if(utils.isEmpty(json)){
                console.log(messages.notFound + word);
            } else{
                utils.printSynonyms(word, json[0].words);
            }
            if(callback) callback(null,word);
            if (mainCallback) mainCallback();
        });
    };

    that.getWordAntonym = function(word, mainCallback, callback){
        if(!word) return console.log(output.errBlankWord);

        wordnikService.getWordAntonym(word, function(err, json){
            if(err) return console.log(messages.wordnikApiError, err);
            if(utils.isEmpty(json)){
                console.log(messages.notFound + word);
            } else{
                utils.printAntonyms(word, json[0].words);
            }
            if(callback) callback(null,word);
            if (mainCallback) mainCallback();
        });
    };

    that.getWordExamples = function(word, mainCallback, callback){
        if(!word) return console.log(output.errBlankWord);

        wordnikService.getWordExamples(word,function(err, json){
            if(err) return console.log(messages.wordnikApiError, err);
            if(utils.isEmpty(json)){
                console.log(messages.notFound + word);
            } else{
                utils.printExamples(word, json);
            }
            if(callback) callback(null,word);
            if (mainCallback) mainCallback();
        });
    };

    that.showCompleteWordDetails = function(word, mainCallback){
        async.parallel([that.defineWord(word), that.getWordSynonym(word), that.getWordAntonym(word), that.getWordExamples(word)]);
        if (mainCallback) setTimeout(mainCallback, 3000);
    };

    that.getWordOfTheDay = function(mainCallback){
        let todayDate = (new Date()).toISOString().slice(0, 10);
        wordnikService.getWordOfTheDay(todayDate, function(err, json){
            if(err) return console.log(messages.wordnikApiError, err);
            if(json.word == null) return console.log('Word of the Day not found');

            console.log(`\nToday's word (${todayDate}): ${json.word}`);
            that.showCompleteWordDetails(json.word, mainCallback);
        });
    };

    return that;

})();