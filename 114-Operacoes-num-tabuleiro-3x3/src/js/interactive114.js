var d=1, l=5, h;

var A, B, C;
var AB, BC, CA;
var P;
var qboard;
var x,y,z;
var a,b;
var Q, G, H, I;
var QG, GH, HI;

var showingSolution;

function generateTriangle(){
	
	h=l*Math.sqrt(3)/2;
	qboard = JXG.JSXGraph.initBoard('questionJXGBox', {boundingbox: [-d, h+d, l+3*d, -d],  keepaspectratio: true, showcopyright: false});

	//vertices of triangle
	A = qboard.create('point', [0,0], {name: "A", color:'blue', fixed:true, label:{offset:[-10,-10]}});
	B = qboard.create('point', [l, 0], {name: "B", color:'blue', fixed:true});
	C = qboard.create('point', [l/2, h], {name: "C", color:'blue', fixed:true});	
	
	//sides of triangle
	AB = qboard.create('segment', [A, B], {color:'black', fixed:true});
	BC = qboard.create('segment', [B, C], {color:'black', fixed:true});
	CA = qboard.create('segment', [C, A], {color:'black', fixed:true});
	
}

function generateRandomInnerPoint(){
	minPercent = 0.2;
	maxPercent = 0.8;
	//random factor
	
	do{
		a = Math.random();
	}
	while(a < minPercent||
		a > maxPercent);
	do{
		b = Math.random();
	}
	while(b < minPercent||
		b > maxPercent);

	if(a<=1/2){
		b=b*h*2*a;
		a=a*l;
	}
	else{
		b=b*h*2*(1-a);
		a=a*l;
	}
	P = qboard.create('point', [a, b], {name: "P", color:'red', fixed:false, label:{offset:[0, 15]}});

	generateProjections();

	P.on("drag", function(){
		clearElements();
		generateProjections();
	});

}

function generateProjections(){
	
	//projections to sides
	D = qboard.create('perpendicularpoint', [P, BC], {name:"D", withLabel:true, color:'green'});
	E = qboard.create('perpendicularpoint', [P, CA], {name:"E", withLabel:true, color:'green', label:{offset:[-15,0]}});
	F = qboard.create('perpendicularpoint', [P, AB], {name:"F", withLabel:true, color:'green', label:{offset:[0,-15]}});

	//projections of inner rectangle vertices to the sides
	PD = qboard.create('segment', [P, D], {name:"x", withLabel:true, color:'violet', label:{offset:[0, 10]}});
	PE = qboard.create('segment', [P, E], {name:"y", withLabel:true, color:'yellow'});
	PF = qboard.create('segment', [P, F], {name:"z", withLabel:true, color:'cyan'});

	x = distance(P, D);
	y = distance(P, E);
	z = distance(P, F);

	if(showingSolution){

		//points of the resulting sum of projection segments.
		Q = qboard.create('point', [l+2*d, 0], {name:"Q", withLabel:false, fixed:true, color:'blue'});
		G = qboard.create('point', [l+2*d, z], {name:"G", withLabel:false, fixed:true, color:'cyan'});
		H = qboard.create('point', [l+2*d, z+y], {name:"H", withLabel:false, fixed:true, color:'yellow'});
		I = qboard.create('point', [l+2*d, z+y+x], {name:"I", withLabel:false, fixed:true, color:'violet'});

		J = qboard.create('point', [l+2*d, h], {color:'violet', withLabel:false, fixed:true});

		// projection segments.
		QG = qboard.create('segment', [Q, G], {name:"z", withLabel:true, color:'cyan', label:{offset:[-20, 0]}});
		GH = qboard.create('segment', [G, H], {name:"y", withLabel:true, color:'yellow', label:{offset:[-20, 0]}});
		HI = qboard.create('segment', [H, I], {name:"x", withLabel:true, color:'violet', label:{offset:[-20, 0]}});
		
		//dashed segments limiting height
		CJ = qboard.create('segment', [C, J], { color:'black', dash:2});
		BQ = qboard.create('segment', [B, Q], { color:'black', dash:2});
	}	
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

	if(showingSolution){

		Q.remove();
		G.remove();
		H.remove();
		I.remove();

		QG.remove();
		GH.remove();
		HI.remove();	

		CJ.remove();
		BQ.remove();
	}
}

function generateSolution(){
	showingSolution=true;
	generateProjections();
}

function showAnswer(){
	$("#showAnswer").attr("disabled",true);
	$("#answerExplanation").removeClass("hidden");
	$("#answerExplanation").html("<b>Solução:</b><br/>"+
	"<div class='justify'>Note que:</div>"+
	"<div class='center'>[ABC] = [PAB] + [PBC] + [PCA]</div>"+
	"<div class='justify'>Onde [XYZ] é a área do triângulo XYZ.</div>"+
	"<div class='justify'>Como a área do triangulo é a metade do produto da base pela altura: </div>"+
	"<div class='center'>`(l*h)/2` = `(l*z)/2` + `(l*x)/2` + `(l*y)/2`</div>"+
	"<div class='justify'>Logo:</div>"+
	"<div class='center'>`h = z + x + y`</div>"+
	"<div class='justify'>Movimente o ponto P, na figura, agora com a solução explícita.</div>");
	generateSolution();
	compileMathJaxCode();
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
	resetAnswer();
	generateTriangle();
	generateRandomInnerPoint()
}
