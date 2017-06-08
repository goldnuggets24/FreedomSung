$( document ).ready(function() {
    mdc.autoInit();
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

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    var LocsB = [
        {
            lat: -26.243254,
            lon: 27.923966,
            title: 'Event 1',
            html: [
                contentString
            ].join(''),
            zoom: 8
        },
        {
            lat: -26.673235,
            lon: 27.8040497,
            title: 'Event 2',
            icon: '/green-pin.png',
            html: [
                '<h3>Content<h3>',
                '<p>Lorem Ipsum</p>'
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

    maplace = new Maplace({
        map_div: '#gmap-list',
        styles: styles,
        scrollwheel: false,
        controls_type: 'list',
        controls_on_map: false,
        controls_title: 'Choose a location:',
        locations: LocsB,
        map_options: {
            scrollwheel: false
        },
        afterShow: function() {
          $("#click-me").on("click", function(e) {
            $('.mdl-button__ripple-container').click();
            var modalMap = new google.maps.StreetViewPanorama(
                document.getElementById('modal-map'), {
                position: {lat: -26.243254, lng: 27.923966},
                pov: {
                    heading: 34,
                    pitch: 10
                }
            });
          });
        }
    }).Load();
});
