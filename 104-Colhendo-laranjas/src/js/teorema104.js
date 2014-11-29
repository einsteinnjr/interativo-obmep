
//Constants
var NUMBER_OF_LINES_EASY = 5;
var INITIAL_NUMBER_EASY = 1;
var FINAL_NUMBER_EASY = 10;

var NUMBER_OF_LINES_MEDIUM = 9;
var INITIAL_NUMBER_MEDIUM = 1;
var FINAL_NUMBER_MEDIUM = 10;

var NUMBER_OF_LINES_HARD = 6;
var INITIAL_NUMBER_HARD = 10;
var FINAL_NUMBER_HARD = 100;


var numberOfLines;
var initialNumber;
var finalNumber;
var matrix;
var i, j, k, orchard, lineNumber; //lineNumber is 0-indexed
var maxSumNeighborMatrix;
var maxSumIndexesMatrix;
var log_;
var maxPathSum;
var actualSum;
var left, right;

function decideGameLevel(){
	//console.log($('input[name=gameLevel]:checked').val());
	if($('input[name=gameLevel]:checked').val() === "easy") {
		numberOfLines = NUMBER_OF_LINES_EASY;
		initialNumber = INITIAL_NUMBER_EASY;
		finalNumber = FINAL_NUMBER_EASY;
	}
	else if($('input[name=gameLevel]:checked').val() === "medium") {
		numberOfLines = NUMBER_OF_LINES_MEDIUM;
		initialNumber = INITIAL_NUMBER_MEDIUM;
		finalNumber = FINAL_NUMBER_MEDIUM;
	}
	else if($('input[name=gameLevel]:checked').val() === "hard") {
		numberOfLines = NUMBER_OF_LINES_HARD;
		initialNumber = INITIAL_NUMBER_HARD;
		finalNumber = FINAL_NUMBER_HARD;
	}	
}

function createOrchard(){
	matrix=new Array();
	for(i=0; i<numberOfLines; i++){
		matrix[i]=new Array();
		for(j=0; j<numberOfLines; j++){
			matrix[i][j]=initialNumber+Math.floor(Math.random()*(finalNumber-initialNumber));
		}
	}
};

function printOrchardHtml(){
	orchard="";
	for(lineNumber=0; lineNumber < numberOfLines; lineNumber++){	
		for(i=0; i <= lineNumber; i++){
			j = lineNumber-i;
			orchard+="<span id='"+i+"_"+j+"' class='num'>"+matrix[i][j]+"</span><span class='tab'/>";	
		}
		orchard+="</br>";
	}
	return orchard;
};

function generateOrchard(){
	createOrchard();
	$("#orchard").html(printOrchardHtml());	
}

function actionsWhenClickingANumber(){
	$(".num").click(function(){
		unselectAllFromItsLine(this);
		toggleGrayToNotClicked(this);
		toggleItsStatus(this);
		updateIdActualSum();
	});
}

function unselectAllFromItsLine(it){
	var id = $(it).attr('id');
	var idx = String(id).split('_');
	lineNumber = parseInt(idx[0])+parseInt(idx[1]);
	for(i=0; i<=lineNumber; i++){
		j=lineNumber-i;
		if(i!==parseInt(idx[0]) &&
			$('#'+i+'_'+j).hasClass('selected')){//if it already has a selected, change to our actual 
				$('#'+i+'_'+j).toggleClass('selected');
				//decrement its value from sum.
				actualSum-=parseInt($('#'+i+'_'+j).text());
		}
			
	}
}

function toggleGrayToNotClicked(it){
	var gray;
	if($(it).hasClass("selected")) setToGray = false;//if already selected, do not set others to gray.
	else setToGray = true;// if not selected, set others to gray.

	var id = $(it).attr('id');
	var idx = String(id).split('_');
	lineNumber = parseInt(idx[0])+parseInt(idx[1]);
	
	for(i=0; i<=lineNumber; i++){
		j=lineNumber-i;
		if(i!==parseInt(idx[0])){
			$('#'+i+'_'+j).toggleClass('gray', setToGray);
		}
			
	}
}

function toggleItsStatus(it){
	if($(it).hasClass('selected')){//if already selected, decrement
		actualSum-=parseInt($(it).text());
	}
	else{//if not selected, increment
		actualSum+=parseInt($(it).text());
	}
	$(it).toggleClass('gray', false);
	$(it).toggleClass("selected");
}


function updateIdActualSum(){
	$('#actualSum').empty();
	$('#actualSum').html(actualSum);
}

function showDMaxPathSum(){
	$('#actualSum').after("<div id='dMaxPathSum' class='solution'><label><b>Soma Máxima: <span class='actual'>"+maxPathSum+"</span> </b></label></div>");
}

function removeDMaxPathSum(){
	$('#dMaxPathSum').remove();
}

function calculateMaxPath(){
	maxSumNeighborMatrix = new Array();
	maxSumIndexesMatrix = new Array();
	lineNumber = numberOfLines-1;
	
	//init Sum Matrix
	for(i=0; i<numberOfLines; i++){
		maxSumNeighborMatrix[i] = new Array();
		maxSumIndexesMatrix[i] = new Array();
	}
	//log_="";
	//init last line sum;
	for(i=0; i<numberOfLines; i++){
		maxSumNeighborMatrix[lineNumber][i]=matrix[i][lineNumber-i];
		//log_+="lineNumber "+lineNumber+" i "+i+" "+maxSumNeighborMatrix[lineNumber][i]+" # ";
	}
	//console.log("init "+log_);
	
	while( lineNumber > 0 ){
		//log_="";
		for(i=0; i<lineNumber; i++){
			if(matrix[i][lineNumber-1-i]+maxSumNeighborMatrix[lineNumber][i] > matrix[i][lineNumber-1-i]+maxSumNeighborMatrix[lineNumber][i+1]){
				maxSumNeighborMatrix[lineNumber-1][i] = matrix[i][lineNumber-1-i]+maxSumNeighborMatrix[lineNumber][i];
				maxSumIndexesMatrix[lineNumber-1][i] = i;
				//log_+="sum "+maxSumNeighborMatrix[lineNumber-1][i]+" idx "+maxSumIndexesMatrix[lineNumber-1][i]+" @ ";
			}
			else {
				maxSumNeighborMatrix[lineNumber-1][i] = matrix[i][lineNumber-1-i]+maxSumNeighborMatrix[lineNumber][i+1];
				maxSumIndexesMatrix[lineNumber-1][i] = i+1;
				//log_+="sum "+maxSumNeighborMatrix[lineNumber-1][i]+" idx "+maxSumIndexesMatrix[lineNumber-1][i]+" @ ";
			}
		}
		//console.log(log_);
		lineNumber--;			
	}
	maxPathSum=maxSumNeighborMatrix[0][0];
	//console.log("MaxSum "+maxPathSum);
}

function showMaxPath(){
	lineNumber=0;	
	i=0;
	j=lineNumber-i;
	while(lineNumber < numberOfLines){
		$('#'+i+'_'+j).addClass('solution');
		i = maxSumIndexesMatrix[lineNumber][i];
		lineNumber++;
		j= lineNumber-i;		
	}
	setDisabledStatusToPathButtons(true);
	showDMaxPathSum();
}

function fillAndShowModal(title, body){
		$(".modal-title").html(title);
		$(".modal-body").html(body);
		$("#modalInfo").modal('show');
}

function validateIfItIsMaxPath(){
	//console.log('actualSum '+actualSum+' maxPathSum '+maxPathSum);
	if(!validateExactOnePerLine()){
		fillAndShowModal("Atenção:",
				"<p><b>O caminho não é válido. Não existe número escolhido na linha "+(lineNumber+1)+".</b></p>");//for the user, lineNumber must be 1-indexed.
	}
	else if(!validateIfItIsAPath()){
		if( !left && !right || lineNumber === 0) {
			fillAndShowModal("Atenção:",
				"<p><b>O caminho não é válido. O caminho começado na linha 1 se interrompe na linha "+(lineNumber+1)+".</b></p>");//for the user, lineNumber must be 1-indexed.
		}
	}
	else if(actualSum !== maxPathSum){
			fillAndShowModal("Atenção:",
				"<p><b>O caminho é válido, mas não é máximo. Existe caminho com soma maior que "+actualSum+".</b></p>");
	}
	else{
		showMaxPath();	
		fillAndShowModal("Fim de Jogo!",
				"<p><b>Parabéns! Você achou o caminho de soma máxima "+maxPathSum+".</b></p>");	
	}
	
}

function validateIfItIsAPath(){
	i=0; 
	j=0;
	var chosen_i, chosen_j;
	var i_, j_;
	lineNumber=-1;
	while( i+j < numberOfLines && //not left orchard yet
		$('#'+i+'_'+j).hasClass('selected')){ //selected
		chosen_i = -1;
		chosen_j = -1;
		left = false;
		right = false;
		
		// look to their neighbors
		i_ = i+1;
		j_ = j+1;
		
		if(i+j+1 === numberOfLines){//neighbors are out of the orchard
			//console.log("It is a path!");
			return true;
		}
		//left neighbor	
		if($('#'+i+'_'+j_).hasClass('selected')){
			chosen_i = i;
			chosen_j = j_;
			left=true;
		}

		//right neighbor
		if($('#'+i_+'_'+j).hasClass('selected')){
			chosen_i = i_;
			chosen_j = j;
			right=true;
		}

		if(!left && !right) {
			lineNumber=i+j+1;
			//console.log("both selected notAPath lineNumber "+lineNumber);
			return false; // both selected
		}
		else if(left && right) {
			lineNumber=i+j+1;			
			//console.log("none selected notAPath lineNumber "+lineNumber);
			return false;// none selected
		}
		i=chosen_i;
		j=chosen_j;
	}
	lineNumber=i+j;
	if(!$('#'+i+'_'+j).hasClass('selected')) {
		//console.log("i "+i+" j "+j+" notAPath lineNumber "+lineNumber);
		return false;
	}
}

function validateExactOnePerLine(){
	var qnt;
	for(lineNumber=0; lineNumber<numberOfLines; lineNumber++){
		qnt=0;	
		for(i=0; i<=lineNumber; i++){
			j=lineNumber-i;
			if($('#'+i+'_'+j).hasClass('selected')) qnt++;	
		}
		
		if(qnt!=1) {
			//console.log("Na linha "+lineNumber+" nao existem numeros selecionados.");
			return false;
		}
	}
	//console.log("Existe um número selecionado por linha");
	return true;
}

function setDisabledStatusToPathButtons(bool){
	document.getElementById("testPath").disabled=bool;
	document.getElementById("showMaxPath").disabled=bool;
}

function setAMinimumWidthToBody(){
	maxWidth=getFullWidth("pathButtons");
	
	$("body").attr("style","min-width:"+maxWidth+"px");

}

function getFullWidth(id){
	//console.log("fullWidth "+id+" 	"+(parseInt($("#"+id).css("width"))+parseInt($("#"+id).css("padding-left"))+parseInt($("#"+id).css("padding-right"))+2*10));
	return (parseInt($("#"+id).css("width"))+parseInt($("#"+id).css("padding-left"))+parseInt($("#"+id).css("padding-right"))+3*10); //Not relying on margins. put 3*10px
}


function generateNewGame(){
	decideGameLevel();
	setAMinimumWidthToBody();
	generateOrchard();
	actionsWhenClickingANumber();
	actualSum=0;
	updateIdActualSum();
	calculateMaxPath();
	setDisabledStatusToPathButtons(false);
	removeDMaxPathSum();
};
