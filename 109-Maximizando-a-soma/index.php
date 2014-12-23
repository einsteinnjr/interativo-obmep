<!DOCTYPE html>
<html lang="pt-BR">
<head>
	<meta charset="utf-8" />
        <link rel="stylesheet" type="text/css" href="assets/jquery-ui/css/jquery-ui.min.css">
        <link rel="stylesheet" type="text/css" href="assets/bootstrap/css/bootstrap.min.css">
        <link href="assets/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" media="screen">
	<link rel="stylesheet" type="text/css" href="src/css/teorema109.css">
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
			<button id="newGameButton" type="button" class="btn btn-default btn-primary" onClick="generateNewGame();">Nova Expressão</button>
		</div>	
	</div>
	<div class="bordered spaced">	
		<div class="spaced">
			<div class="inline"><b>Números Inteiros:</b></div> 
			<div id="dintegers"><ul id="integers" class="horizontalList spaced connectedSortable numbers-1line"></ul></div>
		</div>
		<div class="spaced">
			<div class="inline"><b>Expressão de maior valor:</b> </div>
			<div class="spaced"> <div id="expression" class="spaced"></div></div>
		</div>
		<div class="big-spaced">
			<button id="hintButton" type="button" class="btn btn-default" onClick="tellMaximumExpressionValue();">Mostrar Dica</button>		
			<span id="hint"> </span>
		</div>
		<div class="big-spaced">
			<button id="showAnswer" type="button" class="btn btn-default btn-success" onClick="showAnswer();">Mostrar Resposta</button>
		</div>	
	</div>
	<div id="solution" class="spaced hidden bordered"> 
		<div class="inline"><b>Solução:</b> </div>
		<div class="spaced"> <div id="solutionExpression" class="spaced"></div></div>
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
	<script src="assets/jquery-ui/js/jquery-ui.min.js"></script>
	<script src="assets/bootstrap/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="src/js/teorema109.js"></script>

	<script>	
	$(document).ready(function () {
		generateNewGame();
	});
	</script>
</body>
</html>
