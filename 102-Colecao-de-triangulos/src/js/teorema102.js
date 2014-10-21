//sides
var a=15,//greater side 
    b=14, 
    c=13;

var GREATER_ANGLE_OPTIONS = 4;//no-triangle, acutangle, obtusangle, rectangle.
var NO_TRIANGLE = 0;
var ACUTANGLE = 1;
var OBTUSANGLE = 2;
var RECTANGLE = 3;

var typeOfAngle;

var DELTA = 5;
var MIN_SIDE=5;

var x = Math.PI/3; //x=60 degrees
var senx=Math.sin(x);
var cosx=Math.cos(x);
var aLittleMargin = 1.2;
var aLittleSpace = 0.2;

var max_x = Math.max(a/2+c, a/2+b)*aLittleMargin;
var max_y = Math.max(c*senx, b*senx)*aLittleMargin;
var max_xy = Math.max(max_x, max_y);

function generateRandomSides(){
	typeOfAngle = 1;//Math.floor(Math.random()*GREATER_ANGLE_OPTIONS);
	switch(typeOfAngle){
		case NO_TRIANGLE:
			b=MIN_SIDE+Math.floor(Math.random()*DELTA);
			c=MIN_SIDE+Math.floor(Math.random()*DELTA);
			a=b+c+MIN_SIDE+Math.floor(Math.random()*DELTA/2);
		break;
		case ACUTANGLE:
			c=MIN_SIDE+Math.floor(Math.random()*DELTA/2);
			b=c+1+Math.floor(Math.random()*DELTA/2);
			minA=b+1;
			maxAcuteA=Math.floor(Math.sqrt(b*b+c*c)-1);
			a=minA+Math.floor(Math.random()*(maxAcuteA-minA));
		break;
		case OBTUSANGLE:
			c=MIN_SIDE+Math.floor(Math.random()*DELTA/2);
			b=c+1+Math.floor(Math.random()*DELTA/2);
			maxA=b+c-1;
			minObtuseA=Math.ceil(Math.sqrt(b*b+c*c)+1);
			a=minObtuseA+Math.floor(Math.random()*(maxA-minObtuseA));
		break;
		case RECTANGLE:
			var n=1+Math.floor(Math.random()*DELTA/2);
			var m=n+1+Math.floor(Math.random()*DELTA/2);
			b=(m*m-n*n);
			c=(2*m*n);
			a=(m*m+n*n);
		break;
	}
	// no-triangle, acutangle (equilateral, isosceles, scalene), obtusangle (isosceles, scalene), rectangle, 
	$("#sideA").empty();
	$("#sideA").html("a="+a+"cm");
	$("#sideB").empty();
	$("#sideB").html("b="+b+"cm");
	$("#sideC").empty();
	$("#sideC").html("c="+c+"cm");

}

function openTriangleFigure(){

	var qboard = JXG.JSXGraph.initBoard('questionJXGBox', {boundingbox: [-max_xy, max_xy, max_xy, -max_xy*aLittleSpace],  keepaspectratio: true,  showcopyright: false});

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

function disableTriangleConstruction(checkbox){
	//if noTriangle is possible	
	if(checkbox.checked===true){
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
	checkTriangleConstructability();
	checkSidesRelationship();
	//checkGreaterAngle();    
}

function checkTriangleConstructability(){
	$("#answerCheckbox").empty();
	if(matchedConstructabilityAndUserAnswer()){
		$("#answerCheckbox").append("<i class='glyphicon glyphicon-ok'>Correto!</i>");
	}
	else $("#answerCheckbox").append("<i class='glyphicon glyphicon-remove'>Errado!</i>");

	$("#answerTriangleConstructable").empty();
	var sum = parseInt(b)+parseInt(c);
	if(typeOfAngle===NO_TRIANGLE){
		$("#answerTriangleConstructable").html("<strong>a)</strong>Analisando utilizando a Desigualdade Triangular relativa ao maior lado (a="+a+"):<br/> Para existir triângulo deve ser verdade a desigualdade:<br/> b + c > a, ou seja, "+b+" + "+c+" > "+a+", ou seja, "+sum+">"+a+" <i class='glyphicon glyphicon-remove'>Falso!</i> <br/> Logo, NÃO é possível construir triângulo com as 3 varetas dadas: a="+a+", b="+b+", c="+c+".");
	}else{
		$("#answerTriangleConstructable").html("<strong>a)</strong>Analisando utilizando a Desigualdade Triangular relativa ao maior lado (a="+a+"):<br/> Para existir triângulo deve ser verdade a desigualdade:<br/> b + c > a, ou seja, "+b+" + "+c+" > "+a+", ou seja, "+sum+">"+a+" <i class='glyphicon glyphicon-ok'>Verdade!</i> <br/> Logo, <strong>É possível construir triângulo</strong> com as 3 varetas dadas: a="+a+", b="+b+", c="+c+".");
	}
}

function matchedConstructabilityAndUserAnswer(){
	return (typeOfAngle===NO_TRIANGLE && document.getElementById('notConstructableCheckbox').checked) ||
		(!(typeOfAngle===NO_TRIANGLE) && !document.getElementById('notConstructableCheckbox').checked)
}

/*
function checkSidesRelationship(){
	$("#answerSidesRadio").empty();
	if(matchedSidesRelationshipAndUserAnswer()){
		$("#answerSidesRadio").append("<i class='glyphicon glyphicon-ok'>Correto!</i>");
	}
	else $("#answerCheckbox").append("<i class='glyphicon glyphicon-remove'>Errado!</i>");

	$("#answerTriangleConstructable").empty();
	var sum = parseInt(b)+parseInt(c);
	var inequalityDeduction = "<strong>a)</strong>Analisando utilizando a Desigualdade Triangular relativa ao maior lado (a="+a+"):<br/> Para existir triângulo deve ser verdade a desigualdade:<br/> b + c > a, ou seja, "+b+" + "+c+" > "+a+", ou seja, "+sum+">"+a;
	if(typeOfAngle===NO_TRIANGLE){
		$("#answerTriangleConstructable").html(inequalityDeduction+" <i class='glyphicon glyphicon-remove'>Falso!</i> <br/> Logo, NÃO é possível construir triângulo com as 3 varetas dadas: a="+a+", b="+b+", c="+c+".");
	}else{
		$("#answerTriangleConstructable").html(inequalityDeduction+" <i class='glyphicon glyphicon-ok'>Verdade!</i> <br/> Logo, <strong>É possível construir triângulo</strong> com as 3 varetas dadas: a="+a+", b="+b+", c="+c+".");
	}
}

function matchedSidesRelationshipAndUserAnswer(){
	var angleClassRadios = document.getElementByName("greaterAngleClass");
	for(radio in angleClassRadios){
		if(radio.checked === true){
			console.log(radio.value);
		}
	}
}
*/

function scrollToTheAnswer(){
	$('html, body').animate({
	        scrollTop: $("#answerCheckbox").offset().top 
	}, 1000);
}

function drawTriangleIfExists(){
	if(!typeOfAngle === NO_TRIANGLE){
		$("#answerJXGBox").addClass("jxgbox");
		closedTriangleFigure();
	}
}

function revealAnswer(){
	scrollToTheAnswer()
	checkAnswers();
	drawTriangleIfExists()
}
