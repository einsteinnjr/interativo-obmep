<!DOCTYPE html>
<html lang="pt-BR">
<head>
	<meta charset="utf-8" />
        <link rel="stylesheet" type="text/css" href="assets/jquery-ui/css/jquery-ui.min.css">
        <link rel="stylesheet" type="text/css" href="assets/bootstrap/css/bootstrap.min.css">
        <link href="assets/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" media="screen">
	<link rel="stylesheet" type="text/css" href="src/css/teorema108.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
</script>
	
</head>
<body>	
	<div class="spaced bordered">	
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
			<button id="newNumberButton" type="button" class="btn btn-default btn-primary" onClick="generateNewGame();">Novo Número</button>
		</div>	
	</div>
	<div class="bordered spaced">	
		<div class="spaced">
			<div class="inline"><b>Número original:</b> <span id="originalNumber"></span></div>
		</div>
		<div class="spaced">
			<div id="minorBordered" class="bordered inline width-medium">
				<div class="spaced">
					<div class="inline"><b>Dígitos a adicionar:</b></div> 
					<div><ul id="minorNewDigits" class="inline horizontalList spaced minorConnectedSortable"></ul></div>
				</div>
				<div class="spaced">
					<div class="inline"><b><span class='green'>Menor</span> número formado:</b> </div>
					<div> <ul id="minorNumber" class="inline horizontalList spaced minorConnectedSortable"></ul></div>
				</div>
			</div>
		</div>
		<div class="spaced">
			<div id="majorBordered" class="bordered inline width-medium">
				<div class="spaced">
					<div class="inline"><b>Dígitos a adicionar:</b> </div>
					<div><ul id="majorNewDigits" class="inline horizontalList spaced connectedSortable"></ul></div>
				</div>
				<div class="spaced">
					<div class="inline"><b><span class='green'>Maior</span> número formado:</b></div>
					<div> <ul id="majorNumber" class="inline horizontalList spaced majorConnectedSortable"></ul></div>
				</div>
			</div>
		</div>
		<div class="spaced">
			<button id="showAnswer" type="button" class="btn btn-default btn-success" onClick="checkAnswer();">Mostrar Resposta</button>
		</div>	
	</div>
	<div id="solution" class="spaced hidden bordered"> </div>	

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
	<script src="assets/jquery-ui/js/jquery-ui.min.js"></script>
	<script src="assets/bootstrap/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="src/js/teorema108.js"></script>

	<script>
	$(function() {
		$( "#minorNewDigits, #minorNumber" ).sortable({
			cancel: ".ui-state-disabled",
			connectWith: ".minorConnectedSortable"
		}).disableSelection();
		$( "#majorNewDigits, #majorNumber" ).sortable({
			cancel: ".ui-state-disabled",
			connectWith: ".majorConnectedSortable"
		}).disableSelection();
	});
        
	
	$(document).ready(function () {
		generateNewGame();
	});
	</script>
</body>
</html>
