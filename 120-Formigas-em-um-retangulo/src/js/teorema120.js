
var p=3, q=5, min=0.1;
var x=5, alpha;

var qboard, O, M, A, B;

function generateRectangle(){

	alfa = min+Math.random()*(1-2*min);

	var qboard = JXG.JSXGraph.initBoard('questionJXGBox', {boundingbox: [-x, p+x, q+x, -x],  keepaspectratio: true, showcopyright: false});

	//vertices
	var A = qboard.create('point', [0, 0], {name: "A", color:'blue', fixed:false});	
	var A1 = qboard.create('point', [0, 0], {showLabel:false, color:'blue', fixed:false});	
	var B = qboard.create('point', [0, p], {name: "B", color:'blue', fixed:false});
	var B1 = qboard.create('point', [0, p], {showLabel:false, color:'blue', fixed:false});
	var C = qboard.create('point', [q, p], {name: "C", color:'blue', fixed:false});
	var C1 = qboard.create('point', [q, p], {showLabel:false, color:'blue', fixed:false});
	var D = qboard.create('point', [q, 0], {name: "D", color:'blue', fixed:true});	
	
	
	//vertices
	var X = qboard.create('point', [0, p/2], {name: "X", color:'red', fixed:true});
	var Y = qboard.create('point', [q/2, p], {name: "Y", color:'red', fixed:true});
	var Z = qboard.create('point', [q/2, 0], {name: "Z", color:'red', fixed:true});	


	//sides
	var AB = qboard.create('segment', [A, B], {color:'black', fixed:true});
	var BC = qboard.create('segment', [B, C], {color:'black', fixed:true});
	var AC = qboard.create('segment', [A, C], {color:'black', fixed:true});

	var a_, b_, c_;

	A1.hideElement();
	B1.hideElement();
	C1.hideElement();

	a_ = qboard.create('parallel', [A1, BC]);
	b_ = qboard.create('parallel', [B1, AC]);
	c_ = qboard.create('parallel', [C1, AB]);	
	
	A.makeGlider(a_);
	B.makeGlider(b_);
	C.makeGlider(c_);	
	
	a_.hideElement();
	b_.hideElement();
	c_.hideElement();
/*
	B.on("mouseover", function(){
		b_.showElement();
		console.log("over b");
	});

	B.on("mouseup", function(){		
		b_.hideElement();
		console.log("out b");
	});
	
	C.on("mouseover", function(){
		c_.showElement();
		console.log("over c");
	});

	C.on("mouseup", function(){		
		c_.hideElement();
		console.log("out c");
	});*/
		
}


function generateLadder(){

	alpha = min+Math.random()*(1-2*min);

	qboard = JXG.JSXGraph.initBoard('questionJXGBox', {boundingbox: [-x, p+x, p+x, -x],  keepaspectratio: true, showcopyright: false, axis:true});

	//vertices
	var Y = qboard.create('point', [0, p], {color:'blue', withLabel:false, fixed:true});
	O = qboard.create('point', [0, 0], {color:'blue', withLabel:false, fixed:true});
	var X = qboard.create('point', [p, 0], {color:'blue', withLabel:false, fixed:true});
	var t1 =qboard.create('text',[p, p, "MA = MB = p"]);

	//hide useless points.
	Y.hideElement();
	X.hideElement();

	//sides
	var OX = qboard.create('segment', [O, X], {color:'black', fixed:true});
	var OY = qboard.create('segment', [O, Y], {color:'black', fixed:true});

	//B will be the sliding point
	B = qboard.create('point', [p*alpha, 0], {name: "B", color:'blue'});	
	B.makeGlider(OX);

	A = qboard.create('point', [0, function(){return Math.sqrt(p*p-B.X()*B.X());}] , {name: "A", color:'blue'});
	M = qboard.create('midpoint', [A, B], {name: "M", withLabel:true, color:'red'});

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
	"Note que em qualquer momento da queda da escada AB, OAB forma um triângulo retângulo de hipotenusa AB, já que AÔB é ângulo reto.<br/>"+
	"Como AÔB é reto, por definição, o Circumcentro X, forma um ângulo AXB que é dobro de AÔB, ou seja, 180 graus. O que significa, que X pertence a AB e é ponto médio M do segmento AB. Por ser ponto médio, AM=MB. Como M é circuncentro de AOB, temos que AM=MB=OM=p.<br/>"+
	"Assim, em qualquer momento da queda da escada AB, M sempre vai estar a uma distancia p da origem O. Isto é, M pertence a circunferência de centro O e raio p.<br/>");
	generateSolutionOnGraph();
}

function resetAnswer(){
	$("#showAnswer").attr("disabled",false);
	$("#answerExplanation").addClass("hidden");
}	

function generateNewGame(){
	resetAnswer();
	generateRectangle();
}
