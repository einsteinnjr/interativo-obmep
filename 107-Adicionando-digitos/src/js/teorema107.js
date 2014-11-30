var NUMBER_OF_DIGITS_OF_ORIGINAL_NUMBER_EASY=4;
var NUMBER_OF_NEW_DIGITS_EASY=2;

var NUMBER_OF_DIGITS_OF_ORIGINAL_NUMBER_MEDIUM=8;
var NUMBER_OF_NEW_DIGITS_MEDIUM=4;

var NUMBER_OF_DIGITS_OF_ORIGINAL_NUMBER_HARD=12;
var NUMBER_OF_NEW_DIGITS_HARD=6;

var MAX_NUMBER = 10;

var numberOfDigitsOfOriginalNumber;
var numberOfNewDigits;
var minorNewDigits, majorNewDigits;
var originalNumber;
var minorNumber, majorNumber;
var auxArray;
var i, j, k, found;

function generateNewDigit(){
	digit = Math.floor( Math.random() * MAX_NUMBER);
	return digit;
}


function decideGameLevel(){
	//console.log($('input[name=gameLevel]:checked').val());
	if($('input[name=gameLevel]:checked').val() === "easy") {
		numberOfDigitsOfOriginalNumber = NUMBER_OF_DIGITS_OF_ORIGINAL_NUMBER_EASY;
		numberOfNewDigits = NUMBER_OF_NEW_DIGITS_EASY;
	}
	else if($('input[name=gameLevel]:checked').val() === "medium") {
		numberOfDigitsOfOriginalNumber = NUMBER_OF_DIGITS_OF_ORIGINAL_NUMBER_MEDIUM;
		numberOfNewDigits = NUMBER_OF_NEW_DIGITS_MEDIUM;
	}
	else if($('input[name=gameLevel]:checked').val() === "hard") {
		numberOfDigitsOfOriginalNumber = NUMBER_OF_DIGITS_OF_ORIGINAL_NUMBER_HARD;
		numberOfNewDigits = NUMBER_OF_NEW_DIGITS_HARD;
	}	
}


function generateOriginalNumber(){
	$("#minorNumber").empty();
	$("#majorNumber").empty();
	$("#originalNumber").empty();
	var minorNumberHtml="";
	var majorNumberHtml="";
	var originalNumberString = "";
	var newDigit;
	originalNumber=[];
	//console.log("originalNumber");
	for(i=0; i< numberOfDigitsOfOriginalNumber; i++){
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
		majorNumberHtml+="<li class='ui-state-disabled' value='"+newDigit+"'>"+newDigit+"</li>";
	}
	$("#minorNumber").html(minorNumberHtml);
	$("#majorNumber").html(majorNumberHtml);
	$("#originalNumber").html(originalNumberString);
}

function generateNewDigits(){
	$("#minorNewDigits").empty();
	$("#majorNewDigits").empty();
	var minorNewDigitsHtml="";
	var majorNewDigitsHtml="";
	var newDigit;
	minorNewDigits=[];
	majorNewDigits=[];
	//console.log("newDigits");
	for(i=0; i< numberOfNewDigits; i++){
		//none of new digits is zero.		
		do{
			newDigit = generateNewDigit();
		}
		while(newDigit===0); 
		//console.log(newDigit);
		minorNewDigits.push(newDigit);
		majorNewDigits.push(newDigit);
		minorNewDigitsHtml+="<li class='ui-state-default' value='"+newDigit+"'>"+newDigit+"</li>";
		majorNewDigitsHtml+="<li class='ui-state-default' value='"+newDigit+"'>"+newDigit+"</li>";
	}
	$("#minorNewDigits").html(minorNewDigitsHtml);
	$("#majorNewDigits").html(majorNewDigitsHtml);
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
	minorNewDigits.sort(ascendingCompare);
	//console.log("minorNewDigits");
	//printArray(minorNewDigits);
	minorNumber=[];
	appendArray(originalNumber, minorNumber, 0);
	var i,j;
	for(i=0; i<minorNewDigits.length; i++){
		auxArray=[];
		found=false;
		for(j=0; j<minorNumber.length; j++){
			if(minorNewDigits[i]>=minorNumber[j]) {//always push smaller
				auxArray.push(minorNumber[j]);
			}
			else{
				break; //moment to add minorNewDigits[i] 
			}
		}
		//moment to add minorNewDigits[i]: or minorNewDigits[i] < minorNumber[j] or minorNumber ended.
		auxArray.push(minorNewDigits[i]);
		appendArray(minorNumber, auxArray, j);
		minorNumber=[];
		appendArray(auxArray, minorNumber, 0);
		//console.log("minorNumber "+i);
		//printArray(minorNumber);
	}	
}

function calculateMajorNumber(){	
	majorNewDigits.sort(descendingCompare);
	//console.log("majorNewDigits");
	//printArray(majorNewDigits);
	majorNumber=[];
	appendArray(originalNumber, majorNumber, 0);
	var i,j;
	for(i=0; i<majorNewDigits.length; i++){
		auxArray=[];
		found=false;
		for(j=0; j<majorNumber.length; j++){
			if(majorNewDigits[i]<=majorNumber[j]) {//always push larger
				auxArray.push(majorNumber[j]);
			}
			else{
				break; //moment to add majorNewDigits[i] 
			}
		}
		//moment to add majorNewDigits[i]: or majorNewDigits[i] > majorNumber[j] or majorNumber ended.
		auxArray.push(majorNewDigits[i]);
		appendArray(majorNumber, auxArray, j);
		majorNumber=[];
		appendArray(auxArray, majorNumber, 0);
		//console.log("majorNumber "+i);
		//printArray(majorNumber);
	}	
}

function answerIfListIsCorrect(id, idx){
	if(idx === -1){
		$("#"+id).after("<i class='glyphicon glyphicon-ok green checks'>Correto!</i>");
	}
	else $("#"+id).after("<i class='glyphicon glyphicon-remove red checks'>Errado!</i>");
}

function alreadyPositionedNewDigits(){
	var minorList = $("#minorNewDigits").find("li");
	var majorList = $("#majorNewDigits").find("li");
	//console.log("minorList "+minorList.length);
	//console.log("majorList "+majorList.length);
	bodyMsg="";
	showModal=false;	
	if(minorList.length>0){
		bodyMsg+="-Há "+minorList.length+" novo(s) dígito(s) que não foram usados no Menor Número.<br/>";
		showModal=true;
	}
	if(majorList.length>0){
		bodyMsg+="-Há "+majorList.length+" novo(s) dígito(s) que não foram usados no Maior Número.<br/>";
		showModal=true;
	}
	if(showModal){
		$(".modal-title").html("Atenção:");
		$(".modal-body").html(bodyMsg+"Você pode continuar a jogar ou mostrar a resposta assim mesmo.");
		$("#modalInfo").modal();
		return false;
	}
	return true;
}

function checkMinorNumberAnswer(){
	var minorNumberList = $("#minorNumber").find("li");
	var isCorrectList = true;

	//console.log(list.length);
	var i=0;
	idx=-1;
   	$(minorNumberList).each(function () {
		//console.log("comparing: "+$(this).attr("value")+ " "+ minorNumber[i]);
		if($(this).attr("value")!=minorNumber[i]){
			if(idx===-1) idx=i;	
		}
		i++;
	});
	var k=0;
	minorNumberSolutionHtml="";
	toColor=true;
	for(i=0; i<minorNumber.length; i++){

		minorNumberSolutionHtml+="<li class='";
		if( k === originalNumber.length || //end of array
			originalNumber[k]!=minorNumber[i]) minorNumberSolutionHtml+="bordered";//used a new digit.
		else k++;//used a originalNumber. Walk on it.

		if(i===idx) {
			minorNumberSolutionHtml+=" bg-red";
			toColor=false;
		}	
		else if(toColor) minorNumberSolutionHtml+=" bg-green";

		minorNumberSolutionHtml+="'>"+minorNumber[i]+"</li>";
    	};
	//console.log("minorNumberSolution "+minorNumberSolutionHtml);
	$("#minorNumberSolution").empty();
	$("#minorNumberSolution").html(minorNumberSolutionHtml);
	answerIfListIsCorrect("minorNumber", idx);
}

function checkMajorNumberAnswer(){
	var majorNumberList = $("#majorNumber").find("li");
	var isCorrectList = true;

	//console.log(list.length);
	var i=0;
	idx=-1;
   	$(majorNumberList).each(function () {
		//console.log("comparing: "+$(this).attr("value")+ " "+ majorNumber[i]);
		if($(this).attr("value")!=majorNumber[i]){
			if(idx===-1) idx=i;	
		}
		i++;
	});
	var k=0;
	majorNumberSolutionHtml="";
	toColor=true;
	for(i=0; i<majorNumber.length; i++){

		majorNumberSolutionHtml+="<li class='";
		if( k === originalNumber.length || //end of array
			originalNumber[k]!=majorNumber[i]) majorNumberSolutionHtml+="bordered";//used a new digit.
		else k++;//used a originalNumber. Walk on it.

		if(i===idx) {
			majorNumberSolutionHtml+=" bg-red";
			toColor=false;
		}	
		else if(toColor) majorNumberSolutionHtml+=" bg-green";

		majorNumberSolutionHtml+="'>"+majorNumber[i]+"</li>";
    	};
	//console.log("majorNumberSolution "+majorNumberSolutionHtml);
	$("#majorNumberSolution").empty();
	$("#majorNumberSolution").html(majorNumberSolutionHtml);
	answerIfListIsCorrect("majorNumber", idx);
}

function checkAnswer(){
	if(alreadyPositionedNewDigits()) showAnswer();
}

function showAnswer(){
	calculateMinorNumber();
	calculateMajorNumber();
	$("#solution").removeClass("hidden");
	$("#solution").html("<div><b>Resposta:</b></div>"+
			"<div>"+
			"<div class='inline'><b><span class='green'>Menor</span> Número:</b></div>"+
			"<div><ul id='minorNumberSolution' class='horizontalList spaced'></ul></div>"+
			"</div>"+
			"<div>"+
			"<div class='inline'><b><span class='green'>Maior</span> Número:</b></div>"+
			"<div><ul id='majorNumberSolution' class='horizontalList spaced'></ul></div>"+
			"</div>");
	$("#showAnswer").attr('disabled', true);
	checkMinorNumberAnswer();
	checkMajorNumberAnswer();
}

function cleanAnswer(){
	$(".checks").remove();
	$("#solution").addClass("hidden");
	$("#showAnswer").attr('disabled', false);
}

function setAMinimumWidthToBody(){
	maxWidth = getFullWidth("minorBordered");
	
	$("body").attr("style","min-width:"+maxWidth+"px");

}

function getFullWidth(id){
	//console.log("fullWidth "+id+" "+(parseInt($("#"+id).css("width"))+parseInt($("#"+id).css("padding-left"))+parseInt($("#"+id).css("padding-right"))+3*10));
	return (parseInt($("#"+id).css("width"))+parseInt($("#"+id).css("padding-left"))+parseInt($("#"+id).css("padding-right"))+3*10); //Can't rely on margins. put 3*10px
}

function generateNewGame(){
	cleanAnswer();
	decideGameLevel();
	setAMinimumWidthToBody();
	generateOriginalNumber();
	generateNewDigits();
	
};

