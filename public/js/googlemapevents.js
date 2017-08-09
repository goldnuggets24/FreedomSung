function myMap() {
  // allow map to disable on click
  $('#close').on('click', function(){
    $('#alex-peoples-inspection-pano').hide();
  });

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
        var local = new google.maps.StreetViewPanorama(
          document.getElementById(markers[0].title.replace(/ +/g, '-').toLowerCase() + '-pano'), {
          position: {lat: markers[0].position.lat(), lng: markers[0].position.lng()}, 
          pov: {
              heading: 66,
              pitch: 10
          },
          disableDefaultUI: true,
          enableCloseButton: true
        });
        imageRetrieval('apconference030610');

      });
    });
    // Orlando East March
    google.maps.event.addListener(infoWindow, 'domready', function(marker, i){
      $("#" + markers[1].title.replace(/ +/g, '-').toLowerCase()).on("click", function(e) { // click-me ID should be different for every infoWindow / iterate through markers
        $('.mdl-mini-footer').fadeTo('slow', 1);
        var $carousel = $('.carousel').flickity().flickity('next').flickity( 'select', 2 );
        var orlando = new google.maps.StreetViewPanorama(
          document.getElementById(markers[1].title.replace(/ +/g, '-').toLowerCase() + '-pano'), {
          position: {lat: markers[1].position.lat(), lng: markers[1].position.lng()}, 
          pov: {
              heading: 34,
              pitch: 10
          },
          disableDefaultUI: true,
          enableCloseButton: true
        });
        imageRetrieval('orlandoeastmarch111309');
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
        imageRetrieval('proteasouthmarch111509');
      });
    });

    // Alex People's Inspection
    google.maps.event.addListener(infoWindow, 'domready', function(marker, i){
      $("#" + markers[3].title.replace("'","").replace(/ +/g, '-').toLowerCase()).on("click", function(e) { // click-me ID should be different for every infoWindow / iterate through markers
        $('.mdl-mini-footer').fadeTo('slow', 1);
        var $carousel = $('.carousel').flickity().flickity('next').flickity( 'select', 2 );
        $('#alex-peoples-inspection-pano').show();
        var alex = new google.maps.Map(
          document.getElementById('alex-peoples-inspection-pano'), {
          center: {lat: markers[3].position.lat(), lng: markers[3].position.lng()}, 
          zoom: 18,
          mapTypeId: 'satellite'
        });
        alex.setTilt(45);
        imageRetrieval('alexpeoplesinspection111909');
      });
    });
    // SCR March
    google.maps.event.addListener(infoWindow, 'domready', function(marker, i){
      $("#" + markers[4].title.replace(/ +/g, '-').toLowerCase()).on("click", function(e) { // click-me ID should be different for every infoWindow / iterate through markers
        $('.mdl-mini-footer').fadeTo('slow', 1);
        var $carousel = $('.carousel').flickity().flickity('next').flickity( 'select', 2 );
        var scr = new google.maps.Map(
          document.getElementById(markers[4].title.replace(/ +/g, '-').toLowerCase() + '-pano'), {
          center: {lat: markers[4].position.lat(), lng: markers[4].position.lng()}, 
          zoom: 18,
          mapTypeId: 'satellite'
        });
        scr.setTilt(45);
        imageRetrieval('scrmarch112409');
      });
    });
    // Vaal March
    google.maps.event.addListener(infoWindow, 'domready', function(marker, i){
      $("#" + markers[5].title.replace(/ +/g, '-').toLowerCase()).on("click", function(e) { // click-me ID should be different for every infoWindow / iterate through markers
        $('.mdl-mini-footer').fadeTo('slow', 1);
        var $carousel = $('.carousel').flickity().flickity('next').flickity( 'select', 2 );
        var vaal = new google.maps.Map(
          document.getElementById(markers[5].title.replace(/ +/g, '-').toLowerCase() + '-pano'), {
          center: {lat: markers[5].position.lat(), lng: markers[5].position.lng()}, 
          zoom: 18,
          mapTypeId: 'satellite'
        });
        vaal.setTilt(45);
        imageRetrieval('vaalmarch022210');
      });
    });
    // Heroes Day
    google.maps.event.addListener(infoWindow, 'domready', function(marker, i){
      $("#" + markers[6].title.replace(/ +/g, '-').toLowerCase()).on("click", function(e) { // click-me ID should be different for every infoWindow / iterate through markers
        $('.mdl-mini-footer').fadeTo('slow', 1);
        var $carousel = $('.carousel').flickity().flickity('next').flickity( 'select', 2 );
        var heroes = new google.maps.Map(
          document.getElementById(markers[6].title.replace(/ +/g, '-').toLowerCase() + '-pano'), {
          center: {lat: markers[6].position.lat(), lng: markers[6].position.lng()}, 
          zoom: 18,
          mapTypeId: 'satellite'
        });
        heroes.setTilt(45);
        imageRetrieval('heroesday112809');
      });
    });
    // Abahlali Solidarity March
    google.maps.event.addListener(infoWindow, 'domready', function(marker, i){
      $("#" + markers[7].title.replace(/ +/g, '-').toLowerCase()).on("click", function(e) { // click-me ID should be different for every infoWindow / iterate through markers
        $('.mdl-mini-footer').fadeTo('slow', 1);
        var $carousel = $('.carousel').flickity().flickity('next').flickity( 'select', 2 );
        var abahlali = new google.maps.Map(
          document.getElementById(markers[7].title.replace(/ +/g, '-').toLowerCase() + '-pano'), {
          center: {lat: markers[7].position.lat(), lng: markers[7].position.lng()}, 
          zoom: 18,
          mapTypeId: 'satellite'
        });
        abahlali.setTilt(45);
        imageRetrieval('courtcasesolidarity021710');
      });
    });
    // Nersa Hearings
    google.maps.event.addListener(infoWindow, 'domready', function(marker, i){
      $("#" + markers[8].title.replace(/ +/g, '-').toLowerCase()).on("click", function(e) { // click-me ID should be different for every infoWindow / iterate through markers
        $('.mdl-mini-footer').fadeTo('slow', 1);
        var $carousel = $('.carousel').flickity().flickity('next').flickity( 'select', 2 );
        var nersa = new google.maps.Map(
          document.getElementById(markers[8].title.replace(/ +/g, '-').toLowerCase() + '-pano'), {
          center: {lat: markers[8].position.lat(), lng: markers[8].position.lng()}, 
          zoom: 18,
          mapTypeId: 'satellite'
        });
        nersa.setTilt(45);
        imageRetrieval('nersahearings012110');
      });
    });
    // Dennis
    google.maps.event.addListener(infoWindow, 'domready', function(marker, i){
      $("#" + markers[9].title.replace(/ +/g, '-').toLowerCase()).on("click", function(e) { // click-me ID should be different for every infoWindow / iterate through markers
        $('.mdl-mini-footer').fadeTo('slow', 1);
        var $carousel = $('.carousel').flickity().flickity('next').flickity( 'select', 2 );
        var dennis = new google.maps.Map(
          document.getElementById(markers[9].title.replace(/ +/g, '-').toLowerCase() + '-pano'), {
          center: {lat: markers[9].position.lat(), lng: markers[9].position.lng()}, 
          zoom: 18,
          mapTypeId: 'satellite'
        });
        dennis.setTilt(45);
        imageRetrieval('dennisbrutusmemorial012310');
      });
    });
    // Itereleng
    google.maps.event.addListener(infoWindow, 'domready', function(marker, i){
      $("#" + markers[10].title.replace(/ +/g, '-').toLowerCase()).on("click", function(e) { // click-me ID should be different for every infoWindow / iterate through markers
        $('.mdl-mini-footer').fadeTo('slow', 1);
        var $carousel = $('.carousel').flickity().flickity('next').flickity( 'select', 2 );
        var itereleng = new google.maps.Map(
          document.getElementById(markers[10].title.replace(/ +/g, '-').toLowerCase() + '-pano'), {
          center: {lat: markers[10].position.lat(), lng: markers[10].position.lng()}, 
          zoom: 18,
          mapTypeId: 'satellite'
        });
        itereleng.setTilt(45);
        imageRetrieval('visittoitereleng012510');
      });
    });
    // Vaal 2
    google.maps.event.addListener(infoWindow, 'domready', function(marker, i){
      $("#" + markers[11].title.replace(/ +/g, '-').toLowerCase()).on("click", function(e) { // click-me ID should be different for every infoWindow / iterate through markers
        $('.mdl-mini-footer').fadeTo('slow', 1);
        var $carousel = $('.carousel').flickity().flickity('next').flickity( 'select', 2 );
        var vaaltwo = new google.maps.Map(
          document.getElementById(markers[11].title.replace(/ +/g, '-').toLowerCase() + '-pano'), {
          center: {lat: markers[11].position.lat(), lng: markers[11].position.lng()}, 
          zoom: 18,
          mapTypeId: 'satellite'
        });
        vaaltwo.setTilt(45);
        imageRetrieval('vaalmarchtoarcelormittal051110');
      });
    });
    // Sharpeville
    google.maps.event.addListener(infoWindow, 'domready', function(marker, i){
      $("#" + markers[12].title.replace(/ +/g, '-').toLowerCase()).on("click", function(e) { // click-me ID should be different for every infoWindow / iterate through markers
        $('.mdl-mini-footer').fadeTo('slow', 1);
        var $carousel = $('.carousel').flickity().flickity('next').flickity( 'select', 2 );
        var sharpeville = new google.maps.Map(
          document.getElementById(markers[12].title.replace(/ +/g, '-').toLowerCase() + '-pano'), {
          center: {lat: markers[12].position.lat(), lng: markers[12].position.lng()}, 
          zoom: 18,
          mapTypeId: 'satellite'
        });
        sharpeville.setTilt(45);
        imageRetrieval('sharpevillememorial032110');
      });
    });
    // POWA Book Launch
    google.maps.event.addListener(infoWindow, 'domready', function(marker, i){
      $("#" + markers[13].title.replace(/ +/g, '-').toLowerCase()).on("click", function(e) { // click-me ID should be different for every infoWindow / iterate through markers
        $('.mdl-mini-footer').fadeTo('slow', 1);
        var $carousel = $('.carousel').flickity().flickity('next').flickity( 'select', 2 );
        var powa = new google.maps.Map(
          document.getElementById(markers[13].title.replace(/ +/g, '-').toLowerCase() + '-pano'), {
          center: {lat: markers[13].position.lat(), lng: markers[13].position.lng()}, 
          zoom: 18,
          mapTypeId: 'satellite'
        });
        powa.setTilt(45);
        imageRetrieval('sharpevillememorial032110');
      });
    });

    googleMap.setZoom(15);
  }
}
