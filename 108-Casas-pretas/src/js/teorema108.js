
var sideLength=4;
var blackSquares=[], neighbors=[], auxArray1, auxArray2;

function generateTable(){
	var i,j;
	for(i=0; i<sideLength; i++){
		auxArray1=[];
		auxArray2=[];
		for(j=0; j<sideLength; j++){
			auxArray1.push(Math.floor(Math.random()*2));//1 means black.
			auxArray2.push(0);
		}
		blackSquares.push(auxArray1);
		neighbors.push(auxArray2);
	}
	fillNeighborsArray();
};

function countBlackSquaresNeighbors(i, j){
	var count=0;
	if(i > 0){//can go left
		if(j > 0){//can go up
			if(blackSquares[i-1][j-1] === 1) count++;//up-left
		}
		if(blackSquares[i-1][j] === 1) count++;//left
		if(j < sideLength-1){//can go down
			if(blackSquares[i-1][j+1] === 1) count++;//down-left
		}
	}
	if(j > 0){//can go up
		if(blackSquares[i][j-1] === 1) count++;//up
	}
	if(j < sideLength-1){//can go down
		if(blackSquares[i][j+1] === 1) count++;//down
	}
	if(i < sideLength-1){//can go right
		if(j > 0){//can go up
			if(blackSquares[i+1][j-1] === 1) count++;//up-right
		}
		if(blackSquares[i+1][j] === 1) count++;//right
		if(j < sideLength-1){//can go down
			if(blackSquares[i+1][j+1] === 1) count++;//down-right
		}
	}
	return count;
};

function fillNeighborsArray(){
	var i,j;
	for(j=0; j<sideLength; j++){//line
		for(i=0; i<sideLength; i++){//column
			neighbors[i][j] = countBlackSquaresNeighbors(i, j);
		}
	}
}

function printTable(array){
	var i,j, aux;
	for(j=0; j<sideLength; j++){//line
		aux ="";
		for(i=0; i<sideLength; i++){//column
			aux += array[i][j]+" ";
		}
		console.log(aux);
	}
}

function generateNewGame(){
	generateTable();
	console.log("blackSquares");
	printTable(blackSquares);
	console.log("neighbors");
	printTable(neighbors);
	
};

