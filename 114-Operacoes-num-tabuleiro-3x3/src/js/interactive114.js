

var showingSolution;

var i, j;

var gameTableSum, finalTableSum;
var actualRemainder, finalRemainder;


function generateGameTable(){
	$("#gameTable").empty();
	tableInnerHtml="";
	var elem;
	gameTableSum=0;
	for(var i=0; i<5; i++){
		tableInnerHtml+="<tr>";
		for(var j=0; j<4; j++){
			if(i==0 && j==0) tableInnerHtml+="<td class='align-bottom border-none downRightButton'><button type='button' class='btn btn-default'><img src='src/images/arrow_down_right.png'></button></td>";
			else if(i==4&&j==0) tableInnerHtml+="<td class='center border-none upRightButton'><button type='button' class='btn btn-default'><img src='src/images/arrow_up_right.png'></button></td>";
			else if(i==0) tableInnerHtml+="<td id='db_"+j+"' class='center border-none downButton'><button type='button' class='btn btn-default'><img src='src/images/arrow_down.png'></button></td>";
			else if(j==0) tableInnerHtml+="<td id='rb_"+i+"' class='border-none rightButton'><button type='button' class='btn btn-default'><img src='src/images/arrow_right.png'></button></td>";
			else if(i!=4) {
				elem = Math.floor(Math.random()*2);
				tableInnerHtml+="<td id='g_"+i+"_"+j+"' class='center' value='"+elem+"'><b>"+elem+"</b></td>";
				gameTableSum+= elem;
			}
			
		}
		tableInnerHtml+="</tr>";
	}
	$("#gameTable").html(tableInnerHtml);
	updateGameTableSum();
}

function colorSquaresOnChange(id){
	$( id ).animate({
	  backgroundColor: "#00FFFF",//light-blue
	}, 1 );//ms
	$( id ).animate({
	  backgroundColor: "#FFF",//white
	}, 400 );//ms
}

function addDropdownValueOnElem(id, dropdownValue){
	newValue =  parseInt($(id).attr("value"))+parseInt(dropdownValue);
	console.log(id+" "+$(id).attr("value"));
	$(id).attr("value",newValue);
	$(id).html("<b>"+newValue+"</b>");
}

function updateGameTableSum(){
	gameTableSum=0;
	for(var i=1; i<4; i++){
		for(var j=1; j<4; j++){
			gameTableSum+=parseInt($("#g_"+i+"_"+j).attr("value"));
			console.log('$(#g_'+i+'_'+j+').attr("value")'+ $("#g_"+i+"_"+j).attr("value"));
			console.log('parseInt '+parseInt($("#g_"+i+"_"+j).attr("value")));
		}
	}
	$(".gameSumValue").html("<b>"+gameTableSum+"</b>");
	actualRemainder = gameTableSum%3;
	if(actualRemainder<0) actualRemainder+=3;
	$(".3-remainderGameSumValue").html("<b>"+actualRemainder+"</b>");
}

function actionButtons(){
	var id;
	//down Right Diagonal
	$(".downRightButton").click(function(){
		var dropdownValue = $('#numberToAdd').val();
		//summing dropdownValue on all elements of downRight Diagonal
		for(i=1; i<4; i++){
			_id="_"+i+"_"+i;
			id="#g"+_id;
			addDropdownValueOnElem(id, dropdownValue);
			colorSquaresOnChange(id);
			checkIfNumberIsCorrect(_id);
		}    		
		updateGameTableSum();
	});
	
	//up Right Diagonal
	$(".upRightButton").click(function(){
		var dropdownValue = $('#numberToAdd').val();
		//summing dropdownValue on all elements of upRight Diagonal
		for(i=1; i<4; i++){
			_id="_"+i+"_"+(4-i);
			id="#g"+_id;
			addDropdownValueOnElem(id, dropdownValue);
			colorSquaresOnChange(id);
			checkIfNumberIsCorrect(_id);
		}
		updateGameTableSum();    			
	});

	//lines
	$(".rightButton").click(function(){
		var dropdownValue = $('#numberToAdd').val();
		coords = $(this).attr("id").split("_");//coords[0]=rb //prefix   //coords[1]=i //line  
		//summing dropdownValue on all elements of line i
		for(i=1; i<4; i++){
			_id="_"+coords[1]+"_"+i;
			id="#g"+_id;
			addDropdownValueOnElem(id, dropdownValue);
			colorSquaresOnChange(id);
			checkIfNumberIsCorrect(_id);
		}
		updateGameTableSum();    		
	});

	//columns
	$(".downButton").click(function(){
		var dropdownValue = $('#numberToAdd').val();
		coords = $(this).attr("id").split("_");//coords[0]=db //prefix   //coords[1]=i //column 
		//summing dropdownValue on all elements of column j
		for(i=1; i<4; i++){
			_id = "_"+i+"_"+coords[1];
			id="#g"+_id;
			addDropdownValueOnElem(id, dropdownValue);
			colorSquaresOnChange(id);
			checkIfNumberIsCorrect(_id);
		}
		updateGameTableSum();   		
	});

}

function checkAllSquares(){
	for (var i=1; i<4; i++){
		for (var j=1; j<4; j++){
			_id="_"+i+"_"+j;
			checkIfNumberIsCorrect(_id);
		}
	}
}

function generateFinalTable(){
	$("#desiredFinalTable").empty();
	tableInnerHtml="";
	var elem;
	finalTableSum=0;
	for(var i=0; i<5; i++){
		tableInnerHtml+="<tr>";
		for(var j=0; j<4; j++){
			if(i===3 && j===3){//last square number of final table
				if( (finalTableSum - gameTableSum) % 3 === 0) elem=1;
				else elem=0;
				//in the end, finalTableSum and gameTableSum need to have different remainder by 3.

				tableInnerHtml+="<td id='f_"+i+"_"+j+"' value='"+elem+"' class='center'><i class='glyphicon glyphicon-ok hidden'></i><b>"+elem+"</b></td>";
				finalTableSum+=elem;
			}
			else if(i>0 && j>0 && i!=4)	{
				elem = Math.floor(Math.random()*2);
				tableInnerHtml+="<td id='f_"+i+"_"+j+"' value='"+elem+"' class='center'><i class='glyphicon glyphicon-ok hidden'></i><b>"+elem+"</b></td>";
				finalTableSum+=elem;
			}
			else tableInnerHtml+="<td id='f_"+i+"_"+j+"' class='border-none'></td>";
		}
		tableInnerHtml+="</tr>";
	}
	$("#desiredFinalTable").html(tableInnerHtml);
	$(".finalSumValue").html("<b>"+finalTableSum+"</b>");
	finalRemainder = finalTableSum%3;
	if(finalRemainder<0) finalRemainder+=3;
	$("#3-remainderFinalSumValue").html("<b>"+finalRemainder+"</b>");
}

function checkIfNumberIsCorrect(_id){
	$i = $("#f"+_id).find("i");
	if($("#g"+_id).attr("value") === $("#f"+_id).attr("value")){//correct value on square.
		$("#f"+_id).addClass("bg-green");
		$i = $("#f"+_id).find("i");
		$i.removeClass("hidden");
	}
	else{
		$("#f"+_id).removeClass("bg-green");
		$i = $("#f"+_id).find("i");
		$i.addClass("hidden");
	}
}

function generateSolution(){
	showingSolution=true;
	$("#dGameSum").removeClass("hidden");
	$("#dFinalSum").removeClass("hidden");
	updateGameTableSum();
}

function showAnswer(){
	$("#showAnswer").attr("disabled",true);
	$("#answerExplanation").removeClass("hidden");
	$("#answerExplanation").html("<div class='justify'><b>Solução:</b></div>"+
	"<div class='justify'>Temos 2 possibilidades: ou realizamos algumas operações tentando chegar ao estado final pedido, utilizando o tabuleiro interativo. Ou tentamos analisar o porquê de não ser possível chegar ao estado final.</div>"+
	"<div class='justify'>Em problemas desse tipo é comum analisarmos invariantes em suas operações. Isto é, procurar propriedades que não mudam independente das operações realizadas.</div>"+
	"<div class='justify'>Note que todas as operações realizadas se resumem a somar 3 números +1 em 3 casas ou somar 3 números -1. Uma invariante interessante seria o resto da divisão por 3 da soma dos números de todas as casinhas do tabuleiro. Como a cada operação somamos +3 ou -3 a soma total, o resto da divisão por 3 na soma total permanece inalterado.</div>"+
	"<div class='justify'>Analisando o valor da soma das casas do tabuleiro:</div>"+
	"<div class='center'><b>Soma atual do tabuleiro: </b><div class='gameSumValue green inline'></div></div>"+
	"<div class='center'><b>Soma final: <div class='green inline'>"+finalTableSum+"</div></b></div>"+
	"<div class='justify'>E analisemos os os restos por 3 das somas:</div>"+
	"<div class='center'><b>Resto por 3 da soma atual: </b><div class='3-remainderGameSumValue green inline'></div></div>"+
	"<div class='center'><b>Resto por 3 da soma final: <div class='green inline'>"+finalRemainder+"</div></b></div>"+
	"<div class='justify'>Como os restos por 3 de ambas as somas são distintos e essa propriedade é invariante com as operações, o estado final do tabuleiro solicitado não pode ser atingido.</div>"+
	"<div class='justify'> Realize as operações no tabuleiro, agora, com os valores das somas explícitas abaixo dos tabuleiros.</div>");
	generateSolution();
}

function resetAnswer(){
	showingSolution=false;
	$("#showAnswer").attr("disabled",false);
	$("#answerExplanation").addClass("hidden");
	$("#dGameSum").addClass("hidden");
	$("#dFinalSum").addClass("hidden");
}	

function generateNewGame(){
	resetAnswer();
	generateGameTable();
	generateFinalTable();
	actionButtons();
	checkAllSquares();
}
