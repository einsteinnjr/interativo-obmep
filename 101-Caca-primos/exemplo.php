<!DOCTYPE html>
<html lang="pt-BR">
<head>
	<meta charset="utf-8" />
	<title>101 - Caça-primos</title>
        <link rel="stylesheet" type="text/css" href="assets/bootstrap/css/bootstrap.min.css">
        <link href="assets/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" media="screen">
	<link rel="stylesheet" type="text/css" href="src/css/teorema101.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
	<h4><strong>Caça-Primos:</strong></h4>
	<div>
		<strong> Ache todos os números primos no tabuleiro abaixo. </strong>
	</div>
	<div>
		<strong>- Escolha o nivel desejado: </strong>
		<div>
			<label class="radio-inline">
			  <input type="radio" name="gameLevel" value="easy"  onclick="decideGameLevel(this)" checked> Fácil
			</label>
			<label class="radio-inline">
			  <input type="radio" name="gameLevel" value="hard" onclick="decideGameLevel(this)" > Difícil
			</label>
		</div>
	</div>
	<div>
		<strong>- Escolha o tamanho do tabuleiro: </strong>
		<div>
			<label class="radio-inline">
			  <input type="radio" name="tableSize" value="small"  onclick="decideSideLength(this)" checked> Pequeno
			</label>
			<label class="radio-inline">
			  <input type="radio" name="tableSize" value="medium" onclick="decideSideLength(this)" > Médio
			</label>
			<label class="radio-inline">
			  <input type="radio" name="tableSize" value="large" onclick="decideSideLength(this)" > Grande
			</label>
		</div>
	</div>
</br>
	<button type="button" class="btn btn-default" onClick="generateNewGame();">Novo Jogo</button>
	<div class="table-responsive">	
		<table id="gameTable" class="table table-striped table-bordered" ></table>			
	</div>
	<div id="result">
		<strong>Primos achados: <span id="primesFound" class="correct">0</span> </strong>
	</div>	
	<div class="spaced">
		<button id="hintButton" type="button" class="btn btn-default" onClick="tellNumberOfPrimes();">Revelar Dica</button>		
		<span id="hint"> </span>
	</div>	
	<script src="assets/jquery/jquery-1.10.2.min.js"></script>
        <script type="text/javascript" src="src/js/teorema101.js"></script>	
	<script>
		$(document).ready(function () {
			init();
		});
	</script>
</body>
</html>
