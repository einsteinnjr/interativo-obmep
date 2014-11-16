<!DOCTYPE html>
<html lang="pt-BR">
<head>
	<meta charset="utf-8" />
	<title>103 - Descubra o número</title>	
        <link rel="stylesheet" type="text/css" href="assets/bootstrap/css/bootstrap.min.css">
        <link href="assets/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" media="screen">
	<link rel="stylesheet" type="text/css" href="src/css/teorema103.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

</head>
<body>
	<h4><strong>Descubra o número:</strong></h4>
	<div>
		<p><strong> Bruno e Bernardo gostavam de jogar um jogo de adivinhação. Bruno pedia que Bernardo pensasse em um número de 1 a 100, por exemplo. Bruno, então, tentaria adivinhar o número após uma série de perguntas a Bernardo com respostas sim ou não. (exemplo: O número que você pensou é menor ou igual a 17?).  </strong></p>
		<p><strong> Depois de algum tempo jogando, eles descobriram que havia um número mínimo de perguntas que se poderia fazer para que sempre fosse possível acertar o número de Bernardo. E você? Consegue descobrir o número pensado por Bernardo fazendo somente um número pequeno de perguntas? </strong></p>
	</div>
	<div id="columns">
		<div class="column-left">
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
			<div>
				<button type="button" class="btn btn-default btn-primary spaced" onClick="generateNewGame();">Novo Jogo</button> 
			</div>
			<table id="requisites" class="table table-bordered hidden spaced">
				<tr>
					<td><b>Intervalo de números:</b></td>
					<td id="interval"></td>
				</tr>
				<tr>
					<td><b>Número de Perguntas:</b></td>
					<td id="numberOfQuestions"></td>
				</tr>
			</table>
			<div>
			  <button id="revealExplanation" type="button" class="btn btn-default hidden spaced" onClick="revealExplanation();">Revelar Explicação</button> 
			  <div id="secret"></div>
			</div>	
		</div>	
		<div class="column-right">
			<table id="questions" class="table table-striped table-bordered spaced">
			</table>
		</div>
	</div>
	
	

	<script src="assets/jquery/jquery-1.10.2.min.js"></script>
        <script type="text/javascript" src="src/js/teorema103.js"></script>
	
	<script>
		$(document).ready(function () {
			generateNewGame();
		});
	</script>
</body>
</html>
