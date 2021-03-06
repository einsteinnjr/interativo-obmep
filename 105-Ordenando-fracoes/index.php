<!DOCTYPE html>
<html lang="pt-BR">
<head>
	<meta charset="utf-8" />
        <link rel="stylesheet" type="text/css" href="assets/jquery-ui/css/jquery-ui.min.css">
        <link rel="stylesheet" type="text/css" href="assets/bootstrap/css/bootstrap.min.css">
        <link href="assets/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" media="screen">
	<link rel="stylesheet" type="text/css" href="src/css/teorema105.css">
</head>
<body>	
	<div class="bordered spaced">
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
			<button id="newFractionList" type="button" class="btn btn-default btn-primary" onClick="generateNewGame();">Nova Lista</button>	
		</div>
	</div>
	<div class="bordered spaced">	
		<div class="spaced">
		<ul id="fractionsList" class="horizontalList spaced"></ul>
		</div>
		<div class="spaced">
			<button id="testSorting" type="button" class="btn btn-default btn-success" onClick="validateSorting();">Testar Ordenação</button>
		</div>	
	</div>
	<div id="solution" class="spaced hidden bordered"> </div>

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
