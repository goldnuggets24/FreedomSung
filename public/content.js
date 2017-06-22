$( document ).ready(function() {
  mdc.autoInit();
  $('.main-carousel').flickity({
    cellAlign: 'left',
    contain: true,
    wrapAround: true
  }); 
  // tap to content on event popup
  $('.tap-target').tapTarget('open');
  $('.tap-target').tapTarget('close');
    // navigation drawer
  var drawerEl = document.querySelector('.mdc-persistent-drawer');
      var MDCPersistentDrawer = mdc.drawer.MDCPersistentDrawer;
      var drawer = new MDCPersistentDrawer(drawerEl);
      document.querySelector('.demo-menu').addEventListener('click', function() {
        drawer.open = !drawer.open;
      });
      drawerEl.addEventListener('MDCPersistentDrawer:open', function() {
        console.log('Received MDCPersistentDrawer:open');
      });
      drawerEl.addEventListener('MDCPersistentDrawer:close', function() {
        console.log('Received MDCPersistentDrawer:close');
      });
  });

function myMap() {
  var map;
  var bounds = new google.maps.LatLngBounds();
  var mapCanvas = document.getElementById("gmap-list");
  var mapOptions = {
    center: new google.maps.LatLng(-26.204407, 28.037939),
    styles: styles,
    panControl: true,
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    scrollwheel: false,
    streetViewControl: true,
    overviewMapControl: true,
    rotateControl: true,
    mapTypeId: 'roadmap'
  };
  window.googleMap = new google.maps.Map(mapCanvas, mapOptions);

  // Display multiple markers on a map
  // Loop through our array of markers & place each one on the map  
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
        infoWindow.setContent(markers[i].title);
        infoWindow.open(map, markers[i]);
      }
    })(marker, i));
    // on scroll
    // $(window).scroll( function() { 
    //   var scrolled_val = $(document).scrollTop().valueOf();
    //   // console.log(scrolled_val);
    //   if (scrolled_val < 1027) {
    //     infoWindow.setContent(infoWindowContent[0][0]);
    //     map.setCenter(markers[0].getPosition());
    //     infoWindow.open(map, markers[0]);
    //   } else {
    //     infoWindow.setContent(infoWindowContent[1][0]);
    //     map.setCenter(markers[1].getPosition());
    //     infoWindow.open(map, markers[1]);
    //   }
    // });
    // allow anchor tags to produce streetView maps
    google.maps.event.addListener(infoWindow, 'domready', function(){
      $("#click-me").on("click", function(e) {
        $('.mdl-mini-footer').fadeTo('slow', 1);
        var $carousel = $('.carousel').flickity().flickity('next').flickity( 'select', 2 );
        var modalMap = new google.maps.StreetViewPanorama(
          document.getElementById('modal-map'), {
          position: {lat: -26.243254, lng: 27.923966},
          pov: {
              heading: 34,
              pitch: 10
          },
          enableCloseButton: true
        });

        modalMap.addListener('pano_changed', function() {
            var panoCell = document.getElementById('pano-cell');
            panoCell.innerHTML = modalMap.getPano();
        });

        modalMap.addListener('links_changed', function() {
            var linksTable = document.getElementById('links_table');
            while (linksTable.hasChildNodes()) {
              linksTable.removeChild(linksTable.lastChild);
            }
            var links = modalMap.getLinks();
            for (var i in links) {
              var row = document.createElement('tr');
              linksTable.appendChild(row);
              var labelCell = document.createElement('td');
              labelCell.innerHTML = '<b>Link: ' + i + '</b>';
              var valueCell = document.createElement('td');
              valueCell.innerHTML = links[i].description;
              linksTable.appendChild(labelCell);
              linksTable.appendChild(valueCell);
            }
          });
        modalMap.addListener('position_changed', function() {
            var positionCell = document.getElementById('position-cell');
            positionCell.firstChild.nodeValue = modalMap.getPosition() + '';
        });

        modalMap.addListener('pov_changed', function() {
            var headingCell = document.getElementById('heading-cell');
            var pitchCell = document.getElementById('pitch-cell');
            headingCell.firstChild.nodeValue = modalMap.getPov().heading + '';
            pitchCell.firstChild.nodeValue = modalMap.getPov().pitch + '';
        });
      });
    });
    // Experimenting with street view instance
    google.maps.event.addListener(infoWindow, 'domready', function(){
      $("#click-me-too").on("click", function(e) {
        $('.mdl-mini-footer').fadeTo('slow', 1);
        var $carousel = $('.carousel').flickity().flickity('next').flickity( 'select', 2 );
        var AnotherModalMap = new google.maps.StreetViewPanorama(
          document.getElementById('modal-map-too'), {
          position: {lat: 51.499633, lng: -0.124755},
          pov: {
              heading: 34,
              pitch: 10
          },
          enableCloseButton: true
        });
      });
    });

    // Automatically center the map fitting all markers on the screen
    // map.fitBounds(bounds);
    googleMap.setZoom(14);
  }
  // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
  // var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
  //   this.setZoom(14);
  //   google.maps.event.removeListener(boundsListener);
  // });
}
