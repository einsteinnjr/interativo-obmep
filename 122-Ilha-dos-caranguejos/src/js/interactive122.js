var d = 6; // padding until figure.
var d1 = 2;// distance until quotes infos

var MIN_ANGLE = Math.PI/6; // 30 degrees
var DELTA_ANGLE = 2*Math.PI/3; // 120 degrees

// side b
var MIN_SIDE = 10;
var DELTA_SIDE = 10;

//side c
var MIN_RATIO = 0.3;
var DELTA_RATIO = 0.4


var r=10;
var qboard;
var t1, t2, t3;
var segmentName, segmentValue;

var is1stSolution;
var detailedAnswer;

var showingSolution;

function generateFigure(){

	xb = MIN_SIDE + Math.random()*DELTA_SIDE; // 10 < xb < 20
	xc = xb*(MIN_RATIO + Math.random()*DELTA_RATIO); // 0.3*xb < xc < 0.7*xb
	yc = MIN_SIDE/2 + Math.random()*DELTA_SIDE/2; // 5 < yc < 10

	
	qboard = JXG.JSXGraph.initBoard('questionJXGBox', {boundingbox: [ -(d1), yc+d1, xb+d1, -(d1)],  keepaspectratio: true, showcopyright: false});

	//points
	A = qboard.create('point', [0, 0], {name: "A", color:'blue', fixed:true, label:{offset:[-15, 0]}});
	B = qboard.create('point', [xb, 0], {name: "B", color:'blue', fixed:true});
	C = qboard.create('point', [xc, yc], {name: "C", color:'blue', fixed:true});

	//sides
	AB = qboard.create('segment', [A, B], {color:'black', fixed:true, strokeWidth:1});
	BC = qboard.create('segment', [B, C], {color:'black', fixed:true, strokeWidth:1});
	CA = qboard.create('segment', [C, A], {color:'black', fixed:true, strokeWidth:1});

	generateRandomInnerPoint();
}

function generateRandomInnerPoint(){
	minPercent = 0.2;
	maxPercent = 0.8;
	//random factor
	
	//xm must be between minPercent and maxPercent //xm -> initially percentage on x
	do{
		xm = Math.random();
	}
	while(xm < minPercent||
		xm > maxPercent);

	//ym must be between minPercent and maxPercent //ym -> initially percentage on y
	do{
		ym = Math.random();
	}
	while(ym < minPercent||
		ym > maxPercent);

	if(xm<=xc/xb){ // P is 'below' AC
		xp=xm*xb;		
		yp=((xp/xc)*yc)*ym;
	}
	else{ // P is 'below' BC
		xp=xm*xb;
		yp=(((xb-xp)/(xb-xc))*yc)*ym;
	}
	P = qboard.create('point', [xp, yp], {name: "P", color:'red', fixed:false, label:{offset:[0, 15]}});

	generateProjections();

	P.on("drag", function(){
		clearElements();
		generateProjections();
	});

}

function generateProjections(){
	
	//projections to sides
	D = qboard.create('perpendicularpoint', [P, BC], {name: "D", withLabel:true, color:"blue", size:0, visible:true});
	E = qboard.create('perpendicularpoint', [P, CA], {name: "E", withLabel:true, color:"blue", size:0, visible:true, label:{offset:[-15,0]}});
	F = qboard.create('perpendicularpoint', [P, AB], {name: "F", withLabel:true, color:"blue", size:0, visible:true, label:{offset:[0, -15]}});

	//segments perpendicular to sides from P
	PD = qboard.create('segment', [P, D], {name: "PD", withLabel:false, color:'black', strokeWidth:1});
	PE = qboard.create('segment', [P, E], {name: "PE", withLabel:false, color:'black', strokeWidth:1});
	PF = qboard.create('segment', [P, F], {name: "PF", withLabel:false, color:'black', strokeWidth:1});

	//rect angles 
	PDC = qboard.create('angle', [C, D, P], {withLabel:false, color: 'green', type:'sector', orthoType:'square', orthoSensitivity:2, radius:0.5});
	PEA = qboard.create('angle', [A, E, P], {withLabel:false, color: 'green', type:'sector', orthoType:'square', orthoSensitivity:2, radius:0.5});
	PFB = qboard.create('angle', [B, F, P], {withLabel:false, color: 'green', type:'sector', orthoType:'square', orthoSensitivity:2, radius:0.5});

	colorTheSmalest();
	
	generateTexts();

	if(showingSolution){

	}	
}

function colorTheSmalest(){
	x = distance(P, D);
	y = distance(P, E);
	z = distance(P, F);
	if(x <= y && x <= z){
		PD.setAttribute({
			color:"red",
			strokeWidth:2
		});
		PDC.setAttribute({
			color:"red"
		});
		segmentName = PD.getName();
		segmentValue = x;
	}
	else if(y < x && y <= z){
		PE.setAttribute({
			color:"red",
			strokeWidth:2
		});
		PEA.setAttribute({
			color:"red"
		});
		segmentName = PE.getName();
		segmentValue = y;
	} 
	else if(z < x && z < y){
		PF.setAttribute({
			color:"red",
			strokeWidth:2
		});
		PFB.setAttribute({
			color:"red"
		});
		segmentName = PF.getName();
		segmentValue = z;
	}
}

function generateTexts(){

	t1 = qboard.create('text',[0, -d1, "Menor distância de P ao mar = "+segmentValue.toFixed(2)+" (<span class='error'>"+segmentName+"</span>)"], {fixed:true});
	
}

function plotIncenterAndItsProjections(){
	
	//inner angles
	CBA = qboard.create('angle', [C, B, A], {withLabel:false, visible:false, color: 'green', type:'sector', orthoType:'square', orthoSensitivity:2, radius:0.5});
	ACB = qboard.create('angle', [A, C, B], {withLabel:false, visible:false, color: 'green', type:'sector', orthoType:'square', orthoSensitivity:2, radius:0.5});
	BAC = qboard.create('angle', [B, A, C], {withLabel:false, visible:false, color: 'green', type:'sector', orthoType:'square', orthoSensitivity:2, radius:0.5});

	//angle bisectors
	bisectorA = qboard.create('bisector', [B, A, C], {color:'red', strokeWidth:1, visible:false});
	bisectorB = qboard.create('bisector', [C, B, A], {color:'red', strokeWidth:1, visible:false});

	//incenter
	I = qboard.create('intersection', [bisectorA, bisectorB], {name:"I", withLabel:true, color:'yellow', label:{offset:[0,15]}});

	//projections to sides
	Q = qboard.create('perpendicularpoint', [I, BC], {name: "Q", withLabel:false, color:"yellow", size:0});
	R = qboard.create('perpendicularpoint', [I, CA], {name: "R", withLabel:false, color:"yellow", size:0, label:{offset:[-15,0]}});
	S = qboard.create('perpendicularpoint', [I, AB], {name: "W", withLabel:false, color:"yellow", size:0, label:{offset:[0, -15]}});

	//segments perpendicular to sides from I
	IQ = qboard.create('segment', [I, Q], {name: "r", withLabel:false, color:'yellow', strokeWidth:1});
	IR = qboard.create('segment', [I, R], {name: "r", withLabel:false, color:'yellow', strokeWidth:1});
	IS = qboard.create('segment', [I, S	], {name: "r", withLabel:false, color:'yellow', strokeWidth:1});

	//rect angles
	IQC = qboard.create('angle', [C, Q, I], {withLabel:false, color: 'yellow', type:'sector', orthoType:'square', orthoSensitivity:2, radius:0.5});
	IRA = qboard.create('angle', [A, R, I], {withLabel:false, color: 'yellow', type:'sector', orthoType:'square', orthoSensitivity:2, radius:0.5});
	ISB = qboard.create('angle', [B, S, I], {withLabel:false, color: 'yellow', type:'sector', orthoType:'square', orthoSensitivity:2, radius:0.5});

	r = distance(I, Q);

	incircle = qboard.create('circle', [I, r], {name: "IQ", withLabel:false, strokeColor:'yellow', strokeWidth:1, dash:2});
	
	t2 = qboard.create('text',[0, -2*d1, "Distância do incentro I ao mar = "+r.toFixed(2)], {fixed:true});
	
	
}

function distance (a, b){
	dx = a.X()-b.X();
	dy = a.Y()-b.Y();
	return Math.sqrt(dx*dx+dy*dy);
}

function clearElements(){
	D.remove();
	E.remove();
	F.remove();

	PD.remove();
	PE.remove();
	PF.remove();

	PDC.remove();
	PEA.remove();
	PFB.remove();

	t1.remove();

	if(showingSolution){

	}
}


function generateSolution(){
	showingSolution=true;
	plotIncenterAndItsProjections();
}

function showAnswer(){
	generateSolution();
	$("#showAnswer").attr("disabled",true);
	$("#answerExplanation").removeClass("hidden");
	$("#answerExplanation").html("<b>Solução:</b><br/>"+
	"<div class='justify'>Provaremos que o ponto procurado é o incentro da Ilha Triangular. Devemos mostrar que o incentro I é o ponto cuja menor distância ao mar é a maior possível."+
	"<div class='justify'>Note que as 3 distâncias do incentro I ao mar (aos lados) são iguais entre si e de tamanho igual ao raio do incírculo."+
	"<div class='justify'>Supomos então, por absurdo, que haja um ponto P cuja menor distância é maior que a distância do incentro aos lados, isto é, o raio do incírculo."+
	"<div class='center'>`d_(P, BC) > r` <span class='tab'/>(I)</div>"+
	"<div class='center'>`d_(P, CA) > r` <span class='tab'/>(II)</div>"+
	"<div class='center'>`d_(P, AB) > r` <span class='tab'/>(III)</div>"+
	"<div class='justify'>Seja [&Delta;ABC] a área do triângulo &Delta;ABC.</div>"+
	"<div class='justify'>Note que:</div>"+
	"<div class='center'>`[&Delta;ABC]=[&Delta;PAB]+[&Delta;PCA]+[&Delta;PBC]=`</div>"+
	"<br/>"+
	"<div class='center'>`= (|AB|*d_(P, AB))/2 + (|CA|*d_(P, CA))/2 + (|BC|*d_(P, BC))/2 >`</div>"+
	"<br/>"+
	"<div class='center'>`> (|AB|*r)/2 + (|CA|*r)/2 + (|BC|*r)/2 =`  </div>"+
	"<br/>"+
	"<div class='center'>`=((|AB|+|CA|+|BC|)*r)/2 = [&Delta;ABC]`</div>"+
	"<div class='justify'>O que nos levaria a:</div>"+
	"<div class='center'>`[&Delta;ABC] > [&Delta;ABC]`</div>"+
	"<div class='justify'>Absurdo! Segue que o incentro é o ponto procurado.</div>");
	compileMathJaxCode();
	
}

function resetAnswer(){
	showingSolution=false;
	$("#showAnswer").attr("disabled",false);
	$("#answerExplanation").addClass("hidden");
}		

function generateNewGame(){
	generateFigure();
	resetAnswer();
}

function compileMathJaxCode(){
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
