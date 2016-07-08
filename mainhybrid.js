var findTargetWord = require('./targetword.js').findTargetWord;
var gameDictionary = require('./words.js');

//var gameDictionary = ['jazz', 'workk', 'farrm', 'maan'];

var wins = 0;
var losses = 0;
var workingWord ;
var blanks = [];
var guesses ;

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
		doGame.newGame();
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
				console.log("bad guess ");
				console.log(blanks);
				guesses--;
			}
			askForGuess();
		})
	}//if
	else {
		console.log("You won this word! Play again!");
		wins++
		doGame.newGame();
	}		
}//askForGuess function 


doGame = {
	newGame : function (){
		if( gameDictionary.length != 0 ){
			setNextWord();
			askForGuess();
		}
		else{
			console.log("game over!");
		}
	}//newGame
}//doGame


doGame.newGame();
