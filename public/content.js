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
    var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h3 id="firstHeading" class="firstHeading">Freedom Struggle</h1>'+
        '<div id="bodyContent">'+
        '<p><img src="/youth.png" width=100 align="left" style="margin-right:10px;" /><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
        'sandstone rock formation in the southern part of the '+
        'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
        'south west of the nearest large town, Alice Springs; 450&#160;km '+
        '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
        'features of the Uluru - Kata Tjuta National Park. Uluru is '+
        'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
        'Aboriginal people of the area. It has many springs, waterholes, '+
        'rock caves and ancient paintings. Uluru is listed as a World '+
        'Heritage Site.</p>'+
        '<p><a href="#" id="click-me" class="mdl-button mdl-js-button mdl-button--raised modal__trigger" data-modal="#modal">View this Event</a></p>'+
        '</div>'+
        '</div>';

    var moreContent = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h3 id="firstHeading" class="firstHeading">Freedom Struggle</h1>'+
        '<div id="bodyContent">'+
        '<p><img src="/youth.png" width=100 align="left" style="margin-right:10px;" /><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
        'sandstone rock formation in the southern part of the '+
        'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
        'south west of the nearest large town, Alice Springs; 450&#160;km '+
        '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
        'features of the Uluru - Kata Tjuta National Park. Uluru is '+
        'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
        'Aboriginal people of the area. It has many springs, waterholes, '+
        'rock caves and ancient paintings. Uluru is listed as a World '+
        'Heritage Site.</p>'+
        '<p><a href="#" id="click-me-too" class="mdl-button mdl-js-button mdl-button--raised modal__trigger" data-modal="#modal">View this Event</a></p>'+
        '</div>'+
        '</div>';
});

    var LocsB = [
        {
            lat: -26.243254,
            lon: 27.923966,
            title: 'Event 1',
            html: [
                'contentString'
            ].join(''),
            zoom: 8
        },
        {
            lat: -26.673235,
            lon: 27.8040497,
            title: 'Event 2',
            icon: '/green-pin.png',
            html: [
                'moreContent'
            ].join(''),
            zoom: 8
        },
        {
            lat: -26.19284,
            lon: 28.06601,
            icon: '/blue-pin.png',
            title: 'Event 3',
            html: [
                '<h3>Content<h3>',
                '<p>Lorem Ipsum</p>'
            ].join(''),
            zoom: 4
        },
        {
            lat: -26.2676604,
            lon: 27.8606672,
            icon: '/red-pin.png',
            title: 'Event 4',
            html: [
                '<h3>Content<h3>',
                '<p>Lorem Ipsum</p>'
            ].join(''),
            zoom: 6
        }
    ];

    var styles = {
        'MapBox': [{
            featureType: 'all',
            stylers: [
                { invert_lightness: 'false' }
            ]
        }],
        'Greyscale': [{
            featureType: 'all',
            stylers: [
                { saturation: -100 },
                { gamma: 0.50 }
            ]
        }]
    }

function myMap() {
  var map;
  var bounds = new google.maps.LatLngBounds();
  var mapCanvas = document.getElementById("gmap-list");
  var mapOptions = {
    center: new google.maps.LatLng(51.508742, -0.120850),
    zoom: 7,
    panControl: true,
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    scrollwheel: false,
    streetViewControl: true,
    overviewMapControl: true,
    rotateControl: true   
  };
  // var mapOptions = {
  //       mapTypeId: 'roadmap'
  //   };

  var map = new google.maps.Map(mapCanvas, mapOptions);
  // Multiple Markers
  var markers = [
      ['London Eye, London', 51.503454,-0.119562],
      ['Palace of Westminster, London', 51.499633,-0.124755]
  ];
                        
  // Info Window Content
  var infoWindowContent = [
      ['<div class="info_content">' +
      '<h3>London Eye</h3>' + '<p><a href="#" id="click-me" class="mdl-button mdl-js-button mdl-button--raised modal__trigger" data-modal="#modal">View this Event</a></p>' + 
      '<p>The London Eye is a giant Ferris wheel situated on the banks of the River Thames. The entire structure is 135 metres (443 ft) tall and the wheel has a diameter of 120 metres (394 ft).</p>' +        '</div>'],
      ['<div class="info_content"><p><a href="#" id="click-me-too" class="mdl-button mdl-js-button mdl-button--raised modal__trigger" data-modal="#modal">View this Event</a></p>' +
      '<h3>Palace of Westminster</h3>' +
      '<p>The Palace of Westminster is the meeting place of the House of Commons and the House of Lords, the two houses of the Parliament of the United Kingdom. Commonly known as the Houses of Parliament after its tenants.</p>' +
      '</div>']
  ];

  // Display multiple markers on a map
  var infoWindow = new google.maps.InfoWindow(), marker, i;

  // Loop through our array of markers & place each one on the map  
  for( i = 0; i < markers.length; i++ ) {
    var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
    bounds.extend(position);
    markers[i] = new google.maps.Marker({
        position: position,
        map: map,
        title: markers[i][0]
    });

    markers[i].index = i;
    // Allow each marker to have an info window on click
    google.maps.event.addListener(markers[i], 'click', (function(marker, i) {
      return function() {
        infoWindow.setContent(infoWindowContent[i][0]);
        infoWindow.open(map, markers[i]);
      }
    })(marker, i));
    // on scroll
    $(window).scroll( function() { 
      var scrolled_val = $(document).scrollTop().valueOf();
      // console.log(scrolled_val);
      if (scrolled_val < 1027) {
        infoWindow.setContent(infoWindowContent[0][0]);
        map.setCenter(markers[0].getPosition());
        infoWindow.open(map, markers[0]);
      } else {
        infoWindow.setContent(infoWindowContent[1][0]);
        map.setCenter(markers[1].getPosition());
        infoWindow.open(map, markers[1]);
      }
    });
    // allow anchor tags to produce streetView maps
    google.maps.event.addListener(infoWindow, 'domready', function(){
      $("#click-me").on("click", function(e) {
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

    google.maps.event.addListener(infoWindow, 'domready', function(){
      $("#click-me-too").on("click", function(e) {
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
    map.fitBounds(bounds);
  }
  // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
  var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
    this.setZoom(14);
    google.maps.event.removeListener(boundsListener);
  });
}
