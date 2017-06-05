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
    '<p><a href="#" id="click-me">Street View</a></p>'+
    '</div>'+
    '</div>';

var infowindow = new google.maps.InfoWindow({
  content: contentString
});

google.maps.event.addListener(infowindow, 'domready', function() {
    document.getElementById("click-me").addEventListener("click", function(e) {
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
        title: 'Title D2',
        html: [
            '&lt;h3&gt;Content D2&lt;/h3&gt;',
            '&lt;p&gt;Lorem Ipsum..&lt;/p&gt;'
        ].join(''),
        zoom: 6
    }
];