var d = 6; // padding until figure.
var d1 = 2;// distance until quotes infos
var x_A, y_A, x_B, y_B, x_P, y_P ;
var x, y, d;

var MAX_X = 20;
var MIN_X = MAX_X * 3/4;
var MAX_Y = 10;
var MIN_Y = 2;

var A, B, O, P, C;
var qboard;
var t1;


var showingSolution;

function generateFigure(){

	qboard = JXG.JSXGraph.initBoard('questionJXGBox', {boundingbox: [-d, MAX_Y+d, MAX_X+d, -(MAX_Y+d)],  keepaspectratio: true, showcopyright: false});
	
	//point A = (0,y)
	y_A = MIN_Y+ Math.floor(Math.random()*(MAX_Y +1 -MIN_Y));  // MIN_Y to MAX_Y, arbitrarily

	//point B = (x_B, y_B)
	x_B = MIN_X + Math.floor(Math.random()*(MAX_X + 1 - MIN_X)); // MIN_X to MAX_X, arbitrarily
	do{
		y_B = MIN_Y + Math.floor(Math.random()*(MAX_Y + 1 - MIN_Y)); // MIN_Y to MAX_Y, arbitrarily
	} while (y_B===y_A);

	max_AB = Math.max(y_A+d1, y_B+d1);

	//plotting A points
	A = qboard.create('point', [0, y_A], {name: "A", color:'blue', fixed:true, label:{offset:[-15, 0]}});
	A1 = qboard.create('point', [-d1, y_A], { color:'black', fixed:true, label:{offset:[-15, 0]}, withLabel:false, face:"+"});
	A2 = qboard.create('point', [0, max_AB], { color:'black', fixed:true, label:{offset:[-15, 0]}, withLabel:false, face:"+"});

	//plotting B points
	B = qboard.create('point', [x_B, y_B], {name: "B", color:'blue', fixed:true});
	B1 = qboard.create('point', [x_B + d1, y_B], {color:'black', fixed:true, label:{offset:[-15, 0]}, withLabel:false, face:"+"});
	B2 = qboard.create('point', [x_B, max_AB], { color:'black', fixed:true, withLabel:false, face:"+"});

	//plotting origin O
	O = qboard.create('point', [0, 0], {name: "O", color:'blue', fixed:true, visible:false});
	O1 = qboard.create('point', [-d1, 0], {name: "O", color:'blue', fixed:true, visible:false});

	//plotting Q, projection of B on x
	Q = qboard.create('point', [x_B, 0], {name: "Q", color:'blue', fixed:true, visible:false});
	Q1 = qboard.create('point', [x_B+d1, 0], {name: "Q", color:'blue', fixed:true, visible:false});
	
	//movable point
	P = qboard.create('point', [x_B/2, 0], {name: "P", color:'red', label:{offset:[-15,-15]}, needsRegularUpdate:true});

	//path
	AP = qboard.create('segment', [A, P], {color:'green'});
	BP = qboard.create('segment', [B, P], {color:'green'});
	
	x = dist(O, A);
	y = dist(Q, B);
	d = dist(A2, B2);

	// heigths distances: to show distance values
	O1A1 = qboard.create('segment', [O1, A1], {name:"x="+x, color:'black', dash:2, withLabel:true, label:{offset:[-30, 0]}});
	B1Q1 = qboard.create('segment', [B1, Q1], {name:"y="+y, color:'black', dash:2, withLabel:true});
	A2B2 = qboard.create('segment', [A2, B2], {name:"d="+d, color:'black', dash:2, withLabel:true});
	
	r = qboard.create('line', [O, Q], {name: "r", color:'black', fixed:true, withLabel:true, label:{offset:[10, -15]}});

	//p needs to be on r
	P.makeGlider(r);

	t1 = qboard.create('text',[-d1, -(MAX_Y+d1), "<span style='text-decoration:overline'>PA</span> + <span style='text-decoration:overline'>PB</span> = "+(dist(P,A)+dist(P,B)).toFixed(2)], {fixed:true});
	t2 = qboard.create('text',[-d1, -(MAX_Y+2*d1), "min(<span style='text-decoration:overline'>PA</span> + <span style='text-decoration:overline'>PB</span>) = ?"], {fixed:true});
	
	//when P moves along r, recalculate PA+PB
	P.on("drag", function(){
		t1.remove();
		t1 = qboard.create('text',[-d1, -(MAX_Y+d1), "<span style='text-decoration:overline'>PA</span> + <span style='text-decoration:overline'>PB</span> = "+(dist(P,A)+dist(P,B)).toFixed(2)], {fixed:true});
	});

}

function dist(A, B){
	dx = A.X() - B.X();
	dy = A.Y() - B.Y();
	return Math.sqrt(dx*dx + dy*dy);
}

function generateSolutionInfosOnImage(){

	C = qboard.create('reflection', [B, r], {name: "B'", color:'blue', fixed:true, label:{offset:[15,-15]}});
	BC = qboard.create('segment', [B, C], {color:'blue', fixed:true, dash:2});

	M = qboard.create('midpoint', [B, C], {name: "M", color:'blue', fixed:true, dash:2, label:{offset:[15,-15]}});

	x_N = B.X()*A.Y()/(A.Y()+B.Y());
	
	N = qboard.create('point', [x_N, 0], {name: "N", color:'yellow', label:{offset:[-15,-15]}, fixed:true});

	// solution path
	AN = qboard.create('segment', [A, N], {color:'yellow'});
	BN = qboard.create('segment', [B, N], {color:'yellow'});
	CN = qboard.create('segment', [C, N], {color:'yellow', dash:2});

	CP = qboard.create('segment', [C, P], {color:'green', dash:2});
	
	t2.remove();
	t2 = qboard.create('text',[-d1, -(MAX_Y+2*d1), "min(<span style='text-decoration:overline'>PA</span> + <span style='text-decoration:overline'>PB</span>) = <span style='text-decoration:overline'>NA</span> + <span style='text-decoration:overline'>NB</span> ="+(dist(A,C).toFixed(2))], {fixed:true});
}

function generateSolution(){
	showingSolution=true;
	generateSolutionInfosOnImage();
}

function showAnswer(){
	$("#showAnswer").attr("disabled",true);
	$("#answerExplanation").removeClass("hidden");
	$("#answerExplanation").html("<b>Solução:</b><br/>"+
	"<div class='justify'>Às vezes, uma construção geométrica simplifica o problema. A condição de 'tocar na reta r' pode ser reformulada:</div>"+
	"<div class='justify'>Analisemos o ponto B', reflexo de B em relação a reta r, tal que <span style='text-decoration:overline'>MB</span> = <span style='text-decoration:overline'>MB'</span> e <span style='text-decoration:overline'>BB'</span> &perp; r.</div> "+
	"<div class='justify'>O ponto B' é tal que a soma das distâncias de P a A e B é a mesma que a A e B', para todo ponto P da reta r, isto é:</div>"+
	"<div class='center'><span style='text-decoration:overline'>PA</span> + <span style='text-decoration:overline'>PB</span> = <span style='text-decoration:overline'>PA</span> + <span style='text-decoration:overline'>PB'</span> <span class='tab'>(I)</span> </div>"+
	"<div class='justify'>Isso ocorre porque &Delta;PMB &cong; &Delta;PMB' (Caso LAL).</div>"+
	"<div class='center'><span style='text-decoration:overline'>PM</span> comum;<span class='tab'></span>  &ang;PMB = 90<sup>o</sup>=&ang;PMB' <span class='tab'></span>e <span style='text-decoration:overline'>MB</span> = <span style='text-decoration:overline'>MB'</span>;</div>"+
	"<div class='justify'>Com B' e A estão de lados opostos da reta r, chamemos de N a interseção de <span style='text-decoration:overline'>AB'</span> e a reta r.</div>"+
	"<div class='justify'>Para qualquer ponto P na reta R, pela desigualdade triangular no &Delta;PAB':</div>"+
	"<div class='center'><span style='text-decoration:overline'>PA</span> + <span style='text-decoration:overline'>PB'</span> &ge; <span style='text-decoration:overline'>AB'</span> = <span style='text-decoration:overline'>AN</span> + <span style='text-decoration:overline'>NB'</span></div>"+
	"<div class='justify'>Aplicando (I) para os pontos P e N:</div>"+
	"<div class='center'><span style='text-decoration:overline'>PA</span> + <span style='text-decoration:overline'>PB</span>  = <span style='text-decoration:overline'>PA</span> + <span style='text-decoration:overline'>PB'</span> &ge; <span style='text-decoration:overline'>AB'</span> = <span style='text-decoration:overline'>AN</span> + <span style='text-decoration:overline'>NB'</span> = <span style='text-decoration:overline'>NA</span> + <span style='text-decoration:overline'>NB</span> </div>"+
	"<div class='justify'>Assim, N é o ponto procurado.</div>"+
	"<div class='justify'>Note que para calcular a soma desejada <span style='text-decoration:overline'>AN</span> + <span style='text-decoration:overline'>NB'</span> basta acharmos o valor de <span style='text-decoration:overline'>AB'</span>, que é hipotenusa de um triângulo retângulo de catetos d e (x+y), então:</div>"+
	"<div class='center'><span style='text-decoration:overline'>AN</span> + <span style='text-decoration:overline'>NB'</span> = <span style='text-decoration:overline'>AB'</span> = &radic;<span style='text-decoration:overline'>h</span><sup>2</sup><span style='text-decoration:overline'>+(x+y)</span><sup>2</sup> = "+Math.sqrt(d*d+(x+y)*(x+y)).toFixed(2)+"</div>");
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
