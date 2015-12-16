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

  var category = '.mapInterface__category';
  var categoryLabel = '.category__label';
  var categoryName = '.category__name';
  var categoryMatches = '.category__matches';
  $('.category__label').on('click', function() {
    var self = $(this);
    var translate = !self.hasClass('is-selected')
      ? -(100/7) * self.closest(category).index()
      : 0;
    self.toggleState('selected', categoryLabel);
    self.find(categoryName).toggleState('highlighted', categoryName);
    self.siblings(categoryMatches).toggleState('open', categoryMatches);
    self.closest(category).toggleState('selected', category);
    $('.mapInterface__categories').velocity({
      translateY: translate + '%'
    });
  });


})}(window, jQuery));
