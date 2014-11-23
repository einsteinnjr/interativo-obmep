MAX_WEIGHT = 40;

blockWeight=0;
height =100;
top_plateDown = $("#p1").offset().top;
top_plateUp = $("#p1").offset().top-height;
top_plateHalf = $("#p1").offset().top-height/2;


function generateBlockWeight(){
	blockWeight = Math.floor( Math.random() * MAX_WEIGHT);
	console.log("bloco "+blockWeight); 
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
		console.log(id+" "+weightSum);
    	});
	updateSumOfWeightsLabel(id, weightSum, hasBlock);
	return weightSum;
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
		console.log("p1 down");
		$("#p1").offset({top:top_plateDown});
		$("#p2").offset({top:top_plateUp});
	}
	else if(p1Total < p2Total){
		console.log("p2 down");
		$("#p1").offset({top:top_plateUp});
		$("#p2").offset({top:top_plateDown});
	}
	else if(p1Total === p2Total){
		console.log("p1 and p2 equal");
		$("#p1").offset({top:top_plateHalf});
		$("#p2").offset({top:top_plateHalf});
	}
	else console.log("FODEO!");
}

function weightPlates(){
	p1Total = sumOfWeightsOfAPlate("p1");
	p2Total = sumOfWeightsOfAPlate("p2");
	compareAndMovePlates(p1Total, p2Total);
}

function resetConditions(){
	$("#p1").offset({top:top_plateHalf});
	$("#p2").offset({top:top_plateHalf});
}

function generateNewGame(){
	resetConditions();
	generateBlockWeight();
	
};

