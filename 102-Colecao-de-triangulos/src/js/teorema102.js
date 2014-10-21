//sides
var a=15,//greater side 
    b=14, 
    c=13;

var x = Math.PI/3; //x=60
var senx=Math.sin(x);
var cosx=Math.cos(x);
var aLittleMargin = 1.2;
var aLittleSpace = 0.2;

var max_x = Math.max(a/2+c, a/2+b)*aLittleMargin;
var max_y = Math.max(c*senx, b*senx)*aLittleMargin;
var max_xy = Math.max(max_x, max_y);

function openTriangleFigure(){

	//adjust good coordinates for the board.
	var qboard = JXG.JSXGraph.initBoard('questionBox', {boundingbox: [-max_xy, max_xy, max_xy, -max_xy*aLittleSpace],  keepaspectratio: true,  showcopyright: false});

		//Coordinates: A1=[-a/2-c*senx, c*senx], B=[-a/2, 0], C=[a/2, 0], A2=[a/2+b*cosx, b*senx];
        var A1 = qboard.create('point', [-a/2-c*cosx, c*senx], {name:'A1', strokecolor:'red', fixed:true});
	var B = qboard.create('point', [-a/2, 0], {name:'B', strokecolor:'red', fixed:true});
	var C = qboard.create('point', [a/2, 0], {name:'C', strokecolor:'red', fixed:true});	
	var A2 = qboard.create('point', [a/2+b*cosx, b*senx], {name:'A2', strokecolor:'red', fixed:true});	

	//var line_a = qboard.create('line', [B, C], {label:"teste", strokecolor:'blue', fixed:true});

        var AB = qboard.create('segment', [A1, B], { name: c, withLabel:true, strokecolor:'black', fixed:true});
	var BC = qboard.create('segment', [B, C], {  name: a, withLabel:true, strokecolor:'black', fixed:true});
	var CA = qboard.create('segment', [C, A2], {  name: b, withLabel:true, strokecolor:'black', fixed:true});
};

function closedTriangleFigure(){

	//exists triangle
	var p=(a+b+c)/2;
	var area = Math.sqrt(p*(p-a)*(p-b)*(p-c))
	var h_a= area*2/a;
	var senb=h_a/c;
	var cosb=Math.sqrt(1-senb*senb);
	
	var aboard = JXG.JSXGraph.initBoard('answerBox', {boundingbox: [-max_xy, max_xy, max_xy, -max_xy*aLittleSpace], keepaspectratio: true, showcopyright: false});

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

function revealAnswer(){
	$("#answerBox").addClass("jxgbox");
	//scroll to the answer
	$('html, body').animate({
	        scrollTop: $("#answerBox").offset().top 
	}, 1000);
	closedTriangleFigure();
}
