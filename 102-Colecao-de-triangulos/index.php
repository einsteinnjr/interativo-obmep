<!DOCTYPE html>
<html lang="pt-BR">
<head>
	<meta charset="utf-8" />
	<link rel="stylesheet" type="text/css" href="assets/jsxgraph/css/jsxgraph.css">
        <link rel="stylesheet" type="text/css" href="assets/bootstrap/css/bootstrap.min.css">
        <link href="assets/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" media="screen">
	<link rel="stylesheet" type="text/css" href="src/css/teorema102.css">
</head>
<body>
<div class="spaced-v">
  <button type="button" class="btn btn-default  btn-primary" onClick="generateNewTriangle();scrollTo('#sidesTable');">Novo Triângulo</button>
</div>
<div class="spaced-v bordered">
	<table id="sidesTable" class="spaced-v center-img">
		<tr>
			<td id="sideA">a= cm</td>
			<td id="sideB">b= cm</td>
			<td id="sideC">c= cm</td>
		</tr>
	</table>

	<div id="questionJXGBox" class="jxgbox center-img"></div>
</div>	
	<div class="spaced-v bordered">
		<div><b>Responda os itens abaixo:</b></div>
		<div><b>a) Pode se construir um triângulo com esses lados?</b> <a id="validationConstructabilityRadio"></a></div>
		<div>
			<input type="radio" id="constructableRadio" name="constructableClass" onclick="disableTriangleConstruction(this)"/> Sim </input>
		</div>
		<div>
			<input type="radio" id="notConstructableRadio" name="constructableClass" onclick="disableTriangleConstruction(this)" /> Não </input>	
	    	</div>
	</div>
	<div id="triangleConstructible" class="spaced-v bordered">	
		<div><b>Se for possível a construção do triângulo:</b></div>		
		<div>
			<div><b>b) Classifique-o quanto aos lados:</b> <a id="validationSidesRadio"></a></div>
			<div>
			  <input type="radio" id="radioEquilateral" name="sidesClass" value="equilateral"> Equilátero</input>		
			</div>	
			<div>	
			  <input type="radio" id="radioIsosceles" name="sidesClass" value="isosceles"> Isósceles, mas não equilátero</input>
			</div>
			<div>
			  <input type="radio" id="radioScalene" name="sidesClass" value="scalene"> Escaleno</input>
			</div>

		</div>			
		<div>
			<div><b>c) Classifique-o quanto ao maior ângulo:</b> <a id="validationAngleRadio"></a></div>
			<div>
			  <input type="radio" id="radioAcutangle" name="greaterAngleClass" value="acutangle"> Acutângulo</input>
			</div>
			<div>
			  <input type="radio" id="radioRectangle" name="greaterAngleClass" value="rectangle"> Retângulo</input>
			</div>
			<div>
			  <input type="radio" id="radioObtusangle" name="greaterAngleClass" value="obtusangle"> Obtusângulo</input>
			</div>
		</div>
	</div>
<div class="spaced-v">
  <button id="showAnswer" type="button" class="btn btn-default btn-success spaced-h" onClick="showAnswer();">Mostrar Resposta</button> <div class="inline"> <span id="validationUserAnswered" class='warning'></span></div>
</div> 

	<script src="assets/jquery/jquery-1.10.2.min.js"></script>
	<script src="assets/jsxgraph/js/jsxgraphcore.js"></script>
        <script type="text/javascript" src="src/js/teorema102.js"></script>
	
	<div>
		<div id="dAnswerJXGBox" class="spaced-v bordered">		
		<div id="answerJXGBox" class="center-img"></div>
		</div>		
		<div id="answerExplanation" class="height-auto">
				<div id="answerTriangleConstructable" class="spaced-v"></div>
				<div id="answerSidesRelationship" class="spaced-v"></div>
				<div id="answerGreaterAngle" class="spaced-v"></div>
		</div>
	</div>
	<script>
		$(document).ready(function () {
			generateNewTriangle();
			scrollTo("body");
		});
	</script>
</body>
</html>
