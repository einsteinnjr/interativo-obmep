MAX_WEIGHT = 40;

blockWeight=0;
height =50;
top_plateDown = $("#p1").offset().top;
top_plateUp = $("#p1").offset().top-height;
top_plateHalf = $("#p1").offset().top-height/2;


function generateBlockWeight(){
	blockWeight = Math.floor( Math.random() * MAX_WEIGHT);
	console.log("bloco "+blockWeight); 
}

function sumOfWeightsOfAPlate(id){
	var list = $("#"+id).find("li");

	ws=0;
   	$(list).each(function () {
		if($(this).attr("id")==="x") ws += blockWeight;
		else ws += parseInt($(this).attr("value"));
		console.log(id+" "+ws);
    	});
	return ws;
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

