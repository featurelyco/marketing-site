$(window).on('load', function() {
	// Fix the forms if there's already data
	$('input').each(function() {
		if ($(this).val() !== '') {
			var disput = $(this).attr('id');
			var label = $("label[for='" + disput + "']");
			$(label).addClass("complete");
		} else if ($(this).attr('disabled')) {
			var disput = $(this).attr('id');
			var label = $("label[for='" + disput + "']");
			$(label).addClass("disabled");
		}
		if ($(this).prop('type') == 'range') {
			insaneSlider($(this));
		}
	});
});

// hide the modals and the background on load
function closeModal() {
	$('.modal-bg').fadeOut();
	$('.modal').fadeOut().removeClass('modal-on');
}

function showModal(dis) {
	$('.modal').hide().removeClass('modal-on');
	$('.modal-bg').fadeIn();
	$(dis).fadeIn().addClass('modal-on');
}

// off canvas
if ($('.off-canvas').length) {
	$('body').append('<div class="off-canvas-bg"></div>');
	$('.off-canvas-bg').hide();
}

$(document).ready(function () {
	if ($('.modal').length) {
		$('body').append('<a class="modal-bg"></a>');
		$('.modal').not('[data-load]').hide();
		$('.modal-bg').hide();
	};
	
	// Show me modal windows
	$('[data-modal-id]').click(function() {
		var dis_modal = $(this).attr('data-modal-id')
		$('.modal').hide().removeClass('modal-on');
		$('.modal-bg').fadeIn();
		$('#' + dis_modal).fadeIn().addClass('modal-on');
	});

	// Close on button
	$('.close').click(function() {
		closeModal();
	});
	

	
	// close on background click, sometimes
	$('.modal-bg').click(function() {
		var close_bg = $('.modal-on').attr('data-modal-closebg')
		if (close_bg !== 'false') {
			closeModal();
		}
	});

	$('span.close').click(function() {
		$(this).parent().slideUp();
	});

	$('span.tooltip').each(function() {
		var tip = $(this).attr('title')
		$(this).removeAttr('title').attr('data-tip', tip);
	});
	
	$('select').each(function() {
		if ($(this).val() !== '') {
			var disput = $(this).attr('id');
			var label = $("label[for='" + disput + "']");
			$(label).addClass("complete");
		} else if ($(this).attr('disabled')) {
			var disput = $(this).attr('id');
			var label = $("label[for='" + disput + "']");
			$(label).addClass("disabled");
		}
	});
});

// Set the progress on bar style progress bars
function setProgress() {
    var percent = $('.progress-bar').attr('data-complete')
    $('.progress-bar.bar').children('.complete').animate({
    		width: percent + '%'
  	}, 1000 );  
}

if ($('.progress-bar').hasClass('bar')) {
  setProgress();
}

// Make Scrolling Great Again
$(".scroll").click(function(event){		
	event.preventDefault();
	$('html,body').animate({scrollTop:$(this.hash).offset().top -70}, 700);
});

// Functions for Mega Menu
if ($('nav').hasClass('mega-menu')) {
	if(!$('.off-canvas.button').is(":visible")) {
		$('.drop').mouseenter(function () {
			$(this).children('.drop-menu').slideDown();
		});
		$('.drop').mouseleave(function () {
			$('.drop-menu').slideUp();
		});
	} 
}

// off canvas nav
$('.off-canvas').on('click', function () {
   $(this).toggleClass('open');
   if ($(this).hasClass('open')) {
	  $('.off-canvas-bg').fadeIn();
   }
   else {
	  $('.off-canvas-bg').fadeOut();
   }
});

$('.off-canvas-bg').on('click', function () {	
	$('.off-canvas').toggleClass('open');
	$('.off-canvas-bg').fadeOut();
});


// Functions for off canvans nav
$('.drop').click(function() {
	if ($('.off-canvas').hasClass('open')) {
		$(this).toggleClass('drop-open');
		if ($(this).hasClass('drop-open')) {
			var text = $(this).find('a:first').text();
			$(this).attr('data-text', text)
			$(this).find('a:first').text('Close');
		}
		else {
			var textback = $(this).data('text');
			$(this).find('a:first').text(textback);

		}
	}
});	

// Tool Tips
$('.tooltip').on('click', function () {
	var tip = $(this).attr('data-tip');
	var content = $(this).html();
	if (!$(this).hasClass('tip-open')){
		$(this).addClass('tip-open').html(content + '<div class="this-tip">' + tip + '</div>');
	} else {
		$(this).removeClass('tip-open');
		$('.this-tip').remove();
	}
});
$('.tooltip').mouseleave(function () {
	if ($(this).hasClass('tip-open')) {
		$(this).removeClass('tip-open');
		$('.this-tip').remove();
	}
});



// Range Slider
function insaneSlider(thisObj) {
	// Seriously tho, this is fucking nuts
		var value = thisObj.val(),
		      min = thisObj.prop('min'),
		      max = thisObj.prop('max'),
		     step = thisObj.prop('step'),
 	 num_positions = (max - min) / step,
	 	 position = (max - value) / step,
    	    	    ratio = position / num_positions,
    	    percentage = ratio * 100;
//		console.log(percentage);
	
	thisObj.css('background-position', percentage + '% center')
	
//	if (thisObj.hasClass('percent')) {
//		thisObj.prev().text(value + "%");
//	} else {
//		thisObj.prev().text(value);
//	}
}

$('input[type=range]').on('input', function () {
	insaneSlider( $(this) );
});



// Accordion make do'er
$('dl.accordion dt').on('click', function () {
	if ($(this).next('dd').is(":visible")) {
		$('dl.accordion dd').slideUp();
        	$(this).find('.iconic').attr( "data-direction", "bottom" );
        	IconicJS().update();
	} else {
		$('dl.accordion dd').slideUp();
        	$('dl.accordion dt').find('.iconic').attr( "data-direction", "bottom" );
        	$(this).find('.iconic').attr( "data-direction", "top" );
        	IconicJS().update();
		$(this).next('dd').slideDown();
	}
});

// Additional Questions
var slide_number = 1;
var previous_slide = 0;
function setSlides() {
	$('.additional-questions li').each(function() {
		$(this).find('a.previous-question').attr('data-slide', previous_slide);
		previous_slide++;	
		$(this).attr('data-slide', slide_number);
		slide_number++;
		$(this).find('.next-question').attr('data-slide', slide_number);
	});
}

function nextSlide(disThing) {
	var slide = $(disThing).attr('data-slide');
	var ul_height = $('.additional-questions li[data-slide="' + slide + '"]').outerHeight();

	$('.additional-questions ul').animate({
		'height': ul_height + 'px'
	}, 1000 );

	$('.additional-questions li.active').animate({
		'margin-left': '-100%'
	}, 1000 ).removeClass('active').fadeOut();

	$('.additional-questions li[data-slide="' + slide + '"]').show().css('margin-left', '100%').animate({
		'margin-left': '0%'
	}, 1000 ).addClass('active');
	$('.current-question').text(slide);
};

function previousSlide(disThing) {
	var slide = $(disThing).attr('data-slide');
	var ul_height = $('.additional-questions li[data-slide="' + slide + '"]').outerHeight();
	
	$('.additional-questions ul').animate({
    		'height': ul_height + 'px'
  		}, 1000 );
	
	$('.additional-questions li.active').animate({
    		'margin-left': '100%'
  		}, 1000 ).removeClass('active').fadeOut();
	
	$('.additional-questions li[data-slide="' + slide + '"]').show().css('margin-left', '-100%').animate({
    		'margin-left': '0%'
  		}, 1000 ).addClass('active');
	
	$('.current-question').text(slide);
};

if ($('.additional-questions').length > 0) {
	var slide_count = $('.additional-questions ul li').length;
	setSlides();
	$('.additional-questions li[data-slide="1"]').addClass('active').show();
//	$('.additional-questions .next-question').addClass('disabled');	
	$('.question-number').text(slide_count);
}

// Tabs
$('ul.tabs li').click(function(){
	var tab_id = $(this).attr('data-tab');
	var current = $(this).parent().parent().find('ul.tabs li.current').attr('data-tab');
	
	$('.tab-link[data-tab="' + current + '"]').removeClass('current');
	$("#" + current).removeClass('current');
	
	$(this).addClass('current');
	$("#" + tab_id).addClass('current');
});

// Forms
$("input, select").focus(function() {
	var disput = $(this).attr('id');
	var label = $("label[for='" + disput + "']");
	$(label).removeClass("complete").addClass("focused");
});

$("input, select").blur(function() {
	var disput = $(this).attr('id');
	var label = $("label[for='" + disput + "']");
	$(label).removeClass("focused");
	if ($(this).val().length === 0) {
		$(label).removeClass("focused complete");
	} else if ($(this).hasClass('error')) {
		$(label).addClass("error");
	} else {
		$(label).removeClass("focused error").addClass("complete");
		$(disput).addClass("complete");
	}
});

// because chrome and likely ie are little babies, we have to do this BS
$("input, select").on('input', function() {
	if (!$(this).is(":focus")) {
		var disput = $(this).attr('id');
		var label = $("label[for='" + disput + "']");
		$(label).removeClass("focused");
		if ($(this).val().length === 0) {
			$(label).removeClass("focused complete");
		} else if ($(this).hasClass('error')) {
			$(label).addClass("error");
		} else {
			$(label).removeClass("focused error").addClass("complete");
			$(disput).addClass("complete");
		}
	}
});

// Toggle button
$('.toggle').click(function() {
	var field = $(this).attr('data-field');
	if(!$(this).hasClass('disabled')) {
		$(this).toggleClass('on off');
		if($(this).hasClass('off')) {
			$('#' + field).val('off');
			$('.' + field).text('Off');
			$('[data-toggle-content="' + field + '"]').slideUp();
			localStorage.setItem(field, 'off');
		} else {
			$('#' + field).val('on');
			$('.' + field).text('On');
			$('[data-toggle-content="' + field + '"]').slideDown();
			localStorage.setItem(field, 'on');
		}
	}
});

// Count To function for the progress precentage
// Have the percent complete count up all completely awesome like
(function($) {
    $.fn.countTo = function(options) {
        // merge the default plugin settings with the custom options
        options = $.extend({}, $.fn.countTo.defaults, options || {});

        // how many times to update the value, and how much to increment the value on each update
        var loops = Math.ceil(options.speed / options.refreshInterval),
            increment = (options.to - options.from) / loops;

        return $(this).each(function() {
            var _this = this,
                loopCount = 0,
                value = options.from,
                interval = setInterval(updateTimer, options.refreshInterval);

            function updateTimer() {
                value += increment;
                loopCount++;
                $(_this).html(value.toFixed(options.decimals));

                if (typeof(options.onUpdate) == 'function') {
                    options.onUpdate.call(_this, value);
                }

                if (loopCount >= loops) {
                    clearInterval(interval);
                    value = options.to;

                    if (typeof(options.onComplete) == 'function') {
                        options.onComplete.call(_this, value);
                    }
                }
            }
        });
    };

    $.fn.countTo.defaults = {
        from: 0,  // the number the element should start at
        to: 100,  // the number the element should end at
        speed: 1000,  // how long it should take to count between the target numbers
        refreshInterval: 100,  // how often the element should be updated
        decimals: 0,  // the number of decimal places to show
        onUpdate: null,  // callback method for every time the element is updated,
        onComplete: null,  // callback method for when the element finishes updating
    };
})(jQuery);