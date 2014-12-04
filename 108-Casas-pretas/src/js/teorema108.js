
var SIDE_LENGTH_SMALL = 3;
var SIDE_LENGTH_MEDIUM = 4;
var SIDE_LENGTH_LARGE = 5;

var sideLength=3;
var blackSquares=[], neighbors=[], userBlackSquares=[], auxArray1, auxArray2, auxArray3;

function decideSideLength(myRadio){
	if(myRadio.value==="small") sideLength = SIDE_LENGTH_SMALL;
	else if(myRadio.value==="medium") sideLength = SIDE_LENGTH_MEDIUM;
	else if(myRadio.value==="large") sideLength = SIDE_LENGTH_LARGE;
}

function generateTables(){
	var i,j;
	for(i=0; i<sideLength; i++){
		auxArray1=[];
		auxArray2=[];
		auxArray3=[];
		for(j=0; j<sideLength; j++){
			auxArray1.push(Math.floor(Math.random()*2));//1 means black.
			auxArray2.push(0);
			auxArray3.push(0);
		}
		blackSquares.push(auxArray1);
		neighbors.push(auxArray2);
		userBlackSquares.push(auxArray3);
	}
	fillNeighborsArray();
};

function countBlackSquaresNeighbors(i, j){
	var count=0;
	if(i > 0){//can go left
		if(j > 0){//can go up
			if(blackSquares[i-1][j-1] === 1) count++;//up-left
		}
		if(blackSquares[i-1][j] === 1) count++;//left
		if(j < sideLength-1){//can go down
			if(blackSquares[i-1][j+1] === 1) count++;//down-left
		}
	}
	if(j > 0){//can go up
		if(blackSquares[i][j-1] === 1) count++;//up
	}
	if(j < sideLength-1){//can go down
		if(blackSquares[i][j+1] === 1) count++;//down
	}
	if(i < sideLength-1){//can go right
		if(j > 0){//can go up
			if(blackSquares[i+1][j-1] === 1) count++;//up-right
		}
		if(blackSquares[i+1][j] === 1) count++;//right
		if(j < sideLength-1){//can go down
			if(blackSquares[i+1][j+1] === 1) count++;//down-right
		}
	}
	return count;
};

function fillNeighborsArray(){
	var i,j;
	for(j=0; j<sideLength; j++){//line
		for(i=0; i<sideLength; i++){//column
			neighbors[i][j] = countBlackSquaresNeighbors(i, j);
		}
	}
}

function printTable(array){
	var i,j, aux;
	for(j=0; j<sideLength; j++){//line
		aux ="";
		for(i=0; i<sideLength; i++){//column
			aux += array[i][j]+" ";
		}
		//console.log(aux);
	}
}

function fillArrayTableHtml(array, id, isClickable, needsColoring){
	var i, j, aux, html, clickableClass, toBeColored;
	html="";
	clickableClass="";
	if(isClickable) clickableClass = "clickable ";
	for(j=0; j<sideLength; j++){//line
		html+="<tr>";
		for(i=0; i<sideLength; i++){//column
			toBeColored = "";
			if(needsColoring && 
				blackSquares[i][j]===1) toBeColored = "black ";
			html+="<td id='"+id[0]+"_"+i+"_"+j+"' class='"+clickableClass+toBeColored+"' value="+array[i][j]+" ><i class='glyphicon glyphicon-ok hidden'></i> "+array[i][j]+"</td>";			
		}
		html+="</tr>";
	}
	$("#"+id+"Table").html(html);
}

function updateSquare(id, delta){
	//console.log(id);
	value = parseInt($(id).attr("value")); 
	$(id).attr("value",(value+delta));
	$(id).html((value+delta));
}

function checkIfNumberIsCorrect(_id){
	$i = $("#u"+_id).find("i");
	if($("#n"+_id).attr("value") === $("#u"+_id).attr("value")){//correct value on square.
		$("#n"+_id).addClass("bg-green");
		$i = $("#n"+_id).find("i");
		$i.removeClass("hidden");
	}
	else{
		$("#n"+_id).removeClass("bg-green");
		$i = $("#n"+_id).find("i");
		$i.addClass("hidden");
	}
	
}

function checkInitiallyWholeTableForCorrectNumbers(){
	var i,j;
	for(j=0; j<sideLength; j++){//line
		for(i=0; i<sideLength; i++){//column
			_id = "_"+i+"_"+j;
			checkIfNumberIsCorrect(_id);
		}
	}
}

function updateUserBlackSquaresNeighbors(i, j){
	var value=0, delta=0, _id;
	_id="_"+i+"_"+j;

	if($("#u"+_id).hasClass("black")) delta=-1;
	else delta=1;

	$("#u"+_id).toggleClass("black");

	if(i > 0){//can go left
		if(j > 0){//can go up
			_id= "_"+(i-1)+"_"+(j-1); //up-left
			updateSquare("#u"+_id, delta);
			checkIfNumberIsCorrect(_id);
		}
		{
			_id= "_"+(i-1)+"_"+(j); //left
			updateSquare("#u"+_id, delta);
			checkIfNumberIsCorrect(_id);
		}
		if(j < sideLength-1){//can go down
			_id= "_"+(i-1)+"_"+(j+1); //down-left
			updateSquare("#u"+_id, delta);
			checkIfNumberIsCorrect(_id);
		}
	}

	if(j > 0){//can go up
		_id= "_"+(i)+"_"+(j-1); //up
		updateSquare("#u"+_id, delta);
		checkIfNumberIsCorrect(_id);
	}

	if(j < sideLength-1){//can go down
		_id= "_"+(i)+"_"+(j+1); //down
		updateSquare("#u"+_id, delta);
		checkIfNumberIsCorrect(_id);
	}

	if(i < sideLength-1){//can go right
		if(j > 0){//can go up
			_id= "_"+(i+1)+"_"+(j-1); //up-right
			updateSquare("#u"+_id, delta);
			checkIfNumberIsCorrect(_id);
		}
		{
			_id= "_"+(i+1)+"_"+(j); //right
			updateSquare("#u"+_id, delta);
			checkIfNumberIsCorrect(_id);
		}
		if(j < sideLength-1){//can go down
			_id= "_"+(i+1)+"_"+(j+1); //down-right
			updateSquare("#u"+_id, delta);
			checkIfNumberIsCorrect(_id);
		}
	}
};

function clickableSquareSetup(){
	$(".clickable").click(function(){
		coords = $(this).attr("id").split("_");
		updateUserBlackSquaresNeighbors(parseInt(coords[1]), parseInt(coords[2]));
	});
}

function showAnswer(){
	fillArrayTableHtml(neighbors,"solution", false, true);//neighbors has the whole data.
	$("#solution").removeClass("hidden");
	$("#showAnswer").attr("disabled", true);
}

function resetState(){
	$("#neighborsTable").empty();
	$("#userBlackSquaresTable").empty();
	$("#solutionTable").empty();
	blackSquares=[]; 
	neighbors=[]; 
	userBlackSquares=[];
	$("#solution").addClass("hidden");
	$("#showAnswer").attr("disabled", false);
}

function setAMinimumWidthToBody(){
	maxWidth = getFullWidth("neighborsTable")+getFullWidth("userBlackSquaresTable");
	//console.log("maximum "+maxWidth);
	$("body").attr("style","min-width:"+maxWidth+"px");
}

function getFullWidth(id){
	//console.log("fullWidth "+id+" "+(parseInt($("#"+id).css("width"))+parseInt($("#"+id).css("padding-left"))+parseInt($("#"+id).css("padding-right"))+3*10));
	return (parseInt($("#"+id).css("width"))+parseInt($("#"+id).css("padding-left"))+parseInt($("#"+id).css("padding-right"))+3*10); //Can't rely on margins. put 3*10px
}

function generateNewGame(){
	resetState();	
	generateTables();
	fillArrayTableHtml(neighbors,"neighbors", false, false);
	fillArrayTableHtml(userBlackSquares,"userBlackSquares", true, false);
	clickableSquareSetup();
	setAMinimumWidthToBody();
	checkInitiallyWholeTableForCorrectNumbers();
};

