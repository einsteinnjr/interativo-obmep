<!DOCTYPE html>
<html lang="pt-BR">
<head>
	<meta charset="utf-8" />
	<title>102 - Coleção de triângulos</title>
        <link rel="stylesheet" type="text/css" href="assets/bootstrap/css/bootstrap.min.css">
        <link href="assets/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" media="screen">
	<link rel="stylesheet" type="text/css" href="src/css/teorema102.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
	<h4><strong>Coleção de triângulos:</strong></h4>
	<div>
		<p><strong> Renato, desde criança, sempre gostou de geometria. E, por isso, faz coleção de armações triangulares. Seu tio, sabendo da paixão do sobrinho, permitiu que ele fosse a seu galpão antigo e recolhesse varetas de metais de forma a construir mais triângulos para sua coleção. </strong></p>
		<p><strong> Devido a ser muito organizado, Renato, guarda sua coleção em grupos, dependendo do tipo de triângulo: equiláteros, isósceles, acutângulo, etc. Ajude-o a classificar os grupos de 3 varetas, dentro de sua coleção, ou informe que não é possivel fazer uma armação triangular com o grupo. </strong></p>
	</div>
	<div>
		<div class="checkbox">
		        <label>
		            <input type="checkbox" name="cant_construct_a_triangle" value="c" /> Não é possível construir triângulo.
		        </label>
            	</div>
	</div>
	<div>
		<p><strong> Em caso de triângulo:</strong> </p>		
		<div>
			<strong> - Classifique-o quanto ao maior ângulo: </strong></br>
			<label class="radio-inline">
			  <input type="radio" name="greaterAngleClass" value="acutangle"  onclick="decideSideLength(this)"> Acutângulo
			</label>
			<label class="radio-inline">
			  <input type="radio" name="greaterAngleClass" value="rectangle" onclick="decideSideLength(this)" > Retângulo
			</label>
			<label class="radio-inline">
			  <input type="radio" name="greaterAngleClass" value="obtusangle" onclick="decideSideLength(this)" > Obtusângulo
			</label>
		</div>
		<div>
		<strong> - Classifique-o quanto aos lados: </strong></br>
			<label class="radio-inline">
			  <input type="radio" name="sidesClass" value="scalene"  onclick="decideSideLength(this)" > Escaleno
			</label>
			<label class="radio-inline">
			  <input type="radio" name="sidesClass" value="isosceles" onclick="decideSideLength(this)" > Isósceles
			</label>
			<label class="radio-inline">
			  <input type="radio" name="sidesClass" value="equilatero" onclick="decideSideLength(this)" > Equilátero
			</label>
		</div>
	</div>
</br>
	<button type="button" class="btn btn-default" onClick="generateNewTable();">Revelar Resposta</button>
	
	<script src="assets/jquery/jquery-1.10.2.min.js"></script>
        <script type="text/javascript" src="src/js/teorema102.js"></script>	
	<script>
		$(document).ready(function () {
			init();
		});
	</script>
</body>
</html>
