//sides
var a,//greater side 
    b, 
    c;

var GREATER_ANGLE_OPTIONS = 7;// no-triangle, acutangle(equilateral, isosceles, scalene), 
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

function generateRandomSides(){
	typeOfTriangle = 1;//Math.floor(Math.random()*GREATER_ANGLE_OPTIONS);
	switch(typeOfTriangle){
		case NO_TRIANGLE:
			b=MIN_SIDE+Math.floor(Math.random()*DELTA);
			c=MIN_SIDE+Math.floor(Math.random()*DELTA);
			a=b+c+MIN_SIDE+Math.floor(Math.random()*DELTA/2);
		break;
		case ACUTANGLE_EQUILATERAL:
			c=MIN_SIDE+Math.floor(Math.random()*DELTA);
			b=c;
			a=c;
		break;
		case ACUTANGLE_ISOSCELES:
			c=MIN_SIDE+Math.floor(Math.random()*DELTA/2);
			b=c;
			minA=b+1;
			maxAcuteA=Math.floor(Math.sqrt(b*b+c*c)-1);
			a=minA+Math.floor(Math.random()*(Math.abs(maxAcuteA-minA)));
		break;
		case ACUTANGLE_SCALENE:
			c=MIN_SIDE+Math.floor(Math.random()*DELTA/2);
			b=c+1+Math.floor(Math.random()*DELTA/2);
			minA=b+1;
			maxAcuteA=Math.floor(Math.sqrt(b*b+c*c)-1);
			a=minA+Math.floor(Math.random()*(Math.abs(maxAcuteA-minA)));
		break;
		case OBTUSANGLE_ISOSCELES:
			c=MIN_SIDE+Math.floor(Math.random()*DELTA);
			b=c;
			maxA=b+c-1;
			minObtuseA=Math.ceil(Math.sqrt(b*b+c*c)+1);
			a=minObtuseA+Math.floor(Math.random()*(Math.abs(maxA-minObtuseA)));
		break;
		case OBTUSANGLE_SCALENE:
			c=MIN_SIDE+Math.floor(Math.random()*DELTA/2);
			b=c+1+Math.floor(Math.random()*DELTA/2);
			maxA=b+c-1;
			minObtuseA=Math.ceil(Math.sqrt(b*b+c*c)+1);
			a=minObtuseA+Math.floor(Math.random()*(Math.abs(maxA-minObtuseA)));
		break;
		case RECTANGLE:
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

	generateMaxValues();
	
	/*console.log("a "+a);
	console.log("b "+a);
	console.log("c "+a);
	console.log("max_x "+max_x);
	console.log("max_y "+max_y);
	console.log("max_xy "+max_xy);*/

	var qboard = JXG.JSXGraph.initBoard('questionJXGBox', {boundingbox: [-max_xy, max_xy, max_xy, -max_xy*aLittleSpace],  keepaspectratio: true, showcopyright: false});

	//Coordinates: A1=[-a/2-c*senx, c*senx], B=[-a/2, 0], C=[a/2, 0], A2=[a/2+b*cosx, b*senx];
        var A1 = qboard.create('point', [-a/2-c*cosx, c*senx], {withLabel:false, strokecolor:'red', fixed:true});
	var B = qboard.create('point', [-a/2, 0], {withLabel:false, strokecolor:'red', fixed:true});
	var C = qboard.create('point', [a/2, 0], {withLabel:false, strokecolor:'red', fixed:true});	
	var A2 = qboard.create('point', [a/2+b*cosx, b*senx], {withLabel:false, strokecolor:'red', fixed:true});	

	//var line_a = qboard.create('line', [B, C], { strokecolor:'blue', fixed:true});

        var AB = qboard.create('segment', [A1, B], { name: "c="+c, withLabel:true, strokecolor:'black', fixed:true});
	var BC = qboard.create('segment', [B, C], {  name: "a="+a, withLabel:true, strokecolor:'black', fixed:true});
	var CA = qboard.create('segment', [C, A2], {  name: "b="+b, withLabel:true, strokecolor:'black', fixed:true});
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
	
	var aboard = JXG.JSXGraph.initBoard('answerJXGBox', {boundingbox: [-max_xy, max_xy, max_xy, -max_xy*aLittleSpace], keepaspectratio: true, showcopyright: false});

	//Coordinates: A=[0, h_a], B=[-c*senb, 0], C=[0, a-c*senb];        
	var A = aboard.create('point', [0, h_a], {name:'A', strokecolor:'red', fixed:true});
	var B1 = aboard.create('point', [-c*cosb, 0], {name:'B', strokecolor:'red', fixed:true});
	var C1 = aboard.create('point', [a-c*cosb, 0], {name:'C', strokecolor:'red', fixed:true});
	var AB1 = aboard.create('segment', [A, B1], { name: c, withLabel:true, strokecolor:'black', fixed:true});
	var BC1 = aboard.create('segment', [B1, C1], {  name: a, withLabel:true, strokecolor:'black', fixed:true});
	var CA1 = aboard.create('segment', [C1, A], {  name: b, withLabel:true, strokecolor:'black', fixed:true});

};

function disableTriangleConstruction(){
	//if noTriangle is possible	
	if(document.getElementById('notConstructableCheckbox').checked===true){
		$("#triangleConstructible").addClass("disabled");
		$('input[type=radio]').attr('disabled',true);
		$('input[type=radio]').attr('checked',false);
	}
	else{
		$("#triangleConstructible").removeClass("disabled");
		$('input[type=radio]').attr('disabled',false);
	}
}

function checkAnswers(){
		console.log("checkAnswers()");
	checkAnswerTriangleConstructability();
	if(!(document.getElementById('notConstructableCheckbox').checked)){
		console.log("dentro do IF");
		checkAnswerSidesRelationship();
		//checkAnswerGreaterAngle(); 
	}   
}

function checkAnswerTriangleConstructability(){
	$("#validationConstructabilityCheckbox").empty();
	if(matchedConstructabilityAndUserAnswer()){
		$("#validationConstructabilityCheckbox").append("<i class='glyphicon glyphicon-ok'>Correto!</i>");
	}
	else $("#validationConstructabilityCheckbox").append("<i class='glyphicon glyphicon-remove'>Errado!</i>");
}

function fillAnswerTriangleConstructable(){
	$("#answerTriangleConstructable").empty();
	var sum = parseInt(b)+parseInt(c);
	if(typeOfTriangle===NO_TRIANGLE){
		$("#answerTriangleConstructable").html("<strong>a)</strong> Analisando utilizando a Desigualdade Triangular relativa ao maior lado (a="+a+"):<br/> Para existir triângulo, deve ser verdade a desigualdade:<br/> b + c > a, ou seja, "+b+" + "+c+" > "+a+", ou seja, "+sum+" > "+a+" <i class='glyphicon glyphicon-remove'>Falso!</i> <br/> Logo, NÃO é possível construir triângulo com as 3 varetas dadas: a="+a+", b="+b+", c="+c+".");
	}else{
		$("#answerTriangleConstructable").html("<strong>a)</strong> Analisando utilizando a Desigualdade Triangular relativa ao maior lado (a="+a+"):<br/> Para existir triângulo, deve ser verdade a desigualdade:<br/> b + c > a, ou seja, "+b+" + "+c+" > "+a+", ou seja, "+sum+" > "+a+" <i class='glyphicon glyphicon-ok'>Verdade!</i> <br/> Logo, <strong>É possível construir triângulo</strong> com as 3 varetas dadas: a="+a+", b="+b+", c="+c+".");
	}
}

function matchedConstructabilityAndUserAnswer(){
	return (typeOfTriangle===NO_TRIANGLE && document.getElementById('notConstructableCheckbox').checked) ||
		(!(typeOfTriangle===NO_TRIANGLE) && !document.getElementById('notConstructableCheckbox').checked)
}


function checkAnswerSidesRelationship(){
	console.log("checkAnswerSidesRelationship()");
	$("#validationSidesRadio").empty();
	if(matchedSidesRelationshipAndUserAnswer()){
		$("#validationSidesRadio").append("<i class='glyphicon glyphicon-ok'>Correto!</i>");
	}
	else $("#validationSidesRadio").append("<i class='glyphicon glyphicon-remove'>Errado!</i>");	
}

function fillAnswerSidesRelationship(){
	console.log("fillAnswerSidesRelationship()");
	$("#answerSidesRelationship").empty();
	
	if(typeOfTriangle===ACUTANGLE_EQUILATERAL) {
		$("#answerSidesRelationship").html("<strong>b)</strong> Como todos os lados são iguais: a=b=c="+a+", então o triângulo é <strong>Equilátero</strong>.");
	}
	else if(typeOfTriangle===ACUTANGLE_ISOSCELES || 
		typeOfTriangle===OBTUSANGLE_ISOSCELES) {
		$("#answerSidesRelationship").html("<strong>b)</strong> Como 2 dos lados são iguais: b=c="+b+", então o triângulo é <strong>Isósceles</strong>.");
	}
	else if(typeOfTriangle===ACUTANGLE_SCALENE || 
		typeOfTriangle===OBTUSANGLE_SCALENE  || 
		typeOfTriangle===RECTANGLE) {
		$("#answerSidesRelationship").html("<strong>b)</strong> Como os 3 lados são diferentes: a="+a+", b="+b+", c="+c+", então o triângulo é <strong>Escaleno</strong>.");		
	}
}

function matchedSidesRelationshipAndUserAnswer(){
	if(typeOfTriangle===ACUTANGLE_EQUILATERAL && document.getElementById("radioEquilateral").checked === true) return true;
	else if((typeOfTriangle===ACUTANGLE_ISOSCELES || typeOfTriangle===OBTUSANGLE_ISOSCELES) && document.getElementById("radioIsosceles").checked === true) return true;
	else if((typeOfTriangle===ACUTANGLE_SCALENE || typeOfTriangle===OBTUSANGLE_SCALENE  || typeOfTriangle===RECTANGLE) && document.getElementById("radioScalene").checked === true) return true;
	else return false;
	 
}

function checkIfUserAnswered(){
	return (checkIfUserAnsweredIsConstructableCheckbox()||
		(checkIfUserAnsweredSidesRelationship()&&
		checkIfUserAnsweredGreaterAngle())); 
}

function checkIfUserAnsweredIsConstructableCheckbox(){
	return document.getElementById('notConstructableCheckbox').checked;
}

function checkIfUserAnsweredSidesRelationship(){
	return (document.getElementById("radioScalene").checked ||
		document.getElementById("radioIsosceles").checked ||
		document.getElementById("radioEquilateral").checked);	
}

function checkIfUserAnsweredGreaterAngle(){
	return (document.getElementById("radioAcutangle").checked ||
		document.getElementById("radioRectangle").checked ||
		document.getElementById("radioObtusangle").checked);	
}

function scrollToTheAnswer(){
	$('html, body').animate({
	        scrollTop: $("#validationConstructabilityCheckbox").offset().top 
	}, 1000);
}

function drawTriangleIfExists(){
	if(!(typeOfTriangle === NO_TRIANGLE)){
		$("#answerJXGBox").addClass("jxgbox");
		closedTriangleFigure();
	}
}

function fillAnswersExplanation(){
	fillAnswerTriangleConstructable();
	if(!(typeOfTriangle===NO_TRIANGLE)){
		fillAnswerSidesRelationship();
	}
}

function cleanValidationsAndAnswerExplanations(){
	$("#validationUserAnswered").empty();
	//remove JXGBox	
	$("#answerJXGBox").removeClass("jxgbox");
	$("#answerTriangleConstructable").empty();
	$("#answerSidesRelationship").empty();
}

function revealAnswer(){
	cleanValidationsAndAnswerExplanations();
	if(checkIfUserAnswered()){
		scrollToTheAnswer();
		checkAnswers();
		drawTriangleIfExists();
		fillAnswersExplanation();
	}
	else {
		 $("#validationUserAnswered").append("<i class='glyphicon glyphicon-remove'> Classifique o triângulo quanto aos lados e o maior ângulo ou assinale que não pode ser construído.</i> ");
	}
	
}
