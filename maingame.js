var findTargetWord = require('./game.js').findTargetWord;
var inquirer = require('inquirer');

var gameDictionary = ['jazz', 'workk', 'farrm', 'maan'];

var wins = 0;
var losses = 0;
var workingWord ;
var blanks = [];
var guesses ;

//find a random word in the dictionary, return that word and remove
//the word from possible choices for the next play
/*function findTargetWord(dict) {
		var lPos;
		console.log( "dictionary is  " + dict ); 
		var tWord = dict[Math.floor(Math.random() * dict.length)];
		lPos = dict.indexOf(tWord);
		dict.splice(lPos, 1);
		
		console.log( "executed findTargetWord  " + dict + " " + tWord);
		return( tWord);
}*/

//var workingWord = findTargetWord(gameDictionary).split(""); 


function findAllLetters(guess){
	var locationIndex = workingWord.indexOf(guess);
	blanks[locationIndex] = guess;
	workingWord = workingWord.replace(guess, "_");
	console.log(blanks);
	locationIndex = workingWord.indexOf(guess);
	if (locationIndex > -1){
		findAllLetters(guess);
	};
};

function setNextWord(){
	workingWord = findTargetWord(gameDictionary);	 
	console.log("the word " + workingWord);
	blanks = [];
	guesses = workingWord.length;	
	for ( i = 0; i < guesses; i++){
		blanks.push("_");
	};
}


var askForGuess = function() {
	if( guesses === 0){
		console.log("You lost!");
		losses++;
		doNewGame();
		return;
	}

	if ( blanks.indexOf('_') > -1 ) {
		inquirer.prompt([{
			name: "guess",
			message: "Guess a letter!"
        }]).then(function(answers) {
			var guess = answers.guess;
			var locationIndex = workingWord.indexOf(guess);								
			console.log(answers);
			if (locationIndex > -1){
				findAllLetters(guess);
			}
			else {
				console.log("baad guess ");
				console.log(blanks);
				guesses--;
			}
			askForGuess();
		})
	}//if
	else {
		console.log("You won this word! Play again!");
		wins++
		doNewGame();
	}		
}//askForGuess function 

function doNewGame(){
	if( gameDictionary.length != 0 ){
		setNextWord();
		askForGuess();
	}
	else{
		console.log("game over!");
	}
}


doNewGame();
