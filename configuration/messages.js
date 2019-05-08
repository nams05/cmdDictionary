'use strict';

module.exports = {
  seperator1 : '\n--------------------------------------------',
  seperator2 : '--------------------------------------------',
  seperatorEnd : '############################################\n',
  partOfSpeech: ' [Part of speech: ',
  bullet: '->  ',
  notFound: 'Word not found: ',
  wordnikApiError: "Error while fetching word details from Wordnik.",
  helpText: `
  Help:
  ./dict <command> <word>

  Available Commands:
  -> def - for defining a word.
  -> ant - for getting antonyms for a word.
  -> syn - for getting synonyms for a word.
  -> ex - for getting examples/usages for a word.
  -> play - start a word guessing game.
  -> "./dict" for word of the day.
  -> "./dict word" for all the above details for the word.\n`,

};
