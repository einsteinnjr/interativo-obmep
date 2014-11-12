<!DOCTYPE html>
<html lang="pt-BR">
<head>
	<meta charset="utf-8" />
	<title>105 - Ordenando frações</title>
        <link rel="stylesheet" type="text/css" href="assets/jquery-ui/css/jquery-ui.min.css">
        <link rel="stylesheet" type="text/css" href="assets/bootstrap/css/bootstrap.min.css">
        <link href="assets/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" media="screen">
	<link rel="stylesheet" type="text/css" href="src/css/teorema105.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
</script>
	
</head>
<body>
	<h4><strong>Ordenando frações:</strong></h4>
	<div>
		<p><strong> Ordene as frações abaixo da menor para a maior: </strong></p>		
	</div>
	<div>
	<ul id="fractionsList" class="horizontalList spaced"></ul>
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
	<div class="spaced">
		<button id="testSorting" type="button" class="btn btn-default" onClick="validateSorting();">Testar Ordenação</button>
		<button id="newFractionList" type="button" class="btn btn-default btn-primary" onClick="generateNewGame();">Nova Lista</button>	
	</div>	
	<div id="solution" class="spaced"> </div>
	<script src="assets/jquery/jquery-1.10.2.min.js"></script>
	<script src="assets/jquery-ui/js/jquery-ui.min.js"></script>
        <script type="text/javascript" src="src/js/teorema105.js"></script>
	<script type="text/javascript" src="assets/MathJax/MathJax.js"></script>


	<script>
	$(document).ready(function () {
		generateNewGame();
	});
	MathJax.Hub.Config({
	  config: ["MMLorHTML.js"],
	  jax: ["input/AsciiMath","output/HTML-CSS","output/NativeMML"],
	  extensions: ["asciimath2jax.js","MathMenu.js","MathZoom.js"],
	  imageFont: null
	});
	</script>
</body>
</html>
