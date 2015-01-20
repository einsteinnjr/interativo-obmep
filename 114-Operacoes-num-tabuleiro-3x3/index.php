<!DOCTYPE html>
<html lang="pt-BR">
<head>
	<meta charset="utf-8" />
        <link rel="stylesheet" type="text/css" href="assets/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="assets/jquery-ui/css/jquery-ui.min.css">
        <link href="assets/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" media="screen">
	<link rel="stylesheet" type="text/css" href="src/css/interactive114.css">
</head>
<body>
<div class="spaced-v">
  <button type="button" class="btn btn-default  btn-primary" onClick="generateNewGame()">Nova configuração</button>
</div>


<div class="spaced-v bordered">
	<div class="spaced-v">
		<b>Operação:</b> <select id='numberToAdd' class="form-control selectwidthauto inline"><option value='1'>Somar +1</option><option value='-1'>Somar -1</option></select>
	</div>	
	<div class="spaced-v spaced-h inline bordered">
		<div>
			<div class="spaced-v"><b>Tabuleiro interativo:</b></div>
			<table id="gameTable" ></table>
		</div>
		<div id="dGameSum" class="hidden">
			<div id="lGameSum"><b>Soma atual do tabuleiro: </b><div class="gameSumValue green inline"></div></div>
			<div id="l3-remainderGameSum"><b>Resto por 3 da soma atual: </b><div class="3-remainderGameSumValue green inline"></div></div>
		</div>
	</div>
	<div class="spaced-v inline bordered">
		<div>
		<div class="spaced-v"><b>Estado final desejado:</b></div>
		<table id="desiredFinalTable" ></table>
		</div>
		<div id="dFinalSum" class="hidden">
			<div id="lFinalSum"><b>Soma final: </b><div class="finalSumValue green inline"></div></div>
			<div id="l3-remainderFinalSum"><b>Resto por 3 da soma final: </b><div id="3-remainderFinalSumValue" class="green inline"></div></div>
		</div>
	</div>
</div>	



<div class="spaced-v">
  <button id="showAnswer" type="button" class="btn btn-default btn-success spaced-h" onClick="showAnswer();">Mostrar Explicação</button> 
</div> 

	<script src="assets/jquery/jquery-1.10.2.min.js"></script>
	<script src="assets/jquery-ui/js/jquery-ui.min.js"></script>
        <script type="text/javascript" src="src/js/interactive114.js"></script>
	
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
