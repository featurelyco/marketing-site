function getPaid() {
	var selectedPlan = $('#plan').val();

	$('.features').hide();
	$('.' + selectedPlan + '').show();

	if(selectedPlan == 'prove-it') {
		$('#payment').slideUp();
		$('.payment').hide();

	} else {
		$('#payment').slideDown();
		$('.payment').show();
	}
}

var searchParams = new URLSearchParams(window.location.search); 

var plan = searchParams.get("plan");

if(plan != null) {
	$('#plan option[value="' + plan + '"]').prop('selected', true);
	$('label[for="plan"]').addClass('complete');
	getPaid();
}

$(document).ready(function () {
	$('#plan').on('input', function(){
		getPaid();
	});
});

// Validation
$("#sign-up").validate({
	debug: false,
	errorClass: "error",
	errorElement: "small",
	focusInvalid: true,
	errorPlacement: function(error, element) {
		error.insertAfter(element); 
	},
	rules: {
		fname: "required",
		lname: "required",
		email: "required",
		password: "required",
		password_again: {
			required: true,
			equalTo: '#password'
		},
		name_on_card: "required",
		card_number: "required",
		cvv:{ 
			required: true,
			maxlength: 4,
			minlength: 3
		}
  	}
});

$('.action').click(function() {
	$('input[name=next_url]').val($(this).attr('data'));
	if($("form").valid() && !$(this).hasClass('disabled')) {
		$(this).prop("disabled", true).addClass('loading-button disabled').removeClass('action next-button');
		$('form').removeClass('invalid').submit();
	} else {
		$('form').addClass('invalid');
	}
});



// do awesome creditcard things
$('#card_number').payment('formatCardNumber');

var valid = $.payment.validateCardNumber($('#card_number').val());