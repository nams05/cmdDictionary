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
  gameMessage1: 'Answer: ',
  gameMessage2: 'Hint: ',
  gameMessage3: 'Game Over! Full details for the word:',
  gameChoiceError: 'Please enter a valid choice [1,2,3]:',
  choices: `Select from Below Options:
  1. Try Again
  2. Hint
  3. Quit`,
  enterChoice: 'Enter choice: ',
  enterCommand: 'Enter a command (use "./dict help" for help): ',
};
