var NUMBER_OF_INTEGERS_EASY = 2*3;
var NUMBER_OF_INTEGERS_MEDIUM = 2*4;
var NUMBER_OF_INTEGERS_HARD = 2*5;

var MAX_NUMBER = 10;

var numberOfIntegers;
var integers;
var usedPairs;
var orderOfPairs;
var numberOfUsedPairs;
var maxIndexes;


var maxSum;

function generateInteger(){
	integer = Math.floor( Math.random() * MAX_NUMBER);
	isPositive = Math.floor( Math.random() * 2)===1?true:false;
	if(!isPositive) integer*=-1;
	return integer;
}

function decideGameLevel(){
	//console.log($('input[name=gameLevel]:checked').val());
	if($('input[name=gameLevel]:checked').val() === "easy") {
		numberOfIntegers = NUMBER_OF_INTEGERS_EASY;
	}
	else if($('input[name=gameLevel]:checked').val() === "medium") {
		numberOfIntegers = NUMBER_OF_INTEGERS_MEDIUM;
	}
	else if($('input[name=gameLevel]:checked').val() === "hard") {
		numberOfIntegers = NUMBER_OF_INTEGERS_HARD;
	}	
}

function generateIntegers(){
	$("#integers").empty();
	var integersHtml="";
	var newInteger;
	integers=[];
	usedPairs=[];
	maxIndexes=[];
	orderOfPairs=[];
	var maxNum;
	for(i=0; i< numberOfIntegers; i++){
		integer = generateInteger();
		if(i===0) maxNum=integer;
		else if(Math.abs(maxNum)<Math.abs(integer)) maxNum=integer;
		console.log(integer);
		integers.push(integer);
		usedPairs.push(-1);
		orderOfPairs.push(-1);
		maxIndexes.push(-1);
		integersHtml+="<li class='inline ui-state-default' value='"+integer+"'>"+integer+"</li>";
	}
	maxSum = (-1)*(numberOfIntegers/2)*maxNum*maxNum;//calculate the minimum value of maxSum
	console.log("maxSum "+maxSum);
	$("#integers").html(integersHtml);
}

function generateExpressionPlaceholders(){
	$("#expression").empty();
	var expressionHtml="";
	var partHtml;
	var newInteger;
	var ids="";
	for(i=0; i< numberOfIntegers/2; i++){
		partHtml="<ul id='p"+i+"' class='inline horizontalList connectedSortable placeholder'></ul>x";
		partHtml+="<ul id='p"+i+"_' class='inline horizontalList connectedSortable placeholder'></ul>";
		ids+="#p"+i+", #p"+i+"_";
		expressionHtml+=partHtml;
		if(i< numberOfIntegers/2 -1) {
			expressionHtml+=" + ";
			ids+=", ";
		}
	}
	expressionHtml+=" = <span id='result'>0</span>"
	$("#expression").html(expressionHtml);
	console.log("#integers"+ids );
	$( "#integers, "+ids ).sortable({
		distance: 5,
		tolerance: "pointer",
		forcePlaceholderSize: true,
		connectWith: ".connectedSortable",
		update: function(){calculateExpression();}
	}).disableSelection();

	onlyOneIntegerPerPlaceholder(ids);
}

function calculateExpression(){
	var list, list_;
	var result=0;
	var value, value_;
	for(i=0; i< numberOfIntegers/2; i++){
		list = $("#p"+i).find("li");
		list_ = $("#p"+i+"_").find("li");
		if(list.length===0 || list_.length===0){
			result+=0;
		}
		else{
			//list has at most one integer.
			$(list).each(function () {
				value = $(this).attr("value");
    			});
			//list_ has at most one integer.
			$(list_).each(function () {
				value_ = $(this).attr("value");
    			});
			result += value*value_;
		}
	}
   	$("#result").empty();
	$("#result").html(result);
}

function onlyOneIntegerPerPlaceholder(ids){
	$(ids).on("sortreceive", function(event, ui) {
    		var list = $(this);
		    if (list.children().length > 1) {
		   $(ui.sender).sortable('cancel');
		   }
	}); 
}

function getNextRandomNotUsedPair(){
	pair = Math.floor( Math.random() * (numberOfIntegers/2-numberOfUsedPairs));
	console.log("pair before"+pair);
	for(var i=0; i<numberOfUsedPairs; i++){
		if(usedPairs[pair]!=-1) pair++;
		else break;
	}
	usedPairs[pair]=pair;
	orderOfPairs[numberOfUsedPairs++]=pair;
	console.log("pair after"+pair);
	return pair;
}

function calculateGreedyAnswer(){//sorted, group in pairs : (1,2),(3,4)...(n-1,n)
	integers.sort(ascendingCompare);
	//printArray(integers);
	var count=0;
	$("#solutionExpression").empty();
	var solutionExpressionHtml="";
	var partHtml;
	var newInteger;
	var ids="";
	numberOfUsedPairs=0;
	result=0
	for(i=0; i< numberOfIntegers/2; i++){
		pair = getNextRandomNotUsedPair();
		partHtml="<ul id='s"+i+"' class='inline horizontalList'><li class='inline ui-state-default'>"+integers[2*pair]+"</li></ul>x";
		partHtml+="<ul id='s"+i+"_' class='inline horizontalList'><li class='ui-state-default'>"+integers[2*pair+1]+"</il></ul>";
		result+=integers[2*pair]*integers[2*pair+1];
		solutionExpressionHtml+=partHtml;
		if(i< numberOfIntegers/2 -1) {
			solutionExpressionHtml+=" + ";
		}
	}
	solutionExpressionHtml+=" = <span id='solutionResult'>"+result+"</span>";
	maxSum = result;
	$("#solutionExpression").html(solutionExpressionHtml);
}

function showAnswer(){
	$("#solution").removeClass("hidden");
	$("#showAnswer").attr('disabled', true);
	answerIfExpressionIsCorrect();
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

function answerIfExpressionIsCorrect(id, idx){
	if(parseInt($("#result").text()) === maxSum ){
		$("#result").after("<i class='spaced glyphicon glyphicon-ok green checks'>Correto!</i>");
	}
	else $("#result").after("<i class='spaced glyphicon glyphicon-remove red checks'>Errado!</i>");
}

function checkAnswer(){
	if(alreadyPositionedNewDigits()) showAnswer();
}


function cleanAnswer(){
	$("#solution").addClass("hidden");
	$("#showAnswer").attr('disabled', false);

	$(".checks").remove();
	
	$("#hint").empty();
	$("#hintButton").attr("disabled", false);
}
	
function setAMinimumWidthToBody(){
	maxWidth = getFullWidth("minorBordered");
	
	$("body").attr("style","min-width:"+maxWidth+"px");

}

function getFullWidth(id){
	//console.log("fullWidth "+id+" "+(parseInt($("#"+id).css("width"))+parseInt($("#"+id).css("padding-left"))+parseInt($("#"+id).css("padding-right"))+3*10));
	return (parseInt($("#"+id).css("width"))+parseInt($("#"+id).css("padding-left"))+parseInt($("#"+id).css("padding-right"))+3*10); //Can't rely on margins. put 3*10px
}

function tellMaximumExpressionValue(){
	var hintHtml = "<b>O maior valor da expressão é: <span class='green'>"+maxSum+"</span></b>"
	$("#hint").html(hintHtml);
	$("#hintButton").attr("disabled", true);
}

function generateNewGame(){
	decideGameLevel();
	//setAMinimumWidthToBody();
	//generateOriginalNumber();
	generateIntegers();
	generateExpressionPlaceholders();
	cleanAnswer();
	calculateGreedyAnswer();
};

