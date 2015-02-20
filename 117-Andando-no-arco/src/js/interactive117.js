var d = 8; // padding until figure.
var d1 = 2;// distance until quotes infos
var x_A, y_A, x_B, y_B, x_P, y_P ;
var x, y, d;

var MAX_X, MAX_Y;

var A, B, O, P;
var MIN_ANGLE = Math.PI/3; // 60 degrees
var DELTA_ANGLE = Math.PI/3; // 60 degrees
var qboard, arc;
var r=10, theta; // theta 0 to 180. Means half of supplementary angle of our arc
var t1, t2, t3;


var showingSolution;

function generateFigure(){

	// 2*theta defines arc
	theta = MIN_ANGLE + Math.random()*DELTA_ANGLE; // 60 < theta < 120

	qboard = JXG.JSXGraph.initBoard('questionJXGBox', {boundingbox: [ -(r+d), r+d1, r+d, -(r+d)],  keepaspectratio: true, showcopyright: false});

	// center of circle
	O = qboard.create('point', [0, 0], {name: "O", color:'blue', fixed:true, visible:false});

	A = qboard.create('point', [-r*Math.sin(theta), -r*Math.cos(theta)], {name: "A", color:'blue', fixed:true, label:{offset:[-15, 0]}});
	B = qboard.create('point', [r*Math.sin(theta), -r*Math.cos(theta)], {name: "B", color:'blue', fixed:true, label:{offset:[10, 0]}});

	arc = qboard.create('arc', [O, B, A], {strokeColor:'black'});

	// Where in the arc will be located P.
	beta = 	theta + Math.random()*2*(Math.PI - theta); //beta should be inside the arc
	console.log("theta "+theta+" ou "+theta*180/Math.PI);
	console.log("beta "+beta+" ou "+beta*180/Math.PI);

	P = qboard.create('point', [r*Math.sin(beta), -r*Math.cos(beta)], {name: "P", color:'red', label:{offset:[-15, 10]}});

	alpha = qboard.create('angle', [A,P,B], {name: "&alpha;", color: 'blue', type:'sector', orthoType:'square', orthoSensitivity:2, radius:1})

	// make P only walk on arc.
	P.makeGlider(arc);

	PA = qboard.create('segment', [P, A], {color:'green'});
	PB = qboard.create('segment', [P, B], {color:'green'});

	t1 = qboard.create('text',[-r, -r, "<span style='text-decoration:overline'>PA</span> = "+dist(P,A).toFixed(2)], {fixed:true});

	t2 = qboard.create('text',[-r, -(r+d1), "<span style='text-decoration:overline'>PB</span> = "+dist(P,B).toFixed(2)], {fixed:true});	

	t3 = qboard.create('text',[-r, -(r+2*d1), "<span style='text-decoration:overline'>PA</span> * <span style='text-decoration:overline'>PB</span> = "+(dist(P,A)*dist(P,B)).toFixed(2)], {fixed:true});

	t4 = qboard.create('text',[-r, -(r+3*d1), "&alpha; = "+(alpha.Value()*180.0/Math.PI).toFixed(2)+"&deg;"], {fixed:true});	

	t5 = qboard.create('text',[0, -r, "max(<span style='text-decoration:overline'>PA</span> * <span style='text-decoration:overline'>PB</span>) = ?"], {fixed:true});

	mouseMovements();
}

function mouseMovements(){
	//when P moves along arc, recalculate PA, PB and PA*PB
	P.on("drag", function(){
		t1.remove();
		t1 = qboard.create('text',[-r, -r, "<span style='text-decoration:overline'>PA</span> = "+dist(P,A).toFixed(2)], {fixed:true});
	
		t2.remove();
		t2 = qboard.create('text',[-r, -(r+d1), "<span style='text-decoration:overline'>PB</span> = "+dist(P,B).toFixed(2)], {fixed:true});

		t3.remove();
		t3 = qboard.create('text',[-r, -(r+2*d1), "<span style='text-decoration:overline'>PA</span> * <span style='text-decoration:overline'>PB</span> = "+(dist(P,A)*dist(P,B)).toFixed(2)], {fixed:true});
	});
}

function dist(A, B){
	dx = A.X() - B.X();
	dy = A.Y() - B.Y();
	return Math.sqrt(dx*dx + dy*dy);
}

function generateSolutionInfosOnImage(){

	//yellow solution
	M = qboard.create('point', [0, r], {name: "M", color:'yellow', fixed:true, label:{offset:[0, 10]}});

	MA = qboard.create('segment', [M, A], {color:'yellow', fixed:true});
	MB = qboard.create('segment', [M, B], {color:'yellow', fixed:true});

	AB = qboard.create('segment', [A, B], {color:'black', fixed:true});

	//solution parallel and height
	x = qboard.create('parallel', [M, AB], {color:'yellow', fixed:true});
	z = qboard.create('perpendicularsegment', [M, AB], {color:'yellow', fixed:true, dash:2});

	// P parallel and height
	y = qboard.create('parallel', [P, AB], {color:'green', fixed:true});
	w = qboard.create('perpendicularsegment', [P, AB], {name:"h", color:'green', fixed:true, dash:2, withLabel:true, label:{position:'rgt'}});

	t5.remove();
	t5 = qboard.create('text',[0, -r, "<span style='text-decoration:overline'>MA</span> = "+dist(M,A).toFixed(2)], {fixed:true});

	t6 = qboard.create('text',[0, -(r+d1), "<span style='text-decoration:overline'>MB</span> = "+dist(M,B).toFixed(2)], {fixed:true});	

	t7 = qboard.create('text',[0, -(r+2*d1), "max(<span style='text-decoration:overline'>PA</span> * <span style='text-decoration:overline'>PB</span>) = <span style='text-decoration:overline'>MA</span> * <span style='text-decoration:overline'>MB</span> = "+(dist(M,A)*dist(M,B)).toFixed(2)], {fixed:true});
	
}

function generateSolution(){
	showingSolution=true;
	generateSolutionInfosOnImage();
	compileMathJaxCode();
}

function showAnswer(){
	$("#showAnswer").attr("disabled",true);
	$("#answerExplanation").removeClass("hidden");
	$("#answerExplanation").html("<b>Solução:</b><br/>"+
	"<div class='justify'>Analisando a área do &Delta;PAB de 2 maneiras distintas relativas ao lado <span style='text-decoration:overline'>AB</span>:</div>"+
	"<div class='center'>`[&Delta;PAB] = (AB*h)/2` <span class='tab'/>(I)</div>"+
	"<br/>"+
	"<div class='center'>`[&Delta;PAB] = (PA * PB * sen&alpha;)/2` <span class='tab'/>(II)</div>"+
	"<div class='justify'>Assim:</div> "+
	"<div class='center'>`max(PA * PB) = max( (AB * h)/(sen&alpha;))  = (AB)/(sen&alpha;)*max(h)`</div>"+
	"<br/>"+
	"<div class='justify'>Assim, para conseguirmos o máximo do produto `PA * PB`, basta que maximizemos o termo da direita. Como &alpha; e <span style='text-decoration:overline'>AB</span> são constantes, basta, então, que maximizemos a única variável h. Logo, o produto será máximo na maior altura do arco, ou seja, em seu ponto médio M representado na figura.</div>");
	generateSolution();
}

function resetAnswer(){
	showingSolution=false;
	$("#showAnswer").attr("disabled",false);
	$("#answerExplanation").addClass("hidden");
}	

function compileMathJaxCode(){
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

function generateNewGame(){
	generateFigure();
	resetAnswer();
}
