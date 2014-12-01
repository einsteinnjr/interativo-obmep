<!DOCTYPE html>
<html lang="pt-BR">
<head>
	<meta charset="utf-8" />
        <link rel="stylesheet" type="text/css" href="assets/bootstrap/css/bootstrap.min.css">
        <link href="assets/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" media="screen">
	<link rel="stylesheet" type="text/css" href="src/css/teorema108.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
</script>
	
</head>
<body>	
	<div class="spaced bordered">	
		<div class="spaced">
			<strong>- Escolha o tamanho do tabuleiro: </strong>
			<div>
				<label class="radio-inline">
				  <input type="radio" name="sideLengthRadio" value="small" onclick="decideSideLength(this)" checked> Pequeno
				</label>
				<label class="radio-inline">
				  <input type="radio" name="sideLengthRadio" value="medium" onclick="decideSideLength(this)"> Médio
				</label>
				<label class="radio-inline">
				  <input type="radio" name="sideLengthRadio" value="large" onclick="decideSideLength(this)"> Grande
				</label>
			</div>
		</div>	
		<div class="spaced">
			<button id="newTableButton" type="button" class="btn btn-default btn-primary" onClick="generateNewGame();">Novo Tabuleiro</button>
		</div>	
	</div>
	<div class="bordered spaced clear-b">
		<div class="spaced inline width-half padding">
			<div class="spaced"><b>Gabarito:</b></div>
			<table id="neighborsTable" class="spaced"></table>
		</div>
		<div class="spaced inline width-half padding">
			<div class="spaced"><b>Tabuleiro interativo:</b></div>
			<table id="userBlackSquaresTable" class="spaced"></table>
		</div>

	</div>
	<div class="spaced clear-b">
			<button id="showAnswer" type="button" class="btn btn-default btn-success" onClick="showAnswer();">Mostrar Resposta</button>
	</div>	
	<div id="solution" class="spaced hidden bordered"> 
		<div class="spaced"><b>Solução:</b></div>
		<div class="spaced">Uma forma de resolver o problema é montar um sistema de equações onde as variáveis a <sub>i,j</sub> representam se a casa [i,j] do tabuleiro é uma casa preta ou não, valendo 1 ou 0, respectivamente. Cada um dos números nas casas do tabuleiro Gabarito gera uma equação. Resolvendo, temos a solução abaixo:</div>
		<div id="dSolutionTable"><table id="solutionTable" class="spaced margin-a"></table></div>
		
	</div>	

	<div id="modalInfo" class="modal fade">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
		<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Fechar</span></button>
		<h4 class="modal-title"></h4>
	      </div>
	      <div class="modal-body">
	      </div>
	      <div class="modal-footer">
		<button id='noButton' type="button" class="btn btn-default" data-dismiss="modal">Não, continuar jogando.</button>
		<button id='yesButton' type="button" class="btn btn-primary" data-dismiss="modal" onclick="showAnswer()">Sim, mostrar resposta.</button>
	      </div>
	    </div><!-- /.modal-content -->
	  </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->	

	<script src="assets/jquery/jquery-1.10.2.min.js"></script>
	<script src="assets/bootstrap/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="src/js/teorema108.js"></script>

	<script>

	$(document).ready(function () {
		generateNewGame();
	});
	</script>
</body>
</html>
