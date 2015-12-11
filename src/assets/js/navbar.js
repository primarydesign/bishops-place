(function(window, $, undefined){$(document).ready(function() {

  var navlinks = $('.nav--link, .mobile-nav--link');

  navlinks.add('.heading-scryer').on('click', function(event) {
    event.preventDefault();
    $(this).scry(0);
  })

})}(window, jQuery));
