
	"use strict";

	/* CAROUSEL
	============================================== */
		$('.property-type-slide', '#property-type').carousel({
			visible: 6,
			itemMinWidth: 200,
			speed: 1000
		});
	/* MAPS & SERCHER
	============================================== */
	var $filter = $('.filter', '#search-box');
	var $maps   = $('#map-container', '#search-box');
	var $search = $('#content-search', '#search-box');
	var $searcher = $(".searcher", '#search-box');
	var $position = parseInt($searcher.css('bottom'), 10);

	function viewFullMaps() {
		$maps.toggleClass('full-screen');
	}

	$('.botton-options', '#search-box').on('click', function(){
		hideSearcher();
	});

	function hideSearcher(navigatorMap){

		if(navigatorMap==true){
			$searcher.slideUp(220);
		} else {
			$searcher.slideToggle(220);
		}
		return false;
	}

	$(".set-searcher", '#search-box').on('click', hideSearcher);
