var d = 10; // padding until figure.
var d1 = d/4; // distance until quotes infos

var r=d;
var qboard;

var showingSolution;

var t1, t2, t3, t4, t5, t6;

function generateFigure(){

	qboard = JXG.JSXGraph.initBoard('questionJXGBox', {boundingbox: [ -(r+d), r+d, r+d, -(r+2*d)],  keepaspectratio: true, showcopyright: false});
	
	n = 5;
	initialAngle = Math.PI/2; //90
	deltaAngle = 2*Math.PI/n; //360/n

	
	//vertices of a regular pentagon with a randomPart deviation
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
	CAD = qboard.create('angle', [C, A, D], {withLabel:false, color: 'green', type:'sector', orthoType:'square', orthoSensitivity:2, radius:2});
	DBE = qboard.create('angle', [D, B, E], {withLabel:false,  color: 'green', type:'sector', orthoType:'square', orthoSensitivity:2, radius:2});	
	ECA = qboard.create('angle', [E, C, A], {withLabel:false,  color: 'green', type:'sector', orthoType:'square', orthoSensitivity:2, radius:2});
	ADB = qboard.create('angle', [A, D, B], {withLabel:false,  color: 'green', type:'sector', orthoType:'square', orthoSensitivity:2, radius:2});
	BEC = qboard.create('angle', [B, E, C], {withLabel:false,  color: 'green', type:'sector', orthoType:'square', orthoSensitivity:2, radius:2});
	
	plotInfos();

	A.on("drag",function(){
		cleanInfos();
		plotInfos();
	});
	B.on("drag",function(){
		cleanInfos();
		plotInfos();
	});
	C.on("drag",function(){
		cleanInfos();
		plotInfos();
	});
	D.on("drag",function(){
		cleanInfos();
		plotInfos();
	});
	E.on("drag",function(){
		cleanInfos();
		plotInfos();
	});

	
}


function randomPart(){
	return -d1 + Math.random()*2*d1;   // between -d1 and d1.
}

function plotInfos(){

	legend_x = -r-d1;
	legend_y = -r-2*d1;	

	//legend texts

	//1st line
	t1 = qboard.create('text',[legend_x, legend_y, "&ang;A = "+(CAD.Value()*180.0/Math.PI).toFixed(2)+"&deg;"], {fixed:true});
	t2 = qboard.create('text',[legend_x+(2*r+d)/3, legend_y, "&ang;B = "+(DBE.Value()*180.0/Math.PI).toFixed(2)+"&deg;"], {fixed:true});
	t3 = qboard.create('text',[legend_x+2*(2*r+d)/3, legend_y, "&ang;C = "+(ECA.Value()*180.0/Math.PI).toFixed(2)+"&deg;"], {fixed:true});

	//2nd line
	t4 = qboard.create('text',[legend_x, legend_y-d1, "&ang;D = "+(ADB.Value()*180.0/Math.PI).toFixed(2)+"&deg;"], {fixed:true});
	t5 = qboard.create('text',[legend_x+(2*r+d)/3, legend_y-d1, "&ang;E = "+(BEC.Value()*180.0/Math.PI).toFixed(2)+"&deg;"], {fixed:true});

	//3rd line
	t6 = qboard.create('text',[legend_x, legend_y-5*d1/2, "&ang;A + &ang;B + &ang;C + &ang;D + &ang;E = 180&deg;"], {fixed:true});
}

function cleanInfos(){
	t1.remove();
	t2.remove();
	t3.remove();
	t4.remove();
	t5.remove();
	t6.remove();
}

function dist(A, B){
	dx = A.X() - B.X();
	dy = A.Y() - B.Y();
	return Math.sqrt(dx*dx + dy*dy);
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
	CFG = qboard.create('angle', [C, F, G], {withLabel:false, color: 'pink', type:'sector', orthoType:'square', orthoSensitivity:2, radius:1.5});
	FGC = qboard.create('angle', [F, G, C], {withLabel:false, color: 'blue', type:'sector', orthoType:'square', orthoSensitivity:2, radius:1.5});	
	
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
	"<div class='center'>&ang;AFD + &ang;A + &ang;D = 180&deg;</div>"+
	"<div class='justify'>Mas &ang;AFD e &ang;GFC são suplementares: "+
	"<div class='center'>&ang;AFD + &ang;GFC = 180&deg;</div>"+
	"<div class='justify'>Assim: "+
	"<div class='center'>&ang;GFC = &ang;A + &ang;D <span class='tab'></span> (I)</div>"+
	"<div class='justify'>Analisando o triângulo &Delta;BGE e a soma de seus ângulos: "+
	"<div class='center'>&ang;EGB + &ang;B + &ang;E = 180&deg;</div>"+
	"<div class='justify'>Mas &ang;EGB e &ang;FGC são suplementares: "+
	"<div class='center'>&ang;EGB + &ang;FGC = 180&deg;</div>"+
	"<div class='justify'>Assim: "+
	"<div class='center'>&ang;FGC = &ang;B + &ang;E <span class='tab'></span> (II)</div>"+
	"<div class='justify'>Por último, analisando o triângulo &Delta;FGC e a soma de seus ângulos: "+
	"<div class='center'>&ang;C + &ang;GFC + &ang;FGC = 180&deg;</div>"+
	"<div class='justify'>Substituindo as relações (I) e (II), temos que a soma desejada vale:"+
	"<div class='center'>&ang;C + &ang;A + &ang;D + &ang;B + &ang;E = 180&deg;</div>");
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
