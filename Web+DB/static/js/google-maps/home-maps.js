$(document).ready(function(){

   var map = new google.maps.Map(document.getElementById('map-canvas'), {
	   scrollwheel: false,
	   disableDefaultUI: true,
       mapTypeId: google.maps.MapTypeId.ROADMAP,

			// HOW YOU WOULD LIKE TO STYLE THE MAP. 
			// THIS IS WHERE YOU WOULD PASTE ANY STYLE FOUND ON SNAZZY MAPS.
			styles: [
				        {"featureType": "all", "elementType": "labels", "stylers": [{"visibility": "on"} ] }, 
				        {"featureType": "all", "elementType": "labels.text.stroke", "stylers": [{"saturation": 0}, {"color": "#000000"}, {"lightness": 30} ] },
				        {"featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{"saturation": 30}, {"color": "#000000"}, {"lightness": 80} ] },
				        {"featureType": "landscape", "elementType": "all", "stylers": [{"color": "#464646"} ] },
				        {"featureType": "poi", "elementType": "all", "stylers": [{"visibility": "off"} ] },
				        {"featureType": "road", "elementType": "all", "stylers": [{"saturation": -100 }, {"lightness": 45 }, {"visibility": "off"} ] },
				        {"featureType": "road.highway", "elementType": "all", "stylers": [{"visibility": "simplified"},{"visibility": "off"} ] },
				        {"featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{"visibility": "off"} ] },
				        {"featureType": "transit", "elementType": "all", "stylers": [{"visibility": "off"} ] },
						{
							"featureType": "water",
							"elementType": "all",
							"stylers": [
								{
									"color": "#3c3c3c"
								}
							]
						}
					]

    });

	currentMarker = 0;

	function setMyPosition(){

		if(!!navigator.geolocation) {
		
			navigator.geolocation.getCurrentPosition(function(position) {
			
				var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			    var marker = new google.maps.Marker({
						 position: geolocate,
						 animation: google.maps.Animation.DROP,
						 map: map,
						 title: 'You are here',
						 icon: 'images/maps/you-are-here.png',
						 zIndex: 999999999
					 });
					 map.setCenter(geolocate);

			});

		} else {

			alert('No Geolocation Support.');

		}
    
	}

	function closeSearcher() {
		hideSearcher(true);
	}

	function nextAds(){

		currentMarker++;
		closeSearcher();

		if (currentMarker>totalMarkers){
			currentMarker=1;
		}

		while(markers[currentMarker-1].visible===false){
			currentMarker++; 
			if (currentMarker>totalMarkers){
				currentMarker=1;
			}
		}

		map.panTo(markers[currentMarker-1].getPosition());
		google.maps.event.trigger(markers[currentMarker-1], 'click');

	}

	function prevAds(){

		currentMarker--;
		closeSearcher();

		if (currentMarker<1){
			currentMarker=totalMarkers;
		}

		while(markers[currentMarker-1].visible===false){
			currentMarker--; 
			if (currentMarker>totalMarkers){
				currentMarker=1;
			}
		}

		map.panTo(markers[currentMarker-1].getPosition());
		google.maps.event.trigger(markers[currentMarker-1], 'click');

	}

	function ControlSet(leftControlSet, rightControlSet, map) {

		// SET CSS FOR THE ZOOMIN
		var zoomInButton = document.createElement('div');
		zoomInElement = document.createAttribute("class");
		zoomInElement.value = "zoom-in";
		zoomInButton.setAttributeNode(zoomInElement);

		// SET CSS FOR THE ZOOMOUT
		var zoomOutButton = document.createElement('div');
		zoomOutElement = document.createAttribute("class");
		zoomOutElement.value = "zoom-out";
		zoomOutButton.setAttributeNode(zoomOutElement);

		// SET CSS FOR THE CONTROLL POSITION
		var positionButton = document.createElement('div');
		controlPositionWrapper = document.createAttribute("class");
		controlPositionWrapper.value = "set-position";
		positionButton.setAttributeNode(controlPositionWrapper);

		// SET CSS FOR THE CONTROLL POSITION
		var nextButton = document.createElement('div');
		controlPositionWrapper = document.createAttribute("class");
		controlPositionWrapper.value = "next-ads";
		nextButton.setAttributeNode(controlPositionWrapper);

		// SET CSS FOR THE CONTROLL POSITION
		var prevButton = document.createElement('div');
		controlPositionWrapper = document.createAttribute("class");
		controlPositionWrapper.value = "prev-ads";
		prevButton.setAttributeNode(controlPositionWrapper);

		// APPEND ELEMENTS
		leftControlSet.appendChild(zoomInButton);
		leftControlSet.appendChild(zoomOutButton);
		leftControlSet.appendChild(positionButton);
		rightControlSet.appendChild(prevButton);
		rightControlSet.appendChild(nextButton);

		// SETUP THE CLICK EVENT LISTENER - ZOOMIN
		google.maps.event.addDomListener(zoomInButton, 'click', function() {
			map.getZoom() <= 16 ? map.setZoom(map.getZoom() + 1) : null ;
			closeSearcher();
		});

		// SETUP THE CLICK EVENT LISTENER - ZOOMOUT
		google.maps.event.addDomListener(zoomOutButton, 'click', function() {
			map.getZoom() >= 4 ? map.setZoom(map.getZoom() - 1) : null ;
			closeSearcher();
		});

		// SETUP THE CLICK EVENT LISTENER - POSITION
		google.maps.event.addDomListener(positionButton, 'click', function() {
			return setMyPosition();
			closeSearcher();
		});

		// SETUP THE CLICK EVENT LISTENER - PREVIOUS ADS
		google.maps.event.addDomListener(prevButton, 'click', function() {
			return prevAds();
		});

		// SETUP THE CLICK EVENT LISTENER - NEXT ADS
		google.maps.event.addDomListener(nextButton, 'click', function() {
			return nextAds();
		});

	}

  // CREATE THE DIV TO HOLD THE CONTROL AND CALL THE CONTROLSET() CONSTRUCTOR
  // PASSING IN THIS DIV.

var leftControlSet = document.createElement('div');
	leftWrapperClass = document.createAttribute("class");
	leftWrapperClass.value = "control-left-wrapper";
	leftControlSet.setAttributeNode(leftWrapperClass);

var rightControlSet = document.createElement('div');
	rightWrapperClass = document.createAttribute("class");
	rightWrapperClass.value = "control-right-wrapper";
	rightControlSet.setAttributeNode(rightWrapperClass);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(leftControlSet);
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(rightControlSet);
    var ControlSet = new ControlSet(leftControlSet, rightControlSet, map);

    var marker, i;
    var markers = [];
	var markerCluster = null;

    $.ajaxSetup({ cache: false });
	var result = $('.find-result');

	function totalSearch(numResult){
		result.text(numResult + ' Founded').addClass('active');
	}

    $.getJSON("./ajax/marker.json", function(data){

         $.each(data, function(index, locations){

			/* ===================================================================== */

			 $typeTarget = $('#property-type a[data-type="'+locations.propertyType+'"] strong');
			 $valueProperty = parseInt($typeTarget.text(), 10);
			 $typeTarget.text($valueProperty+1);

			 iconStandard = 'images/maps/' + locations.propertyType + '-pin.png';

			 marker = new google.maps.Marker({
				 position: new google.maps.LatLng(locations.lat, locations.lon),
				 map: map,
				 animation: google.maps.Animation.DROP,
				 icon: iconStandard,
				 propertyType: locations.propertyType
			 });

			/* ===================================================================== */

			

			  // ADD MARKER TO MAPS
			  markers.push(marker);
			  google.maps.event.addListener(marker, 'click', (function(marker, i) {

					return function() {

						$('.infoBox').fadeOut(300);
						box = '<div class="ads-maps">' +
								  '<a href="' + locations.url + '" class="img-container" style="background-image:url(' + locations.img + ')">' + 
									  '<span class="title">' + locations.title + '</span>' + 
									  '<p class="subtitle">' + locations.subtitle + '</p>' + 
							      '</a>' +
								  '<div class="price">$ ' + locations.info.price + '</div>' + 
								  '<ul class="details">' +
									  '<li class="room">' + locations.info.room + '</li>' +
									  '<li class="bed-room">' + locations.info.bedRoom + '</li>' +
									  '<li class="bath-room">' + locations.info.bathRoom + '</li>' +
									  '<li class="size">' + locations.info.perimeter + '</li>' +
								  '</ul>' + 
							  '</div>';

						infobox = new InfoBox({
							content: box,
							disableAutoPan: false,
							maxWidth: 150,
							pixelOffset: new google.maps.Size(-160, -382),
							zIndex: null,
							position: new google.maps.LatLng(locations.lat, locations.lon),
							boxStyle: {
								width: "330px"
							},
							closeBoxMargin: "0",
							closeBoxURL: "images/maps/close.png",
							infoBoxClearance: new google.maps.Size(1, 1)
						});
						infobox.open(map, marker);
						
						map.panTo(marker.getPosition());
						closeSearcher();
					}

			  })(marker, i));

        });

		totalMarkers = markers.length;

		function autoCenter() {

			// CREATE A NEW VIEWPOINT BOUND
			var bounds = new google.maps.LatLngBounds();

			// GO THROUGH EACH...
			for(x=0; x<totalMarkers; x++) {
				bounds.extend(markers[x].position);
			}

			// FIT THESE BOUNDS TO THE MAP
			map.fitBounds(bounds);
		}

		autoCenter();

		var markerCluster = new MarkerClusterer(map, markers, {
			gridSize: 40,
			minimumClusterSize: 2,
			calculator: function(markers_list, numStyles) {
				return {
					text: markers_list.length,
					index: numStyles
				};
			}
		});

		// FILTER MARKER
		filter = [];

		$('#property-type .item-type').on('click touchstart', function(){

			$(this).toggleClass('item-selected');

			closeSearcher();

			properyClick = this.dataset.type;

			var newBounds = new google.maps.LatLngBounds();
			propertyFound = 0;

			$.inArray(properyClick, filter) == -1 ? filter.push(properyClick) 
				                                  : filter.splice(filter.indexOf(properyClick), 1) ;

			markerCluster.removeMarkers(markers, false);
			
			for(x=0; x<totalMarkers; x++) {

				if($.inArray(markers[x].propertyType, filter)>= 0){

					markers[x].setVisible(true);
					markerCluster.addMarker(markers[x], false);
					propertyFound++;

					// SET NEW POSITION MAPS
					newBounds.extend(markers[x].position);

				}else{

					markers[x].setVisible(false);
					markerCluster.removeMarker(markers[x]);

					// SET NEW POSITION MAPS
					newBounds.extend(markers[x].position);

				}
				
				totalSearch(propertyFound);

			}

			if(filter.length === 0) {

				totalSearch(totalMarkers);
				for(x=0; x<totalMarkers; x++) {

					markers[x].setVisible(true);
					markerCluster.addMarker(markers[x], false);

					// SET NEW POSITION MAPS
					newBounds.extend(markers[x].position);

				}
			}

			// SET NEW POSITION MAPS
			map.fitBounds(newBounds);

			autoCenter();
			return false;

		});

		google.maps.event.addListenerOnce(map, 'idle', function(){
			$(".loading-container").delay(3000).fadeOut();
		});

    }).error(function(jqXHR, textStatus, errorThrown){
            alert(textStatus);
    });

});