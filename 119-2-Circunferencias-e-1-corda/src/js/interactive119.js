var d = 6; // padding until figure.
var d1 = 2;// distance until quotes infos
var x_A, y_A, x_B, y_B, x_P, y_P ;
var x, y, d;

var MIN_R = 10;

var A, B, O, P, C;
var qboard;
var t1;
var answer;


var showingSolution;

function generateFigure(){

	r1 = MIN_R+ Math.floor(Math.random()*MIN_R);
	r2 = MIN_R+ Math.floor(Math.random()*MIN_R);
	dist = 3*(r1+r2)/4; //d is the distance between centers.

	maxR = Math.max(r1,r2);

	qboard = JXG.JSXGraph.initBoard('questionJXGBox', {boundingbox: [-(d+r1), maxR+d, dist+r2+d, -(maxR+d)],  keepaspectratio: true, showcopyright: false});

	O1 = qboard.create('point', [0, 0], {fixed:true, visible:false});
	O2 = qboard.create('point', [dist, 0], {fixed:true, visible:false});

	//circles c1 and c2
	c1 = qboard.create('circle', [O1, r1], {name:"c1", withLabel:"true", strokeColor:"black", strokeWidth:1, fixed:true, label:{offset:[-45, 40]}});
	c2 = qboard.create('circle', [O2, r2], {name:"c2", withLabel:"true", strokeColor:"black", strokeWidth:1, fixed:true});

	//intersection points of circles
	A = qboard.create('intersection', [c1, c2], {name:"A", color:"blue", fixed:true, label:{offset:[0, -15]}});
	B = qboard.create('otherintersection', [c1, c2, A], {name:"B", color:"blue", fixed:true, label:{offset:[0, 15]}});

	//c2 radius related to A and B, intersection points
	O2B = qboard.create('line', [O2, B], { fixed:true, visible:false});
	O2A = qboard.create('line', [O2, A], { fixed:true, visible:false});

	//tangent lines to c2 related to A and B
	tangA = qboard.create('perpendicular', [O2A, A], {strokeColor:"black", fixed:true, withLabel:false,  visible:false});	
	tangB = qboard.create('perpendicular', [O2B, B], {strokeColor:"black", fixed:true, withLabel:false,  visible:false});
	

	//E and F are points on C1, that make C and D still on bigger arc AB on c2.
	E = qboard.create('otherintersection', [tangA, c1, A], {strokeColor:"black", fixed:true, withLabel:false,  visible:false});
	F = qboard.create('otherintersection', [tangB, c1, B], {strokeColor:"black", fixed:true, withLabel:false,  visible:false});

	//arc defined by EF
	arc1 = qboard.create('arc', [O1, E, F], {strokeColor:"black", fixed:true, withLabel:false,  visible:false});

	//theta between 150 and 210. Set a random angle for P to begin	
	theta = 5*Math.PI/6+Math.random()*Math.PI/3;
	
	P = qboard.create('point', [r1*Math.cos(theta), r1*Math.sin(theta)], {name:"P", color:"blue", label:{offset:[-20, 0]}});
	
	// arc1, defined by EF on C1, that make C and D still on bigger arc AB on c2.
	P.makeGlider(arc1);	

	//lines to define C and D
	PB = qboard.create('line', [P, B], {color:"black", strokeWidth:1, visible: false});
	PA = qboard.create('line', [P, A], {color:"black", strokeWidth:1, visible: false});

	C = qboard.create('otherintersection', [PB, c2, B], {name:"C", withLabel:true, color:"blue"});
	D = qboard.create('otherintersection', [PA, c2, A], {name:"D", withLabel:true, color:"blue"});

	//just plot the segment for the figure to be cleaner.
	PC = qboard.create('segment', [P, C], {color:"black", strokeWidth:1, visible: true});
	PD = qboard.create('segment', [P, D], {color:"black", strokeWidth:1, visible: true});

	CD = qboard.create('segment', [C, D], {color:"green"});
}

function dist(A, B){
	dx = A.X() - B.X();
	dy = A.Y() - B.Y();
	return Math.sqrt(dx*dx + dy*dy);
}

function generateSolutionInfosOnImage(){
	//segments for the solution
	AB = qboard.create('segment', [A, B], {color:"yellow"});
	BD = qboard.create('segment', [B, D], {color:"black"});

	//angles for the solution
	APB = qboard.create('angle', [A,P,B], {name: "&alpha;", color: 'blue', type:'sector', orthoType:'square', orthoSensitivity:2, radius:3});
	ADB = qboard.create('angle', [B,D,A], {name: "&beta;", color: 'pink', type:'sector', orthoType:'square', orthoSensitivity:2, radius:3});
	CBD = qboard.create('angle', [D,B,C], {name: "&theta;", color: 'green', type:'sector', orthoType:'square', orthoSensitivity:2, radius:3});
}

function generateSolution(){
	showingSolution=true;
	generateSolutionInfosOnImage();
}

function showAnswer(){
	generateSolution();
	$("#showAnswer").attr("disabled",true);
	$("#answerExplanation").removeClass("hidden");
	$("#answerExplanation").html("<b>Solução:</b><br/>"+
	"<div class='justify'>Observe a figura com novas informações:</div>"+
	"<div class='justify'>Note que, &ang;APB é fixo, pois está olhando para a corda menor AB de c1:</div>"+
	"<div class='center'>&ang;APB = &alpha; </div>"+ 
	"<div class='justify'>Note que, &ang;BDA é fixo, pois está olhando para a corda menor AB de c2 :</div>"+
	"<div class='center'>&ang;BDA = &beta; </div>"+
	"<div class='justify'>Já, &ang;DBC está olhando para a corda menor CD de c2, que é a nossa corda desejada, que queremos provar ser fixa.</div>"+
	"<div class='justify'>&ang;DBC, na figura, é ângulo externo do &Delta;PBD e por isso, vale a relação: </div>"+
	"<div class='center'>&theta; = &ang;DBC = &ang;APB + &ang;BDA = &alpha; + &beta; = fixo</div>"+
	"<div class='justify'>Como &theta; é, então, constante, a corda relativa a ele também o será. Movimente o ponto P, para que fique mais claro.</div>"+
	"<div class='justify'>A corda CD, na verdade, é constante para qualquer ponto P inicial em c1. Os demais casos tem solução similares.");
}

function resetAnswer(){
	showingSolution=false;
	$("#showAnswer").attr("disabled",false);
	$("#answerExplanation").addClass("hidden");
}	

function generateNewGame(){
	resetAnswer();
	generateFigure();
}
