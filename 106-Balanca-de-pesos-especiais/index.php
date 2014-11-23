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
	<ul id="ws" class="weights connectedSortable">
		<li id='x' class="inline weight blue" value="0"><b>X</b></li>
		<li id='w1' class="inline weight lgray" value="1">1kg</li>
		<li id='w3' class="inline weight lgray" value="3">3kg</li>
		<li id='w9' class="inline weight lgray" value="9">9kg</li>
		<li id='w27' class="inline weight lgray" value="27">27kg</li>
	<ul>
	</div>	
	<div id="balance" class="inline">
		<div class="inline side"> 
			<ul id="p1" class="plate inline connectedSortable"></ul>
		</div>	
		<div id='c' class="inline column"></div>
		<div class="inline side">
			<ul id="p2" class="plate inline connectedSortable"></ul>
		</div>
	</div>	
	<div class="spaced">
		<button id="testSorting" type="button" class="btn btn-default" onClick="validateSorting();">Testar Ordenação</button>
	</div>	
	<div id="solution" class="spaced"> </div>
	<script src="assets/jquery/jquery-1.10.2.min.js"></script>
	<script src="assets/jquery-ui/js/jquery-ui.min.js"></script>
        <script type="text/javascript" src="src/js/teorema106.js"></script>

	<script>

	$(function() {
		$( "#ws, #p1, #p2" ).sortable({
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
