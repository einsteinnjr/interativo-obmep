var d = 8; // padding until figure.
var d1 = 2;// distance until quotes infos
var x_A, y_A, x_B, y_B, x_P, y_P ;
var x, y, d;

var MAX_X, MAX_Y;

var A, B, O, P;
var MIN_ANGLE = Math.PI/6; // 30 degrees
var DELTA_ANGLE = 2*Math.PI/3; // 120 degrees
var r=10;
var qboard;
var t1, t2, t3;

var is1stSolution;
var detailedAnswer;

var showingSolution;

function generateFigure(){

	// theta defines where C will be located in the semicircle
	theta = MIN_ANGLE + Math.random()*DELTA_ANGLE; // 30 < theta < 150

	qboard = JXG.JSXGraph.initBoard('questionJXGBox', {boundingbox: [ -(r+d1), r+d1, r+d1, -(d1)],  keepaspectratio: true, showcopyright: false});

	// center of circle
	O = qboard.create('point', [0, 0], {name: "O", color:'blue', fixed:true, visible:false});

	A = qboard.create('point', [-r, 0], {name: "A", color:'blue', fixed:true, label:{offset:[-15, 0]}});
	B = qboard.create('point', [r, 0], {name: "B", color:'blue', fixed:true, label:{offset:[10, 0]}});

	arc = qboard.create('arc', [O, B, A], {strokeColor:'black'});

	console.log("theta "+theta+" ou "+theta*180/Math.PI);

	C = qboard.create('point', [r*Math.cos(theta), r*Math.sin(theta)], {name: "C", color:'red', label:{offset:[-15, 10]}});

	// make C only walk on the semicircle
	C.makeGlider(arc);

	//sides
	CA = qboard.create('segment', [C, A], {color:'black', strokeWidth:1});
	CB = qboard.create('segment', [C, B], {color:'black', strokeWidth:1});
	AB = qboard.create('segment', [A, B], {color:'black', strokeWidth:1});

	//height
	D = qboard.create('perpendicularpoint', [C, AB], {color:'blue', strokeWidth:1});
	CDA = qboard.create('angle', [C, D, A], {withLabel:false, color: 'blue', type:'sector', orthoType:'square', orthoSensitivity:2, radius:0.7});

	//midpoint
	M = qboard.create('midpoint', [A, B], {name:"M", color:'blue', strokeWidth:1});

	//midarc
	BMC = qboard.create('angle', [B, M, C], {strokeColor:'black', visible:false});

	//bisector
	bisector = qboard.create('bisector', [A, C, B], {color:'red', strokeWidth:1, visible:false});
	E = qboard.create('intersection', [bisector, AB], {color:'blue', strokeWidth:1});

	//cevian points
	//height
	CD = qboard.create('segment', [C, D], {color:'green', strokeWidth:1});
	//median
	CM = qboard.create('segment', [C, M], {color:'green', strokeWidth:1});
	//bisector
	CE = qboard.create('segment', [C, E], {color:'red', strokeWidth:1});
		
	//angles
	plotDesiredAnglesAndInfos();
	C.on("drag", function(){
		if(!showingSolution){
			cleanAnglesAndInfos();
			plotDesiredAnglesAndInfos();
		}
		else{
			cleanSolutionAnglesAndInfos();
			plotSolutionAnglesAndInfos();
		}
	});
}

function plotDesiredAnglesAndInfos(){
	if(BMC.Value()*180/Math.PI < 90){ //C on 1st quadrant
		ECD = qboard.create('angle', [E, C, D], {withLabel:false, color: 'green', type:'sector', orthoType:'square', orthoSensitivity:2, radius:2});
		ECM = qboard.create('angle', [M, C, E], {withLabel:false, color: 'green', type:'sector', orthoType:'square', orthoSensitivity:2, radius:2.5});
	}
	else{ //C on 2nd quadrant
		ECD = qboard.create('angle', [D, C, E], {withLabel:false, color: 'green', type:'sector', orthoType:'square', orthoSensitivity:2, radius:2});
		ECM = qboard.create('angle', [E, C, M], {withLabel:false, color: 'green', type:'sector', orthoType:'square', orthoSensitivity:2, radius:2.5});
	}
	t1 = qboard.create('text',[-r, -d1, "&ang;ECD = "+(ECD.Value()*180.0/Math.PI).toFixed(2)], {fixed:true});

	t2 = qboard.create('text',[-r, -2*d1, "&ang;ECM = "+(ECD.Value()*180.0/Math.PI).toFixed(2)], {fixed:true});//some rounding error. Changed to equal ECD value.
}

function cleanAnglesAndInfos(){
	ECD.remove();
	ECM.remove();
	t1.remove();
	t2.remove();
}

function dist(A, B){
	dx = A.X() - B.X();
	dy = A.Y() - B.Y();
	return Math.sqrt(dx*dx + dy*dy);
}

function cleanSolutionAnglesAndInfos(){
	//use X to not rely on which side it is.
	CXD.remove();
	DCX.remove();
	XCM.remove();
	MXC.remove();
}

function plotSolutionAnglesAndInfos(){

	if(BMC.Value()*180/Math.PI < 90){//C on 1st quadrant
		CXD = qboard.create('angle', [C, B, D], {name:"&beta;", color: 'blue', type:'sector', orthoType:'square', orthoSensitivity:2, radius:2});
		DCX = qboard.create('angle', [D, C, B], {name:"&alpha;", color: 'pink', type:'sector', orthoType:'square', orthoSensitivity:2, radius:2});
		XCM = qboard.create('angle', [A, C, M], {name:"&alpha;", color: 'pink', type:'sector', orthoType:'square', orthoSensitivity:2, radius:2});
		MXC = qboard.create('angle', [M, A, C], {name:"&alpha;", color: 'pink', type:'sector', orthoType:'square', orthoSensitivity:2, radius:2});

	}
	else{//C on 2nd quadrant
		CXD = qboard.create('angle', [D, A, C], {name:"&alpha;", color: 'pink', type:'sector', orthoType:'square', orthoSensitivity:2, radius:2});
		DCX = qboard.create('angle', [A, C, D], {name:"&beta;", color: 'blue', type:'sector', orthoType:'square', orthoSensitivity:2, radius:2});
		XCM = qboard.create('angle', [M, C, B], {name:"&beta;", color: 'blue', type:'sector', orthoType:'square', orthoSensitivity:2, radius:2});
		MXC = qboard.create('angle', [C, B, M], {name:"&beta;", color: 'blue', type:'sector', orthoType:'square', orthoSensitivity:2, radius:2});
	}
}

function generateSolution(){
	showingSolution=true;
	plotSolutionAnglesAndInfos();
}

function showAnswer(){
	cleanAnglesAndInfos();
	generateSolution();
	$("#showAnswer").attr("disabled",true);
	$("#answerExplanation").removeClass("hidden");
	$("#answerExplanation").html("<b>Solução:</b><br/>"+
	"<div class='justify'>O &Delta;ABC é retângulo em C, assim, temos: "+
	"<div class='center'>&ang;CAB = &alpha; ,<span class='tab'/> &ang;CBA = &beta; <span class='tab'/> e <span class='tab'/>&alpha; + &beta; = 90&deg;</div>"+
	"<div class='justify'>Como CD é altura do &Delta;ACB:</div>"+
	"<div class='center'>&Delta;CDB ~ &Delta;ACB &rArr; &ang;DCB = &alpha;</div>"+
	"<div class='center'>&Delta;ADC ~ &Delta;ACB &rArr; &ang;DCA = &beta;</div>"+
	"<div class='justify'>Como &ang;ACB é reto, <span style='text-decoration:overline'>AB</span> é diâmetro do circuncirculo de &Delta;ABC. Como M é ponto médio de <span style='text-decoration:overline'>AB</span> e, portanto, de um diâmetro do circuncículo, M é o centro da circunferência circunscrita a &Delta;ABC. Assim:</div>"+
	"<div class='center'><span style='text-decoration:overline'>MA</span> = <span style='text-decoration:overline'>MB</span> = <span style='text-decoration:overline'>MC</span></div>"+
	"<div class='justify'>Logo:</div>"+
	"<div class='center'>&Delta;AMC é isósceles em M &rArr; &ang;CAM = &ang; ACM = &alpha;  </div>"+
	"<div class='center'>&Delta;BMC é isósceles em M &rArr; &ang;CBM = &ang; BCM = &beta;  </div>"+
	"<div class='justify'>Como CE é bissetriz do &ang;ACB:</div>"+
	"<div class='center'>&ang;ACE = &ang;BCE = 45&deg;</div>"+
	"<div class='justify'>Supondo &alpha; < &beta; (C no 1&deg; quadrante. O outro caso é análogo):</div>"+
	"<div class='center'>&ang;ECM = &ang;ECA - &ang;MCA = 45&deg; - &alpha; </div>"+
	"<div class='center'>&ang;ECD = &ang;ECB - &ang;DCB = 45&deg; - &alpha; </div>"+
	"<div class='justify'>Assim:</div>"+
	"<div class='center'>&ang;ECM = &ang;ECD </div>"+
	"<div class='justify'>Um resultado mais geral: Escolhido um vértice de um triângulo qualquer, a reta que o liga ao circuncentro é isogonal a altura relativa a esse vértice. (2 retas são 'isogonais' se passam pelo mesmo vértice e são simétricas em relação à bissetriz do ângulo interno a esse vértice). Você consegue provar? </div>"+
	"<div class='justify'>Nesse interativo, como o ponto médio M da hipotenusa é o circuncentro, estamos analisando um caso particular aplicado a triângulos retângulos.");
	
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
