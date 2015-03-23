var d = 8; // padding until figure.
var d1 = 2;// distance until quotes infos

var r=10;
var qboard;

var showingSolution;

function generateFigure(){

	qboard = JXG.JSXGraph.initBoard('questionJXGBox', {boundingbox: [ -(r+d), r+d, r+d, -(r+d)],  keepaspectratio: true, showcopyright: false});
	
	n = 5;
	initialAngle = Math.PI/2; //90
	deltaAngle = 2*Math.PI/n; //360/n

	

	//vertices of a regular pentagon
	A = qboard.create('point', [r*Math.cos(initialAngle)+randomPart(), r*Math.sin(initialAngle)+randomPart()], {name: "A", color:'blue', label:{offset:[0, 15]}});
	B = qboard.create('point', [r*Math.cos(initialAngle+deltaAngle)+randomPart(), r*Math.sin(initialAngle+deltaAngle)+randomPart()], {name: "B", color:'blue', label:{offset:[-20, 0]}});
	C = qboard.create('point', [r*Math.cos(initialAngle+2*deltaAngle)+randomPart(), r*Math.sin(initialAngle+2*deltaAngle)+randomPart()], {name: "C", color:'blue', label:{offset:[0, -15]}});
	D = qboard.create('point', [r*Math.cos(initialAngle+3*deltaAngle)+randomPart(), r*Math.sin(initialAngle+3*deltaAngle)+randomPart()], {name: "D", color:'blue', label:{offset:[0, -15]}});
	E = qboard.create('point', [r*Math.cos(initialAngle+4*deltaAngle)+randomPart(), r*Math.sin(initialAngle+4*deltaAngle)+randomPart()], {name: "E", color:'blue', label:{offset:[15, 0]}});

	//sides of pentagonal star
	AC = qboard.create('segment', [A, C], {color:'black', strokeWidth:1});
	CE = qboard.create('segment', [C, E], {color:'black', strokeWidth:1});
	EB = qboard.create('segment', [E, B], {color:'black', strokeWidth:1});
	BD = qboard.create('segment', [B, D], {color:'black', strokeWidth:1});
	DA = qboard.create('segment', [D, A], {color:'black', strokeWidth:1});

	//desired angles
	CAD = qboard.create('angle', [C, A, D], {name:"&alpha;",  color: 'green', type:'sector', orthoType:'square', orthoSensitivity:2, radius:2});
	DBE = qboard.create('angle', [D, B, E], {name:"&beta;",  color: 'green', type:'sector', orthoType:'square', orthoSensitivity:2, radius:2});	
	ECA = qboard.create('angle', [E, C, A], {name:"&theta;",  color: 'green', type:'sector', orthoType:'square', orthoSensitivity:2, radius:2});
	ADB = qboard.create('angle', [A, D, B], {name:"&delta;",  color: 'green', type:'sector', orthoType:'square', orthoSensitivity:2, radius:2});
	BEC = qboard.create('angle', [B, E, C], {name:"&omega;",  color: 'green', type:'sector', orthoType:'square', orthoSensitivity:2, radius:2});
	
	
}

function randomPart(){
	return -r/4 + Math.random()*r/2;   // between -r/4 and r/4.
}



function plotDesiredAnglesAndInfos(){

}

function plotInfos(){

}

function cleanInfos(){
	t1.remove();
	t2.remove();
}

function cleanAnglesAndInfos(){
	ECD.remove();
	ECM.remove();
	cleanInfos();
}

function hideSomeAngles(){
	ECD.setAttribute({
	    visible: false
	});
	ECM.setAttribute({
	    visible: false
	});
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

	cleanInfos();
}

function plotSolutionAnglesAndInfos(){

	//some intersection points
	F = qboard.create('intersection', [AC, BD], {name: "F", color:'red', strokeWidth:1, label:{offset:[-20, 0]}});
	G = qboard.create('intersection', [BD, CE], {name: "G", color:'red', strokeWidth:1, label:{offset:[0, -15]}});

	//coloring used angles
	CAD.setAttribute({
		color:"pink"
	});
	ADB.setAttribute({
		color:"pink"
	});
	BEC.setAttribute({
		color:"blue"
	});
	DBE.setAttribute({
		color:"blue"
	});
	
	//auxiliary angles
	CFG = qboard.create('angle', [C, F, G], {withLabel:false, color: 'pink', type:'sector', orthoType:'square', orthoSensitivity:2, radius:1});
	FGC = qboard.create('angle', [F, G, C], {withLabel:false, color: 'blue', type:'sector', orthoType:'square', orthoSensitivity:2, radius:1});	
	
}

function generateSolution(){
	showingSolution=true;
	plotSolutionAnglesAndInfos();
}

function showAnswer(){
	//cleanAnglesAndInfos();
	generateSolution();
	$("#showAnswer").attr("disabled",true);
	$("#answerExplanation").removeClass("hidden");
	$("#answerExplanation").html("<b>Solução:</b><br/>"+
	"<div class='justify'>Analisando o triângulo &Delta;AFD e a soma de seus ângulos: "+
	"<div class='center'>&ang;AFD + &alpha; + &delta; = 180&deg;</div>"+
	"<div class='justify'>Mas &ang;AFD e &ang;GFC são suplementares: "+
	"<div class='center'>&ang;AFD + &ang;GFC = 180&deg;</div>"+
	"<div class='justify'>Assim: "+
	"<div class='center'>&ang;GFC = &alpha; + &delta; <span class='tab'></span> (I)</div>"+
	"<div class='justify'>Analisando o triângulo &Delta;BGE e a soma de seus ângulos: "+
	"<div class='center'>&ang;EGB + &beta; + &omega; = 180&deg;</div>"+
	"<div class='justify'>Mas &ang;EGB e &ang;FGC são suplementares: "+
	"<div class='center'>&ang;EGB + &ang;FGC = 180&deg;</div>"+
	"<div class='justify'>Assim: "+
	"<div class='center'>&ang;FGC = &beta; + &omega; <span class='tab'></span> (II)</div>"+
	"<div class='justify'>Por último, analisando o triângulo &Delta;FGC e a soma de seus ângulos: "+
	"<div class='center'>&theta; + &ang;GFC + &ang;FGC = 180&deg;</div>"+
	"<div class='justify'>Substituindo as relações (I) e (II), temos que a soma desejada vale:"+
	"<div class='center'>&theta; + &alpha; + &delta; + &beta; + &omega; = 180&deg;</div>");
	
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
