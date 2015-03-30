var d = 10; // padding until figure.
var d1 = d/3; // distance until quotes infos

var r=d;
var qboard;

var desiredArea;

var showingSolution;

var t1;

function generateFigure(){
	
	qboard = JXG.JSXGraph.initBoard('questionJXGBox', {boundingbox: [ -(r+d1), r+d1, r+d1, -(r+2*d1)],  keepaspectratio: true, showcopyright: false});

	n = 4;
	initialAngle = 3*Math.PI/4; //135  //1st vertice A
	deltaAngle = 2*Math.PI/n; //360/n

	//vertices of a square with a randomPart deviation
	A = qboard.create('point', [r*Math.cos(initialAngle)+randomPart(), r*Math.sin(initialAngle)+randomPart()], {name: "A", color:'blue', label:{offset:[-15, 0]}});
	B = qboard.create('point', [r*Math.cos(initialAngle+deltaAngle)+randomPart(), r*Math.sin(initialAngle+deltaAngle)+randomPart()], {name: "B", color:'blue', label:{offset:[-15, 0]}});
	C = qboard.create('point', [r*Math.cos(initialAngle+2*deltaAngle)+randomPart(), r*Math.sin(initialAngle+2*deltaAngle)+randomPart()], {name: "C", color:'blue', label:{offset:[15, 0]}});
	D = qboard.create('point', [r*Math.cos(initialAngle+3*deltaAngle)+randomPart(), r*Math.sin(initialAngle+3*deltaAngle)+randomPart()], {name: "D", color:'blue', label:{offset:[15, 0]}});

	//sides of square
	AB = qboard.create('segment', [A, B], {color:'black', strokeWidth:1});
	BC = qboard.create('segment', [B, C], {color:'black', strokeWidth:1});
	CD = qboard.create('segment', [C, D], {color:'black', strokeWidth:1});
	DA = qboard.create('segment', [D, A], {color:'black', strokeWidth:1});

	//midpoints of sides
	M = qboard.create('midpoint', [A, B], {name:"M", withLabel:false, color:'red', fixed:true});
	N = qboard.create('midpoint', [B, C], {name:"N", withLabel:false, color:'red', fixed:true});
	P = qboard.create('midpoint', [C, D], {name:"P", withLabel:false, color:'red', fixed:true});
	Q = qboard.create('midpoint', [D, A], {name:"Q", withLabel:false, color:'red', fixed:true});

	//segments joining oposite midpoints
	MP = qboard.create('segment', [M, P], {color:'black', strokeWidth:1});
	NQ = qboard.create('segment', [N, Q], {color:'black', strokeWidth:1});

	//intersection
	O = qboard.create('intersection', [MP, NQ], {name:"O", withLabel:false, color:'blue', strokeWidth:1});

	//quadrilatere areas
	quadA = qboard.create('polygon', [A, M, O, Q], {name: "A",withLabel:true});
	quadB = qboard.create('polygon', [B, N, O, M], {name: "A",withLabel:true});
	quadC = qboard.create('polygon', [C, P, O, N], {name: "A",withLabel:true});
	quadD = qboard.create('polygon', [D, Q, O, P], {name: "A",withLabel:true});

	calculateAreas();	

	dragMovements();

	//t1 =qboard.create('text',[0, -1, "A = "+rectangleA.Area().toFixed(2)], {fixed:true});
	//t2 =qboard.create('text',[q-1, -1, "B = "+rectangleB.Area().toFixed(2)], {fixed:true});
}



function calculateAreas(){

	//calculate each area. toFixed(0) for integer Area.
	quadB.setAttribute({
		name:quadB.Area().toFixed(0)	
	});
	quadC.setAttribute({
		name:quadC.Area().toFixed(0)	
	});
	quadD.setAttribute({
		name:quadD.Area().toFixed(0)	
	});

	// if showingSolution, show actual value instead of '?'. 
	// To avoid round problems (using rouding integer areas), do not use quadA.Area() but use the formula instead.
	
	desiredArea = parseInt(quadB.Area().toFixed(0))+parseInt(quadD.Area().toFixed(0))-parseInt(quadC.Area().toFixed(0));

	if(showingSolution) 
		areaValue = desiredArea;
	else areaValue = "?";

	quadA.setAttribute({
		name:areaValue
	});

	if(showingSolution){
		cleanInfos();
		plotInfos();
	}

}

function dragMovements(){
	A.on("drag",function(){
		calculateAreas();
	});
	B.on("drag",function(){
		calculateAreas();
	});
	C.on("drag",function(){
		calculateAreas();
	});
	D.on("drag",function(){
		calculateAreas();
	});
}

function randomPart(){
	return -d1 + Math.random()*2*d1;   // between -d1 and d1.
}

function plotInfos(){
	legend_x = -r;
	legend_y = -r-d1;	

	//legend texts
	//1st line
	t1 = qboard.create('text',[legend_x, legend_y, "[AMOQ] = [BNOM] + [DQOP] - [CPON] = "+quadB.Area().toFixed(0)+" + " +quadD.Area().toFixed(0)+" - "+quadC.Area().toFixed(0)+" = " + desiredArea], {fixed:true});
}

function cleanInfos(){
	t1.remove();
}

function dist(A, B){
	dx = A.X() - B.X();
	dy = A.Y() - B.Y();
	return Math.sqrt(dx*dx + dy*dy);
}

function plotSolutionInfos(){

	//hide quadrilatere areas on figure
	quadA.setAttribute({
		color:"white"
	});
	quadB.setAttribute({
		color:"white"
	});
	quadC.setAttribute({
		color:"white"
	});
	quadD.setAttribute({
		color:"white"
	});

	//plotInfo should be before calculateAreas. To existe t1.
	plotInfos();

	//update quadA area. Instead of '?'
	calculateAreas();
	
	//show valuable points names
	M.setAttribute({
		withLabel:true
	});
	N.setAttribute({
		withLabel:true
	});
	P.setAttribute({
		withLabel:true
	});
	Q.setAttribute({
		withLabel:true
	});

	O.setAttribute({
		withLabel:true
	});

	//triangle areas. Same area has same color.
	tAMO = qboard.create('polygon', [A, M, O], {color:"yellow"});
	tBMO = qboard.create('polygon', [B, M, O], {color:"yellow"});
	tBNO = qboard.create('polygon', [B, N, O], {color:"pink"});
	tCNO = qboard.create('polygon', [C, N, O], {color:"pink"});
	tCPO = qboard.create('polygon', [C, P, O], {color:"orange"});
	tDPO = qboard.create('polygon', [D, P, O], {color:"orange"});
	tDQO = qboard.create('polygon', [D, Q, O], {color:"green"});
	tAQO = qboard.create('polygon', [A, Q, O], {color:"green"});
	
}

function generateSolution(){
	showingSolution=true;
	plotSolutionInfos();
}

function showAnswer(){
	generateSolution();
	$("#showAnswer").attr("disabled",true);
	$("#answerExplanation").removeClass("hidden");
	$("#answerExplanation").html("<b>Solução:</b><br/>"+
	"<div class='justify'>Dado um triângulo qualquer, por exemplo, &Delta;AOB, ao traçarmos a mediana OM, ela o dividirá em 2 triângulos &Delta;AOM e &Delta;BOM de mesma área.</div>"+
	"<div class='justify'>Uma maneira simples de ver isso é que as bases AM e BM são iguais (pois M é ponto médio de AB) e a altura relativa a essas bases é a mesma, partindo de O, tanto no triângulo &Delta;AOM como no &Delta;BOM. Assim:</div>"+
	"<div class='center'>[&Delta;AOM] = [&Delta;BOM] = x</div>"+
	"<div class='justify'>Analogamente para os triângulos &Delta;BOC, &Delta;COD e &Delta;DOA:</div>"+
	"<div class='center'>[&Delta;BON] = [&Delta;CON] = y</div>"+
	"<div class='center'>[&Delta;COP] = [&Delta;POD] = z</div>"+
	"<div class='center'>[&Delta;DOQ] = [&Delta;AOQ] = w</div>"+
	"<div class='justify'>Note que:</div>"+
	"<div class='center'>[AMOQ] = [&Delta;AOM] + [&Delta;AOQ] = x + w</div>"+
	"<div class='center'>[BNOM] = [&Delta;BON] + [&Delta;BOM] = y + x</div>"+
	"<div class='center'>[CPON] = [&Delta;COP] + [&Delta;CON] = z + y</div>"+
	"<div class='center'>[DQOP] = [&Delta;DOQ] + [&Delta;DOP] = w + z</div>"+
	"<div class='justify'>Assim:</div>"+
	"<div class='center'>[AMOQ] + [CPON]= x + w + z + y = [BNOM] + [DQOP]</div>"+
	"<div class='justify'>Logo:</div>"+
	"<div class='center'>[AMOQ] = [BNOM] + [DQOP] - [CPON]</div>");
}

function resetAnswer(){
	//if t1 exists, clean it.
	if(showingSolution) cleanInfos();

	showingSolution=false;
	$("#showAnswer").attr("disabled",false);
	$("#answerExplanation").addClass("hidden");
}		

function generateNewGame(){
	resetAnswer();
	generateFigure();

}
