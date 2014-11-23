<!DOCTYPE html>
<html lang="pt-BR">
<head>
	<meta charset="utf-8" />
        <link rel="stylesheet" type="text/css" href="assets/jquery-ui/css/jquery-ui.min.css">
        <link rel="stylesheet" type="text/css" href="assets/bootstrap/css/bootstrap.min.css">
        <link href="assets/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" media="screen">
	<link rel="stylesheet" type="text/css" href="src/css/teorema106.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
</script>
	
</head>
<body>	
	<div>
	<ul id="weights" class="inline connectedSortable"><ul>
	</div>	
	<div id="balance" class="inline">
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
	<div class="spaced">
		<button id="newWeighing" type="button" class="btn btn-default" onClick="generateNewGame();">Nova Pesagem</button>
	</div>	
	<div id="solution" class="spaced"> </div>
	<script src="assets/jquery/jquery-1.10.2.min.js"></script>
	<script src="assets/jquery-ui/js/jquery-ui.min.js"></script>
        <script type="text/javascript" src="src/js/teorema106.js"></script>

	<script>

	$(function() {
		$( "#weights, #p1, #p2" ).sortable({	
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
