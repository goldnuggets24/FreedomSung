$( document ).ready(function() {
    mdc.autoInit();
    $('.tap-target').tapTarget('open');
    $('.tap-target').tapTarget('close');
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
            lat: 52.1,
            lon: 11.3,
            title: 'Title A2',
            html: [
                contentString
            ].join(''),
            zoom: 8
        },
        {
            lat: 51.2,
            lon: 22.2,
            title: 'Title B2',
            html: [
                '&lt;h3&gt;Content B2&lt;/h3&gt;',
                '&lt;p&gt;Lorem Ipsum..&lt;/p&gt;'
            ].join(''),
            zoom: 8
        },
        {
            lat: 49.4,
            lon: 35.9,
            icon: 'https://www.iconfinder.com/data/icons/metro-uinvert-dock/256/Google_Maps.png',
            title: 'Title C2',
            html: [
                '&lt;h3&gt;Content C2&lt;/h3&gt;',
                '&lt;p&gt;Lorem Ipsum..&lt;/p&gt;'
            ].join(''),
            zoom: 4
        },
        {
            lat: 47.8,
            lon: 15.6,
            icon: 'https://www.iconfinder.com/data/icons/metro-uinvert-dock/256/Google_Maps.png',
            title: 'Title D2',
            html: [
                '&lt;h3&gt;Content D2&lt;/h3&gt;',
                '&lt;p&gt;Lorem Ipsum..&lt;/p&gt;'
            ].join(''),
            zoom: 6
        }
    ];

    var markers = [
      { lat: -26.243254, lng: 27.923966, name: "1" },
      { lat: -26.673235, lng: 27.8040497, name: "2" },
      { lat: -26.19284, lng: 28.06601, name: "3" },
      { lat: -26.2676604, lng: 27.8606672, name: "4" }
    ];

    map = new Maplace({
        map_div: '#gmap-list',
        controls_type: 'list',
        controls_on_map: false,
        controls_title: 'Choose a location:',
        locations: LocsB,
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