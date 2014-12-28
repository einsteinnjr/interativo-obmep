
var p=3, q=5, min=0.1;
var x=1, alfa;


function generateRectangle(){

	alfa = min+Math.random()*(1-2*min);

	var qboard = JXG.JSXGraph.initBoard('questionJXGBox', {boundingbox: [-x, p+x, q+x, -x],  keepaspectratio: true, showcopyright: false});

	//vertices
	var P = qboard.create('point', [0, p], {name: "P", color:'blue', fixed:true});
	var Q = qboard.create('point', [q, p], {name: "Q", color:'blue', fixed:true});
	var R = qboard.create('point', [q, 0], {name: "R", color:'blue', fixed:true});	
	var S = qboard.create('point', [0, 0], {name: "S", color:'blue', fixed:true});

	//sides
	var PQ = qboard.create('segment', [P, Q], {color:'black', fixed:true});
	var QR = qboard.create('segment', [Q, R], {color:'black', fixed:true});
	var RS = qboard.create('segment', [R, S], {color:'black', fixed:true});
	var SP = qboard.create('segment', [S, P], {color:'black', fixed:true});

	//diagonal
	var PR = qboard.create('segment', [P, R], {color:'black', fixed:true});

	//make M run only above diagonal PR
	var M = qboard.create('point', [q*alfa, p*(1-alfa)], {name: "M", color:'red'});	
	M.makeGlider(PR);

	//projections of M on sides
	var X = qboard.create('perpendicularpoint', [M, PQ], {name:"X", withLabel:true, color:'yellow'});
	var Y = qboard.create('perpendicularpoint', [M, QR], {name:"Y", withLabel:true, color:'yellow'});
	var Z = qboard.create('perpendicularpoint', [M, RS], {name:"Z", withLabel:true, color:'yellow'});
	var W = qboard.create('perpendicularpoint', [M, SP], {name:"W", withLabel:true, color:'yellow'});

	//rectangles in question
	var rectangleA = qboard.create('polygon', [M, Z, S, W], {name: "A",withLabel:true});
	var rectangleB = qboard.create('polygon', [M, X, Q, Y], {name: "B",withLabel:true});
		
}

function showAnswer(){
	$("#showAnswer").attr("disabled",true);
	$("#answerExplanation").removeClass("hidden");
	$("#answerExplanation").html("<b>Solução:</b><br/>"+
	"Note que os triângulos PXM e MYN são semelhantes (triângulos retângulos com lados paralelos). O que signfica que seus lados correspondentes são proporcionais:<br/>"+
	"<div class='center'>`(PX)/(XM)` = `(MY)/(YR)` => `PX * YR = MY * XM`</div><br/>"+
	"Note ainda que: <br/>"+
	"<div class='center'>`PX = WM`, `YR = MZ`</div><br/>"+
	"Assim: <br/>"+
	"<div class='center'>`[WMZS] = WM*MZ = MY*XM = [MYQX]`</div><br/>"+
	"Onde [ABCD] é a área do retângulo formado pelos pontos A, B, C e D.<br/>"+
	"Assim, a área do retângulo A é igual a área do retângulo B, para qualquer que seja o ponto M na diagonal PR.");
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
	generateRectangle();
}
