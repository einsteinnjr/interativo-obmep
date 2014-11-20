<!DOCTYPE html>
<html lang="pt-BR">
<head>
	<meta charset="utf-8" />
	<link rel="stylesheet" type="text/css" href="assets/jsxgraph/css/jsxgraph.css">
        <link rel="stylesheet" type="text/css" href="assets/bootstrap/css/bootstrap.min.css">
        <link href="assets/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" media="screen">
	<link rel="stylesheet" type="text/css" href="src/css/teorema102.css">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script type="text/javascript" src="src/js/teorema102.js"></script>
</head>
<body>
	<div class="large column-left">
		<div><b>Responda os itens abaixo:</b></div>
		<div><b>a) É possível construir um triângulo com esses lados?</b></div>
		<div >
			<label class="radio-inline">
		            <input type="radio" id="constructableRadio" name="constructableClass" onclick="disableTriangleConstruction(this)"/> Sim
		        </label>
		        <label class="radio-inline">
		            <input type="radio" id="notConstructableRadio" name="constructableClass" onclick="disableTriangleConstruction(this)" /> Não
		        </label>
			<a id="validationConstructabilityRadio"></a>
            	</div>
	
		<div id="triangleConstructible" class="rectangle large">	
			<p><b> Se for possível a construção do triângulo:</b> </p>		
			<div>
				<b>b) Classifique-o quanto aos lados: </b></br>
				<label class="radio-inline">
				  <input type="radio" id="radioEquilateral" name="sidesClass" value="equilateral"> Equilátero
				</label>				
				<label class="radio-inline">
				  <input type="radio" id="radioIsosceles" name="sidesClass" value="isosceles"> Isósceles, mas não equilátero
				</label>
				<label class="radio-inline">
				  <input type="radio" id="radioScalene" name="sidesClass" value="scalene"> Escaleno
				</label>
				<a id="validationSidesRadio"></a>
			</div>			
			<div>
				<b>c) Classifique-o quanto ao maior ângulo: </b> </br>
				<label class="radio-inline">
				  <input type="radio" id="radioAcutangle" name="greaterAngleClass" value="acutangle"> Acutângulo
				</label>
				<label class="radio-inline">
				  <input type="radio" id="radioRectangle" name="greaterAngleClass" value="rectangle"> Retângulo
				</label>
				<label class="radio-inline">
				  <input type="radio" id="radioObtusangle" name="greaterAngleClass" value="obtusangle"> Obtusângulo
				</label>
				<a id="validationAngleRadio"></a>
			</div>
		</div>
	</div>
	<div class="column-right">
		<table id="sidesTable" class="table table-bordered">
			<tr>
				<td id="sideA">a= cm</td>
				<td id="sideB">b= cm</td>
				<td id="sideC">c= cm</td>
			</tr>
		</table>
	
		<div id="questionJXGBox" class="jxgbox"></div>
	</div>	
</br>

<div class="inline">
  <button id="revealAnswer" type="button" class="btn btn-default" onClick="revealAnswer();">Revelar Resposta</button> 
  <button type="button" class="btn btn-default  btn-primary" onClick="generateNewTriangle();scrollTo('#sidesTable');">Novo Triângulo</button> 
</div> 
<span id="validationUserAnswered" class='warning inline'></span>
	
	<script src="assets/jquery/jquery-1.10.2.min.js"></script>
	<script src="assets/jsxgraph/js/jsxgraphcore.js"></script>
	
	<div>
		<div id="answerJXGBox" class="column-left"></div>
		<div id="answerExplanation" class="large column-right height-350">
				<div id="answerTriangleConstructable"></div>
				<div id="answerSidesRelationship"></div>
				<div id="answerGreaterAngle"></div>
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
