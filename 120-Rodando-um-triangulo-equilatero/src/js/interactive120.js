var d = 6; // padding until figure.

var r=10;

var MIN_ANGLE = -Math.PI/2;
var DELTA_ANGLE = Math.PI;

var qboard;
var t1, t2
var c;


var showingSolution;

function generateFigure(){

	qboard = JXG.JSXGraph.initBoard('questionJXGBox', {boundingbox: [-(r+d), r+d, r+d, -(r+d)],  keepaspectratio: true, showcopyright: false});

	//vertices
	A = qboard.create('point', [-r, 0], {name: "A", color:'blue', fixed:true, label:{offset:[-15, 0]}});
	B = qboard.create('point', [-r/2, r*Math.sqrt(3)/2], {name: "B", color:'blue', fixed:true, label:{offset:[-20, 0]}});
	C = qboard.create('point', [0, 0], {name: "C", color:'blue', fixed:true, label:{offset:[0, -15]}});

	//sides
	AB = qboard.create('segment', [A, B], {color:'black', fixed:true});
	BC = qboard.create('segment', [B, C], {color:'black', fixed:true});
	CA = qboard.create('segment', [C, A], {color:'black', fixed:true});

	theta = MIN_ANGLE+ Math.floor(Math.random()*(DELTA_ANGLE)); 
	
	//vertices
	E = qboard.create('point', [r*Math.cos(theta), r*Math.sin(theta)], {name: "E", color:'red'});
	D = qboard.create('point', [function(){return E.X()/2 - E.Y()*Math.sqrt(3)/2}, function(){return E.X()*Math.sqrt(3)/2 + E.Y()/2} ], {name: "D", color:'blue'});

	//circunference
	c = qboard.create('circle', [C, r], {strokeColor:"blue", strokeWidth:1, dash:2, visible:false});

	B1 = qboard.create('point', [r/2, r*Math.sqrt(3)/2], {name: "B", color:'blue', fixed:true, visible: false});

	//major arc
	arcBB1 = qboard.create('arc', [C, B, B1], {visible:false});

	//make D move only on circunference c
	E.makeGlider(arcBB1);
	
	//sides
	CD = qboard.create('segment', [C, D], {color:'black', fixed:true});
	DE = qboard.create('segment', [D, E], {color:'black', fixed:true});
	EC = qboard.create('segment', [E, C], {color:'black', fixed:true});

	AE = qboard.create('segment', [A, D], {color:'black', fixed:true, strokeWidth:1});

	alpha = qboard.create('angle', [D, C, B], {name: "&alpha;", color: 'pink', type:'sector', orthoType:'square', orthoSensitivity:2, radius:3});	
	beta = qboard.create('angle', [D, A, B], {name: "&beta;", color: 'blue', type:'sector', orthoType:'square', orthoSensitivity:2, radius:3});


	t1 = qboard.create('text',[-r, -(r+1), "&alpha; = "+(alpha.Value()*180.0/Math.PI).toFixed(2)+"&deg;"], {fixed:true});
	t2 = qboard.create('text',[-r, -(r+3), "&beta; = "+(beta.Value()*180.0/Math.PI).toFixed(2)+"&deg;"], {fixed:true});

	E.on("drag", function(){
		t1.remove();
		t2.remove();
	
		t1 = qboard.create('text',[-r, -(r+1), "&alpha; = "+(alpha.Value()*180.0/Math.PI).toFixed(2)+"&deg;"], {fixed:true});
		t2 = qboard.create('text',[-r, -(r+3), "&beta; = "+(beta.Value()*180.0/Math.PI).toFixed(2)+"&deg;"], {fixed:true});
	});
}

function dist(A, B){
	dx = A.X() - B.X();
	dy = A.Y() - B.Y();
	return Math.sqrt(dx*dx + dy*dy);
}

function generateSolutionInfosOnImage(){
	c.setAttribute({
		visible:true
	});
}

function generateSolution(){
	showingSolution=true;
	generateSolutionInfosOnImage();
}

function showAnswer(){
	$("#showAnswer").attr("disabled",true);
	$("#answerExplanation").removeClass("hidden");
	$("#answerExplanation").html("<b>Solução:</b><br/>"+
	"<div class='justify'>Como os &Delta;ABC e &Delta;CDE são equiláteros e congruentes, todos seus lados são iguais entre si, em particular:</div>"+
	"<div class='center'><span style='text-decoration:overline'>CA</span> = <span style='text-decoration:overline'>CB</span> = <span style='text-decoration:overline'>CD</span> = <span style='text-decoration:overline'>CE</span> = l <span class='tab'>(I)</span> </div>"+
	"<div class='justify'>Por isso, a circunferência com centro em C e raio l passa nos pontos A, B, D e E (como mostrado na figura). Note então que o ângulo &ang;DCB = &alpha; é um ângulo central relativo ao arco menor BD e o ângulo &ang;DAB = &beta; um ângulo inscrito referente ao mesmo arco BD. Por definição:</div>"+
	"<div class='center'>&ang;DCB = &alpha; = 2*&beta; = &ang;DAB. </div>"+
	"<div class='justify'>Mova o ponto E para um melhor entendimento.</div>");
	generateSolution();
}

function resetAnswer(){
	showingSolution=false;
	$("#showAnswer").attr("disabled",false);
	$("#answerExplanation").addClass("hidden");
}	

function generateNewGame(){
	generateFigure();
}
