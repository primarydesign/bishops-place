(function(window, $, undefined){$(document).ready(function() {

  $('.carousel').glide({
    type: 'carousel',
    autoplay: 4000,
    classes: {
      base: "carousel",
      wrapper: "carousel--wrapper",
      track: "carousel--track",
      slide: "carousel--slide",
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
  });

})}(window, jQuery));
