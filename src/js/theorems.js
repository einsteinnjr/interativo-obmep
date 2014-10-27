var boards = [];

$.address.init(function () {
	$('#load-content').loader();
}).change(function ( event ) {
	if ( !event.value || event.value == '/' ) return;

	var $container = $('#load-content'),
		$link = $('[rel$="' + event.value + '"]');

	for ( var i = 0; i < boards.length; i++ ) {
		JXG.JSXGraph.freeBoard( boards[i] );
	}
	boards = [];

	$container.loader('show').load( "101-caca-primos.php"/*'teoremas' + ( $link.size() ? event.value + '.php' : '/404.php'*/ ), function ( HTML, textStatus ) {
		$container.loader('hide');

		if ( textStatus == 'success' && $link.size() ) {
			$('[rel^="address"]').removeClass('active');
			$('.panel-collapse').removeClass('in');
			$('[data-toggle="collapse"]').addClass('collapsed');
			var $parent = $link.addClass('active').parents('.panel-collapse').addClass('in');

			$('[href="#' + $parent.attr('id') + '"]').removeClass('collapsed');

			$container.find('[rel^="address"]').address().end()
				.find('[data-title]').not('.disabled').tooltip();
		}
		$(window).scrollTop(0);
	});
});

$(document).ready(function () {
	// favoritar
	$('#load-content').on( 'click', '.btn-favorite', function ( event ) {
		event.preventDefault();

		var $self = $(this),
			_target = $self.attr('href');

		if ( $self.attr('action') || $self.hasClass('disabled') ) return;
		$self.attr( 'action', true );

		$.ajax({
			url			: _target.match(/(^.*)\?/)[1],
			data 		: _target.match(/\?(.*)/)[1],
			type 		: 'post',
			dataType	: 'json',
			success: function ( JSON ) {
				if ( JSON.status == 'success' ) {
					$self[ JSON.favorite ? 'addClass' : 'removeClass' ]('added');
					$('[rel^="address"].active')[ JSON.favorite ? 'addClass' : 'removeClass' ]('favorite');
				}
			},
			complete: function () {
				$self.removeAttr('action');
			}
		});
	});

	$('body').on('click', 'pre', function () {
		selectElementContents( this );
	});

	$('#theorem-list .list-group a i').tooltip({ placement: 'right' });
});

function selectElementContents ( el ) {
	var range = document.createRange(),
		sel = window.getSelection();

	range.selectNodeContents(el);
	sel.removeAllRanges();
	sel.addRange(range);
}
