(function(window, $, undefined){$(document).ready(function() {

  var Attractions = window.__neighborhoodAttractions__;
  var options = {
    center: {
      lat: 35,
      lng: $(window).width() > 1100
        ? -101.7
        : $(window).width() > 800
          ? -105
          : -115
    },
    mapTypeControl: false,
    minZoom: 4,
    scrollwheel: false,
    streetViewControl: false,
    zoom: 5,
    styles: [{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"stylers":[{"hue":"#00aaff"},{"saturation":-100},{"gamma":2.15},{"lightness":12}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"lightness":24}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":57}]}]
  };
  var NeighborhoodMap = new Mapster('map-canvas', options);

})}(window, jQuery));
