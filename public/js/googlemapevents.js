function myMap() {
  // allow map to disable on click

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
        enableCloseButton: false
      });
      $('#close, .carousel').fadeIn(1200);
      imageRetrieval('apconference030610');
      
      $('#close').one('click', function(){
        backToMap(0, 88);
      });

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
        enableCloseButton: false
      });
      $('#close, .carousel').fadeIn(1200);
      imageRetrieval('orlandoeastmarch111309');
      $('#close').one('click', function(){
        backToMap(1, 250);
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
      $('#close, .carousel').fadeIn(1200);
      imageRetrieval('proteasouthmarch111509');
      $('#close').one('click', function(){
        backToMap(2, 260);
      });
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
      $('#close, .carousel').fadeIn(1200);
      imageRetrieval('alexpeoplesinspection111909');
      $('#close').one('click', function(){
        backToMap(3, 275);
      });
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
      $('#close, .carousel').fadeIn(1200);
      imageRetrieval('scrmarch112409');
      $('#close').one('click', function(){
        backToMap(4, 296);
      });
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
      $('#close, .carousel').fadeIn(1200);
      imageRetrieval('vaalmarch112709');
      $('#close').one('click', function(){
        backToMap(5, 307);
      });
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
      $('#close, .carousel').fadeIn(1200);
      imageRetrieval('heroesday112809');
      $('#close').one('click', function(){
        backToMap(6, 314);
      });
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
      $('#close, .carousel').fadeIn(1200);
      imageRetrieval('abahlalisolidaritymarch120509');
      $('#close').one('click', function(){
        backToMap(7, 341);
      });
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
      $('#close, .carousel').fadeIn(1200);
      imageRetrieval('nersahearings012110');
      $('#close').one('click', function(){
        backToMap(8, 533);
      });
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
      $('#close, .carousel').fadeIn(1200);
      imageRetrieval('dennisbrutusmemorial012310');
      $('#close').one('click', function(){
        backToMap(9, 543);
      });
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
      $('#close, .carousel').fadeIn(1200);
      imageRetrieval('visittoitereleng012510');
      $('#close').one('click', function(){
        backToMap(10, 551);
      });
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
      $('#close, .carousel').fadeIn(1200);
      imageRetrieval('vaalmarch022210');
      $('#close').one('click', function(){
        backToMap(11, 663);
      });
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
      $('#close, .carousel').fadeIn(1200);
      imageRetrieval('sharpevillememorial032110');
      $('#close').one('click', function(){
        backToMap(12, 769);
      });
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
      $('#close, .carousel').fadeIn(1200);
      imageRetrieval('sharpevillememorial032110');
      $('#close').one('click', function(){
        backToMap(13, 832);
      });
    });
  });
    // Vaal March to Arcelor Mittal
  google.maps.event.addListener(infoWindow, 'domready', function(marker, i){
    $("#" + markers[14].title.replace(/ +/g, '-').toLowerCase()).on("click", function(e) { // click-me ID should be different for every infoWindow / iterate through markers
      $('.mdl-mini-footer').fadeTo('slow', 1);
      var $carousel = $('.carousel').flickity().flickity('next').flickity( 'select', 2 );
      var powa = new google.maps.Map(
        document.getElementById(markers[14].title.replace(/ +/g, '-').toLowerCase() + '-pano'), {
        center: {lat: markers[14].position.lat(), lng: markers[14].position.lng()}, 
        zoom: 18,
        mapTypeId: 'satellite'
      });
      powa.setTilt(45);
      $('#close, .carousel').fadeIn(1200);
      imageRetrieval('vaalmarchtoarcelormittal051110');
      $('#close').one('click', function(){
        backToMap(14, 980);
      });
    });
  });
  // Visit to CDP
  google.maps.event.addListener(infoWindow, 'domready', function(marker, i){
    $("#" + markers[15].title.replace(/ +/g, '-').toLowerCase()).on("click", function(e) { // click-me ID should be different for every infoWindow / iterate through markers
      $('.mdl-mini-footer').fadeTo('slow', 1);
      var $carousel = $('.carousel').flickity().flickity('next').flickity( 'select', 2 );
      var cdp = new google.maps.Map(
        document.getElementById(markers[15].title.replace(/ +/g, '-').toLowerCase() + '-pano'), {
        center: {lat: markers[15].position.lat(), lng: markers[15].position.lng()}, 
        zoom: 18,
        mapTypeId: 'satellite'
      });
      cdp.setTilt(45);
      $('#close, .carousel').fadeIn(1200);
      imageRetrieval('vaalmarchtoarcelormittal051110');
      $('#close').one('click', function(){
        backToMap(15, 1072);
      });
    });
  });
  // World Cup March
  google.maps.event.addListener(infoWindow, 'domready', function(marker, i){
    $("#" + markers[16].title.replace(/ +/g, '-').toLowerCase()).on("click", function(e) { // click-me ID should be different for every infoWindow / iterate through markers
      $('.mdl-mini-footer').fadeTo('slow', 1);
      var $carousel = $('.carousel').flickity().flickity('next').flickity( 'select', 2 );
      var wcm = new google.maps.Map(
        document.getElementById(markers[16].title.replace(/ +/g, '-').toLowerCase() + '-pano'), {
        center: {lat: markers[16].position.lat(), lng: markers[16].position.lng()}, 
        zoom: 18,
        mapTypeId: 'satellite'
      });
      wcm.setTilt(45);
      $('#close, .carousel').fadeIn(1200);
      imageRetrieval('worldcupmarch061110');
      $('#close').one('click', function(){
        backToMap(16, 1112);
      });
    });
  });
  // Youth Day
  google.maps.event.addListener(infoWindow, 'domready', function(marker, i){
    $("#" + markers[17].title.replace(/ +/g, '-').toLowerCase()).on("click", function(e) { // click-me ID should be different for every infoWindow / iterate through markers
      $('.mdl-mini-footer').fadeTo('slow', 1);
      var $carousel = $('.carousel').flickity().flickity('next').flickity( 'select', 2 );
      var youth = new google.maps.Map(
        document.getElementById(markers[17].title.replace(/ +/g, '-').toLowerCase() + '-pano'), {
        center: {lat: markers[17].position.lat(), lng: markers[17].position.lng()}, 
        zoom: 18,
        mapTypeId: 'satellite'
      });
      youth.setTilt(45);
      $('#close, .carousel').fadeIn(1200);
      imageRetrieval('worldcupmarch061110');
      $('#close').one('click', function(){
        backToMap(17, 1124);
      });
    });
  });
  // Jozi
  google.maps.event.addListener(infoWindow, 'domready', function(marker, i){
    $("#" + markers[18].title.replace(/ +/g, '-').toLowerCase()).on("click", function(e) { // click-me ID should be different for every infoWindow / iterate through markers
      $('.mdl-mini-footer').fadeTo('slow', 1);
      var $carousel = $('.carousel').flickity().flickity('next').flickity( 'select', 2 );
      var jozi = new google.maps.Map(
        document.getElementById(markers[18].title.replace(/ +/g, '-').toLowerCase() + '-pano'), {
        center: {lat: markers[18].position.lat(), lng: markers[18].position.lng()}, 
        zoom: 18,
        mapTypeId: 'satellite'
      });
      jozi.setTilt(45);
      $('#close, .carousel').fadeIn(1200);
      imageRetrieval('joziregionalhousingmarch062510');
      $('#close').one('click', function(){
        backToMap(18, 1161);
      });
    });
  });
  // Schubart
  google.maps.event.addListener(infoWindow, 'domready', function(marker, i){
    $("#" + markers[19].title.replace(/ +/g, '-').toLowerCase()).on("click", function(e) { // click-me ID should be different for every infoWindow / iterate through markers
      $('.mdl-mini-footer').fadeTo('slow', 1);
      var $carousel = $('.carousel').flickity().flickity('next').flickity( 'select', 2 );
      var schubart = new google.maps.Map(
        document.getElementById(markers[19].title.replace(/ +/g, '-').toLowerCase() + '-pano'), {
        center: {lat: markers[19].position.lat(), lng: markers[19].position.lng()}, 
        zoom: 18,
        mapTypeId: 'satellite'
      });
      schubart.setTilt(45);
      $('#close, .carousel').fadeIn(1200);
      imageRetrieval('schubartparkanti-xenophobiaevent071110');
      $('#close').one('click', function(){
        backToMap(19, 1228);
      });
    });
  });
  // Quagga
  google.maps.event.addListener(infoWindow, 'domready', function(marker, i){
    $("#" + markers[20].title.replace(/ +/g, '-').toLowerCase()).on("click", function(e) { // click-me ID should be different for every infoWindow / iterate through markers
      $('.mdl-mini-footer').fadeTo('slow', 1);
      var $carousel = $('.carousel').flickity().flickity('next').flickity( 'select', 2 );
      var quagga = new google.maps.Map(
        document.getElementById(markers[20].title.replace(/ +/g, '-').toLowerCase() + '-pano'), {
        center: {lat: markers[20].position.lat(), lng: markers[20].position.lng()}, 
        zoom: 18,
        mapTypeId: 'satellite'
      });
      quagga.setTilt(45);
      $('#close, .carousel').fadeIn(1200);
      imageRetrieval('quaggaevictions080310');
      $('#close').one('click', function(){
        backToMap(20, 1317);
      });
    });
  });
  // Soweto
  google.maps.event.addListener(infoWindow, 'domready', function(marker, i){
    $("#" + markers[21].title.replace(/ +/g, '-').toLowerCase()).on("click", function(e) { // click-me ID should be different for every infoWindow / iterate through markers
      $('.mdl-mini-footer').fadeTo('slow', 1);
      var $carousel = $('.carousel').flickity().flickity('next').flickity( 'select', 2 );
      var soweto = new google.maps.Map(
        document.getElementById(markers[21].title.replace(/ +/g, '-').toLowerCase() + '-pano'), {
        center: {lat: markers[21].position.lat(), lng: markers[21].position.lng()}, 
        zoom: 18,
        mapTypeId: 'satellite'
      });
      soweto.setTilt(45);
      $('#close, .carousel').fadeIn(1200);
      imageRetrieval('sowetomarch091510');
      $('#close').one('click', function(){
        backToMap(21, 1489);
      });
    });
  });
  // Silent March
  google.maps.event.addListener(infoWindow, 'domready', function(marker, i){
    $("#" + markers[22].title.replace(/ +/g, '-').toLowerCase()).on("click", function(e) { // click-me ID should be different for every infoWindow / iterate through markers
      $('.mdl-mini-footer').fadeTo('slow', 1);
      var $carousel = $('.carousel').flickity().flickity('next').flickity( 'select', 2 );
      var silent = new google.maps.Map(
        document.getElementById(markers[22].title.replace(/ +/g, '-').toLowerCase() + '-pano'), {
        center: {lat: markers[22].position.lat(), lng: markers[22].position.lng()}, 
        zoom: 18,
        mapTypeId: 'satellite'
      });
      silent.setTilt(45);
      $('#close, .carousel').fadeIn(1200);
      imageRetrieval('silentmarchfxi101910');
      $('#close').one('click', function(){
        backToMap(22, 1639);
      });
    });
  });

  googleMap.setZoom(15);
  }
  // SCRR  and SECC left off for now, pending media
}
