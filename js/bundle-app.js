		var map;
		var drgflag = false;
		var styleArray = [
		    {
		      featureType: "all",
		      stylers: [
		       { saturation: -80 }
		      ]
		    },{
		      featureType: "road.arterial",
		      elementType: "geometry",
		      stylers: [
		        { hue: "#00ffee" },
		        { saturation: 50 }
		      ]
		    },{
		      featureType: "poi.business",
		      elementType: "labels",
		      stylers: [
		        { visibility: "off" }
		      ]
		    }
		  ];

			function pol(){
				console.log("pol-Ran");
				var in1 = $('#successStatus').html();
				in1 = in1 + '&nbsp;<i class="fa fa-globe"></i><i class="fa fa-check"></i>';
				$('#successStatus').html(in1);
				
				// geoFindMe();
				// hjinitMap();
				//google.maps.event.addDomListener(window, 'load', initialize);
				//google.maps.event.addDomListener(window, 'resize', initialize);
				//initialize();
				appMaster.maps();
			};


			$(function() {
              $("#departTime").timepicker({ 
              	'scrollDefault': 'now', 
              	'startTime': new Date(0,0,0,15,0,0),
              	'step': 5 
  				}).on('focus', function (e) {
		        $(this).trigger('blur');
		    	});

 
            $("#departDate").datepicker({ 
              	dateFormat: "DD, d MM, yy",
              	minDate: -0, 
              	maxDate: "+11M +10D",
				showOn: "button", 
				buttonImage: "img/calendar.gif",
				changeMonth: true,
				changeYear: true,
				buttonImageOnly: true
			    })
              .on('focus', function (e) {
		        $(this).trigger('blur');
			    });
              
	        });

            $(function(){
            	$("#BookGo").click(function(e){
            		console.log("clicked Book");
            		$('#confirmBookingModal').modal('show');
            	});
				
            });


		$(".binc").on('click', function(e){
			var p = $(this).parent();
			var max = p.find("input").data("max");
//			var p = $(this).parent().parent();
			var total = p.find("input").val();
			total = (++total < max ) ? total : max;
			p.find("input").val(total);
		});


		$(".bdec").on('click', function(e){
			var p = $(this).parent();
			var min = p.find("input").data("min");
			var total = p.find("input").val();
			total = (--total > min ) ? total : min;
			p.find("input").val(total);
		});

// /*
			$(function(){
				$( "#departDate" ).datepicker("option","dateFormat", "DD, d MM, yy" );
				$( "#departDate" ).datepicker("option","dateFormat", "DD, d MM, yy" );
			});

//*/
      console.log("inner width: "+window.innerWidth);

      function initMap() {
        // Create a map object and specify the DOM element for display.
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          scrollwheel: false,
          zoom: 8
        });

        var marker = new google.maps.Marker({
          map: map,
          position: pos,
          title: 'Me @ Now'
        });
      }

        function geoFindMe() {
          var output = document.getElementById("map");

          if (!navigator.geolocation){
            output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
            return;
          }

          function success(position) {
            var latitude  = position.coords.latitude;
            var longitude = position.coords.longitude;

            //output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

            var img = new Image();
            img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size="+window.innerWidth+"x600&markers=color:blue%7Clabel:S%7C11211%7C11206%7C11222&key=AIzaSyCf6bDITip0oOGgF8H134MTqs8W5CVtSkg&sensor=false";
            output.appendChild(img);

          };

          function error() {
            output.innerHTML = "Unable to retrieve your location";
          };

          //output.innerHTML = "<p>Locating…</p>";

          navigator.geolocation.getCurrentPosition(success, error);
        }

           function initialize() {
              console.log("JS API running initialize()");

              var mapOptions = {
                draggable:drgflag,
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
                scrollwheel: false,
                zoom: 8,
                styles:styleArray
              };

               map = new google.maps.Map(document.getElementById('map'),
                  mapOptions);

              // Try HTML5 geolocation
              if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                  var pos = new google.maps.LatLng(position.coords.latitude,
                                                   position.coords.longitude);

                  map.setCenter(pos);
                  console.log("Set Centre Position");

              var contentStringHpr = '<div id="content">'+
                '<h2 id="firstHeading" class="firstHeading">HPR</h2>'+
                '<div id="bodyContent">'+
                '<p>Descr</p>'+
                '<p><a href="#">Plus d\'informations</a></p>'+
                '</div>'+
                '</div>';
              var infowindow = new google.maps.InfoWindow({
                  content: contentStringHpr
              });

                  var marker = new google.maps.Marker({
                    map: map,
                    position: pos,
                    title: 'Me @ Now'
                  });
                  console.log("Set Marker");

                  google.maps.event.addListener(map, 'click', function() {
                     map.panTo(marker.getPosition());
                     infowindow.setContent("Hey Ho");
                     infowindow.open(map,marker);
                  });


                }, function() {
                  handleNoGeolocation(true);
                });
              } else {
                // Browser doesn't support Geolocation
                handleNoGeolocation(false);
                console.log("No Geolocation");
              }
            }

            function handleNoGeolocation(errorFlag) {
            if (errorFlag) {
              var content = 'Error: The Geolocation service failed.';
            } else {
              var content = 'Error: Your browser doesn\'t support geolocation.';
            }

            var options = {
              map: map,
              position: new google.maps.LatLng(51.6290494864026,-0.749108865905153),
              content: content
            };

            var infowindow = new google.maps.InfoWindow(options);
            map.setCenter(options.position);
            }

            function placeMarkerAndPanTo(latLng, map) {
              var marker = new google.maps.Marker({
                position: latLng,
                map: map
              });
              map.panTo(latLng);
            }

            function hjinitMap() {

              // Specify features and elements to define styles.
              var styleArray = [
                {
                  featureType: "all",
                  stylers: [
                   { saturation: -80 }
                  ]
                },{
                  featureType: "road.arterial",
                  elementType: "geometry",
                  stylers: [
                    { hue: "#00ffee" },
                    { saturation: 50 }
                  ]
                },{
                  featureType: "poi.business",
                  elementType: "labels",
                  stylers: [
                    { visibility: "off" }
                  ]
                }
              ];

              // Create a map object and specify the DOM element for display.
              var map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: -34.397, lng: 150.644},
                scrollwheel: false,
                // Apply the map style array to the map.
                styles: styleArray,
                zoom: 8
              });
            }

            var map;
            var drgflag=false;
            var mposition;

            var options = {
              enableHighAccuracy: true,
              timeout: 5000,
              maximumAge: 0
            };

            function success(pos) {
              var crd = pos.coords;

              console.log('Your current position is:');
              console.log('Latitude : ' + crd.latitude);
              console.log('Longitude: ' + crd.longitude);
              console.log('More or less ' + crd.accuracy + ' meters.');
              return("Goose Green");
            };

            function error(err) {
              console.warn('ERROR(' + err.code + '): ' + err.message);
            };

            navigator.geolocation.getCurrentPosition(success(mposition), error, options)
            console.log(mposition);

            function initMap() {
                map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 51.6290494864026, lng: -0.749108865905153},
                draggable:drgflag,
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
                scrollwheel: false,
                zoom: 11
              });
            }
/*
 * Runek
 * http://www.scoopthemes.com/
 *
 * Copyright (c) 2014, ScoopThemes
 * Licensed under the BSD license.
 */
'use strict';

        var appMaster = {

            maps: function(){
                // When the window has finished loading create our google map below
                console.log("AppMaster Maps");
                google.maps.event.addDomListener(window, 'load', init);
                google.maps.event.addDomListener(window, 'resize', init);

                function init() {
                    // Basic options for a simple Google Map
                    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
                    var mapOptions = {
                        zoom: 15,
                        draggable: false,
                        zoomControl: true, 
                        scrollwheel:false,
                        streetViewControl:false,

                        // The latitude and longitude to center the map (always required)
                        center: new google.maps.LatLng(51.629147, -0.749312), // Rossett Road, Crosby

                        // How you would like to style the map. 
                        // This is where you would paste any style found on Snazzy Maps.
                        styles: [
                            {
                                "featureType": "landscape",
                                "stylers": [
                                    {
                                        "saturation": -100
                                    },
                                    {
                                        "lightness": 65
                                    },
                                    {
                                        "visibility": "on"
                                    }
                                ]
                            },
                            {
                                "featureType": "poi",
                                "stylers": [
                                    {
                                        "saturation": -100
                                    },
                                    {
                                        "lightness": 51
                                    },
                                    {
                                        "visibility": "simplified"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.highway",
                                "stylers": [
                                    {
                                        "saturation": -100
                                    },
                                    {
                                        "visibility": "simplified"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.arterial",
                                "stylers": [
                                    {
                                        "saturation": -100
                                    },
                                    {
                                        "lightness": 30
                                    },
                                    {
                                        "visibility": "on"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.local",
                                "stylers": [
                                    {
                                        "saturation": -100
                                    },
                                    {
                                        "lightness": 40
                                    },
                                    {
                                        "visibility": "on"
                                    }
                                ]
                            },
                            {
                                "featureType": "transit",
                                "stylers": [
                                    {
                                        "saturation": -100
                                    },
                                    {
                                        "visibility": "simplified"
                                    }
                                ]
                            },
                            {
                                "featureType": "administrative.province",
                                "stylers": [
                                    {
                                        "visibility": "off"
                                    }
                                ]
                            },
                            {
                                "featureType": "water",
                                "elementType": "labels",
                                "stylers": [
                                    {
                                        "visibility": "on"
                                    },
                                    {
                                        "lightness": -25
                                    },
                                    {
                                        "saturation": -100
                                    }
                                ]
                            },
                            {
                                "featureType": "water",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "hue": "#ffff00"
                                    },
                                    {
                                        "lightness": -25
                                    },
                                    {
                                        "saturation": -97
                                    }
                                ]
                            }
                        ]
                    };

                    // Get the HTML DOM element that will contain your map 
                    // We are using a div with id="map" seen below in the <body>
                    var mapElement = document.getElementById('map');

                    // Create the Google Map using out element and options defined above
                    var map = new google.maps.Map(mapElement, mapOptions);
                    var myLatlng = new google.maps.LatLng(51.629147, -0.749312);
                    var image = {
                        url: './img/neales_pin.png',
                        // This marker is 20 pixels wide by 32 pixels tall.
                        size: new google.maps.Size(27, 42),
                        // The origin for this image is 0,0.
                        origin: new google.maps.Point(0, 0),
                        // The anchor for this image is the base of the flagpole at 0,32.
                        anchor: new google.maps.Point(0, 32)
                    };

                    var marker = new google.maps.Marker({
                        position: myLatlng,
                        icon: image,
                        map: map,
                        title: 'Hello World!'
                    });

                }
            }

        };
function modify_qty(val) {
    var qty = document.getElementById('qty').value;
    var new_qty = parseInt(qty,10) + val;
    
    if (new_qty < 0) {
        new_qty = 0; 
    }
    
    document.getElementById('qty').value = new_qty;
    return new_qty;
}

$(function () {
	$('.bdec').on('click', function (e) {
	    e.preventDefault();
	    console.log("Click BDEC");
	});
});
/*
 * Runek
 * http://www.scoopthemes.com/
 *
 * Copyright (c) 2014, ScoopThemes
 * Licensed under the BSD license.
 */
'use strict';

        var appMaster = {

            preLoader: function(){
                var imageSources = [];
                $('img').each(function() {
                    var sources = $(this).attr('src');
                    imageSources.push(sources);
                });
                if($(imageSources).load()){
                    $('.pre-loader').fadeOut('slow');
                }
            },

            navSpy: function(){
                /* affix the navbar after scroll below header */
                $('#nav.navbar-static-top').affix({
                    offset: {
                        top: $(window).height()
                    }
                });

                /* highlight the top nav as scrolling occurs */
                $('body').scrollspy({
                    target: '#nav'
                });
            },

            smoothScroll: function() {
                // Smooth Scrolling
                $('a[href*=#]:not([href=#carousel-example-generic], [href=#testimonials-carousel])').click(function() {
                    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {

                        var target = $(this.hash);
                        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                        if (target.length) {
                            $('html,body').animate({
                                scrollTop: target.offset().top
                            }, 1000);
                            return false;
                        }
                    }
                });
            },

            scrollToTop: function(){
                /* smooth scrolling for scroll to top */
                $('.scroll-top').click(function() {
                    $('body,html').animate({
                        scrollTop: 0
                    }, 1000);
                });
            },

            maps: function(){
                // When the window has finished loading create our google map below
                google.maps.event.addDomListener(window, 'load', init);
                google.maps.event.addDomListener(window, 'resize', init);

                function init() {
                    // Basic options for a simple Google Map
                    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
                    var mapOptions = {
                        zoom: 13,
                        draggable: false,
                        zoomControl: true, 
                        scrollwheel:false,
                        streetViewControl:false,

                        // The latitude and longitude to center the map (always required)
                        center: new google.maps.LatLng(51.829147, -0.749312), // Neales, Corporation St.

                        // How you would like to style the map. 
                        // This is where you would paste any style found on Snazzy Maps.
                        styles: [
                            {
                                "featureType": "landscape",
                                "stylers": [
                                    {
                                        "saturation": -100
                                    },
                                    {
                                        "lightness": 65
                                    },
                                    {
                                        "visibility": "on"
                                    }
                                ]
                            },
                            {
                                "featureType": "poi",
                                "stylers": [
                                    {
                                        "saturation": -100
                                    },
                                    {
                                        "lightness": 51
                                    },
                                    {
                                        "visibility": "simplified"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.highway",
                                "stylers": [
                                    {
                                        "saturation": -100
                                    },
                                    {
                                        "visibility": "simplified"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.arterial",
                                "stylers": [
                                    {
                                        "saturation": -100
                                    },
                                    {
                                        "lightness": 30
                                    },
                                    {
                                        "visibility": "on"
                                    }
                                ]
                            },
                            {
                                "featureType": "road.local",
                                "stylers": [
                                    {
                                        "saturation": -100
                                    },
                                    {
                                        "lightness": 40
                                    },
                                    {
                                        "visibility": "on"
                                    }
                                ]
                            },
                            {
                                "featureType": "transit",
                                "stylers": [
                                    {
                                        "saturation": -100
                                    },
                                    {
                                        "visibility": "simplified"
                                    }
                                ]
                            },
                            {
                                "featureType": "administrative.province",
                                "stylers": [
                                    {
                                        "visibility": "off"
                                    }
                                ]
                            },
                            {
                                "featureType": "water",
                                "elementType": "labels",
                                "stylers": [
                                    {
                                        "visibility": "on"
                                    },
                                    {
                                        "lightness": -25
                                    },
                                    {
                                        "saturation": -100
                                    }
                                ]
                            },
                            {
                                "featureType": "water",
                                "elementType": "geometry",
                                "stylers": [
                                    {
                                        "hue": "#ffff00"
                                    },
                                    {
                                        "lightness": -25
                                    },
                                    {
                                        "saturation": -97
                                    }
                                ]
                            }
                        ]
                    };

                    // Get the HTML DOM element that will contain your map 
                    // We are using a div with id="map" seen below in the <body>
                    var mapElement = document.getElementById('map');

                    // Create the Google Map using out element and options defined above
                    var map = new google.maps.Map(mapElement, mapOptions);
                    var myLatlng = new google.maps.LatLng(51.829147, -0.749312);
                    var image = {
                        url: './img/neales_pin.png',
                        // This marker is 20 pixels wide by 32 pixels tall.
                        size: new google.maps.Size(27, 42),
                        // The origin for this image is 0,0.
                        origin: new google.maps.Point(0, 0),
                        // The anchor for this image is the base of the flagpole at 0,32.
                        anchor: new google.maps.Point(0, 32)
                    };

                    var marker = new google.maps.Marker({
                        position: myLatlng,
                        icon: image,
                        labelClass: "pin pulse",
                        map: map,
                        title: 'Hello World!'
                    });

                }
            }

        };

/*        $(document).ready(function() {
            appMaster.scrollToTop();
        });*/