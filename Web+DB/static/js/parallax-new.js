/*
 *  Project: Scrolly : parallax is easy as a matter of fact !
 *  Description: Based on jQuery boilerplate
 *  Author: Victor C. / Octave & Octave web agency
 *  Licence: MIT
 */
(function ( $, window, document, undefined ) {
    var pluginName = 'scrolly',
        defaults = {
            bgParallax: false
        },
        didScroll = false;
    function Plugin( element, options ) {
        this.element = element;
        this.$element = $(this.element);
        this.options = $.extend( {}, defaults, options) ;
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }
    Plugin.prototype.init = function () {
        var self = this;
        this.startPosition = this.$element.position().top;
        this.offsetTop = this.$element.offset().top;
        this.height = this.$element.outerHeight(true);
        this.velocity = this.$element.attr('data-velocity');
        this.bgStart = parseInt(this.$element.attr('data-fit'), 10);
        $(document).scroll(function(){
            self.didScroll = true;
        });
        setInterval(function() {
            if (self.didScroll) {
                self.didScroll = false;
                self.scrolly();
            }
        }, 10);
    };
    Plugin.prototype.scrolly = function() {
        var dT =  $(window).scrollTop(),
            wH = $(window).height(),
            position = this.startPosition;
        if(this.offsetTop >= (dT+wH)) {
            this.$element.addClass('scrolly-invisible');
        } else {
            if(this.$element.hasClass('scrolly-invisible')){
                position = this.startPosition + (dT + ( wH - this.offsetTop ) ) * this.velocity;
            } else {
                position = this.startPosition + dT  * this.velocity;
            }
        }
        if(this.bgStart){ position = position + this.bgStart; }
        if(this.options.bgParallax === true) {
            this.$element.css({backgroundPosition: '50% '+position+'px'});
        } else {
            this.$element.css({top: position});
        }
    };
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
            }
        });
    };
})(jQuery, window, document);


$(document).on("ready", function() {
    "use strict";

     /*=================== Parallax ===================*/   
    $('.parallax').scrolly({bgParallax: true}); 

});


/*
Mouse Parallax
==============
A simple jQuery plugin to allow given elements to be used as backgrounds that respond to mouse movement.  Could easily be further extended or modified.
--------------
Author: "Pip Beard Design," Benjamin Alan Robinson
LICENSE: The MIT License (MIT)
*/

(function ( $ ) {
    $.fn.extend({
        mouseParallax: function(options) {
        var defaults = { moveFactor: 5, zIndexValue: "-1", targetContainer: 'body' };
        var options = $.extend(defaults, options);
        return this.each(function() {
        var o = options;
        var background = $(this);
        $(o.targetContainer).on('mousemove', function(e){
            mouseX = e.pageX;
            mouseY = e.pageY;            
            windowWidth = $(window).width();
            windowHeight = $(window).height();            
            percentX = ((mouseX/windowWidth)*o.moveFactor) - (o.moveFactor/2);
            percentY = ((mouseY/windowHeight)*o.moveFactor) - (o.moveFactor/2);
            leftString = (0-percentX-o.moveFactor)+"%";
            rightString = (0-percentX-o.moveFactor)+"%";
            topString = (0-percentY-o.moveFactor)+"%";
            bottomString = (0-percentY-o.moveFactor)+"%";
            background[0].style.left = leftString;
            background[0].style.right = rightString;
            background[0].style.top = topString;
            background[0].style.bottom = bottomString;
            if(o.zIndexValue) { 
                background[0].style.zIndex = o.zIndexValue;
            }
        });
        });
        }
    });
} (jQuery) );

$(document).on('ready', function(){
    "use strict";
    $('.animute').mouseParallax({ moveFactor: 2 });
});