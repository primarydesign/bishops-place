(function(window, $, undefined){$(document).ready(function() {

  function showError(error) {
    var ErrorMessages = {
      'REQUIRE_EMPTY': 'You cannot leave this blank.',
      'INVALID_EMAIL': 'Please enter a valid email address.',
      'INVALID_PHONE': 'Please enter a valid phone number.'
    };
    this.closest('.field')
      .addClass('has-error')
      .attr('data-error', ErrorMessages[error]);
  }
  function validate() {
    var clearance, required, pattern, value;
    required = this.attr('required');
    pattern = this.data('pattern');
    value = this.val();
    clearance = 0;
    if (required && value === '') {
      showError.call($(this), 'REQUIRE_EMPTY');
      ++clearance;
    } else if (pattern && ! new RegExp(pattern).test(value)) {
      if (this.attr('type') === 'email') {
        showError.call($(this), 'INVALID_EMAIL');
      } else if (this.attr('type') === 'tel') {
        showError.call($(this), 'INVALID_PHONE');
      }
      ++clearance;
    } else {
      this.closest('.field')
      .removeClass('has-error')
      .removeAttr('data-error');
    }
    return clearance;
  }

  $('.field__input').on('blur', function() {
    validate.call($(this));
  });
  $('.contact-form__submit').on('click', function(event) {
    event.preventDefault();
    var clearance = 0;
    $('.field__input').each(function() {
      clearance += validate.call($(this));
    });
    if (clearance === 0) $('.contact-form').submit();
  });
  $('.contact-form').on('submit', function(event) {
    event.preventDefault();
    $('.contact-form__submit').prop('disabled', true).val("sending");
    $.ajax({
      type: 'POST',
      url: 'submit.php',
      data: $(this).serialize(),
      success: function (data) {
        closeForm();
      }
    });
  });

  function closeForm() {
    $('.contact-form').html('<span class="contact-form__response">Thank you,<br/> Someone from our leasing staff <br/>will contact you soon.</span>');
  }
  window.closef = closeForm;

})}(window, jQuery));
