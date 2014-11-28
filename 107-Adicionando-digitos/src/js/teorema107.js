var NUMBER_OF_DIGITS_OF_ORIGINAL_NUMBER=6;
var NUMBER_OF_NEW_DIGITS=3;
var MAX_NUMBER = 10;

var numberOfDigitsOfOriginalNumber;
var numberOfNewDigits;
var newDigits;
var originalNumber;
var minorNumber;
var auxArray;
var i, j, k, found;

function generateNewDigit(){
	digit = Math.floor( Math.random() * MAX_NUMBER);
	return digit;
}

function generateOriginalNumber(){
	$("#minorNumber").empty();
	$("#originalNumber").empty();
	var minorNumberHtml="";
	var originalNumberString = "";
	var newDigit;
	originalNumber=[];
	//console.log("originalNumber");
	for(i=0; i< NUMBER_OF_DIGITS_OF_ORIGINAL_NUMBER; i++){
		newDigit = generateNewDigit();
		if(i===0) {//1st digit is nonzero;
			while(newDigit===0) {
				newDigit = generateNewDigit();
			}
		}
		//console.log(newDigit);
		originalNumber.push(newDigit);
		originalNumberString+=newDigit;
		minorNumberHtml+="<li class='ui-state-disabled' value='"+newDigit+"'>"+newDigit+"</li>";
	}
	$("#minorNumber").html(minorNumberHtml);
	$("#originalNumber").html(originalNumberString);
}

function generateNewDigits(){
	$("#newDigits").empty();
	var newDigitsHtml="";
	var newDigit;
	newDigits=[];
	//console.log("newDigits");
	for(i=0; i< NUMBER_OF_NEW_DIGITS; i++){
		//none of new digits is zero.		
		do{
			newDigit = generateNewDigit();
		}
		while(newDigit===0); 
		//console.log(newDigit);
		newDigits.push(newDigit);
		newDigitsHtml+="<li class='ui-state-default' value='"+newDigit+"'>"+newDigit+"</li>";
	}
	$("#newDigits").html(newDigitsHtml);
}

function appendArray(origin, destination, index){
	for(var k=index; k<origin.length; k++){
		destination.push(origin[k]);
	}
}

function printArray(array){
	for(var k=0; k<array.length; k++){
		console.log(array[k]);
	}
}

function ascendingCompare(a,b){
	if(a<b) return -1;
	else if(b<a) return 1;
	else return 0;
}

function descendingCompare(a,b){
	if(a<b) return 1;
	else if(b<a) return -1;
	else return 0;
}

function calculateMinorNumber(){	
	newDigits.sort(ascendingCompare);
	//console.log("newDigits");
	//printArray(newDigits);
	minorNumber=[];
	appendArray(originalNumber, minorNumber, 0);
	
	for(i=0; i<newDigits.length; i++){
		auxArray=[];
		found=false;
		for(j=0; j<minorNumber.length; j++){
			if(newDigits[i]>=minorNumber[j]) {//always push smaller
				auxArray.push(minorNumber[j]);
			}
			else{
				break; //moment to add newDigits[i] 
			}
		}
		//moment to add newDigits[i]: or newDigits[i] < minorNumber[j] or minorNumber ended.
		auxArray.push(newDigits[i]);
		appendArray(minorNumber, auxArray, j);
		minorNumber=[];
		appendArray(auxArray, minorNumber, 0);
		//console.log("minorNumber "+i);
		//printArray(minorNumber);
	}	
}

function answerIfListIsCorrect(id, isCorrectList){
	if(isCorrectList){
		$("#"+id).after("<i class='glyphicon glyphicon-ok checks'>Correto!</i>");
	}
	else $("#"+id).after("<i class='glyphicon glyphicon-remove checks'>Errado!</i>");
}

function alreadyPositionedNewDigits(){
	var list = $("#newDigits").find("li");
	console.log(list.length);	
	if(list.length>0){
		$(".modal-title").html("Atenção:");
		$("#yesButton").addClass("hidden");
		$("#noButton").html("Ok");
		$(".modal-body").html("Há "+list.length+" novo(s) dígito(s) que não foram usados no Menor Número. Use-os, para poder ver a resposta.");
		$("#modalInfo").modal();
		return false;
	}
	return true;
}


function checkMinorNumberAnswer(){
	var list = $("#minorNumber").find("li");
	var isCorrectList = true;

	//console.log(list.length);
	var i=0;
	var k=0;
	minorNumberSolutionHtml="";
   	$(list).each(function () {
		console.log("comparing: "+$(this).attr("value")+ " "+ minorNumber[i]);
		minorNumberSolutionHtml+="<li class='";
		if(originalNumber[k]!=minorNumber[i]) minorNumberSolutionHtml+="bordered";//used a new digit.
		else k++;//used a originalNumber. Walk on it.

		if($(this).attr("value")!=minorNumber[i]){
			if(isCorrectList) minorNumberSolutionHtml+=" wrong";
			isCorrectList=false;	
		}
		else{
			if(isCorrectList) minorNumberSolutionHtml+=" correct";
		}
		minorNumberSolutionHtml+="'>"+minorNumber[i]+"</li>";
		i++;
    	});
	console.log("minorNumberSolution "+minorNumberSolutionHtml);
	$("#minorNumberSolution").empty();
	$("#minorNumberSolution").html(minorNumberSolutionHtml);
	answerIfListIsCorrect("minorNumber", isCorrectList);
}

function showAnswer(){
	if(alreadyPositionedNewDigits()){
		calculateMinorNumber();
		$("#solution").removeClass("hidden");
		$("#solution").html("<div><b>Resposta:</b></div>"+
				"<div>"+
				"<div class='inline'><b>Menor Número:</b></div>"+
				"<ul id='minorNumberSolution' class='inline horizontalList spaced'></ul>");
		$("#showAnswer").attr('disabled', true);
		checkMinorNumberAnswer();
	}
}

function cleanAnswer(){
	$(".checks").remove();
	$("#solution").addClass("hidden");
	$("#showAnswer").attr('disabled', false);
}

function generateNewGame(){
	cleanAnswer();
	generateOriginalNumber();
	generateNewDigits();
	
};

