<!DOCTYPE html>
<html lang="pt-BR">
<head>
	<meta charset="utf-8" />
        <link rel="stylesheet" type="text/css" href="assets/jquery-ui/css/jquery-ui.min.css">
        <link rel="stylesheet" type="text/css" href="assets/bootstrap/css/bootstrap.min.css">
        <link href="assets/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" media="screen">
	<link rel="stylesheet" type="text/css" href="src/css/teorema106.css">
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
			<button id="newWeighing" type="button" class="btn btn-default btn-primary" onClick="generateNewGame();">Nova Pesagem</button>
		</div>	
	</div>
	<div class="spaced bordered">
		<div><b>Pesos:</b></div>
		<div id="columns">
			<div class="inline">
				<ul id="weights" class="inline connectedSortable"><ul>
			</div>
			<div id="dRequisites" class="inline">
				<table id="requisites">
					<tr>
						<td><b>Intervalo de Pesagem:</b></td>
						<td id="weightInterval" class="reqValues"></td>
					</tr>
					<tr>
						<td><b>Suposto Peso de X:</b></td>
						<td id="xWeight" class="reqValues"></td>
					</tr>
				</table>
			</div>
		</div>
		<div id="balance">
			<div class="inline side"> 
				<div ><h4 id="p1SumOfWeights" class="plate_label">0kg</h4></div>
				<ul id="p1" class="plate inline connectedSortable"></ul>
			</div>	
			<div id='c' class="inline column"></div>
			<div class="inline side">
				<div ><h4 id="p2SumOfWeights" class="plate_label">0kg</h4></div>
				<ul id="p2" class="plate inline connectedSortable"></ul>
			</div>
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
	<script src="assets/jquery-ui/js/jquery-ui.min.js"></script>
	<script src="assets/bootstrap/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="src/js/teorema106.js"></script>

	<script>
	$(function() {
		$( "#weights, #p1, #p2" ).sortable({
			revert:true,			
			connectWith: ".connectedSortable",
			update: function(){weightPlates();}
		}).disableSelection();
	});
        
	
	$(document).ready(function () {
		generateNewGame();
	});
	</script>
</body>
</html>
