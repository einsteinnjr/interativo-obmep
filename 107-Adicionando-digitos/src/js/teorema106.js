MAX_WEIGHT_EASY = 13;
NUMBER_OF_WEIGHTS_EASY = 3;

MAX_WEIGHT_MEDIUM = 40;
NUMBER_OF_WEIGHTS_MEDIUM = 4;

MAX_WEIGHT_HARD = 121;
NUMBER_OF_WEIGHTS_HARD = 5;

maxWeight=0;
numberOfWeights=0;
blockWeight=0;
height =100;
top_plateDown = $("#p1").offset().top;
top_plateUp = $("#p1").offset().top-height;
top_plateHalf = $("#p1").offset().top-height/2;


function generateBlockWeight(){
	blockWeight = 1+Math.floor( Math.random() * maxWeight);
	//console.log("block "+blockWeight); 
}

function decideGameLevel(){
	if($('input[name=gameLevel]:checked').val() === "easy") {
		maxWeight = MAX_WEIGHT_EASY;
		numberOfWeights = NUMBER_OF_WEIGHTS_EASY;
		$("#weights").addClass("small-w");
	}
	else if($('input[name=gameLevel]:checked').val() === "medium") {
		maxWeight = MAX_WEIGHT_MEDIUM;
		numberOfWeights = NUMBER_OF_WEIGHTS_MEDIUM;
		$("#weights").addClass("medium-w");
	}
	else if($('input[name=gameLevel]:checked').val() === "hard") {
		maxWeight = MAX_WEIGHT_HARD;
		numberOfWeights = NUMBER_OF_WEIGHTS_HARD;
		$("#weights").addClass("large-w");
	}	
}

function sumOfWeightsOfAPlate(id){
	var list = $("#"+id).find("li");

	weightSum=0;
	hasBlock=false;
   	$(list).each(function () {
		if($(this).attr("id")==="x") {
			weightSum += blockWeight;
			hasBlock=true;
		}
		else weightSum += parseInt($(this).attr("value"));
		//console.log(id+" "+weightSum);
    	});
	updateSumOfWeightsLabel(id, weightSum, hasBlock);
	return weightSum;
}

function hasBlockOnPlate(id){
	var list = $("#"+id).find("li");

	hasBlock=false;
   	$(list).each(function () {
		if($(this).attr("id")==="x") {
			hasBlock=true;
		}
    	});
	return hasBlock;
}

function updateSumOfWeightsLabel(id, weightSum, hasBlock){
	$("#"+id+"SumOfWeights").empty();
	weightLabel="";
	auxSum=weightSum;
	if(hasBlock) {
		weightLabel+="X";
		auxSum-=blockWeight;// label won't show block's weight
		if(auxSum!=0) weightLabel+="+"+auxSum+"kg";
	}
	else weightLabel+=auxSum+"kg";//hasn't block;
	$("#"+id+"SumOfWeights").html(weightLabel);
}

function compareAndMovePlates(p1Total, p2Total){
	if(p1Total > p2Total){
		//console.log("p1 down");
		$("#p1").offset({top:top_plateDown});
		$("#p2").offset({top:top_plateUp});
		return -1;
	}
	else if(p1Total < p2Total){
		//console.log("p2 down");
		$("#p1").offset({top:top_plateUp});
		$("#p2").offset({top:top_plateDown});
		return 1;
	}
	else if(p1Total === p2Total){
		//console.log("p1 and p2 equal");
		$("#p1").offset({top:top_plateHalf});
		$("#p2").offset({top:top_plateHalf});
		return 0;
	}
	//else console.log("iih!");
}

function weightPlates(){
	p1Total = sumOfWeightsOfAPlate("p1");
	p2Total = sumOfWeightsOfAPlate("p2");
	compareAndMovePlates(p1Total, p2Total);
	if((hasBlockOnPlate("p1")||
		hasBlockOnPlate("p2"))&&
		p1Total === p2Total) {
			$(".modal-title").html("Parabéns!");
			$(".modal-body").html("O peso do bloco X realmente é <b>"+blockWeight+"kg</b>. <br/>"+
						"Essa também é uma maneira de representar o valor X como "+
						"soma e subtração de potências de 3 distintas. Deseja "+
						"realizar uma nova pesagem?");
			$("#modalInfo").modal("show");
				
	}
}


function generateWeights(){
	weightsHtml="<li id='x' class='weight float blue'><span class='weight-span'><b>X</b></span></li>";
	actualPowerOf3=1;
	for(i=0; i<numberOfWeights; i++){
		weightsHtml+="<li class='weight float lgray' value='"+actualPowerOf3+"'><span class='weight-span'>"+actualPowerOf3+"kg</span></li>";
		actualPowerOf3*=3;
	}
	$("#weights").html(weightsHtml);
}

function fillRequisites(){
	$("#weightInterval").empty();
	$("#weightInterval").html("1 a "+maxWeight+"kg");

	$("#xWeight").empty();
	$("#xWeight").html(blockWeight+"kg");
}

function resetConditions(){
	//take out the weights of both plates and initial list.
	$("#p1").empty();
	$("#p2").empty();
	$("#weights").empty();
	$("#weights").removeClass("small-w medium-w large-w");
}

function fillConditions(){
	fillRequisites();
	generateWeights();
	weightPlates();
}

function generateNewGame(){
	resetConditions();
	decideGameLevel();
	generateBlockWeight();	
	fillConditions();
};

