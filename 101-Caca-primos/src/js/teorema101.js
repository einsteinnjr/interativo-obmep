//http://www.miniwebtool.com/list-of-prime-numbers/?to=10000
//25 primes less than 100
//168 primes less than 1000
var primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];

//all numbers not primes until Max_number
var others = [];

var MAX_NUMBER_EASY = 100;
var MAX_NUMBER_HARD = 1000;
var NUMBER_OF_PRIMES_LESS_THAN_100 = 25;
var NUMBER_OF_PRIMES_LESS_THAN_1000 = 168;

var sideLength = 3;
var arrayOfPrimesFound = [];
var numberOfPrimes=0;
var numberOfErrors=0;
var primesLength = NUMBER_OF_PRIMES_LESS_THAN_100;
var othersLength = MAX_NUMBER_EASY - primesLength;


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
 
        if (currentElement < searchElement) {
            minIndex = currentIndex + 1;
        }
        else if (currentElement > searchElement) {
            maxIndex = currentIndex - 1;
        }
        else {
            return currentIndex;
        }
    }
 
    return -1;
}


// for sort of an array objs.
// just call as objs.sort(compare);
function compare(a,b) {
  if (a < b)
     return -1;
  if (a > b)
    return 1;
  return 0;
}

function generateArrayOfRandomNumbers( quantityOfPositions, maxValue){
	var hashOfRandoms = {};//auxiliary Structure
	var arrayOfPrimeRandomPositions = [];
	while(arrayOfPrimeRandomPositions.length < quantityOfPositions){
		num = Math.floor( Math.random() * maxValue);
		if(!hashOfRandoms.hasOwnProperty(num)){
			hashOfRandoms[num] = num;
			arrayOfPrimeRandomPositions.push(parseInt(num));
		}	
	}
	/*for(var i=0; i<arrayOfPrimeRandomPositions.length; i++){
		console.log(arrayOfPrimeRandomPositions[i]);
	}*/

	//ascending sort prime random positions.
	arrayOfPrimeRandomPositions.sort(compare);
	return arrayOfPrimeRandomPositions;
}

function generateNewTableHtml(n){
	var tableHtml="";
	var idx=0;
	var k=0;
	var num;

	arrayOfPrimesFound = [];
	numberOfPrimes=n+Math.floor(Math.random()*n);//between n and 2n
	var arrayOfPrimeRandomPositions = generateArrayOfRandomNumbers(numberOfPrimes, n*n);

	for(var i=0; i<n; i++){
		tableHtml+="<tr>";
		for(var j=0; j<n; j++){
			if(k<arrayOfPrimeRandomPositions.length && idx === arrayOfPrimeRandomPositions[k] ){
				num = primes[Math.floor(Math.random()*primesLength)];
				k++;
			}
			else num = others[Math.floor(Math.random()*othersLength)];
			
			tableHtml+="<td id='elem_"+idx+"' value='"+num+"' ><i class='glyphicon glyphicon-home'></i>"+num+"</td>";
			idx++;
		}
		tableHtml+="</tr></br>"
	}	
	return tableHtml;
}

function generateOthers(){
	var i=0, j=1;
	while(i<primes.length){
		if(j<primes[i]){ //if j isnt on array primes, add on others
			others.push(j);
		}
		else{//if j arrives at value primes[i], we can go to the next prime
			i++;		
		}
		j++;//go to the next number
	}
	while(j<=MAX_NUMBER_HARD){// fill array others until MAX_NUMBER_HARD
		others.push(j);		
		j++;
	}
}

function decideGameLevel(myRadio){
	var maxNumber;
	if(myRadio.value === "easy") {//primes less than 100
		maxNumber = MAX_NUMBER_EASY;		
		primesLength = NUMBER_OF_PRIMES_LESS_THAN_100;
		othersLength = maxNumber - primesLength;
	}
	else if(myRadio.value === "hard") {//primes less than 1000
		maxNumber = MAX_NUMBER_HARD;		
		primesLength = NUMBER_OF_PRIMES_LESS_THAN_1000;
		othersLength = maxNumber - primesLength;
	}
}

function decideSideLength(myRadio){
	if(myRadio.value==="small") sideLength=3;
	else if(myRadio.value==="medium") sideLength=5;
	else if(myRadio.value==="large") sideLength=7;
}

function generateNewGame(){
	$("#gameTable").html(generateNewTableHtml(sideLength));
	mouseEventsOnTable();
	clearPrimesFoundsAndInfo();
}

function printPrimesFound(){
	var listOfPrimesFound="";
	$("#numberOfPrimesFound").empty();
	$("#primesFound").remove();//it will be recreated;
	for(i=0; i< arrayOfPrimesFound.length; i++){
		listOfPrimesFound+=" "+arrayOfPrimesFound[i];
		if(i!=arrayOfPrimesFound.length-1) listOfPrimesFound+=",";
	}
	$("#numberOfPrimesFound").html(arrayOfPrimesFound.length);
	$("#lPrimesFound").append("<input id='primesFound' type='text' class='form-control' value ='"+listOfPrimesFound+"' size='"+listOfPrimesFound.length+"' disabled></input>");
}

function clearPrimesFoundsAndInfo(){
	$("#numberOfPrimesFound").empty();
	$("#numberOfPrimesFound").html("0");
	$("#primesFound").remove();

	$("#numberOfErrors").empty();
	$("#numberOfErrors").html("0");
	numberOfErrors=0;
	
	$("#hint").empty();	

	$("#hintButton").attr("disabled", false);	
}

function tellNumberOfPrimes(){
	var hintHtml = "<b>Total de primos é: <span class='correct'>"+numberOfPrimes+"</span></b>"
	$("#hint").html(hintHtml);
	$("#hintButton").attr("disabled", true);
}

function mouseEventsOnTable(){
	//change color of the cell	
	$("td").mouseenter(function(){
		if(!$(this).hasClass("already-clicked")) {
			$(this).addClass("mouse-over");
		}
	});
	//turn back original color of the cell
	$("td").mouseout(function(){
		if($(this).hasClass("mouse-over")) {
			$(this).removeClass("mouse-over");
		}
	});
	//findout if number is a prime
	$("td").click(function(){
		if(!$(this).hasClass("already-clicked")) {		
			//it is on primes list.
			if(binaryIndexOf(primes, $(this).attr("value"))!== -1){
				$(this).addClass("correct-click");
				$i = $(this).find("i");
				$i.removeClass("glyphicon-home");//remove default. that reserved space.
                                $i.addClass("glyphicon-ok")
				arrayOfPrimesFound.push(parseInt($(this).attr("value")));
				arrayOfPrimesFound.sort(compare);
				printPrimesFound();
				if(numberOfPrimes === arrayOfPrimesFound.length){
					
					showModalGameOver();	
				}		
			}
			else{//it is not a special number.
				$(this).addClass("wrong-click");
				$i = $(this).find("i");
				$i.removeClass("glyphicon-home");
                                $i.addClass("glyphicon-remove");
				numberOfErrors++;
				$("#numberOfErrors").empty();
				$("#numberOfErrors").html(numberOfErrors);
			}
			//mark cell as clicked
			$(this).addClass("already-clicked");
		}
	});	
}

function closeModalGameOverAndNewGame(){
	$('#modalGameOver').modal('hide');
	generateNewGame();
}


function showModalGameOver(){
	$("#modalNumberOfPrimes").html(numberOfPrimes);
	$('#modalGameOver').modal('show');
}

function init(){
	//we need to create array Others before anything
	generateOthers();
	generateNewGame();
};

