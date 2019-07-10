/* Start List JS Area*/
/* Start Mapster JS Area*/
/* Start Map Option Js Area*/
/* Start jQuery UI Option Js Area*/

/* Start List JS Area*/
(function(window) {
  var List = (function() {
    function List() {
      this.items = [];
    }
    List.prototype = {
      add: function(item) {
        this.items.push(item);
      },
      remove: function(item) {
        var indexOf = this.items.indexOf(item);
        if (indexOf !== -1) {
          this.items.splice(indexOf, 1);
        }
      },
      find: function(callback, action) {
        var callbackReturn,
            items = this.items,
            length = items.length
            matches = [],
            i = 0;
        
        for(; i < length; i++) {
          callbackReturn = callback(items[i], i);
          if (callbackReturn) {
            matches.push(items[i]);
          }
        }
        
        if (action) {
          action.call(this, matches);
        }
        
        return matches;
      }
    };
    return List;
  }());
  
  List.create = function() {
    return new List();  
  };
  
  window.List = List;
  
}(window));
/* End List JS Area*/
/* Start Mapster JS Area*/
(function(window, google, List) {

  var Mapster = (function() {
    function Mapster(element, opts) {
      this.gMap = new google.maps.Map(element, opts);
      this.markers = List.create();
      if (opts.cluster) {
        this.markerClusterer = new MarkerClusterer(this.gMap, [], opts.cluster.options);
      }
      if (opts.geocoder) {
        this.geocoder = new google.maps.Geocoder();
      }
    }
    Mapster.prototype = {
      zoom: function(level) {
        if (level) {
          this.gMap.setZoom(level);
        } else {
          return this.gMap.getZoom();
        }
      },
      _on: function(opts) {
        var self = this;
        google.maps.event.addListener(opts.obj, opts.event, function(e) {
          opts.callback.call(self, e, opts.obj);
        });
      },
      geocode: function(opts) {
        this.geocoder.geocode({
          address: opts.address
        }, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            opts.success.call(this, results, status);
          } else {
            opts.error.call(this, status);
          }
        });
      },
      getCurrentPosition: function(callback) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            callback.call(this, position);
          });
        }
      },
      setPano: function(element, opts) {
        var panorama = new google.maps.StreetViewPanorama(element, opts);
        if (opts.events) {
          this._attachEvents(panorama, opts.events);
        }
        this.gMap.setStreetView(panorama);
      },
      addMarker: function(opts) {
        var marker,
          self = this;

        opts.position = {
          lat: opts.lat,
          lng: opts.lng
        }
        marker = this._createMarker(opts);
        if (this.markerClusterer) {
          this.markerClusterer.addMarker(marker);
        }
        this._addMarker(marker);
        if (opts.events) {
          this._attachEvents(marker, opts.events);
        }
        if (opts.content) {
          this._on({
            obj: marker,
            event: 'click',
            callback: function() {
              var infoWindow = new google.maps.InfoWindow({
                content: opts.content
              });

              infoWindow.open(this.gMap, marker);
            }
          })
        }
        return marker;
      },
      _attachEvents: function(obj, events) {
        var self = this;
        events.forEach(function(event) {
          self._on({
            obj: obj,
            event: event.name,
            callback: event.callback
          });
        });
      },
      _addMarker: function(marker) {
        this.markers.add(marker);
      },
      findBy: function(callback) {
        this.markers.find(callback);
      },
      removeBy: function(callback) {
        var self = this;
        self.markers.find(callback, function(markers) {
          markers.forEach(function(marker) {
            if (self.markerClusterer) {
              self.markerClusterer.removeMarker(marker);
            } else {
              marker.setMap(null);
            }
          });
        });
      },
      _createMarker: function(opts) {
        opts.map = this.gMap;
        return new google.maps.Marker(opts);
      }
    };
    return Mapster;
  }());

  Mapster.create = function(element, opts) {
    return new Mapster(element, opts);
  };

  window.Mapster = Mapster;

}(window, google, List));
/* End Mapster JS Area*/
/* Start Map Option Js Area*/
(function(window, google, mapster) {

  // remove labels
  // water - 3c3c3c
  // landscape - 27ae60
  // poi - 464646
  // transit - 27ae60
  // highways - 34495e
  // main roads - ecf0f1
  
  var styles = [{
    featureType: 'all',
    elementType: 'labels',
    stylers: [
      { visibility: 'simplified' }
    ]
  }, 
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      { color: '#dddddd' }  
    ]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      { color: '#3c3c3c' }  
    ]
  }, {
    featureType: 'landscape',
    elementType: 'geometry',
    stylers: [
      { color: '#464646' }
    ]
  }, {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      { color: '#464646' },
      { visibility: 'off' }  
    ]
  }, {
    featureType: 'transit',
    elementType: 'geometry', 
    stylers: [
      { color: '#464646' }  
    ]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      { color: '#464646' }  
    ]
  }, {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      { color: '#464646' }  
    ]
  }];
  
  mapster.MAP_OPTIONS = {
    center: {
      lat: 51.8045646,
      lng: -5.0102911
    },
    zoom: 10,
    disableDefaultUI: false,
    scrollwheel: false,
    draggable: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM,
      style: google.maps.ZoomControlStyle.DEFAULT
    },
    panControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM
    },
    cluster: false,
    geocoder: true,
    styles: styles
  };
  
}(window, google, window.Mapster || (window.Mapster = {})))
/* End Map Option Js Area*/
/* Start jQuery UI Option Js Area*/
(function(window, Mapster) {
  
  $.widget("mapster.mapster", {
      // default options
      options: { },
 
      // the constructor
      _create: function() {
        var element = this.element[0],
            options = this.options;
        this.map = Mapster.create(element, options);
      },
 
      // called when created, and later when changing options
      _refresh: function() {
        
      },
 
      // Add a marker onto the map
      addMarker: function( opts ) {
        var self = this;
        if (opts.location) {
          this.map.geocode({
            address: opts.location,
            success: function(results) {
              results.forEach(function(result) {
                opts.lat = result.geometry.location.lat();
                opts.lng = result.geometry.location.lng();
                self.map.addMarker(opts);
              });
            },
            error: function(status) {
              console.error(status)
            }
          });
        } else {
          this.map.addMarker(opts);  
        }
      },
      
      findMarkers: function(callback) {
        return this.map.findBy(callback);
      },
      
      removeMarkers: function(callback) {
        this.map.removeBy(callback);
      },
      
      markers: function() {
        return this.map.markers.items;
      },
      
      getCurrentPosition: function(callback) {
        this.map.getCurrentPosition(callback);
      },
      
      setPano: function(selector, opts) {
        var elements = $(selector),
            self = this;
        $.each(elements, function(key, element) {
          self.map.setPano(element, opts);             
        });
      },
 
      // events bound via _on are removed automatically
      // revert other modifications here
      _destroy: function() {
        
      },
 
      // _setOptions is called with a hash of all options that are changing
      // always refresh when changing options
      _setOptions: function() {
        // _super and _superApply handle keeping the right this-context
        this._superApply( arguments );
        this._refresh();
      },
 
      // _setOption is called for each individual option that is changing
      _setOption: function( key, value ) {
        this._super( key, value );
      }
    });
  
}(window, Mapster))
/* End jQuery UI Option Js Area*/