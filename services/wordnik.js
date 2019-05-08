'use strict';

const requestJson = require('request-json');
const config = require('../configuration/config');
const client = requestJson.createClient(config.apiEndpoint);
const apiKey = config.apiKey;

module.exports = (function(){

    //private methods
    const getURL = function(url, callback){
      client.get(url, (err, res, body)=>{
        if(err) return callback(err);
        if(res.statusCode === 200){
          return callback(null,body);
        }
        return callback(`Error code: ${res.statusCode}`, null);  
        
      });
    };

    //public methods
    const that = {};

    that.getWordOfTheDay = function(day, callback){
      let url = `words.json/wordOfTheDay?date=${day}&api_key=${apiKey}`;
      getURL(url, callback);
    };

    that.getRandomWord = function(callback){
      let url = `words.json/randomWord?hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=${apiKey}`;
      getURL(url, callback);
    };

    that.getWordDefinition = function(word, callback){
      let url = `word.json/${word}/definitions?limit=200&includeRelated=true&sourceDictionaries=all&useCanonical=false&includeTags=false&api_key=${apiKey}`;
      getURL(url, callback);
    };

    that.getWordSynonym = function(word, callback){
      let url = `word.json/${word}/relatedWords?useCanonical=false&relationshipTypes=synonym&limitPerRelationshipType=10&api_key=${apiKey}`;
      getURL(url, callback);
    };

    that.getWordAntonym = function(word, callback){
      let url = `word.json/${word}/relatedWords?useCanonical=false&relationshipTypes=antonym&limitPerRelationshipType=10&api_key=${apiKey}`;
      getURL(url, callback);
    };

    that.getWordExamples = function(word, callback){
      let url = `word.json/${word}/examples?includeDuplicates=false&useCanonical=false&skip=0&limit=5&api_key=${apiKey}`;
      getURL(url, callback);
    };

    return that;

  })();
