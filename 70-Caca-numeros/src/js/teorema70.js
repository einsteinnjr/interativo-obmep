//http://www.miniwebtool.com/list-of-prime-numbers/?to=10000
//25 primes less than 100
//168 primes less than 1000
var primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];

var others = [];

var sideLength=5;
var MAX_NUMBER=1000;

function generateNewTableHtml(n){
	var tableHtml="";
	var idx=0;
	for(var i=0; i<n; i++){
		tableHtml+="<tr>";
		for(var j=0; j<n; j++){
			//every tableElement must be a random number
			tableHtml+="<td id=\"elem_"+idx+"\" > "+primes[Math.floor(Math.random()*primes.length)]+"</td>";
			idx++;
		}
		tableHtml+="</tr></br>"
	}	
	return tableHtml;
}

function toggleIt(idx){
	console.log('elem_'+idx);
	$('#elem_'+idx).toggleClass("mouse-over");
}

function generateOthers(){
	var i=0, j=1;
	while(i<primes.length){
		if(j<primes[i]){ //se j não estiver no array primes, adicione em others
			others.push(j);
		}
		else{//se j tiver chegado no valor do primes[i], podemos ir ao proximo valor.
			i++;		
		}
		j++;//ande ao proximo numero.
	}
	while(j<=MAX_NUMBER){// preencha others até o MAX_NUMBER
		others.push(j);		
		j++;
	}
	for(i=0;i<others.length; i++){
		console.log(others[i]);
	}
}

function decideSideLength(myRadio){
	if(myRadio.value==="small") sideLength=5;
	else if(myRadio.value==="large") sideLength=7;
}

function generateNewTable(){
	$("#gameTable").html(generateNewTableHtml(sideLength));
	mouseEventsOnTable();
}

function mouseEventsOnTable(){
	$("table td").mouseenter(function(){
		$(this).addClass("mouse-over");
	});
	$("table td").mouseout(function(){
		$(this).removeClass("mouse-over");
	});	
}

function init(){
	generateNewTable();
	generateOthers();
};

