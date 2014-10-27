<!DOCTYPE html>
<html lang="pt-BR">
<head>
	<meta charset="utf-8" />
	<title>104 - Colhendo laranjas</title>
        <link rel="stylesheet" type="text/css" href="assets/bootstrap/css/bootstrap.min.css">
        <link href="assets/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" media="screen">
	<link rel="stylesheet" type="text/css" href="src/css/teorema104.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

</head>
<body>
	<h4><strong>Colhendo laranjas:</strong></h4>
	<div>
		<p><strong> Bernardo costuma colher laranjas em um pomar de formato triangular. Ele é repleto de laranjeiras dispostas em linhas horizontais, de forma que cada linha tem uma laranjeira a menos que a linha debaixo dela. Além disso, a laranjeira é dita vizinha de suas 2 vizinhas imediatamente abaixo delas (diagonal esquerda e diagonal direita). Os números representam a quantidade de laranjas em cada uma delas. </strong></p>
		<p><strong>Bernardo deseja descobrir qual o caminho deve fazer, partindo da laranjeira mais alta e seguindo apenas para laranjeiras vizinhas para baixo, de forma a conseguir colher o maior número de laranjas, chegando a última linha. 
		<p><strong>Clique nas laranjeiras de forma a definir o caminho. Assim que tiver um caminho completo (com uma laranjeira por linha), você pode testar se achou o caminho com maior número de laranjas. </strong></p>
	</div>
	<div class="orchard">

	</div>	
	
	
	<p>fonte do problema: <a href="https://projecteuler.net/problem=18">Project Euler</a></p>
	<script src="assets/jquery/jquery-1.10.2.min.js"></script>
        <script type="text/javascript" src="src/js/teorema104.js"></script>
	
	<script>
		$(document).ready(function () {
			generateNewGame();
		});
	</script>
</body>
</html>
