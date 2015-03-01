<!DOCTYPE html>
<html lang="pt-BR">
<head>
	<meta charset="utf-8" />
	<link rel="stylesheet" type="text/css" href="assets/jsxgraph/css/jsxgraph.css">
        <link rel="stylesheet" type="text/css" href="assets/bootstrap/css/bootstrap.min.css">
        <link href="assets/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" media="screen">
	<link rel="stylesheet" type="text/css" href="src/css/interactive118.css">
</head>
<body>
<div class="spaced-v">
  <button type="button" class="btn btn-default  btn-primary" onClick="generateNewGame()">Nova Configuração</button>
</div>
<div class="spaced-v bordered">
	<div id="questionJXGBox" class="jxgbox center-img"></div>
</div>	

<div class="spaced-v bordered">
	<div id="actualArea" class=""><b>Área: <span id="actualAreaValue" class="dark-green">-</span></b></div>
	<div id="minimumArea" class="hidden"><b>Área mínima: <span id="minimumAreaValue" class="dark-red"></span></b></div>
	<button id="showHint" type="button" class="btn btn-default spaced-h" onClick="showHintField(true);">Mostrar Dica</button> 
</div>	

<div><b>Fonte do Problema:</b> <a href="http://www.cangurudematematicabrasil.com.br/index.php/anteriores/canguru-2013/finish/9/47">Olimpíada Canguru de Matemática Brasil - Nivel J - Problema 5</a>
</div>

<div class="spaced-v">
  <button id="showAnswer" type="button" class="btn btn-default btn-success spaced-h" onClick="showAnswer();">Mostrar Explicação</button> 
</div> 

	<script src="assets/jquery/jquery-1.10.2.min.js"></script>
	<script src="assets/jsxgraph/js/jsxgraphcore.js"></script>
        <script type="text/javascript" src="src/js/interactive118.js"></script>
	
	<div>	
		<div id="answerExplanation" class="bordered answer-bg hidden height-auto">
		</div>
	</div>
	<script>
	$(document).ready(function () {
		generateNewGame();
	});
	</script>
</body>
</html>
