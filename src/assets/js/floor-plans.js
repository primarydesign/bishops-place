(function(window, $, undefined){$(document).ready(function() {
  var tableChecks = $('.floorplansTable--option > input');
  var tableRows = $('.table--row.row_body');
  var table = $('.floorplansTable--table');

  /* Show and Hide Floorplan Rows */
  tableChecks.on('change', function() {
    var query, bedrooms;
    query = parseInt(this.value);
    tableRows.each(function() {
      bedrooms = parseInt(this.getAttribute('data-br'));
      if (query === bedrooms) {
        if (table.hasClass('not-selective')) $(this).affirmState('visible');
        else $(this).toggleState('visible');
      } else {
        if (table.hasClass('not-selective')) $(this).negateState('visible');
      }
    });
    table.affirmState('selective');
  });

  /* Open and Close the Floorplan Modal */
  $('.table--row.row_body').on('click', function() {
    var data = $(this).data();
    $('.page').append(buildModal(data.pn, data.br, data.ba, data.sf, data.or));
    $('.floorplan-modal__close').on('click', function() {
      $('.floorplan-modal').remove();
      $('body').removeClass('is-locked');
    });
    $('body').addClass('is-locked');
  });


  /************************
    FUNCTION DECLARATIONS
  ************************/

  /**
   * BUILD MODAL
   * Constructs a document fragment containing the floorplan modal to be inserted into the DOM
   * @return {document fragment} - the floorplan modal structure
   */
  function buildModal(id, br, ba, sf, or) {
    var bedroomType, bathroomType;
    switch (br) {
      case 0: bedroomType = 'Studio'; break;
      case 1: bedroomType = 'One Bedroom'; break;
      case 2: bedroomType = 'Two Bedrooms'; break;
    }
    switch (ba) {
      case 1: bathroomType = 'One Bathroom'; break;
      case 2: bathroomType = 'Two Bathrooms'; break;
    }
    var fragment = document.createDocumentFragment();
    var modal = document.createElement('div');
    modal.className = 'floorplan-modal';
    modal.innerHTML = '' +
      '<div class="floorplan-modal__content">' +
        '<div class="floorplan-modal__inner">' +
          '<ul class="floorplan-modal__details">' +
            '<li class="floorplan-modal__detail">' +
              '<span>' + bedroomType + '</span>' +
            '</li>' +
            '<li class="floorplan-modal__detail">' +
              '<span>' + bathroomType + '</span>' +
            '</li>' +
            '<li class="floorplan-modal__detail">' +
              '<span>' + sf.toLocaleString() + ' Sq. Ft.</span>' +
            '</li>' +
          '</ul>' +
          '<figure class="floorplan-modal__figure" data-bedrooms="' + br + '">' +
            '<img src="assets/img/plans/plan-' + id + '.svg" data-orientation="' +  or + '" alt="' + br + 'br | ' + ba + 'ba | ' + sf + ' sq.ft.">' +
          '</figure>' +
          '<a class="floorplan-modal__download" href="assets/plans/plan-' + id + '.pdf" target="_blank">Download PDF</a>' +
          '<p class="floorplan-modal__disclaimer">These floor plans are intended for illustrative purposes only and are not to scale; square foot measurements and dimensions are approximate and configurations may vary from unit to unit.</p>' +
          '<a class="floorplan-modal__close">X</a>' +
          '<ul class="floorplan-modal__icons">' +
            '<li class="floorplan-modal__icon">' +
              '<img src="" alt="">' +
            '</li>' +
            '<li class="floorplan-modal__icon">' +
              '<img src="" alt="">' +
            '</li>' +
          '</ul>' +
        '</div>' +
      '</div>';
    fragment.appendChild(modal);
    return fragment;
  }

})}(window, jQuery));
