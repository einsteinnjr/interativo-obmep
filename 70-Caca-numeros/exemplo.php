<!DOCTYPE html>
<html lang="pt-BR">
<head>
	<meta charset="utf-8" />
	<title>70 - Caça-números</title>
        <link rel="stylesheet" type="text/css" href="assets/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="src/css/teorema70.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
	<h4>Caça-números</h4>
	<div>
		<strong> Ache os números primos no tabuleiro: </strong>
	</div>
</br>
	<div>
		<strong> Qual o tamanho do tabuleiro? </strong>
		<div>
			<label class="radio-inline">
			  <input type="radio" name="tableSize" value="small"  onclick="decideSideLength(this)" checked> pequeno
			</label>
			<label class="radio-inline">
			  <input type="radio" name="tableSize" value="large" onclick="decideSideLength(this)" > grande
			</label>
		</div>
	</div>
</br>
	<button type="button" onClick="generateNewTable();">Novo Tabuleiro</button>
	<div class="table-responsive">	
		<table id="gameTable" class="table table-striped table-bordered" ></table>			
	</div>


	<script src="assets/jquery/jquery-1.10.2.min.js"></script>
        <script type="text/javascript" src="src/js/teorema70.js"></script>	
	<script>
		$(document).ready(function () {
			init();
		});
	</script>
</body>
</html>
