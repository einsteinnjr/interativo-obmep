<!DOCTYPE html>
<html lang="pt-BR">
<head>
	<meta charset="utf-8" />	
        <link rel="stylesheet" type="text/css" href="assets/bootstrap/css/bootstrap.min.css">
        <link href="assets/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" media="screen">
	<link rel="stylesheet" type="text/css" href="src/css/teorema103.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

</head>
<body>
	<div id="columns">
		<div class="column-left">
			<div class="spaced-v">
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
				<button type="button" class="btn btn-default btn-primary spaced-v" onClick="generateNewGame();">Novo Jogo</button> 
			</div>
			<table id="requisites" class="table table-bordered hidden spaced-v">
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
			  <button id="revealExplanation" type="button" class="btn btn-default hidden spaced-v" onClick="revealExplanation();">Revelar Explicação</button> 
			  <div id="secret"></div>
			</div>	
		</div>	
		<div class="column-right">
			<table id="questions" class="table table-striped table-bordered spaced-v">
			</table>
		</div>
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
		<button id='noButton' type="button" class="btn btn-default" data-dismiss="modal">Não</button>
		<button id='yesButton' type="button" class="btn btn-primary" data-dismiss="modal" onclick="generateNewGame()">Sim</button>
	      </div>
	    </div><!-- /.modal-content -->
	  </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->	
	
	

	<script src="assets/jquery/jquery-1.10.2.min.js"></script>
	<script src="assets/bootstrap/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="src/js/teorema103.js"></script>
	
	<script>
		$(document).ready(function () {
			generateNewGame();
		});
	</script>
</body>
</html>
