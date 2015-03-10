
var p=3, q=5, min=0.1;
var x=1, alpha;

var qboard, O, M, A, B;

function generateLadder(){

	alpha = min+Math.random()*(1-2*min);

	qboard = JXG.JSXGraph.initBoard('questionJXGBox', {boundingbox: [-x, p+x, p+x, -x],  keepaspectratio: true, showcopyright: false, axis:true});

	//vertices
	var Y = qboard.create('point', [0, p], {color:'blue', withLabel:false, fixed:true});
	O = qboard.create('point', [0, 0], {color:'blue', withLabel:false, fixed:true});
	var X = qboard.create('point', [p, 0], {color:'blue', withLabel:false, fixed:true});
	var t1 =qboard.create('text',[p, p, "MA = MB = p"], {fixed:true});

	//hide useless points.
	Y.hideElement();
	X.hideElement();

	//sides
	var OX = qboard.create('segment', [O, X], {color:'black', fixed:true});
	var OY = qboard.create('segment', [O, Y], {color:'black', fixed:true});

	//B will be the sliding point
	B = qboard.create('point', [p*alpha, 0], {name: "B", color:'red'});	
	B.makeGlider(OX);

	A = qboard.create('point', [0, function(){return Math.sqrt(p*p-B.X()*B.X());}] , {name: "A", color:'blue'});
	M = qboard.create('midpoint', [A, B], {name: "M", withLabel:true, color:'blue'});

	//translation of the cat
	xm0=M.X();
	ym0=M.Y();
	var im = qboard.create('image', ['src/images/cat.png', [M.X(),M.Y()], [0.5,0.5]]);
	var tOff = qboard.create('transform', [function(){return M.X()-xm0},function(){return M.Y()-ym0}], {type:'translate'}); 
  	tOff.bindTo(im);

	var AB = qboard.create('segment', [A, B], {color:'black'});
		
}

function generateSolutionOnGraph(){
	var OM = qboard.create('segment', [O, M], {name:"p", withLabel:true, color:'green', dash:2});
	var c = qboard.create('circle', [O, p/2], {fillColor:'white', strokeColor:'green', dash:2});
	var AM = qboard.create('segment', [A, M], {name:"p", withLabel:true, color:'black'});
	var BM = qboard.create('segment', [M, B], {name:"p", withLabel:true, color:'black'});
}

function showAnswer(){
	$("#showAnswer").attr("disabled",true);
	$("#answerExplanation").removeClass("hidden");
	$("#answerExplanation").html("<b>Solução:</b><br/>"+
	"<div class='justify'>Note que em qualquer momento da queda da escada AB, OAB forma um triângulo retângulo de hipotenusa AB, já que AÔB é ângulo reto. Assim, M é o centro do circuncírculo do triângulo OAB e sua distância até O coincide com o raio. Como AB é diâmetro e seu comprimento mede 2p, o raio mede p. Portanto, o gato sempre dista p do vértice O e sua trajetória é um arco de circunferência.</div>"+
	"<div class='justify'>Veja na figura a trajetória realizada pelo gato. Movimente o ponto B, agora, com a trajetória explícita.</div>");
	generateSolutionOnGraph();
}

function resetAnswer(){
	$("#showAnswer").attr("disabled",false);
	$("#answerExplanation").addClass("hidden");
}	

function generateNewGame(){
	resetAnswer();
	generateLadder();
}
