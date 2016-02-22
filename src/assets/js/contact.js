(function(window, $, undefined){$(document).ready(function() {

  var inputs = document.querySelectorAll('.contactForm__input');
  var checks = document.querySelectorAll('.contactForm__checkbox');
  var submit = document.querySelector('.contactForm__submit');
  var moveIn = document.querySelector('#contact--movein');

  generateMonths(moveIn);

  var Patterns = {};
  Patterns['email'] = {
    test: new RegExp('[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9-.]+$'),
    error: 'Please enter a valid email.'
  };
  Patterns['phone'] = {
    test: new RegExp('^\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$'),
    error: 'Please enter a valid phone number.'
  };

  for(var i = 0; i < inputs.length; i++) {
    if (inputs[i].getAttribute('type') === "checkbox") {
      inputs[i].addEventListener('change', function() {
        var fieldset = this.getAttribute('data-fieldset');
        if (fieldset) {
          validateFieldset(fieldset);
        }
      });
    } else {
      inputs[i].addEventListener('blur', function() {
        validateInput(this);
      });
    }
  }

  submit.addEventListener('click', function(event) {
    event.preventDefault();
    var clearance = 0;
    for(var i = 0; i < inputs.length; i++) {
      clearance += validateInput(inputs[i]);
    }
    clearance += validateFieldset('contact--type');
    submit.setAttribute('disabled', true);
    if (clearance === 0) {
      console.log($('.contactForm').serialize());
      $.ajax({
        type: 'POST',
        url: 'submit.php',
        data: $('.contactForm').serialize(),
        complete: function(response) {
          console.log(response.responseText);
        },
        success: function (data) {
          closeForm();
        }
      });
    }
  });

  function validateInput(input) {
    var required = input.required;
    var pattern = input.getAttribute('data-pattern');
    var clearance = 0;
    if (required && input.value === '') {
      reportError(input, 'You cannot leave this blank.');
      ++clearance;
    } else if (Boolean(pattern)) {
      if (Patterns.hasOwnProperty(pattern)) {
        if (!Patterns[pattern].test.test(input.value)) {
          reportError(input, Patterns[pattern].error);
          ++clearance;
        }
      } else {
        if (!new RegExp(pattern).test(input.value)) {
          reportError(input, 'This input is invalid.');
          ++clearance;
        }
      }
    }
    if (clearance === 0) {
      input.parentElement.removeAttribute('data-error');
    }
    return clearance;
  }

  function validateFieldset(selector) {
    var fieldset = document.querySelector('#' + selector);
    var checked = i = 0;
    for (i; i < fieldset.elements.length; i++) {
      if (fieldset.elements[i].checked) {
        ++checked;
      }
    }
    if (eval(checked + fieldset.getAttribute('data-required'))) {
      fieldset.removeAttribute('data-error');
      return 0;
    } else {
      fieldset.setAttribute('data-error', true);
      return 1;
    }
  }

  function reportError(input, errorMessage) {
    input.parentElement.setAttribute('data-error', errorMessage);
  }

  function closeForm() {
    $('.contact-form').html('<span class="contactForm__response">Thank you,<br/> Someone from our leasing staff <br/>will contact you soon.</span>');
  }

  function generateMonths(select) {
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var optionsFragment = document.createDocumentFragment();
    var today = new Date();
    var month = today.getMonth();
    var option, m, i = 0;

    for (; i < 12; i++) {
      m = (today.getFullYear() < 2016)
        ? i
        : i + month;
      if (m > 11) m -= 12;
      option = document.createElement('option');
      option.setAttribute('value', months[m]);
      option.textContent = months[m];
      optionsFragment.appendChild(option);
    }
    select.appendChild(optionsFragment);
  }

});}(window, jQuery));
