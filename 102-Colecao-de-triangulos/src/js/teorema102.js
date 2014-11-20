//sides
var a,//greater side 
    b, 
    c;

var TRIANGLE_OPTIONS = 7;// no-triangle, acutangle(equilateral, isosceles, scalene), 
				// obtusangle(isosceles, scalene), rectangle.
var NO_TRIANGLE = 0;
var ACUTANGLE_EQUILATERAL = 1;
var ACUTANGLE_ISOSCELES = 2;
var ACUTANGLE_SCALENE = 3;
var OBTUSANGLE_ISOSCELES = 4;
var OBTUSANGLE_SCALENE = 5;
var RECTANGLE = 6;

var typeOfTriangle;

var DELTA = 5;
var MIN_SIDE=5;

var x = Math.PI/3; //x=60 degrees
var senx=Math.sin(x);
var cosx=Math.cos(x);
var aLittleMargin = 1.05;
var aLittleSpace = 0.2;

var max_x;
var max_y;
var max_xy;
var sum;
var aboard;

function generateRandomSides(){
	typeOfTriangle = Math.floor(Math.random()*TRIANGLE_OPTIONS);
	switch(typeOfTriangle){
		case NO_TRIANGLE://0
			b=MIN_SIDE+Math.floor(Math.random()*DELTA);
			c=MIN_SIDE+Math.floor(Math.random()*DELTA);
			a=b+c+MIN_SIDE+Math.floor(Math.random()*DELTA/2);
		break;
		case ACUTANGLE_EQUILATERAL://1
			c=MIN_SIDE+Math.floor(Math.random()*DELTA);
			b=c;
			a=c;
		break;
		case ACUTANGLE_ISOSCELES://2
			c=MIN_SIDE+Math.floor(Math.random()*DELTA/2);
			b=c;
			minA=b+1;
			maxAcuteA=Math.floor(Math.sqrt(b*b+c*c)-1);
			a=minA+Math.floor(Math.random()*(Math.abs(maxAcuteA-minA)));
		break;
		case ACUTANGLE_SCALENE://3
			c=MIN_SIDE+Math.floor(Math.random()*DELTA/2);
			b=c+1+Math.floor(Math.random()*DELTA/2);
			minA=b+1;
			maxAcuteA=Math.floor(Math.sqrt(b*b+c*c)-1);
			a=minA+Math.floor(Math.random()*(Math.abs(maxAcuteA-minA)));
		break;
		case OBTUSANGLE_ISOSCELES://4
			c=MIN_SIDE+Math.floor(Math.random()*DELTA);
			b=c;
			maxA=b+c-1;
			minObtuseA=Math.ceil(Math.sqrt(b*b+c*c)+1);
			a=minObtuseA+Math.floor(Math.random()*(Math.abs(maxA-minObtuseA)));
		break;
		case OBTUSANGLE_SCALENE://5
			c=MIN_SIDE+Math.floor(Math.random()*DELTA/2);
			b=c+1+Math.floor(Math.random()*DELTA/2);
			maxA=b+c-1;
			minObtuseA=Math.ceil(Math.sqrt(b*b+c*c)+1);
			a=minObtuseA+Math.floor(Math.random()*(Math.abs(maxA-minObtuseA)));
		break;
		case RECTANGLE://6
			var n=1+Math.floor(Math.random()*DELTA/2);
			var m=n+1+Math.floor(Math.random()*DELTA/2);
			b=(m*m-n*n);
			c=(2*m*n);
			a=(m*m+n*n);
		break;
	}
}

function generateSidesTable(){
	$("#sideA").empty();
	$("#sideA").html("a="+a+"cm");
	$("#sideB").empty();
	$("#sideB").html("b="+b+"cm");
	$("#sideC").empty();
	$("#sideC").html("c="+c+"cm");
}

function generateMaxValues(){
	max_x = Math.max(a/2+c, a/2+b)*aLittleMargin;
	max_y = Math.max(c*senx, b*senx)*aLittleMargin;
	max_xy = Math.max(max_x, max_y);
};

function openTriangleFigure(){
	
	/*console.log("a "+a);
	console.log("b "+a);
	console.log("c "+a);
	console.log("max_x "+max_x);
	console.log("max_y "+max_y);
	console.log("max_xy "+max_xy);*/

	var qboard = JXG.JSXGraph.initBoard('questionJXGBox', {boundingbox: [-max_xy, max_xy, max_xy, -max_xy],  keepaspectratio: true, showcopyright: false});
	
	var rand=Math.floor(Math.random()*2)===0?-1:1; // sides up or down

	//Coordinates: A1=[-a/2-c*senx, c*senx], B=[-a/2, 0], C=[a/2, 0], A2=[a/2+b*cosx, b*senx];
        var A1 = qboard.create('point', [-a/2-c*cosx, c*senx], {withLabel:false, color:'red'});
	var B = qboard.create('point', [-a/2, 0], {withLabel:false, color:'blue', fixed:true});
	var C = qboard.create('point', [a/2, 0], {withLabel:false, color:'blue', fixed:true});	
	var A2 = qboard.create('point', [a/2+b*cosx, rand*b*senx], {withLabel:false, color:'red'});

	//make A1 run only above circle c1 (fixed radius c)
	var c1 = qboard.create('circle', [B, c], {strokeColor:'white'});	
	A1.makeGlider(c1);	

	//make A2 run only above circle c2 (fixed radius b)
	var c2 = qboard.create('circle', [C, b], {strokeColor:'white'});	
	A2.makeGlider(c2);	


        var AB = qboard.create('segment', [A1, B], { name: "c="+c, withLabel:true, color:'black'});
	var BC = qboard.create('segment', [B, C], {  name: "a="+a, withLabel:true, color:'black', fixed:true});
	var CA = qboard.create('segment', [C, A2], {  name: "b="+b, withLabel:true, color:'black'});
};

function closedTriangleFigure(){

	/*console.log("a "+a);
	console.log("b "+a);
	console.log("c "+a);
	console.log("max_x "+max_x);
	console.log("max_y "+max_y);
	console.log("max_xy "+max_xy);*/

	//exists triangle
	var p=(a+b+c)/2;
	var area = Math.sqrt(p*(p-a)*(p-b)*(p-c))
	var h_a= area*2/a;
	var senb=h_a/c;
	var cosb=Math.sqrt(1-senb*senb);
	
	aboard = JXG.JSXGraph.initBoard('answerJXGBox', {boundingbox: [-max_xy, max_xy, max_xy, -max_xy*aLittleSpace], keepaspectratio: true, showcopyright: false});

	//Coordinates: A=[0, h_a], B=[-c*senb, 0], C=[0, a-c*senb];        
	var A = aboard.create('point', [0, h_a], {name:'A', color:'blue', fixed:true});
	var B1 = aboard.create('point', [-c*cosb, 0], {name:'B', color:'blue', fixed:true});
	var C1 = aboard.create('point', [a-c*cosb, 0], {name:'C', color:'blue', fixed:true});
	var AB1 = aboard.create('segment', [A, B1], { name: c, withLabel:true, color:'black', fixed:true});
	var BC1 = aboard.create('segment', [B1, C1], {  name: a, withLabel:true, color:'black', fixed:true});
	var CA1 = aboard.create('segment', [C1, A], {  name: b, withLabel:true, color:'black', fixed:true});

};

function disableTriangleConstruction(){
	//if noTriangle is possible	
	if(document.getElementById('notConstructableRadio').checked===true){
		$("#triangleConstructible").addClass("hidden");
		$('input[name="sidesClass"]').attr('disabled',true);
		$('input[name="sidesClass"]').attr('checked',false);
		$('input[name="greaterAngleClass"]').attr('disabled',true);
		$('input[name="greaterAngleClass"]').attr('checked',false);
	}
	if(document.getElementById('constructableRadio').checked===true){
		$("#triangleConstructible").removeClass("hidden");
		$('input[name="sidesClass"]').attr('disabled',false);
		$('input[name="greaterAngleClass"]').attr('disabled',false);
	}
}

function checkAnswers(){
	checkAnswerTriangleConstructability();
	if(!(document.getElementById('notConstructableRadio').checked)){
		checkAnswerSidesRelationship();
		checkAnswerGreaterAngle(); 
	}   
}

function checkAnswerTriangleConstructability(){
	$("#validationConstructabilityRadio").empty();
	if(matchedConstructabilityAndUserAnswer()){
		$("#validationConstructabilityRadio").append("<i class='glyphicon glyphicon-ok correct'>Correto!</i>");
	}
	else $("#validationConstructabilityRadio").append("<i class='glyphicon glyphicon-remove error'>Errado!</i>");
}

function fillAnswerTriangleConstructable(){
	$("#answerTriangleConstructable").empty();
	sum = parseInt(b)+parseInt(c);
	if(typeOfTriangle===NO_TRIANGLE){
		$("#answerTriangleConstructable").html("<strong>a)</strong> Utilizando a Desigualdade Triangular relativa ao maior lado (a="+a+"), caso exista o triângulo, devemos ter: <div class='center'> "+a+"= a < b + c = "+b+" + "+c+" = "+sum+" (<i class='glyphicon glyphicon-remove'>Falso!</i>)</div > Logo, <strong>NÃO</strong> é possível construir triângulo com as 3 varetas dadas: a="+a+", b="+b+", c="+c+".");
	}else{
		$("#answerTriangleConstructable").html("<strong>a)</strong> Utilizando a Desigualdade Triangular relativa ao maior lado (a="+a+"), caso exista o triângulo, devemos ter: <div class='center'> "+a+"= a < b + c = "+b+" + "+c+" = "+sum+" (<i class=' center glyphicon glyphicon-ok'>Verdade!</i>)</div >Logo, <strong>é possível construir triângulo</strong> com as 3 varetas dadas: a="+a+", b="+b+", c="+c+".");
	}
}

function matchedConstructabilityAndUserAnswer(){
	return (typeOfTriangle===NO_TRIANGLE && document.getElementById('notConstructableRadio').checked) ||
		(!(typeOfTriangle===NO_TRIANGLE) && document.getElementById('constructableRadio').checked)
}


function checkAnswerGreaterAngle(){
	$("#validationAngleRadio").empty();
	if(matchedGreaterAngleAndUserAnswer()){
		$("#validationAngleRadio").append("<i class='glyphicon glyphicon-ok correct'>Correto!</i>");
	}
	else $("#validationAngleRadio").append("<i class='glyphicon glyphicon-remove error'>Errado!</i>");	
}

function fillAnswerGreaterAngle(){
	$("#answerGreaterAngle").empty();
	sum=square(b)+square(c);
	if(typeOfTriangle === ACUTANGLE_EQUILATERAL ||
	    typeOfTriangle === ACUTANGLE_ISOSCELES || 
	    typeOfTriangle === ACUTANGLE_SCALENE) {
		$("#answerGreaterAngle").html("<strong>c)</strong> Utilizaremos a Lei dos Cossenos relativa ao maior lado (a="+a+").<div class='center'>a<sup>2</sup> = b<sup>2</sup> + c<sup>2</sup> - 2bccos(A)</div>Note que A < 90<sup>o</sup>, equivale a 0 < cos(A) <u><</u> 1.<br/> Assim, a<sup>2</sup> = b<sup>2</sup> + c<sup>2</sup> - 2bccos(A) <u><</u> b<sup>2</sup> + c<sup>2</sup> - 2bc < b<sup>2</sup> + c<sup>2</sup>.<br/> Um triângulo é Acutângulo se, e somente se, a<sup>2</sup> < b<sup>2</sup> + c<sup>2</sup>.<br/>Testando para o nosso exemplo: a<sup>2</sup> = "+square(a)+" < b<sup>2</sup> + c<sup>2</sup> = "+square(b)+" + "+square(c)+" = "+sum+".<br/> Portanto, o nosso triângulo é <b>Acutângulo</b>.");
	}
	else if(typeOfTriangle === OBTUSANGLE_SCALENE ||
		   typeOfTriangle === OBTUSANGLE_ISOSCELES) {
			$("#answerGreaterAngle").html("<strong>c)</strong> Utilizaremos a Lei dos Cossenos relativa ao maior lado (a="+a+").<div class='center'>a<sup>2</sup> = b<sup>2</sup> + c<sup>2</sup> - 2bccos(A)</div>Note que A > 90<sup>o</sup>, equivale a -1 <u><</u> cos(A) < 0.<br/> Assim, a<sup>2</sup> = b<sup>2</sup> + c<sup>2</sup> - 2bccos(A) <u>></u> b<sup>2</sup> + c<sup>2</sup> + 2bc > b<sup>2</sup> + c<sup>2</sup>.<br/> Um triângulo é Obtusângulo se, e somente se, a<sup>2</sup> > b<sup>2</sup> + c<sup>2</sup>.<br/>Testando para o nosso exemplo: a<sup>2</sup> = "+square(a)+" > b<sup>2</sup> + c<sup>2</sup> = "+square(b)+" + "+square(c)+" = "+sum+".<br/> Portanto, o nosso triângulo é <b>Obtusângulo</b>.");
	}
	else if( typeOfTriangle === RECTANGLE ) {
		$("#answerGreaterAngle").html("<strong>c)</strong> Utilizaremos a Lei dos Cossenos relativa ao maior lado (a="+a+").<br/>a<sup>2</sup> = b<sup>2</sup> + c<sup>2</sup> - 2bccos(A).</br>Note que A = 90<sup>o</sup>, equivale a cos(A) = 0.<br/> Assim, a<sup>2</sup> = b<sup>2</sup> + c<sup>2</sup> - 2bccos(A) = b<sup>2</sup> + c<sup>2</sup>.<br/> Um triângulo é Retângulo se, e somente se, a<sup>2</sup> = b<sup>2</sup> + c<sup>2</sup>. (ou Teorema de Pitágoras)<br/>Testando para o nosso exemplo: a<sup>2</sup> = "+square(a)+" = b<sup>2</sup> + c<sup>2</sup> = "+square(b)+" + "+square(c)+" = "+sum+".<br/> Portanto, o nosso triângulo é <b>Retângulo</b>.");		
	}
}

function square(x){
	return parseInt(x)*parseInt(x);
}

function matchedGreaterAngleAndUserAnswer(){
	if( (typeOfTriangle === ACUTANGLE_EQUILATERAL ||
	    typeOfTriangle === ACUTANGLE_ISOSCELES || 
	    typeOfTriangle === ACUTANGLE_SCALENE) && 
		document.getElementById("radioAcutangle").checked === true) return true;
	else if( ( typeOfTriangle === OBTUSANGLE_SCALENE ||
		   typeOfTriangle === OBTUSANGLE_ISOSCELES) && 
		document.getElementById("radioObtusangle").checked === true) return true;
	else if(typeOfTriangle===RECTANGLE && 
		document.getElementById("radioRectangle").checked === true) return true;
	else return false;
	 
}

function checkAnswerSidesRelationship(){
	$("#validationSidesRadio").empty();
	if(matchedSidesRelationshipAndUserAnswer()){
		$("#validationSidesRadio").append("<i class='glyphicon glyphicon-ok correct'>Correto!</i>");
	}
	else $("#validationSidesRadio").append("<i class='glyphicon glyphicon-remove error'>Errado!</i>");	
}

function fillAnswerSidesRelationship(){
	$("#answerSidesRelationship").empty();
	
	if(typeOfTriangle===ACUTANGLE_EQUILATERAL) {
		$("#answerSidesRelationship").html("<strong>b)</strong> Como todos os lados são iguais, a=b=c="+a+", então o triângulo é <strong>Equilátero</strong>.");
	}
	else if(typeOfTriangle===ACUTANGLE_ISOSCELES || 
		typeOfTriangle===OBTUSANGLE_ISOSCELES) {
		$("#answerSidesRelationship").html("<strong>b)</strong> Como 2 dos lados são iguais, b=c="+b+", então o triângulo é <strong>Isósceles</strong>.");
	}
	else if(typeOfTriangle===ACUTANGLE_SCALENE || 
		typeOfTriangle===OBTUSANGLE_SCALENE  || 
		typeOfTriangle===RECTANGLE) {
		$("#answerSidesRelationship").html("<strong>b)</strong> Como os 3 lados são diferentes, a="+a+", b="+b+", c="+c+", então o triângulo é <strong>Escaleno</strong>.");		
	}
}

function matchedSidesRelationshipAndUserAnswer(){
	if(typeOfTriangle===ACUTANGLE_EQUILATERAL && document.getElementById("radioEquilateral").checked === true) return true;
	else if((typeOfTriangle===ACUTANGLE_ISOSCELES || typeOfTriangle===OBTUSANGLE_ISOSCELES) && document.getElementById("radioIsosceles").checked === true) return true;
	else if((typeOfTriangle===ACUTANGLE_SCALENE || typeOfTriangle===OBTUSANGLE_SCALENE  || typeOfTriangle===RECTANGLE) && document.getElementById("radioScalene").checked === true) return true;
	else return false;
	 
}

function checkIfUserAnswered(){
	return (checkIfUserAnsweredIsNotConstructable()||
		(checkIfUserAnsweredIsConstructable()&&
		checkIfUserAnsweredSidesRelationship()&&
		checkIfUserAnsweredGreaterAngle())); 
}

function checkIfUserAnsweredIsNotConstructable(){
	//console.log("notConstructableRadio "+document.getElementById('notConstructableRadio').checked);
	return document.getElementById('notConstructableRadio').checked;
}

function checkIfUserAnsweredIsConstructable(){
	//console.log("constructableRadio "+document.getElementById('constructableRadio').checked);
	return document.getElementById('constructableRadio').checked;
}

function checkIfUserAnsweredSidesRelationship(){
	/*console.log("radioScalene "+document.getElementById('radioScalene').checked+
			"radioIsosceles "+document.getElementById('radioIsosceles').checked+
			"radioEquilateral "+document.getElementById('radioEquilateral').checked);*/
	return (document.getElementById("radioScalene").checked ||
		document.getElementById("radioIsosceles").checked ||
		document.getElementById("radioEquilateral").checked);	
}

function checkIfUserAnsweredGreaterAngle(){
	/*console.log("radioAcutangle "+document.getElementById('radioAcutangle').checked+
			"radioRectangle "+document.getElementById('radioRectangle').checked+
			"radioObtusangle "+document.getElementById('radioObtusangle').checked);*/
	return (document.getElementById("radioAcutangle").checked ||
		document.getElementById("radioRectangle").checked ||
		document.getElementById("radioObtusangle").checked);	
}

function scrollTo(tag){
	$('html, body').animate({
	        scrollTop: $(tag).offset().top
	}, 1000);
}

function drawTriangleIfExists(){
	//always add border to Explanation
	$("#answerExplanation").addClass("rectangle");
	if(!(typeOfTriangle === NO_TRIANGLE)){
		$("#answerJXGBox").addClass("jxgbox");
		$("#answerJXGBox, #answerExplanation").addClass("rectangle");
		closedTriangleFigure();
	}
}

function fillAnswersExplanation(){
	fillAnswerTriangleConstructable();
	if(!(typeOfTriangle===NO_TRIANGLE)){
		fillAnswerSidesRelationship();
		fillAnswerGreaterAngle();
	}
}

function resetUserAnswersAndTheirValidations(){
	//clean userAnswers
	$('input[type=radio]').attr('disabled',false);
	$('input[type=radio]').attr('checked',false);
	$("#triangleConstructible").removeClass("disabled");
	//clean validations
	$("#validationConstructabilityRadio").empty();
	$("#validationSidesRadio").empty();
	$("#validationAngleRadio").empty();

	$("#revealAnswer").attr('disabled',false);
}

function cleanValidationsAndAnswerExplanations(){
	$("#triangleConstructible").removeClass("hidden");	
	$("#validationUserAnswered").empty();
	//remove answerJXGBox	
	if(aboard!=null) {
		JXG.JSXGraph.freeBoard(aboard);
		aboard=null;
	}
	$("#answerJXGBox").removeClass("jxgbox");
	$("#answerJXGBox, #answerExplanation").removeClass("rectangle");

	$("#answerTriangleConstructable").empty();
	$("#answerSidesRelationship").empty();
	$("#answerGreaterAngle").empty();
}

function revealAnswer(){
	if(checkIfUserAnswered()){
		$("#revealAnswer").attr('disabled',true);
		$("#validationUserAnswered").empty();
		scrollTo("#notConstructableRadio");//answer
		checkAnswers();
		drawTriangleIfExists();
		fillAnswersExplanation();
	}
	else {
		//console.log("validationUserAnswered "+$("#validationUserAnswered").has("i").length);
		if($("#validationUserAnswered").has("i").length===0){//if already has a warning, to not add again.
			 $("#validationUserAnswered").append("<i class='glyphicon glyphicon-remove'/> <span>Assinale uma opção em cada uma das questões.</span> ");
		}
	}
	
}

function generateNewTriangle(tagToScroll){
	resetUserAnswersAndTheirValidations();
	cleanValidationsAndAnswerExplanations();
	generateRandomSides();
	generateSidesTable();
	generateMaxValues();
	openTriangleFigure();
}
