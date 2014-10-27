
//Constants
var NUMBER_OF_LINES_EASY = 5;
var INITIAL_NUMBER_EASY = 1;
var FINAL_NUMBER_EASY = 10;

var NUMBER_OF_LINES_MEDIUM = 4;
var INITIAL_NUMBER_MEDIUM = 10;
var FINAL_NUMBER_MEDIUM = 100;

var NUMBER_OF_LINES_HARD = 8;
var INITIAL_NUMBER_HARD = 10;
var FINAL_NUMBER_HARD = 100;


var numberOfLines;
var initialNumber;
var finalNumber;
var matrix;
var i, j, k, sum, line, orchard;
var maxSumNeighborMatrix;
var maxSumIndexesMatrix;
var log_;
var maxPathSum;
var actualSum;
var left, right;

function decideGameLevel(){
	console.log($('input[name=gameLevel]:checked').val());
	if($('input[name=gameLevel]:checked').val() === "easy") {//one-digit number. Table with 4 lines.
		numberOfLines = NUMBER_OF_LINES_EASY;
		initialNumber = INITIAL_NUMBER_EASY;
		finalNumber = FINAL_NUMBER_EASY;
	}
	else if($('input[name=gameLevel]:checked').val() === "medium") {//one-digit number. Table with 8 lines.
		numberOfLines = NUMBER_OF_LINES_MEDIUM;
		initialNumber = INITIAL_NUMBER_MEDIUM;
		finalNumber = FINAL_NUMBER_MEDIUM;
	}
	else if($('input[name=gameLevel]:checked').val() === "hard") {//two-digit number. Table with 8 lines.
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

function printOrchard(){
	orchard="";
	for(sum=0; sum<numberOfLines; sum++){	
		for(i=0; i<=sum; i++){
			j=sum-i;
			orchard+="<span id='"+i+"_"+j+"' class='num'>"+matrix[i][j]+"</span><span class='tab'/>";	
		}
		orchard+="</br>";
	}
	return orchard;
};

function validateAtMostOneInThatLine(it){
	var id = $(it).attr('id');
	var idx = String(id).split('_');
	sum = parseInt(idx[0])+parseInt(idx[1]);
	for(i=0; i<=sum; i++){
		j=sum-i;
		if(i!==parseInt(idx[0]) &&
			$('#'+i+'_'+j).hasClass('selected')){//if it already has a selected, change to our actual 
				$('#'+i+'_'+j).toggleClass('selected');
		}
			
	}
}

function calculateMaxPath(){
	maxSumNeighborMatrix = new Array();
	maxSumIndexesMatrix = new Array();
	line = numberOfLines-1;
	
	//init Sum Matrix
	for(i=0; i<numberOfLines; i++){
		maxSumNeighborMatrix[i] = new Array();
		maxSumIndexesMatrix[i] = new Array();
	}
	log_="";
	//init last line sum;
	for(i=0; i<numberOfLines; i++){
		maxSumNeighborMatrix[line][i]=matrix[i][line-i];
		log_+="line "+line+" i "+i+" "+maxSumNeighborMatrix[line][i]+" # ";
	}
	//console.log("init "+log_);
	
	while( line > 0 ){
		var aux = line-1;
		//console.log("line "+aux);
		log_="";
		for(i=0; i<line; i++){
			if(matrix[i][line-1-i]+maxSumNeighborMatrix[line][i] > matrix[i][line-1-i]+maxSumNeighborMatrix[line][i+1]){
				maxSumNeighborMatrix[line-1][i] = matrix[i][line-1-i]+maxSumNeighborMatrix[line][i];
				maxSumIndexesMatrix[line-1][i] = i;
				log_+="sum "+maxSumNeighborMatrix[line-1][i]+" idx "+maxSumIndexesMatrix[line-1][i]+" @ ";
			}
			else {
				maxSumNeighborMatrix[line-1][i] = matrix[i][line-1-i]+maxSumNeighborMatrix[line][i+1];
				maxSumIndexesMatrix[line-1][i] = i+1;
				log_+="sum "+maxSumNeighborMatrix[line-1][i]+" idx "+maxSumIndexesMatrix[line-1][i]+" @ ";
			}
		}
		//console.log(log_);
		line--;			
	}
	maxPathSum=maxSumNeighborMatrix[0][0];
	//console.log("MaxSum "+maxPathSum);
}

function showMaxPath(){
	line=0;	
	i=0;
	j=line-i;
	while(line < numberOfLines){
		$('#'+i+'_'+j).addClass('solution');
		i = maxSumIndexesMatrix[line][i];
		line++;
		j= line-i;		
	}

}

function validateIfItIsMaxPath(){
	if(!validateExactOnePerLine()){
		alert("O caminho não é válido. Não existe número escolhido na linha "+sum+".");
	}
	else if(!validateIfItIsAPath()){
		if( !left && !right || sum === 0) alert("O caminho não é válido. O caminho começado na linha 0(zero) se interrompe na linha "+sum+".");
	}
	else if(actualSum !== maxPathSum){
		alert("O caminho é válido, mas não é máximo. Existe caminho com soma maior que "+actualSum+".");	
	}
	else{
		showMaxPath();		
		alert("Parabéns! Você achou o caminho de soma máxima "+maxPathSum+".");	
	}
	
}

function validateIfItIsAPath(){

	i=0; 
	j=0;
	var chosen_i, chosen_j;
	var i_, j_;
	sum=-1;
	actualSum=0;
	while( i+j < numberOfLines && //not left orchard yet
		$('#'+i+'_'+j).hasClass('selected')){ //selected
		actualSum+=parseInt($('#'+i+'_'+j).text());
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
			sum=i+j+1;
			//console.log("both selected notAPath sum "+sum);
			return false; // both selected
		}
		else if(left && right) {
			sum=i+j+1;			
			//console.log("none selected notAPath sum "+sum);
			return false;// none selected
		}
		i=chosen_i;
		j=chosen_j;
	}
	sum=i+j;
	if(!$('#'+i+'_'+j).hasClass('selected')) {
		//console.log("i "+i+" j "+j+" notAPath sum "+sum);
		return false;
	}
}

function validateExactOnePerLine(){
	var qnt;
	for(sum=0; sum<numberOfLines; sum++){
		qnt=0;	
		for(i=0; i<=sum; i++){
			j=sum-i;
			if($('#'+i+'_'+j).hasClass('selected')) qnt++;	
		}
		
		if(qnt!=1) {
			//console.log("Na linha "+sum+" nao existem numeros selecionados.");
			return false;
		}
	}
	//console.log("Existe um número selecionado por linha");
	return true;
}

function generateNewGame(){
	decideGameLevel();
	createOrchard();
	$("#orchard").html(printOrchard());
	$(".num").click(function(){
		validateAtMostOneInThatLine(this);
		$(this).toggleClass("selected");
	});
	actualSum=0;
	calculateMaxPath();
};
