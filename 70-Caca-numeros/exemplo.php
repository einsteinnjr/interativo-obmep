<!DOCTYPE html>
<html lang="pt-BR">
<head>
	<meta charset="utf-8" />
	<title>70 - Caça-números</title>
        <link rel="stylesheet" type="text/css" href="assets/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="src/css/teorema70.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
	<strong> Selecione os números abaixo: </strong>
	<div class="table-responsive">	
		<table id="gameTable" class="table table-striped table-bordered" ></table>			
		<div> 
		</div>
	</div>


	<script src="assets/jquery/jquery-1.10.2.min.js"></script>
	<script src="src/js/teorema70.js"></script>
	<script>
		$(document).ready(function () {
			init();
			$("#gameTable").html(generateNewTableHtml());
		});
	</script>
</body>
</html>
