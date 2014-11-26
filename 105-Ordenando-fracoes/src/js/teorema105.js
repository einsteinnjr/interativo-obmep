//Constants
NUMBER_OF_FRACTIONS = 5;
INITIAL_PART_UNITY = 1;
INITIAL_PART_DECIMAL = 10;
MAX_PART_UNITY = 9;
MAX_PART_DECIMAL = 29;

NUMBER_OF_FRACTIONS_EASY = 5;
NUMBER_OF_TWO_DIGITS_EASY = 0;

NUMBER_OF_FRACTIONS_MEDIUM = 7;
NUMBER_OF_TWO_DIGITS_MEDIUM = 2;

NUMBER_OF_FRACTIONS_HARD = 9;
NUMBER_OF_TWO_DIGITS_HARD = 4;


var numberOfFractions = NUMBER_OF_FRACTIONS_EASY;
var numberOfTwoDigits = NUMBER_OF_TWO_DIGITS_EASY;
var maxPart;

var i, j;
var fractions=[];
var lcm;

function Fraction(numerator, denominator) {
	this.label = numerator+"/"+denominator;
	//console.log("label "+this.label);
	this.value = numerator/denominator;
	//console.log("value "+this.value);
	this.numerator = numerator;
	//console.log("numerator "+numerator);
	this.denominator = denominator;
	//console.log("denominator "+denominator);
}

function fillFractionsListHtml(){
	$("#fractionsList").empty();
	$("#fractionsList").html(generateFractionsListHtml());
} 

function generateFractionsListHtml(){
	var fractionsListHtml = "";
	var numerator, denominator;
	var auxFraction;
	fractions = [];
	var alreadyThere = false;
	j=0;
	for(i=0; i< numberOfFractions; i++){

		// grant number of two digits, to be more difficult
		if( Math.random() < numberOfTwoDigits/numberOfFractions //percentage of TwoDigits
						&& j < numberOfTwoDigits ) {
			maxPart = MAX_PART_DECIMAL;
			initialPart = INITIAL_PART_DECIMAL;
			j++;
		}
		else {
			maxPart = MAX_PART_UNITY;
			initialPart = INITIAL_PART_UNITY;
		}		
		numerator = Math.floor( Math.random() * maxPart); 
		do{denominator = initialPart + Math.floor( Math.random() * (maxPart-initialPart)); //on decimal: above 10.
			//console.log("denominator"+denominator);		
		}
		while(denominator===0);
		auxFraction = new Fraction(numerator, denominator);
		
		alreadyThere = false;		
		for(i=0; i< fractions.length; i++){
			//console.log(" fractions "+ auxFraction.label+" "+fractions[i].label+" "+compareFraction(fractions[i], auxFraction));
			if(compareFraction(fractions[i], auxFraction)===0) alreadyThere=true;
		}
		if(alreadyThere){ //do not put the same fraction
			//console.log("fraction repeated: "+ auxFraction.label);
			i--;
			continue;
		}
		//console.log("fraction added: "+ auxFraction.label);
		fractions.push(auxFraction);
		fractionsListHtml += "<li id='"+i+"' label='"+fractions[i].label+"' class='ui-state-default'> `"+fractions[i].label+"` </li>";
		
	}
	return fractionsListHtml;
}

// for sort of an array objs.
// just call as objs.sort(compare);
function compareFraction(a, b) {
  if ( a.value < b.value )
    return -1;
  else if ( a.value > b.value )
    return 1;
  else if ( a.value === b.value )
    return 0;
  return 0;
}

function decideGameLevel(){
	//console.log($('input[name=gameLevel]:checked').val());
	if($('input[name=gameLevel]:checked').val() === "easy") {
		numberOfFractions= NUMBER_OF_FRACTIONS_EASY;
		numberOfTwoDigits = NUMBER_OF_TWO_DIGITS_EASY;
	}
	else if($('input[name=gameLevel]:checked').val() === "medium") {
		numberOfFractions= NUMBER_OF_FRACTIONS_MEDIUM;
		numberOfTwoDigits = NUMBER_OF_TWO_DIGITS_MEDIUM;
	}
	else if($('input[name=gameLevel]:checked').val() === "hard") {
		numberOfFractions= NUMBER_OF_FRACTIONS_HARD;
		numberOfTwoDigits = NUMBER_OF_TWO_DIGITS_HARD;
	}	
}

/**
 * url: http://oli.me.uk/2013/06/08/searching-javascript-arrays-with-a-binary-search/
 * Performs a binary search on the host array. This method can either be
 * injected into Array.prototype or called with a specified scope like this:
 * binaryIndexOf.call(someArray, searchElement);
 *
 * @param {*} searchElement The item to search for within the array.
 * @return {Number} The index of the element which defaults to -1 when not found.
 */
function binaryIndexOf(myArray, searchElement) {
    'use strict';
 
    var minIndex = 0;
    var maxIndex = myArray.length - 1;
    var currentIndex;
    var currentElement;
 
    while (minIndex <= maxIndex) {
        currentIndex = (minIndex + maxIndex) / 2 | 0;
        currentElement = myArray[currentIndex];
 
        if (compareFraction(currentElement, searchElement) === -1) {  //currentElement < searchElement
            minIndex = currentIndex + 1;
        }
        else if (compareFraction(currentElement, searchElement) === 1) { //currentElement > searchElement
            maxIndex = currentIndex - 1;
        }
        else {
            return currentIndex;
        }
    }
 
    return -1;
}

function fillSortedListHtml(){
	$("#sortedList").empty();
	
	var sortedListHtml = "";
	for(i=0; i< numberOfFractions; i++){
		sortedListHtml += "<li id='"+i+"' label='"+fractions[i].label+"' class='ui-state-default'> `"+fractions[i].label+"` </li>";
		
	}
	$("#sortedList").html(sortedListHtml);
}

function fillReducedSortedListHtml(){
	$("#reducedSortedList").empty();
	var newNumerator;
	var newDenominator;
	var reducedSortedListHtml = "";
	for(i=0; i< numberOfFractions; i++){
		newDenominator = lcm;
		newNumerator = lcm * fractions[i].numerator/ fractions[i].denominator;
		
		reducedSortedListHtml += "<li id='"+i+"' label='"+fractions[i].label+"' class='ui-state-default'> `"+newNumerator+'/'+newDenominator+"` </li>";
		
	}
	$("#reducedSortedList").html(reducedSortedListHtml);
}

function validateSorting(){
	findLeastCommonMultipleInFractions();
	toggleDisableOnListAndButtons(true);
	checkCorrectPositions();
	fillSolution();
	fillSortedListHtml();
	fillReducedSortedListHtml();
	compileMathJaxCode();
};

function findLeastCommonMultipleInFractions(){
	lcm = 1;
	for( i=0; i<fractions.length; i++){
		lcm = fractions[i].denominator*lcm /greatestCommonDivisor(lcm, fractions[i].denominator);
	}
	//console.log("lcm "+lcm);
	return lcm;
}

function greatestCommonDivisor(a, b){// 3 and 5
	if(b < a) return greatestCommonDivisor(b,a);	
	//So a<=b
	if(b%a === 0) return a;
	else return greatestCommonDivisor(b%a, a);
}

function checkCorrectPositions(){
	var list = $("#fractionsList").find("li");
	var isCorrectList = true;
	fractions.sort(compareFraction);

	//console.log(list.length);
	i=0;
   	$(list).each(function () {
		//console.log("comparing: "+$(this).attr("label")+ " "+ fractions[i].label);
		if($(this).attr("label")!=fractions[i].label){
			$(this).addClass("wrong");
			isCorrectList = false;
		}
		else{
			$(this).addClass("correct");
		}
		i++;
    	});
	answerIfListIsCorrect(isCorrectList);
};

function answerIfListIsCorrect(isCorrectList){
	if(isCorrectList){
		$("#fractionsList").append("<i class='glyphicon glyphicon-ok'>Correto!</i>");
	}
	else $("#fractionsList").append("<i class='glyphicon glyphicon-remove'>Errado!</i>");
}

function fillSolution(){
	$("#solution").removeClass("hidden");
	$("#solution").html("<div> <strong> Solução:</strong> </br>A lista em ordem crescente é: <ul id='sortedList' class='horizontalList'></ul></div>"+
	"<div>O que pode ser constatado reduzindo todas as frações a um mesmo denominador comum, por exemplo, mmc = "+lcm+" :<ul id='reducedSortedList' class='horizontalList'></ul></div>");
}

function toggleDisableOnListAndButtons(bool){
	$("#fractionsList").sortable({disabled:bool});
	$("#fractionsList li").toggleClass("disabled",bool);
	$("#testSorting").attr("disabled",bool);
}


function cleanValidationsAndAnswerExplanations(){
	$("#solution").addClass("hidden");
	$("#solution").empty();
}

function generateNewGame(){
	cleanValidationsAndAnswerExplanations();
	decideGameLevel();
	fillFractionsListHtml();
	compileMathJaxCode();
	toggleDisableOnListAndButtons(false);
};

function compileMathJaxCode(){
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
