<!DOCTYPE html>
<html lang="pt-BR">
<head>
	<meta charset="utf-8" />
	<link rel="stylesheet" type="text/css" href="assets/jsxgraph/css/jsxgraph.css">
        <link rel="stylesheet" type="text/css" href="assets/bootstrap/css/bootstrap.min.css">
        <link href="assets/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" media="screen">
	<link rel="stylesheet" type="text/css" href="src/css/interactive116.css">
</head>
<body>
<div class="spaced-v">
  <button type="button" class="btn btn-default  btn-primary" onClick="generateNewGame()">Nova configuração</button>
</div>
<div class="spaced-v bordered">
	<div id="questionJXGBox" class="jxgbox center-img"></div>
</div>	
<div><b>Fonte do Problema:</b> <a href="http://clubes.obmep.org.br/blog/probleminha-uma-soma-notavel/">Clubes Obmep - Uma soma notável</a>
</div>

<div class="spaced-v">
  <button id="showAnswer" type="button" class="btn btn-default btn-success spaced-h" onClick="showAnswer();">Mostrar Explicação</button> 
</div> 

	<script src="assets/jquery/jquery-1.10.2.min.js"></script>
	<script src="assets/jsxgraph/js/jsxgraphcore.js"></script>
        <script type="text/javascript" src="src/js/interactive116.js"></script>
	
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
