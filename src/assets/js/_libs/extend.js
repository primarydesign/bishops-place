(function(window, $, undefined){$(document).ready(function() {

  function toggleState(stateName, others) {
    var positive = 'is-' + stateName;
    var negative = 'not-' + stateName;
    if (this.hasClass(positive)) {
      this.removeClass(positive).addClass(negative);
    } else {
      if (others) {
        $(others).not(this).each(function(other) {
          if ($(this).hasClass(positive)) {
            $(this).removeClass(positive).addClass(negative);
          }
        });
      }
      this.removeClass(negative).addClass(positive);
    }
    return this;
  }
  function negateState(stateName) {
    var positive = 'is-' + stateName;
    var negative = 'not-' + stateName;
    var i = 0, item;
    for(var i = 0; i < this.length; i++) {
      item = $(this[i]);
      if (item.hasClass(positive)) {
        item.removeClass(positive).addClass(negative);
      }
    }
    return this;
  }
  function affirmState(stateName, others) {
    var positive = 'is-' + stateName;
    var negative = 'not-' + stateName;
    if (others) {
      $(others).not(this).removeClass(positive).addClass(negative);
    }
    this.removeClass(negative).addClass(positive);
    return this;
  }
  function scry(options) {
    var target = this.data('scry');
    if (typeof options === 'number') {
      $(target).velocity('scroll', {
        duration: 300,
        easing: 'easeInSine',
        offset: options
      });
    } else if (typeof options === 'object') {
      $(target).velocity('scroll', options);
    }
    return this;
  }

  $.fn.extend({
    affirmState: affirmState,
    negateState: negateState,
    toggleState: toggleState,
    scry: scry
  });

})}(window, jQuery));
