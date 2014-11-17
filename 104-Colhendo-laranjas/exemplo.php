<!DOCTYPE html>
<html lang="pt-BR">
<head>
	<meta charset="utf-8" />
	<title>104 - Colhendo laranjas</title>
        <link rel="stylesheet" type="text/css" href="assets/bootstrap/css/bootstrap.min.css">
        <link href="assets/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" media="screen">
	<link rel="stylesheet" type="text/css" href="src/css/teorema104.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

</head>
<body>
	<h4><strong>Colhendo laranjas:</strong></h4>
	<div>
		<p><strong> Bernardo costuma colher laranjas em um pomar de formato triangular, como o abaixo. Os números representam a quantidade de frutos em cada uma delas. </strong></p>		
		<p><strong>Deseja-se descobrir qual o caminho deve fazer partindo da laranjeira mais alta e chegando até a última linha, apenas seguindo direções inferior esquerda ou inferior direita e de maneira a colher o maior número de laranjas possível. 
		<p><strong>Clique nas árvores de forma a definir o caminho. Assim que tiver um caminho completo, com uma laranjeira por linha, você pode testar se achou a solução. Utilize os botões abaixo. </strong></p>
	</div>
	<div class="spaced">
		<strong>- Escolha o nivel desejado: </strong>
		<div>
			<label class="radio-inline">
			  <input type="radio" name="gameLevel" value="easy" checked> Fácil
			</label>
			<label class="radio-inline">
			  <input type="radio" name="gameLevel" value="medium"> Médio
			</label>
			<label class="radio-inline">
			  <input type="radio" name="gameLevel" value="hard"> Difícil
			</label>
		</div>
	</div>
	<button id="newGame" type="button" class="btn btn-default spaced" onClick="generateNewGame();">Novo Jogo</button>
	<div id="orchard"></div>

	<div class="spaced">
		<label id="lActualSum"><b>Soma atual: <span id="actualSum" class="correct">0</span> </b></label>
	</div>
	<div class="btn-group spaced">
		<button id="testPath" type="button" class="btn btn-default" onClick="validateIfItIsMaxPath();">Testar Caminho</button>
		<button id="showMaxPath" type="button" class="btn btn-default btn-primary" onClick="showMaxPath();">Mostrar Caminho Máximo</button>	
	</div>	

	<p class="spaced">fonte do problema: <a href="https://projecteuler.net/problem=18">Project Euler</a></p>
	<script src="assets/jquery/jquery-1.10.2.min.js"></script>
        <script type="text/javascript" src="src/js/teorema104.js"></script>
	
	<script>
		$(document).ready(function () {
			generateNewGame();
		});
	</script>
</body>
</html>
