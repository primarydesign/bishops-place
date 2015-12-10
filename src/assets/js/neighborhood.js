(function(window, $, undefined){$(document).ready(function() {

  var Attractions = window.__neighborhoodAttractions__;
  var options = {
    center: {
      lat: 41.786806,
      lng: -72.745384
    },
    mapTypeControl: false,
    minZoom: 4,
    scrollwheel: false,
    streetViewControl: false,
    zoom: 13,
    styles: [{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"stylers":[{"hue":"#00aaff"},{"saturation":-100},{"gamma":2.15},{"lightness":12}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"lightness":24}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":57}]}]
  };
  var NeighborhoodMap = new Mapster('map-canvas', options, Attractions);
  window.NMAP = NeighborhoodMap;

  /**************************
    Interface Functionality
  **************************/
  $('.neighborhood-map__option').on('click', function() {
    var category = $(this).data('category');
    if (category === 'show all') {
      NeighborhoodMap.eachMarker(function() {
        if (!this.getVisible()) this.setVisible(true);
      });
    } else {
      NeighborhoodMap.eachMarker(function() {
        this.infoWindow.close();
        if (this.categories.indexOf(category) > -1) {
          this.setVisible(true);
        } else if (this.categories.indexOf('home') < 0) {
          this.setVisible(false);
        }
      });
    }
  });

})}(window, jQuery));
