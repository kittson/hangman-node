
function findTargetWord(dict) {
		var lPos;
		console.log( "dictionary is  " + dict ); 
		var tWord = dict[Math.floor(Math.random() * dict.length)];
		lPos = dict.indexOf(tWord);
		dict.splice(lPos, 1);
		
		console.log( "executed findTargetWord  " + dict + " " + tWord);
		return( tWord);
}
exports.findTargetWord = findTargetWord;