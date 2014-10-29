var MAX_NUMBER = 100;
var NUMBER_OF_QUESTIONS= 7;

var thinkedNumber;
var actualQuestion = 1;
var numberAsked;
var guessedNumber;

function thinkNumber(){
	thinkedNumber=Math.floor(Math.random()*MAX_NUMBER);
	//alert("thinked "+thinkedNumber);
};

function isValidNumberAsked(){
	numberAsked = document.getElementById("number_asked_"+actualQuestion).value;
	//take out leading and trailing spaces.	
	numberAsked=numberAsked.trim();
	if(numberAsked.length===0 ||isNaN(numberAsked)) return false;
	else return true;
};

function sendQuestion(){	
	if(isValidNumberAsked()){
		$("#answer_"+actualQuestion).empty();
		answerQuestion();
		actualQuestion++;
		if(actualQuestion<=NUMBER_OF_QUESTIONS) generateQuestionLine();
		else generateGuessLine(); //ended all questions.
	}
	else {
		alert("O valor digitado "+numberAsked+" não é um número válido. Favor, digite um número.");
		document.getElementById("number_asked_"+actualQuestion).value="";	
	}
};

function answerQuestion(){
	var x = document.getElementById("select_"+actualQuestion).selectedIndex;
	numberAsked = document.getElementById("number_asked_"+actualQuestion).value;
	switch(document.getElementsByTagName("option")[x].value){
		case "greater_than":
			if(thinkedNumber > numberAsked) $("#answer_"+actualQuestion).html("<i class='glyphicon glyphicon-ok'>Sim!</i>");
			else $("#answer_"+actualQuestion).html("<i class='glyphicon glyphicon-remove'>Não!</i>");
	break;
		case "greater_or_equal":
			if(thinkedNumber >= numberAsked) $("#answer_"+actualQuestion).html("<i class='glyphicon glyphicon-ok'>Sim!</i>");
			else $("#answer_"+actualQuestion).html("<i class='glyphicon glyphicon-remove'>Não!</i>");
	break;
		case "less_than":
			if(thinkedNumber < numberAsked) $("#answer_"+actualQuestion).html("<i class='glyphicon glyphicon-ok'>Sim!</i>");
			else $("#answer_"+actualQuestion).html("<i class='glyphicon glyphicon-remove'>Não!</i>");
	break;
		case "less_or_equal":
			if(thinkedNumber <= numberAsked) $("#answer_"+actualQuestion).html("<i class='glyphicon glyphicon-ok'>Sim!</i>");
			else $("#answer_"+actualQuestion).html("<i class='glyphicon glyphicon-remove'>Não!</i>");
	break;
	}
	document.getElementById("number_asked_"+actualQuestion).disabled=true;
	document.getElementById("select_"+actualQuestion).disabled=true;
};

function generateInterval(){
	$("#interval").empty();
	$("#interval").html("1 a "+MAX_NUMBER);
};

function generateNumberOfQuestions(){
	$("#numberOfQuestions").empty();
	$("#numberOfQuestions").html(NUMBER_OF_QUESTIONS);
};

function resetTableAndFields(){
	$("#guess").remove();
	$("#secret").remove();	
	$("#questions").empty();
	$("#questions").append("<tr id='thead'>"+
			     "<td>Pergunta (n<sup>o</sup>)</td>"+
			     "<td>Tipo de pergunta</td>"+
			     "<td>Valor</td>"+
			     "<td>Resposta</td>"+
			       "</tr>");
	document.getElementById("revealExplanation").disabled=false;	
	
};

function generateQuestionLine(){
	$("#questions").append(" <tr>"+
			"<td id='"+actualQuestion+"'>"+actualQuestion+"<sup>a</sup></td>"+
			   "<td><select id='select_"+actualQuestion+"'>"+
			  "<option value='greater_than'>É maior que </option>"+
			  "<option value='greater_or_equal'>É maior ou igual a </option>"+
			  "<option value='less_than'>É menor que </option>"+
			  "<option value='less_or_equal'>É menor ou igual a </option>"+
					"</select> </td>"+
			   "<td><input id='number_asked_"+actualQuestion+"' required placeholder='Escolha um número'></input>?</td>"+
			"<td id='answer_"+actualQuestion+"'><button type='button' class='btn btn-default' onClick='sendQuestion();'>Enviar Pergunta</button></td>"+
			"</tr>");	
};

function generateGuessLine(){
	$("#questions").after("<div id='guess'>"+
				"<p>As perguntas esgotaram. Qual o número que Bernardo pensou?</p>"+
				"<input id='guessedNumber' required></input>"+
				"<button type='button' class='btn btn-default' onClick='guessNumber();'>Adivinhar número</button>"+
				"</div>");
	
};

function guessNumber(){
	var playAgain;
	guessedNumber=document.getElementById("guessedNumber").value;
	if(parseInt(guessedNumber) === parseInt(thinkedNumber)) {
		playAgain = confirm("Parabéns! Você acertou o número de Bernardo! É "+thinkedNumber+". Deseja jogar novamente?");
	}
	else {
		playAgain = confirm("Que Pena! Você errou. O número pensado por Bernardo foi "+thinkedNumber+". Deseja jogar novamente?"); 
	}
	if(playAgain === true){
		generateNewGame(); 
	}
}

function scrollTo(tag){
	$('html, body').animate({
	        scrollTop: $(tag).offset().top
	}, 1000);
}

function revealExplanation(){

	var aux = NUMBER_OF_QUESTIONS-1;
$("#revealExplanation").after("<div id='secret' class='bordered'><p>Após cada pergunta, existem 2 possibilidades de resposta. Assim, depois de k perguntas: 2 · 2 · . . . · 2 = 2<sup>k</sup> possibilidades de conclusões para o número de Bernardo. Por exemplo, se fizermos 3 perguntas, as 3 respostas consecutivas podem ser associadas às sequências de símbolos abaixo: <div class='center'>(>, >, >), (>, >, ≤), (>, ≤, >), (>, ≤, ≤), (≤, >, >), (≤, >, ≤), (≤, ≤, >), (≤, ≤, ≤) </div>"+
		    "<p>Cada sequência de símbolos pode fornecer, no máximo, um número como conclusão final. Portanto, se o conjunto de possíveis respostas tiver mais de 2<sup>k</sup> possibilidades, k perguntas não serão suficientes para achar o número de Bernardo.</p>"+
		"<p>Dado que 2<sup>"+aux+"</sup> < "+MAX_NUMBER+" <u><</u> 2<sup>"+NUMBER_OF_QUESTIONS+"</sup> , é natural imaginarmos que "+NUMBER_OF_QUESTIONS+" perguntas seriam suficientes. Mostraremos, então, que é possível. </p>"+
"<p> Dependendo do nosso número de corte x (com a pergunta: É maior ou igual a x?), o tamanho do espaço de busca pode diminuir muito ou não, já que depende da resposta de Bernardo. Por exemplo, sabendo que o número está no intervalo {1, 2, . . . , 11} com 11 elementos, escolhendo número de corte 3, nos resta 2 intervalos: {1, 2, 3} e {4, 5, ..., 11}. Um com 3 elementos e outro com 8. Na melhor das hipóteses, o número de Bernardo estaria no menor conjunto (de 3 elementos). Já na pior, no de 8 elementos. Assim, para diminuirmos ao máximo o nosso espaço de busca, independente da resposta de Bernardo, o ideal é que escolhamos um número de corte que iguale (ou aproxime) o número de elementos dos 2 intervalos restantes. No conjunto {1, 2, ..., 11}, é ideal que cortemos no número 5, restando os intervalos: {1, 2, ..., 5} e {6, ..., 11}. Assim, após a resposta de Bernardo, teremos sempre um conjunto com, no máximo, 6 elementos.</p>"+
	"<p>Repetindo essa estratégia, obteremos intervalos cada vez menores de possibilidades, chegando até um intervalo com um único numero, finalizando a nossa procura. Essa estratégia de busca de um número em um intervalo é denominada 'Busca Binária', pois sempre dividimos o espaço de busca pela metade. Tente aplicá-la no problema.</p> </div>");
	$("#secret").addClass("bordered");
	scrollTo("#secret");
	document.getElementById("revealExplanation").disabled=true;
}

function generateNewGame(){
	actualQuestion=1;
	thinkNumber();
	generateInterval();
	generateNumberOfQuestions();
	resetTableAndFields();
	generateQuestionLine();
};


