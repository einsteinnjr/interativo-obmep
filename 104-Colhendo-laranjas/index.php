<!DOCTYPE html>
<html lang="pt-BR">
<head>
	<meta charset="utf-8" />
        <link rel="stylesheet" type="text/css" href="assets/bootstrap/css/bootstrap.min.css">
        <link href="assets/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" media="screen">
	<link rel="stylesheet" type="text/css" href="src/css/teorema104.css">
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
		<button id="newGame" type="button" class="btn btn-default btn-primary spaced" onClick="generateNewGame();">Novo Jogo</button>
	</div>	

	<div class="spaced bordered">
		<div id="orchard"></div>	
		<div class="spaced">
			<label id="lActualSum"><b>Soma Atual: <span id="actualSum" class="actual">0</span> </b></label>
		</div>
		<div id="pathButtons" class="spaced">
			<button id="testPath" type="button" class="btn btn-default" onClick="validateIfItIsMaxPath();">Testar Caminho</button>
			<button id="showMaxPath" type="button" class="btn btn-default btn-success" onClick="showMaxPath();">Mostrar Solução</button>	
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
		<button type="button" class="btn btn-default" data-dismiss="modal">Ok</button>
	      </div>
	    </div><!-- /.modal-content -->
	  </div><!-- /.modal-dialog -->
	</div><!-- /.modal -->	


	<p class="spaced">fonte do problema: <a href="https://projecteuler.net/problem=18">Project Euler</a></p>
	<script src="assets/jquery/jquery-1.10.2.min.js"></script>
	<script src="assets/bootstrap/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="src/js/teorema104.js"></script>
	<script>
		$(document).ready(function () {
			generateNewGame();
		});
	</script>
</body>
</html>
