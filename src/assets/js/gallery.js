(function(window, $, undefined){$(document).ready(function() {

  var body = $('body');
  var thumbnail = $('#gallery .gallery__item');
  var expose = $('.gallery-expose');
  var carousel = $('#gallery-expose');
  var closeBtn = $('.gallery-expose__close');
  var i = 0;

  var Expose = carousel.glide({
    type: 'carousel',
    autoplay: 4000,
    classes: {
      base: "gallery-expose__carousel",
      wrapper: "gallery-expose__wrapper",
      track: "gallery-expose__track",
      slide: "gallery-expose__slide",
      arrows: "glide__arrows",
      arrow: "glide__arrow",
      arrowNext: "next",
      arrowPrev: "prev",
      bullets: "carousel--bullets",
      bullet: "carousel--bullet",
      clone: "clone",
      active: "is-active",
      dragging: "dragging",
      disabled: "disabled"
    }
  }).data('glide_api');

  window.Expose = Expose;

  thumbnail.on('click', function() {
    i = $(this).index() + 1;
    Expose.jump('=' + i);
    expose.toggleState('active');
    body.toggleState('locked');
  });
  closeBtn.on('click', function() {
    expose.negateState('active');
    body.negateState('locked');
  });

})}(window, jQuery));
