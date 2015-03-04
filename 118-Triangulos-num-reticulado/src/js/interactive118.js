var d = 8; // padding until figure.
var d1 = 2;// distance until quotes infos

var NUMBER_OF_POINTS = 6;

var qboard;


function Point(x, y) {
  this.x = x;
  this.y = y;
};

//coordinates
var points;
//jsxObjects
var jsxPoints;

var chosenJsxPoints;

var jsxTriangle;

var minimumTrianglePoints;
var minimunArea;

var showingSolution;


function generateFigure(){
	//table 8x8
	qboard = JXG.JSXGraph.initBoard('questionJXGBox', {boundingbox: [0, d, d, 0],  keepaspectratio: true, showcopyright: false});
	grid = qboard.create('grid', []);
	generateRandomNonColinearPoints();
	plotPoints();
	calculateMinimumAreaTriangle();
}

function generateRandomNonColinearPoints(){
	var colinear=false;
	points = new Array();

	for(i=0; i<NUMBER_OF_POINTS; i++){
		do{
			colinear=false;
			x=1+Math.floor(Math.random()*(d-1));//random from 1 to d
			y=1+Math.floor(Math.random()*(d-1));
			var aux = new Point(x,y);
		
			//looking for all triples if there are some colinear points, ignore new point aux, if yes.
			for(j=0; j<i; j++){

				if( aux.x === points[j].x &&
					aux.y === points[j].y){//avoid same coordinates
					colinear=true;
					break;
				}
				for(k=0; k<j; k++){
					if(areColinear(points[j], points[k], aux)===true){
						/* console.log("j "+j+" x "+points[j].x+" y "+points[j].y);
						console.log("k "+k+" x "+points[k].x+" y "+points[k].y);
						console.log("i "+i+" x "+aux.x+" y "+aux.y);
						*/

						//colinear triple. We need to ignore aux.
						colinear=true;
						break;
					}
				}
				if(colinear===true) break;
			}
		}
		while(colinear);

		//console.log("pushing new i "+i+" x "+aux.x+" y "+aux.y);
		points.push(aux);
	}
}

function plotPoints(){
	jsxPoints = new Array();
	chosenJsxPoints = new Array();
	var char = 'A';

	jsxTriangle = qboard.create('polygon',[]);

	numberOfChosenPoints=0;
	for(i=0; i<NUMBER_OF_POINTS; i++){
		aux = qboard.create('point', [points[i].x, points[i].y], {name:char, color:'blue', fixed:true});
		jsxPoints.push(aux);

		//mouse point events.
		aux.on("down", function(){

			jsxTriangle.remove();
			//this point wasn't selected.
			if(this.getProperty("color")==="blue"){
				if(chosenJsxPoints.length===3) {
					removed = chosenJsxPoints.pop();//take out last element of array.
					removed.setAttribute({//turn back original blue color.
    						color: "blue"
					});
				}
				chosenJsxPoints.push(this);//put new point in the end of array.
				
				this.setAttribute({
    					color: "red"
				});
			}
			//this point is being unselected.
			else if(this.getProperty("color")==="red"){
				indexOnChosenJsxPoints=-1;
				for(j=0; j<chosenJsxPoints.length; j++){
					if(this.X()===chosenJsxPoints[j].X()&&
						this.Y()===chosenJsxPoints[j].Y()){
						indexOnChosenJsxPoints=j;
					}
				}
				chosenJsxPoints.splice(indexOnChosenJsxPoints,1);//removes element on position j, taking out the hole in the array.
				this.setAttribute({
    					color: "blue"
				});
			}

			// didnt figure it out a way to addPoints interactively. Did it in a brute force way. @ToDo
			if(chosenJsxPoints.length===1) jsxTriangle = qboard.create('polygon',[chosenJsxPoints[0]]);
			else if (chosenJsxPoints.length===2) jsxTriangle = qboard.create('polygon',[chosenJsxPoints[0], chosenJsxPoints[1]]);
			else if (chosenJsxPoints.length===3) jsxTriangle = qboard.create('polygon',[chosenJsxPoints[0], chosenJsxPoints[1], chosenJsxPoints[2]]);

			//update actualTriangle Area
			$("#actualAreaValue").empty();
			if(jsxTriangle.Area()===0) $("#actualAreaValue").html("-");
			else $("#actualAreaValue").html(jsxTriangle.Area());
		});
		
		//letter labels for the points begining on 'A'
		charCode = char.charCodeAt(0);//get actual charCode
		char = String.fromCharCode(charCode+1);//increment to get next letter.
	}

}

function calculateMinimumAreaTriangle(){
	minimumTrianglePoints = new Array();
	minimumArea = d*d+1; //the area of whole latticeBoard is d*d. Put initial value greater than that.
	var actualTriangle;
	for(i=0; i<NUMBER_OF_POINTS; i++){
		for(j=0; j<i; j++){
			for(k=0; k<j; k++){
				actualTriangle = qboard.create('polygon',[jsxPoints[i], jsxPoints[j], jsxPoints[k]]);
				actualTriangle.hideElement();
				if(actualTriangle.Area()<minimumArea){
					minimumArea = actualTriangle.Area();
					minimumTrianglePoints = new Array();
					minimumTrianglePoints.push(jsxPoints[i]);
					minimumTrianglePoints.push(jsxPoints[j]);
					minimumTrianglePoints.push(jsxPoints[k]);
					/*console.log("minimumArea "+minimumArea);
					console.log("i x "+jsxPoints[i].X()+" y "+jsxPoints[i].Y());
					console.log("j x "+jsxPoints[j].X()+" y "+jsxPoints[j].Y());
					console.log("k x "+jsxPoints[k].X()+" y "+jsxPoints[k].Y());
					*/
				}
				actualTriangle.remove();
			}
		}
	}
	//update minimumTriangle Area
	$("#minimumAreaValue").empty();
	$("#minimumAreaValue").html(minimumArea);
}

function showHintField(bool){
	$("#showHint").attr("disabled",bool);
	$("#minimumArea").toggleClass("hidden", !bool);
}

function showAnswerField(bool){
	$("#showAnswer").attr("disabled",bool);
	$("#answerExplanation").toggleClass("hidden",!bool);
}

//A, B and C are Objects of Point.
function areColinear(A, B, C){
	dCx = A.x - B.x;
	dCy = A.y - B.y;

	dBx = A.x - C.x;
	dBy = A.y - C.y;

	if(dCx === 0 &&
		dBx === 0){ //A, B and C are on a line parallel to y.
		return true;
	}
	else if(dCx === 0 ||
			dBx === 0) { //only 2 points are on a line parallel to y.
		return false;
	}
	else if(dCy/dCx === dBy/dBx){ //if dBx and dCx aren't zeros, we can calculate their slopes.
					//if they are equal, they are colinear.
		return true;	
	}
	else return false;
}

function dist(A, B){
	dx = A.X() - B.X();
	dy = A.Y() - B.Y();
	return Math.sqrt(dx*dx + dy*dy);
}

function generateSolutionInfosOnImage(){

	minimumTriangle = qboard.create('polygon',[minimumTrianglePoints[0], minimumTrianglePoints[1], minimumTrianglePoints[2]],{fillColor:'yellow',highlightColor:'yellow'});

//add black sides to minimumTriangle.
MN = qboard.create('segment',[minimumTrianglePoints[0], minimumTrianglePoints[1]],{color:"black"});
NO = qboard.create('segment',[minimumTrianglePoints[1], minimumTrianglePoints[2]],{color:"black"});
OP = qboard.create('segment',[minimumTrianglePoints[2], minimumTrianglePoints[0]],{color:"black"});
	
}

function generateSolution(){
	showingSolution=true;
	generateSolutionInfosOnImage();
}

function didUserFindOutMinimumArea(){
	return minimumTriangle.Area()===jsxTriangle.Area();
}

function showAnswer(){
	generateSolution();
	showAnswerField(true);

	if(didUserFindOutMinimumArea()){
		answerFeedback="<i class='glyphicon glyphicon-ok dark-green'>Correto!</i> Você acertou a área mínima: "+minimumTriangle.Area();
	}
	else{
		answerFeedback="<i class='glyphicon glyphicon-remove dark-red'>Errado!</i> Você errou! A área mínima é: "+minimumTriangle.Area();
	}
	$("#answerExplanation").html("<b>Solução:</b><br/>"+
	"<div class='justify'>"+answerFeedback+"</div>"+
	"<div class='justify'>Uma possível solução é o triângulo amarelo mostrado na figura.</div> "+
	"<div class='justify'>Uma forma fácil de calcular a área desses triângulos de coordenadas inteiras é utilizando o conhecido <b>Teorema de Pick</b>:</div> "+
	"<b><div class='justify'>Dado um polígono simples (cujos lados adjacentes não se intersectam), com vértices num reticulado (pontos de coordenadas inteiras), a área do polígono é dada pela fórmula abaixo:</div> </b>"+
	"<div class='center'><img src='src/images/picks_formula.png'/></div> "+
	"<div class='justify'> Onde A = Área do polígono;</div> "+
	"<div class='justify'><span class='tab'/> i = Número de pontos de coordenadas inteiras no interior do polígono;</div>"+
	"<div class='justify'><span class='tab'/> b = Número de pontos de coordenadas inteiras no bordo do polígono;</div>"+
	"<div class='center'><img src='src/images/lattice_poligon.png'/></div> ");
	
}

function resetAnswer(){
	showingSolution=false;
	showHintField(false);
	showAnswerField(false);
}	

function generateNewGame(){
	resetAnswer();
	generateFigure();
}
