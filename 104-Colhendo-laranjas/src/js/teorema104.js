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
$("#revealExplanation").after("<div id='secret' class='bordered'><p>-Note que a cada pergunta de Sim ou Não, alguns números são descartados serem o de Bernardo. Depois da 1a pergunta, dados os "+MAX_NUMBER+" números, e perguntarmos, por exemplo: É maior ou igual a 9? Em caso de Sim, a quantidade de números válidos seriam x. Em caso de Não como resposta, a quantidade de números válidos seria "+MAX_NUMBER+"-x. Seria interessante se escolhêssemos perguntas onde conseguíssemos excluir o máximo de números, para que ficasse mais fácil adivinhar. </p>"+
		    "<p>-Note também que para uma mesma pergunta, a resposta obviamente vai diferir, dependendo do número pensado por Bernardo. Sendo assim, temos que trabalhar com o PIOR caso da nossa estratégia.</p>"+
		"<p>-Uma estratégia interessante é perguntar pelo número que se encontra na metade do intervalo restante. Por exemplo, se o intervalo for de 37 a 56, teremos um total de 20 números aí. Caso questionássemos se, por exemplo, é maior que 47, teríamos como resposta de Sim e Não, 2 intervalos com apenas 10 números (os intervalos de [37,47] e ]47,57]. Dessa maneira, não importando a resposta de Bernardo (se sim ou não), conseguiríamos diminuir o espaço de busca pela metade. Estratégia que poderíamos sempre seguir.</p>"+
		"<p>-Essa estratégia para buscar um número, é denominado 'Busca Binária', pois sempre dividimos o espaço de busca pela metade. Tente aplicá-lo no problema.</p> </div>");
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


