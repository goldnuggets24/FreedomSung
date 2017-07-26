function myMap() {
  var map;
  window.bounds = new google.maps.LatLngBounds();
  var mapCanvas = document.getElementById("gmap-list");
  var mapOptions = {
    center: new google.maps.LatLng(-26.1047789,28.002457199999993, 13),
    panControl: true,
    zoomControl: false,
    disableAutoPan: false,
    mapTypeControl: false,
    scaleControl: false,
    scrollwheel: false,
    streetViewControl: true,
    overviewMapControl: true,
    rotateControl: true,
    mapTypeId: 'roadmap',
    styles: styles
  };
  window.googleMap = new google.maps.Map(mapCanvas, mapOptions);

  // Loop through our array of markers & place each one on Google map  
  for( i = 0; i < markers.length; i++ ) {
    var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
    bounds.extend(position);
    markers[i] = new google.maps.Marker({
        position: position,
        map: googleMap,
        title: markers[i][0]
    });

    markers[i].index = i;

    var infoWindow = new google.maps.InfoWindow(), marker, i;
    // Allow each marker to have an info window on click
    google.maps.event.addListener(markers[i], 'click', (function(marker, i) {
      return function() {
        infoWindow.setContent(infoWindowContent[i][0]);
        infoWindow.open(map, markers[i]);
      }
    })(marker, i));
    // Local Government Elections Workshop
    google.maps.event.addListener(infoWindow, 'domready', function(marker, i){
      $("#" + markers[0].title.replace(/ +/g, '-').toLowerCase()).on("click", function(e) { // click-me ID should be different for every infoWindow / iterate through markers
        $('.mdl-mini-footer').fadeTo('slow', 1);
        $('#h1').slideUp( 300 ).delay( 1000 ).fadeIn(900);
        var $carousel = $('.carousel').flickity().flickity('next').flickity( 'select', 2 );
        var modalMap = new google.maps.StreetViewPanorama(
          document.getElementById(markers[0].title.replace(/ +/g, '-').toLowerCase() + '-pano'), {
          position: {lat: markers[0].position.lat(), lng: markers[0].position.lng()}, 
          pov: {
              heading: 66,
              pitch: 10
          },
          disableDefaultUI: true,
          enableCloseButton: true
        });
      });
    });
    // Orlando East March
    google.maps.event.addListener(infoWindow, 'domready', function(marker, i){
      $("#" + markers[1].title.replace(/ +/g, '-').toLowerCase()).on("click", function(e) { // click-me ID should be different for every infoWindow / iterate through markers
        // $('.mdl-mini-footer').fadeTo('slow', 1);
        // var $carousel = $('.carousel').flickity().flickity('next').flickity( 'select', 2 );
        var modalMap = new google.maps.StreetViewPanorama(
          document.getElementById(markers[1].title.replace(/ +/g, '-').toLowerCase() + '-pano'), {
          position: {lat: markers[1].position.lat(), lng: markers[1].position.lng()}, 
          pov: {
              heading: 34,
              pitch: 10
          },
          disableDefaultUI: true,
          enableCloseButton: true
        });
      });
    });
    // Protea South March
    google.maps.event.addListener(infoWindow, 'domready', function(marker, i){
      $("#" + markers[2].title.replace(/ +/g, '-').toLowerCase()).on("click", function(e) { // click-me ID should be different for every infoWindow / iterate through markers
        $('.mdl-mini-footer').fadeTo('slow', 1);
        var $carousel = $('.carousel').flickity().flickity('next').flickity( 'select', 2 );
        var protea = new google.maps.Map(
          document.getElementById(markers[2].title.replace(/ +/g, '-').toLowerCase() + '-pano'), {
          center: {lat: markers[2].position.lat(), lng: markers[2].position.lng()}, 
          zoom: 18,
          mapTypeId: 'satellite'
        });
        protea.setTilt(45);
      });
    });

    // Alex People's Inspection
    google.maps.event.addListener(infoWindow, 'domready', function(marker, i){
      $("#" + markers[3].title.replace(/ +/g, '-').toLowerCase()).on("click", function(e) { // click-me ID should be different for every infoWindow / iterate through markers
        $('.mdl-mini-footer').fadeTo('slow', 1);
        var $carousel = $('.carousel').flickity().flickity('next').flickity( 'select', 2 );
        var protea = new google.maps.Map(
          document.getElementById(markers[3].title.replace(/ +/g, '-').toLowerCase() + '-pano'), {
          center: {lat: markers[3].position.lat(), lng: markers[3].position.lng()}, 
          zoom: 18,
          mapTypeId: 'satellite'
        });
        protea.setTilt(45);
      });
    });

    googleMap.setZoom(15);
  }
}
