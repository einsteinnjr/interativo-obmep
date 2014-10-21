<!DOCTYPE html>
<html lang="pt-BR">
<head>
	<meta charset="utf-8" />
	<title>102 - Coleção de triângulos</title>
	<link rel="stylesheet" type="text/css" href="assets/jsxgraph/css/jsxgraph.css">
        <link rel="stylesheet" type="text/css" href="assets/bootstrap/css/bootstrap.min.css">
        <link href="assets/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" media="screen">
	<link rel="stylesheet" type="text/css" href="src/css/teorema102.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script type="text/javascript" src="src/js/teorema102.js"></script>
</head>
<body>
	<h4><strong>Coleção de triângulos:</strong></h4>
	<div>
		<p><strong> Renato, desde criança, sempre gostou de geometria. E, por isso, faz coleção de armações triangulares. Seu tio, sabendo da paixão do sobrinho, permitiu que ele fosse a seu galpão antigo e recolhesse varetas de metais de forma a construir mais triângulos para sua coleção. </strong></p>
		<p><strong> Devido a ser muito organizado, Renato guarda sua coleção em grupos, dependendo do tipo de triângulo: equilátero, isósceles, acutângulo, etc. Ajude-o a classificar os grupos de 3 varetas, dentro de sua coleção ou informe que não é possivel fazer uma armação triangular com o grupo. </strong></p>
	</div>
		<div>
			<table class="table table-bordered">
				<tr>
					<td id="sideA"></td>
					<td id="sideB"></td>
					<td id="sideC"></td>
				</tr>
			</table>
		</div>	
	<div>
		<div id="questionJXGBox" class="jxgbox"></div>
	</div>	
	<div>
		<div class="checkbox">
		        <label>
		            <input type="checkbox" id="notConstructableCheckbox" onclick="disableTriangleConstruction(this)" /> Não é possível construir o triângulo.
		        </label>
			<a id="answerCheckbox" class="answer"></a>
            	</div>
	</div>
	<div id="triangleConstructible" class="rectangle">
		<div class="insideRectangle">
			<p><strong> Se for possível a construção do triângulo:</strong> </p>		
			<div>
				<strong> - Classifique-o quanto ao maior ângulo: </strong> </br>
				<label class="radio-inline">
				  <input type="radio" id="radioAcutangle" name="greaterAngleClass" value="acutangle"> Acutângulo
				</label>
				<label class="radio-inline">
				  <input type="radio" id="radioRectangle" name="greaterAngleClass" value="rectangle"> Retângulo
				</label>
				<label class="radio-inline">
				  <input type="radio" id="radioObtusangle" name="greaterAngleClass" value="obtusangle"> Obtusângulo
				</label>
			</div>
			<div>
				<strong> - Classifique-o quanto aos lados: </strong></br>
				<label class="radio-inline">
				  <input type="radio" id="radioScalene" name="sidesClass" value="scalene"> Escaleno
				</label>
				<label class="radio-inline">
				  <input type="radio" id="radioIsosceles" name="sidesClass" value="isosceles"> Isósceles
				</label>
				<label class="radio-inline">
				  <input type="radio" id="radioEquilateral" name="sidesClass" value="equilateral"> Equilátero
				</label>
			</div>
		</div>
	</div>
</br>
	<button type="button" class="btn btn-default" onClick="revealAnswer();">Revelar Resposta</button>

	<script src="assets/jquery/jquery-1.10.2.min.js"></script>
	<script src="assets/jsxgraph/js/jsxgraphcore.js"></script>
	
	<div id="answerJXGBox"></div>

	<div id="answerExplanation" class="rectangle">
		<div class="insideRectangle">
			<div id="answerTriangleConstructable"></div>
			<div id="answerSidesRelationship"></div>
		</div>
	</div>
	<script>
		$(document).ready(function () {
			generateRandomSides();
			openTriangleFigure();
		});
	</script>
</body>
</html>
