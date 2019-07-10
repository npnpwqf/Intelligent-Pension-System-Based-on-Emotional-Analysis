(function($) {

	jQuery.fn.progressBar = function( options ) {

		//Default values for progress_bar
		var defaults = {
			height : "30",
			backgroundColor : "#E0E0E0",
			barColor : "#F97352",
			targetBarColor : "#CCC",
			percentage : true,
			shadow : false,
			border : false,
			animation : false,
			animateTarget : false,
		};

		var settings = $.extend( {}, defaults, options );

		return this.each( function() {
			var elem = $( this );
			$.fn.replaceProgressBar( elem, settings );
		});
	};

	$.fn.replaceProgressBar = function( item, settings ) {
		var skill		= item.text();
		var progress	= item.data( 'width' );
		var target		= item.data ( 'target' );
		var bar_classes = ' ';
		var animation_class = '';
		var bar_styles	= 'background-color:' + settings.backgroundColor + ';height:' + settings.height + 'px;';
		if ( settings.shadow ) { bar_classes += 'shadow'; }
		if ( settings.border ) { bar_classes += ' border'; }
		if ( settings.animation ) { animation_class = ' animate'; }

		var overlay = '<div class="sonny_progressbar' + animation_class + '" data-width="' + progress + '">';
		overlay += '<p class="title">' + skill + '</p>';
		overlay += '<div class="bar-container' + bar_classes + '" style="' + bar_styles + '">';

		// Render the progress bar background
		overlay += '<span class="backgroundBar"></span>';

		// Display target bar only if set
		if ( target ) {
			if ( settings.animateTarget ) {
				overlay += '<span class="targetBar loader" style="width:' + target + '%;background-color:' + settings.targetBarColor + ';"></span>';
			}
			else {
				overlay += '<span class="targetBar" style="width:' + target + '%;background-color:' + settings.targetBarColor + ';"></span>';
			}
		}

		// Render the progress bar
		if ( settings.animation ) {
			overlay += '<span class="bar" style="background-color:' + settings.barColor + ';"></span>';
		}
		else {
			overlay += '<span class="bar" style="width:' + progress + '%;background-color:' + settings.barColor + ';"></span>';
		}

		// Render the percentage if enabled
		if ( settings.percentage ) {
			overlay += '<span class="progress-percent" style="line-height:' + settings.height + 'px;">' + progress + '%</span>';
		}

		// End
		overlay += '</div></div>';

		// Render the progress bar on the page
		$( item ).replaceWith( overlay );

	};

	var animate = function() {

		var doc_height = $(window).height();

		$( '.sonny_progressbar.animate' ).each( function() {
			var position = $( this ).offset().top;

			if ( ( $(window).scrollTop() + doc_height - 60 ) > position ) {
				var progress = $( this ).data( 'width' ) + "%";

				$( this ).removeClass( 'animate' );
				$( this ).find( '.bar' ).css('opacity', '0.1');

				$( this ).find( '.bar' ).animate({
					width : progress,
					opacity : 1
				}, 3000 );
			}

		});

	};

	// Looking for an animation element in the view
	$(window).scroll(function() {

		if ( $( '.sonny_progressbar.animate' ).length < 1 ) {
			return;
		}

		// If there is an animate element visible on the page, trigger the animation
		animate();
	});


})(jQuery);

/* Dashboard CIrcle Progress Bar Script */
function makesvg(percentage, inner_text=""){

  var abs_percentage = Math.abs(percentage).toString();
  var percentage_str = percentage.toString();
  var classes = ""

  if(percentage < 0){
    classes = "danger-stroke circle-chart__circle--negative";
  } else if(percentage > 0 && percentage <= 30){
    classes = "warning-stroke";
  } else{
    classes = "success-stroke";
  }

 var svg = '<svg class="circle-chart" viewbox="0 0 33.83098862 33.83098862" xmlns="http://www.w3.org/2000/svg">'
     + '<circle class="circle-chart__background" cx="16.9" cy="16.9" r="15.9" />'
     + '<circle class="circle-chart__circle '+classes+'"'
     + 'stroke-dasharray="'+ abs_percentage+',100"    cx="16.9" cy="16.9" r="15.9" />'
     + '<g class="circle-chart__info">'
     + '   <text class="circle-chart__percent" x="17.9" y="15.5">'+percentage_str+'%</text>';

  if(inner_text){
    svg += '<text class="circle-chart__subline" x="16.91549431" y="22">'+inner_text+'</text>'
  }
  
  svg += ' </g></svg>';
  
  return svg
}

(function( $ ) {

    $.fn.circlechart = function() {
        this.each(function() {
            var percentage = $(this).data("percentage");
            var inner_text = $(this).text();
            $(this).html(makesvg(percentage, inner_text));
        });
        return this;
    };

}( jQuery ));

/* ----- Candidate SIngle Page SIdebar On Click According ----- */
$(function() {
    var Accordion = function(el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;
        // Variables privadas
        var links = this.el.find('.link');
        // Evento
        links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
    }
    Accordion.prototype.dropdown = function(e) {
        var $el = e.data.el;
            $this = $(this),
            $next = $this.next();
            $next.slideToggle();
            $this.parent().toggleClass('open');
        if (!e.data.multiple) {
            $el.find('.cl_submenu').not($next).slideUp().parent().removeClass('open');
        };
    }
    var accordion = new Accordion($('#accordion,#accordion2,#accordion3,#accordion4,#accordion5,#accordion6,#accordion7,#accordion8,#accordion9,#accordion10'), false);
});

/* ----- Job List V3 Page On Click SIdebar ----- */
function openNav() {  
document.getElementById("mySidenav").style.width = "300px";
    document.getElementById("mySidenav").style.marginLeft = "0px";  
    document.getElementById("main").style.marginLeft = "0";  
    document.body.style.backgroundColor = "rgba(250,250,250,0.4)";
}
function closeNav() {  
document.getElementById("mySidenav").style.width = "0";
    document.getElementById("mySidenav").style.marginLeft= "-30px";
    document.getElementById("main").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
}