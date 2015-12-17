(function(window, $, undefined){$(document).ready(function() {

  var navlinks = $('.nav--link');
  var movlinks = $('.mobile-nav--link');
  var movPanel = $('#cbp-spmenu-s1');
  var movBar = $('.navbar--mobile');

  navlinks.add('.heading-scryer').on('click', function(event) {
    event.preventDefault();
    $(this).scry(0);
  })
  movlinks.on('click', function() {
    $(this).scry(0);
    movPanel.removeClass('cbp-spmenu-open');
    $('body').negateState('locked');
  });

  var menuLeft = document.getElementById( 'cbp-spmenu-s1' ),
  body = document.body;
  showLeft.onclick = function() {
    classie.toggle( this, 'active' );
    classie.toggle( menuLeft, 'cbp-spmenu-open' );
    disableOther( 'showLeft' );
    if ($(menuLeft).hasClass('cbp-spmenu-open')) {
      $('body').affirmState('locked');
    } else {
      $('body').negateState('locked');
    }
  };
  function disableOther( button ) {
    if( button !== 'showLeft' ) {
      classie.toggle( showLeft, 'disabled' );
    }
  }

})}(window, jQuery));
