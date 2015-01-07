var x, y, z, w;
var a, b, max_ab;
var d;
var d1, d2, d3;
var qboard;
var A,B,C,D;
var AB, BC, CD, DA;
var E, F, G, H;
var EF, FG, GH, HE;
var AE, BF, CG, DH;
var s1, s2;


function generateVariablesInitialValues(){
	x=4, y=5, z=4, w=6;
	a=2, b=5, max_ab=5;
	d=3;
	d1=10, d2=20, d3=30;
}

function generateRectangle(){

	//  d1  ___|_x_   d3
	//  _z_|__b___|___w___
	//     |______|a
	//  d2     |y     p

	qboard = JXG.JSXGraph.initBoard('questionJXGBox', {boundingbox: [-d, x+y+max_ab+d, z+w+max_ab+d, -2*d],  keepaspectratio: true, showcopyright: false});
		
	// sliders a, b
	s1 = qboard.create('slider', [[1, -1], [3, -1], [0, a, max_ab]], {name:"a", snapWidth: 1});
	s2 = qboard.create('slider', [[1, -2], [3, -2], [0, b, max_ab]], {name:"b", snapWidth: 1});

	generateBoardAndItsElements();

	s1.on("drag", function(){
		a=s1.Value();
		cleanElements();
		generateBoardAndItsElements();
	});

	s2.on("drag", function(){
		b=s2.Value();
		cleanElements();
		generateBoardAndItsElements();
	});

}

function generateBoardAndItsElements(){
	
	//vertices outer rectangle
	A = qboard.create('point', [0, x+a+y], {name: "A", color:'blue', fixed:true});
	B = qboard.create('point', [0, 0], {name: "B", color:'blue', fixed:true});
	C = qboard.create('point', [z+b+w, 0], {name: "C", color:'blue', fixed:true});	
	D = qboard.create('point', [z+b+w, x+a+y], {name: "D", color:'blue', fixed:true});

	//sides outer rectangle
	AB = qboard.create('segment', [A, B], {color:'black', fixed:true});
	BC = qboard.create('segment', [B, C], {color:'black', fixed:true});
	CD = qboard.create('segment', [C, D], {color:'black', fixed:true});
	DA = qboard.create('segment', [D, A], {color:'black', fixed:true});

	//vertices inner rectangle
	E = qboard.create('point', [z, a+y], {name: "E", color:'blue', fixed:true});
	F = qboard.create('point', [z, y], {name: "F", color:'blue', fixed:true});
	G = qboard.create('point', [z+b, y], {name: "G", color:'blue', fixed:true});	
	H = qboard.create('point', [z+b, a+y], {name: "H", color:'blue', fixed:true, label:{offset:[-10,10]}});

	//sides inner rectangle
	EF = qboard.create('segment', [E, F], {color:'black', fixed:true});
	FG = qboard.create('segment', [F, G], {name:"b", withLabel:true, color:'black', fixed:true});
	GH = qboard.create('segment', [G, H], {name:"a", withLabel:true, color:'black', fixed:true});
	HE = qboard.create('segment', [H, E], {color:'black', fixed:true});

	//segments
	AE = qboard.create('segment', [A, E], {name:d1, withLabel:true, color:'green', fixed:true});
	BF = qboard.create('segment', [B, F], {name:d2, withLabel:true, color:'green', fixed:true});
	CG = qboard.create('segment', [C, G], {name:'p', withLabel:true, color:'green', fixed:true});
	DH = qboard.create('segment', [D, H], {name:d3, withLabel:true, color:'green', fixed:true,  label:{position:'lft', offset:[40,40]}});

}

function cleanElements(){
	A.remove();
	B.remove();
	C.remove();
	D.remove();

	AB.remove();
	BC.remove();
	CD.remove();
	DA.remove();

	E.remove();
	F.remove();
	G.remove();
	H.remove();

	EF.remove();
	FG.remove();
	GH.remove();
	HE.remove();

	AE.remove();
	BF.remove();
	CG.remove();
	DH.remove();
}

function generateSolution(){
	s1.moveTo([1,-1]);
	s2.moveTo([1,-2]);

	a=s1.Value();
	b=s2.Value();
	cleanElements();
	generateBoardAndItsElements();

	//projections of E on sides
	var X = qboard.create('perpendicularpoint', [E, DA], {name:"X", withLabel:true, color:'yellow'});
	var Y = qboard.create('perpendicularpoint', [E, AB], {name:"Y", withLabel:true, color:'yellow'});
	var Z = qboard.create('perpendicularpoint', [E, BC], {name:"Z", withLabel:true, color:'yellow'});
	var W = qboard.create('perpendicularpoint', [E, CD], {name:"W", withLabel:true, color:'yellow'});
	
	//projections heights from E to sides
	var EX = qboard.create('segment', [E, X], {name:"x", withLabel:true, color:'yellow'});
	var EY = qboard.create('segment', [E, Y], {name:"y", withLabel:true, color:'yellow'});
	var EZ = qboard.create('segment', [E, Z], {name:"z", withLabel:true, color:'yellow'});
	var EW = qboard.create('segment', [E, W], {name:"w", withLabel:true, color:'yellow'});
	
}

function showAnswer(){
	$("#showAnswer").attr("disabled",true);
	$("#answerExplanation").removeClass("hidden");
	$("#answerExplanation").html("<b>Solução:</b><br/>"+
	"<div class='justify'>Realizando algumas transformações geométricas na figura, podemos deixar o problema mais simples, sem alterar a sua essência. Ao movimentar ambos os sliders, podemos modificar o tamanho dos lados do retângulo EFGH, mantendo o problema similar. Ao zerarmos o slider 'a', fazemos o segmento EH coincidir com FG. Ao zerarmos o slider 'b', fazemos todos os vértices do retângulo EFGH coincidirem em um mesmo ponto. Sejam P o novo ponto obtido pelo colapso de E , H , G e F e x, y, z e w as suas distâncias aos lados do retângulo. Utilizando o Teorema de Pitágoras nos triângulos AEP, BFP, GCP e DHP: </div>"+
	"<div class='center'>`AE^2 = AP^2 = x^2 + z^2`</div>"+
	"<div class='center'>`BF^2 = PB^2 = z^2 + y^2`</div>"+
	"<div class='center'>`GC^2 = PC^2 = y^2 + w^2`</div>"+
	"<div class='center'>`DH^2 = PD^2 = x^2 + w^2`</div>"+
	"Assim:"+
	"<div class='center'>`AE^2 + GC^2 = x^2 + z^2 + y^2+ w^2`</div>"+
	"<div class='center'>`= DH^2 + BF^2`</div>"+
	"<div class='center'>`= "+d3*d3+" + "+d2*d2+"`</div>"+
	"Daí:<br/>"+
	"<div class='center'>`p = GC = sqrt["+d3*d3+"+"+d2*d2+"-"+d1*d1+"]`</div>"+
	"<div class='center'>`= "+Math.sqrt(d3*d3+d2*d2+d1*d1).toPrecision(4)+"`</div>");
	generateSolution();
	compileMathJaxCode();
}

function resetAnswer(){
	$("#showAnswer").attr("disabled",false);
	$("#answerExplanation").addClass("hidden");
}	

function compileMathJaxCode(){
	MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

function generateNewGame(){
	resetAnswer();
	generateVariablesInitialValues();
	generateRectangle();
}