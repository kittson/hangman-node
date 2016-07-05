var dictionary = require('./game.js');
var inquirer = require('inquirer');

var gameDictionary = ['jazz', 'work', 'farm', 'hellfire'];

//find a random word in the dictionary, return that word and remove
//the word from possible choices for the next play
function findTargetWord(dict) {
		var lPos;
		console.log( "dictionary is  " + dict ); 
		var tWord = dict[Math.floor(Math.random() * dict.length)];
		lPos = dict.indexOf(tWord);
		dict.splice(lPos, 1);
		
		console.log( "executed findTargetWord  " + dict + " " + tWord);
		return( tWord);
}

var workingWord = findTargetWord(gameDictionary).split(""); 
console.log( "splitted word " + workingWord);

var askForGuess = function() {
		var guesses = workingWord.length;
		if (guesses > 0) {
			inquirer.prompt([{
				name: "guess",
				message: "Guess a letter!"
        	}]).then(function(answers) {
				//do something
				askForGuess();
			})
		}
		else {

		}//else
}//askForGuess function 

askForGuess();