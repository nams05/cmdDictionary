'use strict';
const messages = require('../configuration/messages');

module.exports = (function(){
    var getDisplayString = function(value) {
        var displayStr = value.text 
        var partOfSpeech = value.partOfSpeech
        if (partOfSpeech) {
            displayStr = displayStr + messages.partOfSpeech + partOfSpeech + ']';
        }
        return displayStr;
    }

    var printFormatted = function(word, input) {
        console.log(messages.seperator1);
        console.log(`Definitions for ${word}:`);
        Object.keys(input).forEach((value)=>{
            console.log(messages.seperator1);
            console.log(value);
            console.log(messages.seperator2);

            input[value].forEach((value)=>{
                console.log(messages.bullet + value);
            });
            console.log(messages.seperatorEnd);
        });
    };

    var printWords = function(words) {
        for (var i in words) {
            console.log(messages.bullet + words[i]);
        }
    }

    const that ={};

    that.printExamples = function(word, response) {
        console.log(messages.seperator1);
        console.log(`Examples for ${word}:`);
        console.log(messages.seperator2);
        response.examples.forEach((v,i)=>{
            console.log(messages.bullet + v.text);
        });
        console.log(messages.seperatorEnd);
    }

    that.printAntonyms = function(actualWord, resultWords) {
        console.log(messages.seperator1);
        console.log(`Antonyms for ${actualWord}: `)
        console.log(messages.seperator2);
        printWords(resultWords);
        console.log(messages.seperatorEnd);
    }

    that.printSynonyms = function(actualWord, resultWords) {
        console.log(messages.seperator1);
        console.log(`Synonyms for ${actualWord}: `)
        console.log(messages.seperator2);
        printWords(resultWords);
        console.log(messages.seperator1);
    }

    that.displayHelp = function (callback) {
        console.log(messages.helpText);
        if (callback) callback();
    };

    that.formatDefinition = function(word, response){
        const definition = {};
        response.forEach((value)=>{
            if(definition[value.attributionText] != null){
                definition[value.attributionText].push(getDisplayString(value));
            }else{
                definition[value.attributionText] = [];
                definition[value.attributionText].push(getDisplayString(value));
            }
        });
        printFormatted(word, definition);
    };

    that.isEmpty = function(obj){
        return (Object.getOwnPropertyNames(obj).length === 0);
    }

    return that;
})();