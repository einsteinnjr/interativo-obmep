var MAX_NUMBER_EASY = 10;
var NUMBER_OF_QUESTIONS_EASY = 4;

var MAX_NUMBER_MEDIUM = 100;
var NUMBER_OF_QUESTIONS_MEDIUM = 7;

var MAX_NUMBER_HARD = 1000;
var NUMBER_OF_QUESTIONS_HARD = 10;

var thinkedNumber;
var actualQuestion = 1;
var numberAsked;
var guessedNumber;

var maxNumber, numberOfQuestions;

function decideGameLevel(){
	if($('input[name=gameLevel]:checked').val() === "easy") {
		maxNumber = MAX_NUMBER_EASY;
		numberOfQuestions = NUMBER_OF_QUESTIONS_EASY;
	}
	else if($('input[name=gameLevel]:checked').val() === "medium") {
		maxNumber = MAX_NUMBER_MEDIUM;
		numberOfQuestions = NUMBER_OF_QUESTIONS_MEDIUM;
	}
	else if($('input[name=gameLevel]:checked').val() === "hard") {
		maxNumber = MAX_NUMBER_HARD;
		numberOfQuestions = NUMBER_OF_QUESTIONS_HARD;
	}	
}

function thinkNumber(){
	thinkedNumber=1+Math.floor(Math.random()*(maxNumber));
	//alert("thinked "+thinkedNumber);
};

function isValidNumberAsked(){
	numberAsked = document.getElementById("number_asked_"+actualQuestion).value;
	//take out leading and trailing spaces.	
	numberAsked=numberAsked.trim();
	if(numberAsked.length===0 ||isNaN(numberAsked)) return false;
	else return true;
};

function isValidNumberGuessed(){
	numberGuessed = document.getElementById("guessedNumber").value;
	//take out leading and trailing spaces.	
	numberGuessed=numberGuessed.trim();
	if(numberGuessed.length===0 ||isNaN(numberGuessed)) return false;
	else return true;
};

function sendQuestion(){	
	if(isValidNumberAsked()){
		$("#answer_"+actualQuestion).empty();
		answerQuestion();
		actualQuestion++;
		if(actualQuestion <= numberOfQuestions) generateQuestionLine();
		else generateGameOverLine(); //ended all questions.
	}
	else {
		fillAndShowModal('Atenção:',
				 "O valor digitado <b>'"+numberAsked+"'</b> não é um número válido. Favor, digite um número.", 
				true);
		document.getElementById("number_asked_"+actualQuestion).value="";	
	}
};

function sendValidGuess(){
	numberGuessed = document.getElementById("guessedNumber").value;	
	if(!isValidNumberGuessed()) {
		fillAndShowModal('Atenção:',
				 "O valor digitado <b>'"+numberGuessed+"'</b> não é um número válido. Favor, digite um número.", 
				true);
		document.getElementById("guessedNumber").value="";
		return false;	
	}
	return true;
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
	$("#interval").html("1 a "+maxNumber);
};

function generateNumberOfQuestions(){
	$("#numberOfQuestions").empty();
	$("#numberOfQuestions").html(numberOfQuestions);
};

function showObjectsOnlyOnCorrectPosition(){
	//if they appear on the beginning, they will resize, and mess layout.
	$("#requisites").removeClass('hidden');
	$("#showExplanation").removeClass('hidden');
}

function resetTableAndFields(){
	showObjectsOnlyOnCorrectPosition()
	$("#guess").remove();
	$("#gameOver").remove();
	$("#explanation").remove();	
	$("#questions").empty();
	$("#questions").append("<tr id='thead'>"+
			     "<td>Pergunta (n<sup>o</sup>)</td>"+
			     "<td>Tipo de pergunta</td>"+
			     "<td>Valor</td>"+
			     "<td>Resposta</td>"+
			       "</tr>");
	$("#questions").after("<div id='guess' class='width center-img'>"+
				"<b>Palpite:</b> <input id='guessedNumber' required class='spaced-h'></input>"+
				"<button id='guessButton' type='button' class='btn btn-default  btn-success spaced-h' onClick='guessNumber();'>Adivinhar número</button>"+
				"</div>");
	document.getElementById("showExplanation").disabled=false;	
	
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
			   "<td><input id='number_asked_"+actualQuestion+"' required placeholder='Escolha um número' size=15></input>?</td>"+
			"<td id='answer_"+actualQuestion+"'><button type='button' class='btn btn-default' onClick='sendQuestion();'>Enviar Pergunta</button></td>"+
			"</tr>");	
};

function generateGameOverLine(){
	$("#guess").before("<div id='gameOver' class='spaced-v width center-img'>"+
				"<b>As perguntas esgotaram. Qual o número que Bernardo pensou?</b>"+
				"</div>");
	
};

function fillAndShowModal(title, body, isAlert){
	$(".modal-title").html(title);
	$(".modal-body").html(body);
	$("#modalInfo").modal('show');

	if(isAlert){
		$("#noButton").html('Ok');
		$("#yesButton").addClass('hidden');
	}
	else{
		$("#noButton").html('Não');
		$("#yesButton").removeClass('hidden');
	}
}

function guessNumber(){
	var playAgain;
	if(!sendValidGuess()) return;

	guessedNumber=document.getElementById("guessedNumber").value;
	document.getElementById("guessButton").disabled=true;

	if(parseInt(guessedNumber) === parseInt(thinkedNumber)) {
		fillAndShowModal("Fim de Jogo!",
				 "Parabéns! Você acertou o número de Bernardo! É <b>"+thinkedNumber+"</b>. Deseja jogar novamente?</b>", 
				false);
	}
	else {
		fillAndShowModal("Fim de Jogo!",
				 "Que Pena! Você errou. O número pensado por Bernardo foi <b>"+thinkedNumber+"</b>. Deseja jogar novamente?", 
				false); 
	}
}

function scrollTo(tag){
	$('html, body').animate({
	        scrollTop: $(tag).offset().top
	}, 1000);
}

function showExplanation(){

	var aux = numberOfQuestions-1;
$("#showExplanation").after("<div id='explanation' class='bordered justify'><p>Após cada pergunta, existem 2 possibilidades de resposta. Assim, temos, depois de k perguntas: 2 · 2 · . . . · 2 = 2<sup>k</sup> possibilidades de conclusões para o número de Bernardo. Por exemplo, se fizermos 3 perguntas, as 3 respostas consecutivas podem ser associadas às sequências de símbolos abaixo: <div class='center'>(>, >, >), (>, >, ≤), (>, ≤, >), (>, ≤, ≤), (≤, >, >), (≤, >, ≤), (≤, ≤, >), (≤, ≤, ≤) </div>"+
		    "<p>Cada sequência de símbolos pode fornecer, no máximo, um número como conclusão final. Portanto, se o conjunto de possíveis respostas tiver mais de 2<sup>k</sup> possibilidades, k perguntas não serão suficientes para achar o número de Bernardo.</p>"+
		"<p>Dado que 2<sup>"+aux+"</sup> < "+maxNumber+" <u><</u> 2<sup>"+numberOfQuestions+"</sup> , é natural imaginarmos que "+numberOfQuestions+" perguntas seriam suficientes. Mostraremos, então, que é possível com tal quantidade de perguntas. </p>"+
"<p> Dependendo do nosso número de corte x (com a pergunta: É maior ou igual a x?), o tamanho do espaço de busca pode diminuir muito ou não, já que depende da resposta de Bernardo. Por exemplo, sabendo que o número está no intervalo {1, 2, . . . , 11} com 11 elementos, escolhendo número de corte 3, nos restam 2 intervalos: {1, 2, 3} e {4, 5, ..., 11}. Um com 3 elementos e outro com 8. Na melhor das hipóteses, o número de Bernardo estaria no menor conjunto (de 3 elementos). Já na pior, no de 8 elementos. Assim, para diminuirmos ao máximo o nosso espaço de busca, independente da resposta de Bernardo, o ideal é que escolhamos um número de corte que iguale (ou aproxime) o número de elementos dos 2 intervalos restantes. No conjunto {1, 2, ..., 11}, é ideal que cortemos no número 5, restando os intervalos: {1, 2, ..., 5} e {6, ..., 11}. Assim, após a resposta de Bernardo, teremos sempre um conjunto com, no máximo, 6 elementos.</p>"+
	"<p>Repetindo essa estratégia, obteremos intervalos com cerca da metade de elementos do intervalo anterior, até chegarmos a um com somente um elemento, finalizando a nossa procura. Tente aplicá-la no problema.</p>"+
	"<p><strong>Curiosidade:</strong> Se você é familiar com a expansão de números na base 2, o procedimento anterior essencialmente descobre, a cada pergunta, um de seus dígitos em tal expansão e, por essa razão, o método sugerido é chamado de <strong>'Busca Binária'</strong>. Note que existem exatamente 2<sup>k</sup> números de k dígitos na base 2.</p></div>");
	scrollTo("#explanation");
	document.getElementById("showExplanation").disabled=true;
}

function setAMinimumWidthToBody(){
	maxWidth=getFullWidth("questions");
	$("body").attr("style","min-width:"+maxWidth+"px");
}

function getFullWidth(id){
	//console.log("fullWidth "+id+" 	"+(parseInt($("#"+id).css("width"))+parseInt($("#"+id).css("padding-left"))+parseInt($("#"+id).css("padding-right"))+2*10));
	return (parseInt($("#"+id).css("width"))+parseInt($("#"+id).css("padding-left"))+parseInt($("#"+id).css("padding-right"))+3*10); //Margins can be computed in a wrong way. So we put 3*10px
}	

function generateNewGame(){
	actualQuestion=1;
	decideGameLevel();
	setAMinimumWidthToBody();
	thinkNumber();
	generateInterval();
	generateNumberOfQuestions();
	resetTableAndFields();
	generateQuestionLine();
};


