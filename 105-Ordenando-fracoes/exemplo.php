<!DOCTYPE html>
<html lang="pt-BR">
<head>
	<meta charset="utf-8" />
	<title>105 - Ordenando frações</title>
        <link rel="stylesheet" type="text/css" href="assets/bootstrap/css/bootstrap.min.css">
        <link href="assets/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" media="screen">
	<link rel="stylesheet" type="text/css" href="src/css/teorema105.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

</head>
<body>
	<h4><strong>Ordenando frações:</strong></h4>
	<div>
		<p><strong> Ordene as frações abaixo da menor para a maior: </strong></p>		
	</div>
	<div id="orchard"></div>
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
	<div class="btn-group">
		<button id="testPath" type="button" class="btn btn-default" onClick="validateIfItIsMaxPath();">Testar Ordenação</button>
		<button id="testPath" type="button" class="btn btn-default btn-primary" onClick="showMaxPath();">Nova Lista</button>	
	</div>	
	<script src="assets/jquery/jquery-1.10.2.min.js"></script>
        <script type="text/javascript" src="src/js/teorema105.js"></script>
	
	<script>
		$(document).ready(function () {
			generateNewGame();
		});
	</script>
</body>
</html>
