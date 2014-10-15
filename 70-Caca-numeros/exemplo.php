<!DOCTYPE html>
<html lang="pt-BR">
<head>
	<meta charset="utf-8" />
	<title>70 - Caça-números</title>
</head>
<body>
	<div>
		<strong> Encontre todos os números primos da tabela: </strong>
		<table id="gameTable"></table>			
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
