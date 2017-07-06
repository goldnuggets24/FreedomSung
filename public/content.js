// $( document ).ready(function() {
//   mdc.autoInit();
//   $('.main-carousel').flickity({
//     cellAlign: 'left',
//     contain: true,
//     wrapAround: true
//   }); 
//   // tap to content on event popup
//   $('.tap-target').tapTarget('open');
//   $('.tap-target').tapTarget('close');
//     // navigation drawer
//   var drawerEl = document.querySelector('.mdc-persistent-drawer');
//       var MDCPersistentDrawer = mdc.drawer.MDCPersistentDrawer;
//       var drawer = new MDCPersistentDrawer(drawerEl);
//       document.querySelector('.demo-menu').addEventListener('click', function() {
//         drawer.open = !drawer.open;
//       });
//       drawerEl.addEventListener('MDCPersistentDrawer:open', function() {
//         console.log('Received MDCPersistentDrawer:open');
//       });
//       drawerEl.addEventListener('MDCPersistentDrawer:close', function() {
//         console.log('Received MDCPersistentDrawer:close');
//       });
//   });

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
    mapTypeId: 'roadmap'
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
    // allow anchor tags to produce streetView maps
    google.maps.event.addListener(infoWindow, 'domready', function(marker, i){
      $("#" + markers[0].title.replace(/ +/g, '-').toLowerCase()).on("click", function(e) { // click-me ID should be different for every infoWindow / iterate through markers
        // $('.mdl-mini-footer').fadeTo('slow', 1);
        // var $carousel = $('.carousel').flickity().flickity('next').flickity( 'select', 2 );
        var modalMap = new google.maps.StreetViewPanorama(
          document.getElementById(markers[0].title.replace(/ +/g, '-').toLowerCase() + '-pano'), {
          position: {lat: markers[0].position.lat(), lng: markers[0].position.lng()}, 
          pov: {
              heading: 34,
              pitch: 10
          },
          disableDefaultUI: true,
          enableCloseButton: true
        });
        // USE below later for adding events and images to pano view of maps
        // modalMap.addListener('pano_changed', function() {
        //     var panoCell = document.getElementById('pano-cell');
        //     panoCell.innerHTML = modalMap.getPano();
        // });

        // modalMap.addListener('links_changed', function() {
        //     var linksTable = document.getElementById('links_table');
        //     while (linksTable.hasChildNodes()) {
        //       linksTable.removeChild(linksTable.lastChild);
        //     }
        //     var links = modalMap.getLinks();
        //     for (var i in links) {
        //       var row = document.createElement('tr');
        //       linksTable.appendChild(row);
        //       var labelCell = document.createElement('td');
        //       labelCell.innerHTML = '<b>Link: ' + i + '</b>';
        //       var valueCell = document.createElement('td');
        //       valueCell.innerHTML = links[i].description;
        //       linksTable.appendChild(labelCell);
        //       linksTable.appendChild(valueCell);
        //     }
        //   });
        // modalMap.addListener('position_changed', function() {
        //     var positionCell = document.getElementById('position-cell');
        //     positionCell.firstChild.nodeValue = modalMap.getPosition() + '';
        // });

        // modalMap.addListener('pov_changed', function() {
        //     var headingCell = document.getElementById('heading-cell');
        //     var pitchCell = document.getElementById('pitch-cell');
        //     headingCell.firstChild.nodeValue = modalMap.getPov().heading + '';
        //     pitchCell.firstChild.nodeValue = modalMap.getPov().pitch + '';
        // });
      });
    });

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
    google.maps.event.addListener(infoWindow, 'domready', function(marker, i){
      $("#" + markers[2].title.replace(/ +/g, '-').toLowerCase()).on("click", function(e) { // click-me ID should be different for every infoWindow / iterate through markers
        // $('.mdl-mini-footer').fadeTo('slow', 1);
        // var $carousel = $('.carousel').flickity().flickity('next').flickity( 'select', 2 );
        var protea = new google.maps.Map(
          document.getElementById(markers[2].title.replace(/ +/g, '-').toLowerCase() + '-pano'), {
          center: {lat: markers[2].position.lat(), lng: markers[2].position.lng()}, 
          zoom: 18,
          mapTypeId: 'satellite'
        });
        protea.setTilt(45);

      });
    });

    // Automatically center the map fitting all markers on the screen
    // map.fitBounds(bounds);
    googleMap.setZoom(15);
  }
  // Override map zoom level once our fitBounds function runs (Make sure it only runs once)
  // var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
  //   this.setZoom(14);
  //   google.maps.event.removeListener(boundsListener);
  // });
}
