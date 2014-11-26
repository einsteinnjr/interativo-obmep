<!DOCTYPE html>
<html lang="pt-BR">
<head>
	<meta charset="utf-8" />
        <link rel="stylesheet" type="text/css" href="assets/bootstrap/css/bootstrap.min.css">
        <link href="assets/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" media="screen">
	<link rel="stylesheet" type="text/css" href="src/css/teorema101.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
	<div>
		<div class="spaced bordered inline">
			<div>
				<b>- Escolha o nivel desejado:</b>
			</div>
			<label class="radio-inline">
			  <input type="radio" name="gameLevel" value="easy"  onclick="decideGameLevel(this)" checked> Fácil
			</label>
			<label class="radio-inline">
			  <input type="radio" name="gameLevel" value="hard" onclick="decideGameLevel(this)" > Difícil
			</label>
		</div>
	</div>
	<div>
		<div class="spaced bordered inline">
			<div>
				<b>- Escolha o tamanho do tabuleiro:</b>
			</div>
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
	<div>
		<button type="button" class="btn btn-default btn-primary spaced" onClick="generateNewGame();">Novo Jogo</button>
	</div>	
	<div class="spaced">	
		<table id="gameTable" class="table-striped" ></table>			
	</div>
	<div class="bordered inline">
		<div id="result" class="form-inline">
			<div>
				<label id="lPrimesFound"><b>Primos achados: <span id="numberOfPrimesFound" class="correct">0</span> </b></label>
			</div>
			<div>
				<label id="lErrors"><b>Erros: <span id="numberOfErrors" class="error">0</span> </b></label>
			</div>	
		</div>	
		<div class="spaced">
			<button id="hintButton" type="button" class="btn btn-default" onClick="tellNumberOfPrimes();">Mostrar Dica</button>		
			<span id="hint"> </span>
		</div>
	</div>
	<div id="modalGameOver" class="modal fade">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
		<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Fechar</span></button>
		<h4 class="modal-title">Fim de Jogo!</h4>
	      </div>
	      <div class="modal-body">
		<p><b>Parabéns! Você achou todos os <span id='modalNumberOfPrimes'></span> primos do tabuleiro! Deseja jogar novamente?</b></p>
	      </div>
	      <div class="modal-footer">
		<button type="button" class="btn btn-default" data-dismiss="modal">Não</button>
		<button type="button" class="btn btn-primary" onclick="closeModalGameOverAndNewGame()">Sim</button>
	      </div>
	    </div><!-- /.modal-content -->
	  </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->	

	<script src="assets/jquery/jquery-1.10.2.min.js"></script>
	<script src="assets/bootstrap/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="src/js/teorema101.js"></script>	
	<script>
		$(document).ready(function () {
			init();
		});
	</script>
</body>
</html>
