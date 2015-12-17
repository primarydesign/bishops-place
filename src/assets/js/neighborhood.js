(function(window, $, undefined){$(document).ready(function() {

  var Attractions = window.__neighborhoodAttractions__;
  var BishopsPlace = { lat: 41.786806, lng: -72.745384 };
  var options = {
    center: BishopsPlace,
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

  var categoryItem = '.mapInterface__category';
  var categoryLabel = '.category__label';
  var categoryName = '.category__name';
  var categoryMatches = '.category__matches';
  $('.category__label').on('click', function() {
    var self = $(this);
    var index = self.closest(categoryItem).index();
    var category = self.data('category');
    /* reassign interface states */
    self.toggleState('selected', categoryLabel);
    self.find(categoryName).toggleState('highlighted', categoryName);
    self.siblings(categoryMatches).toggleState('open', categoryMatches);
    self.closest(categoryItem).toggleState('selected', categoryItem);
    /* manage interface animation */
    $('.mapInterface__categories').velocity({
      translateY: self.hasClass('is-selected')
        ? (-(100/7) * index) + '%'
        : 0
    },{
      duration: 300,
      complete: function(elements) {
        var matches = self.siblings(categoryMatches);
        if (matches.hasClass('is-open')) {
          matches.find('ul').slimScroll({
            height: '100%',
            wheelStep: 10
          });
        }
      }
    });
    /* update map markers */
    NeighborhoodMap.center(BishopsPlace);
    if (self.hasClass('is-selected')) {
      NeighborhoodMap.eachMarker(function() {
        this.infoWindow.close();
        if (this.categories.indexOf(category) > -1) {
          this.setVisible(true);
        } else if (this.categories.indexOf('home') < 0) {
          this.setVisible(false);
        }
      });
    } else {
      NeighborhoodMap.eachMarker(function() {
        this.infoWindow.close();
        this.setVisible(true);
      });
    }
  });
  $('.category__match').on('click', function() {
    var match = $(this);
    var name = match.data('name');
    var latlng = match.attr('data-latlng').split(',');
    NeighborhoodMap.center({
      lat: parseFloat(latlng[0]),
      lng: parseFloat(latlng[1])
    });
    NeighborhoodMap.eachMarker(function() {
      this.infoWindow.close();
      if (this.name === name) {
        this.setVisible(true);
      } else if (this.categories.indexOf('home') < 0) {
        this.setVisible(false);
      }
    });
  });


})}(window, jQuery));
