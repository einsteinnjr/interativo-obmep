
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../favicon.ico">

    <title>Interativo - Portal Matemática</title>

    <!-- Bootstrap core CSS -->
    <link href="assets/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="src/css/offcanvas.css" rel="stylesheet">

    <link rel="stylesheet" type="text/css" href="assets/jquery-ui/css/jquery-ui.min.css">
    <link href="src/css/landingpage.css" rel="stylesheet">
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>
    <div class="navbar navbar-fixed-top navbar-inverse" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="">Interativo</a>
        </div>
        <!--<div class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>--><!-- /.nav-collapse -->
      </div><!-- /.container -->
    </div><!-- /.navbar -->

    <div class="container">

      <div class="row row-offcanvas row-offcanvas-right">

        <div id='showView' class="col-xs-12 col-sm-9">
          <p class="pull-right visible-xs">
            <button type="button" class="btn btn-primary btn-xs" data-toggle="offcanvas">Toggle nav</button>
          </p>
          <div id="iframes" class="hidden">	
		<h3 id="iframeViewTitle" class="main-title"></h3>
		<div id="descriptionAD" class="spaced-v justify"><h5><b>Descrição:</b></h5>
			<div id="descriptionA"> </div>
		</div>		
		<div id="howToUseAD" class="spaced-v justify"><h5><b>Como usar:</b></h5>
			<div id="howToUseA"> </div>
		</div>
		<iframe id="iframeA" name="iframeA" class="iframe spaced-v" scrolling="no"> </iframe>
          </div>
	  <div id="dummy" class="jumbotron">
	     <h1>Exercícios Interativos</h1>
            <p>Navegue por eles através do menu lateral.</p>
	  </div>
          <div class="row">
            <!--<div class="col-6 col-sm-6 col-lg-4">
              <h2>Heading</h2>
              <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
              <p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>
            </div>--><!--/span-->
          </div><!--/row-->
        </div><!--/span-->
	<div class="col-xs-6 col-sm-3 sidebar-offcanvas accordion" id="sidebar" role="navigation">
	<h3>Novembro 2014</h3> 
  	 <div class="list-group">
            <a href="105-Ordenando-fracoes/index.php" target="iframeA" class="list-group-item" onclick="showInIframe(this)">105 - Ordenando frações</a>
          </div>         
	<h3>Outubro 2014</h3> 
  	 <div class="list-group">
		<a href="104-Colhendo-laranjas/index.php" target="iframeA" class="list-group-item" onclick="showInIframe(this)">104 - Colhendo laranjas</a>
		<a href="103-Descubra-o-numero/index.php" target="iframeA" class="list-group-item" onclick="showInIframe(this)">103 - Descubra o número</a>
		<a href="102-Colecao-de-triangulos/index.php" target="iframeA" class="list-group-item" onclick="showInIframe(this)">102 - Coleção de Triângulos</a>
		<a href="101-Caca-primos/index.php" target="iframeA" class="list-group-item" onclick="showInIframe(this)">101 - Caça-primos</a>
          </div>
	  
        </div><!--/sidebar-->

      </div><!--/row-->

      <hr>

      <footer>
        <p><b>IMPA&copy;</b> e Arquimedes Curso de Ensino 2014</p>
      </footer>

    </div><!--/.container-->



    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="assets/bootstrap/js/bootstrap.min.js"></script>
    <script src="assets/jquery-ui/js/jquery-ui.min.js"></script>
    <script src="src/js/offcanvas.js"></script>
   <!-- <script src="src/js/theorems.js"></script> -->

      <script>

	function showInIframe(it){
		$("#dummy").addClass("hidden");
		$("#iframes").removeClass("hidden");		
		
		$("#iframeViewTitle").html($(it).html());
		pathParts = $(it).attr("href").split('/');

		getUrl(pathParts[0]+"/"+"como_usar.txt", "howToUseA"); //p.e.: pathParts[0]='101-Caca-primos'
		
		getUrl(pathParts[0]+"/"+"descricao.txt", "descriptionA");
	}

	function getUrl(url,prefixId){
		$.get( url, function( data, success, dataType ) {
			$("#"+prefixId+"D").removeClass("hidden");			
			$("#"+prefixId).html(data);
		}).fail(function(){ 
			  // 404-error, for example:
			$("#"+prefixId+"D").addClass("hidden");	
		});
	}

	  $(function() {
	    $( ".accordion" ).accordion({
      		collapsible: true,
		heightStyle: "content"
	    });
	  });
  </script>
  </body>
</html>

