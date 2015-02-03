var d=1, l=5, h;

var A, B, C, D;
var AB, BC, CD, DA;
var P, Q;
var qboard;
var PQ, AQ, DQ, CP, DP;
var alpha, beta, teta;
var t1;


var showingSolution;

function generateSquare(){
	delta=0.25;

	x = (delta+ Math.random()*(1-2*delta))*l;  // 0.2l until 0.8l

	qboard = JXG.JSXGraph.initBoard('questionJXGBox', {boundingbox: [-d, l+d, l+d, -2*d],  keepaspectratio: true, showcopyright: false});

	//vertices of square
	A = qboard.create('point', [0,0], {name: "A", color:'blue', fixed:true, label:{offset:[-10,-10]}});
	B = qboard.create('point', [0, l], {name: "B", color:'blue', fixed:true});
	C = qboard.create('point', [l, l], {name: "C", color:'blue', fixed:true});
	D = qboard.create('point', [l, 0], {name: "D", color:'blue', fixed:true});

	t1 = qboard.create('text',[0, -d/2, "<span style='text-decoration:overline'>PB</span> + <span style='text-decoration:overline'>BQ</span> = l = <span style='text-decoration:overline'>AB</span>"], {fixed:true});

	t2 = qboard.create('text',[0, -d, "&alpha; + &beta; + &theta; = ?"], {fixed:true});

	//sides of square
	AB = qboard.create('segment', [A, B], {color:'black', fixed:true});
	BC = qboard.create('segment', [B, C], {color:'black', fixed:true});
	CD = qboard.create('segment', [C, D], {color:'black', fixed:true});	
	DA = qboard.create('segment', [D, A], {color:'black', fixed:true});

	//side points
	P = qboard.create('point', [0, x], {name: "P", color:'red', label:{offset:[-15, 0]}});
	Q = qboard.create('point', [function(){return P.Y();}, l], {name: "Q", color:'red'});
	
	//p sliding on AB
	P.makeGlider(AB);

	PQ = qboard.create('segment', [P, Q], {color:'black'});
	AQ = qboard.create('segment', [A, Q], {color:'black', dash:2});
	DP = qboard.create('segment', [D, P], {color:'black', dash:2});
	DQ = qboard.create('segment', [D, Q], {color:'black', dash:2});
	CP = qboard.create('segment', [C, P], {color:'black', dash:2});

	alpha = qboard.create('angle', [Q,A,P], {name: "&alpha;", color: 'blue', type:'sector', orthoType:'square', orthoSensitivity:2, radius:1}),
        beta = qboard.create('angle', [Q,D,P], {name: "&beta;", color: 'green', type:'sector', orthoType:'square', orthoSensitivity:2, radius:1});
	teta = qboard.create('angle', [Q,C,P], {name: "&theta;", color: 'pink', type:'sector', orthoType:'square', orthoSensitivity:2, radius:1});
}

function generateSolutionInfosOnImage(){
	
	//labels
	AP = qboard.create('segment', [A, P], {name:'y', withLabel:true, color:'black', label:{offset:[-15, 0]}});
	BP = qboard.create('segment', [B, P], {name:'x', withLabel:true, color:'black', label:{offset:[-15, 0]}});
	BQ = qboard.create('segment', [B, Q], {name:'y', withLabel:true, color:'black'});
	CQ = qboard.create('segment', [C, Q], {name:'x', withLabel:true, color:'black'});

	//labels
	DA.setAttribute({
		name: 'l',
    		withLabel: true,
		label: {offset:[-10,-10]}
	});
	CD.setAttribute({
		name: 'l',
    		withLabel: true
	});
	t1.remove();
	t1 =qboard.create('text',[0, -d/2, "x + y = <span style='text-decoration:overline'>PB</span> + <span style='text-decoration:overline'>BQ</span> = l = <span style='text-decoration:overline'>AB</span>"], {fixed:true});

	alpha = qboard.create('angle', [P,D,A], {name: "&alpha;", color: 'blue', type:'sector', orthoType:'square', orthoSensitivity:2, radius:1}),
	teta = qboard.create('angle', [C,D,Q], {name: "&theta;", color: 'pink', type:'sector', orthoType:'square', orthoSensitivity:2, radius:1});
}

function generateSolution(){
	showingSolution=true;
	generateSolutionInfosOnImage();
}

function showAnswer(){
	$("#showAnswer").attr("disabled",true);
	$("#answerExplanation").removeClass("hidden");
	$("#answerExplanation").html("<b>Solução:</b><br/>"+
	"<div class='justify'>Note que os triângulos &Delta;ABQ e &Delta;DAP são congruentes (caso LAL), já que: </div>"+
	"<div class='center'><span style='text-decoration:overline'>PA</span> = l - x = y = <span style='text-decoration:overline'>BQ</span> e <span style='text-decoration:overline'>AB</span> = l = <span style='text-decoration:overline'>AD</span></div>"+
	"<div class='justify'>Assim:</div>"+
	"<div class='center'>&ang;BAQ = &alpha; = &ang;PDA</div>"+	
	"<div class='justify'>Note também que os triângulos &Delta;BCP e &Delta;CDQ são congruentes (caso LAL), já que: </div>"+
	"<div class='center'><span style='text-decoration:overline'>QC</span> = l - y = x = <span style='text-decoration:overline'>BP</span> e <span style='text-decoration:overline'>BC</span> = l = <span style='text-decoration:overline'>CD</span></div>"+
	"<div class='justify'>Assim:</div>"+
	"<div class='center'>&ang;BCP = &beta; = &ang;CDQ</div>"+
	"<div class='justify'>Daí:</div>"+
	"<div class='center'>&ang;PAQ + &ang;PDQ + &ang;PCQ = &alpha; + &beta; + &theta; = &ang;ADP + &ang;PDQ + &ang;QDC = 90<sup>o</dup> </div>"+
	"<div class='justify'>Movimente o ponto P com as novas informações na figura.</div>");
	generateSolution();
}

function resetAnswer(){
	showingSolution=false;
	$("#showAnswer").attr("disabled",false);
	$("#answerExplanation").addClass("hidden");
}	

function generateNewGame(){
	generateSquare();
}
