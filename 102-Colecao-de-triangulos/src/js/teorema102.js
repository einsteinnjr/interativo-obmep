//sides
var a=15,//greater side 
    b=12, 
    c=8;
var sen45=Math.sqrt(2)/2;
var aLittleMargin = 1.2;

var max_x = Math.max(a/2+c, a/2+b)*aLittleMargin;
var max_y = Math.max(c*sen45, b*sen45)*aLittleMargin;
var max_xy = Math.max(max_x, max_y);

function openTriangleFigure(){

	//adjust good coordinates for the board.
	var qboard = JXG.JSXGraph.initBoard('questionBox', {boundingbox: [-max_xy, max_xy, max_xy, -max_xy*0.2],  keepaspectratio: true, axis:true, showcopyright: false});

		//Coordinates: A1=[-a/2-c*sen45, c*sen45], B=[-a/2, 0], C=[a/2, 0], A2=[a/2+b*sen45, b*sen45];
        var A1 = qboard.create('point', [-a/2-c*sen45, c*sen45], {name:'A1', strokecolor:'red', frozen:true});
	var B = qboard.create('point', [-a/2, 0], {name:'B', strokecolor:'red', frozen:true});
	var C = qboard.create('point', [a/2, 0], {name:'C', strokecolor:'red', frozen:true});	
	var A2 = qboard.create('point', [a/2+b*sen45, b*sen45], {name:'A2', strokecolor:'red', frozen:true});	

	var line_a = qboard.create('line', [B, C], {name:a, strokecolor:'blue', frozen:true});

        var AB = qboard.create('segment', [A1, B], {name:c, strokecolor:'black', frozen:true});
	var BC = qboard.create('segment', [B, C], {name:a, strokecolor:'black', frozen:true});
	var CA = qboard.create('segment', [C, A2], {name:b, strokecolor:'black', frozen:true});
};

function closedTriangleFigure(){

	//exists triangle
	var p=(a+b+c)/2;
	var area = Math.sqrt(p*(p-a)*(p-b)*(p-c))
	var h_a= area*2/a;
	var senb=h_a/c;
	var cosb=Math.sqrt(1-senb*senb);
	
	var aboard = JXG.JSXGraph.initBoard('answerBox', {boundingbox: [-max_xy, max_xy, max_xy, -max_xy*0.2], keepaspectratio: true, axis:true, showcopyright: false});

	//Coordinates: A=[0, h_a], B=[-c*senb, 0], C=[0, a-c*senb];        
	var A = aboard.create('point', [0, h_a], {name:'A', strokecolor:'red'});
	var B = aboard.create('point', [-c*senb, 0], {name:'B', strokecolor:'red'});
	var C = aboard.create('point', [a-c*senb, 0], {name:'C', strokecolor:'red'});
	var triangle = aboard.create('polygon',[A,B,C], {strokecolor:'black', fillcolor:"white" });

};


function revealAnswer(){
	$("#answerBox").addClass("jxgbox");
	closedTriangleFigure();
}
