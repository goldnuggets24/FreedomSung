var margin = { top: 30, right: 5, left: 5, bottom: 30 };

var width = 50,
  width = width - margin.left - margin.right,
  height = $(window).height() * 0.6,
  hegiht = height - margin.top - margin.bottom;

var width2 = 200,
  height2 = 260;
// Timeline rendering
var y = d3.time.scale().range([2, height]);

var smallScale = 80; //128
var largeScale = 1800; //1269

var scrollScale = d3.scale
  .linear()
  .domain([smallScale, largeScale])
  .range([0, height]);

var tooltip = d3
  .select("body")
  .append("div")
  .attr("id", "tooltip");
  tooltip.style("visibility", "hidden");
var date = d3
  .select("body")
  .append("div")
  .attr("id", "date");

var svg_black = d3
  .select("#black")
  .append("svg")
  .attr("width", 200)
  .attr("height", screen.height)
  .append("g")
  .attr("transform", "translate(" + 0 + "," + 0 + ")");

var svg = d3
  .select("#timeline")
  .append("svg")
  .attr('class','new_svg')
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var events;
var axis;
var current;
var current2;
var eventname = "test";
var mouseY;
var scrolbybot;
// For the map
var proj = d3.geo
  .mercator()
  .center([28.05097, -26.20192]) // center [lon, lat]
  .scale(11000) // 6500 //14000
  .translate([width2 / 2, height2 / 2]);

var path = d3.geo.path().projection(proj);

var svg_city = d3
  .select("#citymap")
  .append("svg")
  .attr("width", width2 + margin.left + margin.right)
  .attr("height", height2 + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var pos_y2 = $(window).height() * 0.15 + 85;
$("#citymap").css("top", pos_y2 + "px");

var pos_y1 = $(window).height() * 0.15 + 410;
$("#current_date").css("top", pos_y1 + "px");

var g = svg_city
  .append("g")
  .attr("class", "boundary")
  .append("path")
  .attr("d", path);

var bg_city = svg_city
  .append("rect")
  .attr("x", -margin.left)
  .attr("y", -margin.top)
  .attr("width", width2 + margin.left + margin.right)
  .attr("height", height2 + margin.top + margin.bottom)
  .style("visibility", "hidden")
  .attr("stroke", "rgba(255,255,255,1)")
  .attr("stroke-width", 0)
  .attr("rx", 6)
  .style("fill", "rgba(255,255,255,0.0)");

var bg_timeline = svg
  .append("rect")
  .attr("x", 5)
  .attr("y", -30)
  .attr("width", width - 10)
  .attr("height", height + 60)
  .style("fill", "#000")
  .attr("rx", 6)
  .style("visibility", "hidden")
  .style("opacity", 0.45);

var stateLine = svg
  .append("line")
  .attr("x1", width / 2)
  .attr("y1", 0)
  .attr("x2", width / 2)
  .attr("y2", 0)
  // .style("stroke", "#FFEB3B")
  .style("stroke", "#fff")
  .style("opacity", 0.4)
  .style("stroke-width", 1.2)
  .style("visibility", "hidden");

var dot = svg
  .append("circle")
  .attr("cx", width / 2)
  .attr("cy", 0)
  .attr("r", 5.2)
  .attr("stroke", "#FFEB3B")
  .attr("stroke-width", 1.3)
  .style("fill-opacity", 0)
  .style("visibility", "hidden");

function makeTimeline(data, city) {
  // console.log('make time line',data)
  svg_city
    .append("g")
    .attr("class", "boundary")
    .selectAll("path")
    .data(city.features) // geojson
    .enter()
    .append("path")
    .attr("d", path);

  current = svg_city
    .append("circle")
    .style("fill", "#FFEB3B")
    .attr("class", "circle")
    .style("opacity", 1)
    .attr("r", 3.5)
    .attr("transform", function(d) {
      return (
        "translate(" +
        proj([28.05097, -26.20192]) + // lon, lat
        ")"
      );
    });



  current2 = svg_city
    .append("circle")
    .attr("class", "circle")
    .style("fill", "#FFEB3B")
    .attr("stroke", "#FFEB3B")
    .style("stroke-width", 1.5)
    .style("fill-opacity", 0.0)
    .attr("r", 15)
    .attr("transform", function(d) {
      return (
        "translate(" +
        proj([28.05097, -26.20192]) + // lon, lat
        ")"
      );
    });

  // Search functionality
  data.forEach(function(d, i) {
    d.date = d.start;
    d.start = parseDate(d.start);
    $("#timeline").append("<div class='" + i + "'>" + i + "</div>");

    $("." + i).on("click", function() {
      dood = parseInt($(this).attr('class'));
      // document.body.scrollTop= y(d.start) ;
      events.each(function(e, i) {
        if (i === dood) {
          var wickedLocation =  new google.maps.LatLng(e.start_lat, e.start_lon);
          googleMap.setCenter(wickedLocation);
          googleMap.setZoom(13);
          // openImg(e);
          console.log(e.event);
          var infoWindow = new google.maps.InfoWindow({ content: e.event });
          // console.log(markers[i].index); // get index of current timeline node
          google.maps.event.trigger(markers[i], "click");
          googleMap.panTo(wickedLocation);
          console.log(e.event);
      }
      });
    });
  });



  y.domain(
    d3.extent(data, function(d) {
      return d.start;
    })
  );

  events = svg
    .selectAll(".dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
      return width / 2;
    })
    .attr("cy", function(d) {
       return y(d.start);
    })
    .attr("r", 1.5)
    .style("fill", "#FFEB3B")
    .style("opacity", 0.9)
    .style("stroke", "rgba(0,0,0,0)")
    .style("stroke-width", 0)
    .style("visibility", "hidden")
    .on("mouseover", function(e) {
       var windowHeight=parseInt($(window).height());
       var top=parseInt($('.new_svg').attr('height'));
       var result=windowHeight-top;
       result=result/2;
       var hig = parseInt($(this).attr('cy')) + result + 'px' ;
       tooltip.style('top', hig);
       tooltip.text("Event: " + e.event + ", Date : " + e.date);
       return tooltip.style("visibility", "visible");
    })

    .on("mouseout", function(e) {
      $('.hover-details').hide();
      return tooltip.style("visibility", "hidden");
    })
    .on("click", function(d, i,e) {
         
     // if (event.clientY < smallScale) {
      //   event.clientY = smallScale;
      // }
      // if (event.clientY > largeScale) {
      //   event.clientY = largeScale;
      // }


      var move =parseInt($('line').attr('y1'));

       //scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

       // var a = scrollScale(event.pageX);
        //console.log('circle onclick',a);

        // window.pageYOffset =event.clientY//
        document.body.scrollTop= y(d.start) ;
        mouseY =  y(d.start);
        console.log("scrol onclic",scrolbybot);
        dot.attr("cy", mouseY);
        dot.style("visibility", "visible");
        events.style("visibility", "visible");

      
        events.each(function(e, i) {
         var distance = Math.abs(d3.select(this).attr("cy") - mouseY);
        if (distance < 1.2) {
         var t = mouseY + 102;
      // tooltip.style("visibility", "visible");

        var wickedLocation =  new google.maps.LatLng(e.start_lat, e.start_lon);
         // googleMap.setCenter(wickedLocation);
        googleMap.setZoom(13);
        openImg(e);
        console.log(e.event);
        var infoWindow = new google.maps.InfoWindow({ content: e.event });
        // console.log(markers[i].index); // get index of current timeline node
        google.maps.event.trigger(markers[i], "click");
        googleMap.panTo(wickedLocation);

           date.style("visibility", "visible");
          // date.text(e.date);
         date.style("top", t + "px").style("right", 90 + "px");

            $("#current_date").html(
             '<span style="color:yellow">Date : <span><span style="color:white">' +
                e.date +
                "</span>"
             );

      var ty = d3.select(this).attr("cy");
      stateLine
        .transition()
        .duration(520)
        .attr("y1", ty);
        //  var heightofScroll=$(window).scrollTop();
        //      ty=parseFloat(ty);
        //      move=parseFloat(move);
        //      if(ty<move){
        //     var decrement=move-ty;
        //     var decpercentage=decrement/move*100;
        //     alert(decpercentage);
        //     var total_move=heightofScroll*decpercentage/100;
        //     heightofScroll=heightofScroll-total_move;
        //     if(heightofScroll>=1696){
        //       heightofScroll=1696;
        //     }
        //     window.scrollTo(0, heightofScroll);
        //     }else{

        //     var increment=ty-move;
        //     var incrementPercentage=increment/move*100;
        //     var total_move=heightofScroll*incrementPercentage/100;
        //     heightofScroll=heightofScroll+total_move;
        //      if(heightofScroll>=1696){
        //       heightofScroll=1696;
        //     }
        //     window.scrollTo(0, heightofScroll);
        // }
      if (e.event != eventname) {
        console.log('event',e);
     
        // updates map location on johanessburg.geojson
        var current_position = proj([e.start_lon, e.start_lat]); // lon, lat
        console.log("current_post",current_position);
        current.attr("transform", "translate(" + current_position + ")");
        current2.attr("transform", "translate(" + current_position + ")");


      }
    } else {
      d3.select(this).attr("x1", width / 2 - 7);
      d3.select(this).style("stroke-width", 1.2);
      // tooltip.style("visibility", "visible");
    }
    });
     
    });

  var temp = width / 2 + 10;
}

function hideTimeline() {
  dot.style("visibility", "hidden");
  events.style("visibility", "hidden");
}

// var eventname = 'test';
// Called by scroll when icon is clicked
function updateTimeline(d, i) {
  if (d < smallScale) { 
    d = smallScale;
    scrolbybot=smallScale;
  }
  if (d > largeScale) {
    d = largeScale;
    scrolbybot=largeScale;
    console.log('largscal is ',d);
  }
  scrolbybot=d;
  console.log('window scrollbar position on timeline',d);
  
  mouseY = scrollScale(d); // change scol on timeline
  console.log("circle on timeline", mouseY);
  dot.attr("cy", mouseY);
  dot.style("visibility", "visible");
  events.style("visibility", "visible");

  events.each(function(e, i) {
 
    var distance = Math.abs(d3.select(this).attr("cy") - mouseY);
    if (distance < 1.2) {
      var t = mouseY + 102;
      // tooltip.style("visibility", "visible");

      date.style("visibility", "visible");
      // date.text(e.date);
      date.style("top", t + "px").style("right", 90 + "px");

      $("#current_date").html(
        '<span style="color:yellow">Date : <span><span style="color:white">' +
          e.date +
          "</span>"
      );

      var ty = d3.select(this).attr("cy");
      stateLine
        .transition()
        .duration(520)
        .attr("y1", ty);

      if (e.event != eventname) {
        tempMarker.setLatLng([e.start_lat, e.start_lon]);
        // marker.properties['marker-color'] = '#ff8888';

        map.setView([e.start_lat, e.start_lon], 14); // 16, 9
        googleMap.setZoom(13);

        // var t = 0.06;

        // map.fitBounds([
        // 	[e.start_lat - t/2, e.start_lon -t], // southWest [y, x]
        // 	[e.start_lat + t/2, e.start_lon + t] // northEast
        // ], {
        // 	// this preserves the space from the left of the real map to 200px
        // 	// for content. the format is [x, y]. See
        // 	// http://leafletjs.com/reference.html#map-paddingtopleft
        // 	// for full documentation and other options
        // 	paddingTopLeft: [-240, 480]
        // });

        openImg(e);
        console.log(e.event);
        var infoWindow = new google.maps.InfoWindow({ content: e.event });
        // console.log(markers[i].index); // get index of current timeline node
        google.maps.event.trigger(markers[i], "click");
        googleMap.panTo(markers[i].getPosition());
        $("body").css("margin-top", Number(e.Position));
        eventname = e.event;

        // updates map location on johanessburg.geojson
        var current_position = proj([e.start_lon, e.start_lat]); // lon, lat
        console.log("current_post",current_position);
        current.attr("transform", "translate(" + current_position + ")");
        current2.attr("transform", "translate(" + current_position + ")");
            //infoWindow.open(googleMap, markers[i]);

        // remove any open infowindows when moving to a new location on the map

        // infoWindow.close();
      }
    } else {
      d3.select(this).attr("x1", width / 2 - 7);
      d3.select(this).style("stroke-width", 1.2);
      // tooltip.style("visibility", "visible");
    }
  });
}


// Content created in popups
function openImg(d) {
  var slideshowContent;

  if (d.type == "pic") {
      console.log("openImage", d );

    var temp_pic = "'" + d.pic + "'";
    slideshowContent =
      "<h3>" +
      d.event +
      "</h3>" +
      '<img src="' +
      d.pic +
      '"' +
      ' style="cursor:pointer" ' +
      'onclick="showImage(' +
      temp_pic +
      ');"' +
      " />" +
      '<div class="caption">' +
      "</div>";
  } else if (d.type == "video") {
    slideshowContent = "<h3>" + d.event + "</h3>" + d.video;
  }

  var popupContent = slideshowContent;

  tempMarker.bindPopup(popupContent, {
    closeButton: true,
    minWidth: 419,
    maxWidth: 800
  });

  tempMarker.openPopup();
}
function showPopup(d) {
  var slideshowContent;

 var temp_pic = "'" + d.pic + "'";
    slideshowContent =
      "<h3>" +
      d.event +
      "</h3>" +
      '<img src="' +
      d.pic +
      '"' +
      ' style="cursor:pointer" ' +
      'onclick="showImage(' +
      temp_pic +
      ');"' +
      " />" +
      '<div class="caption">' +
      "</div>";
 
}

function getheight(){
    var d= document.documentElement;
    var b= document.body;
    var who= d.offsetHeight? d: b ;
    return Math.max(who.scrollHeight,who.offsetHeight);
}
// tempMarker.setOpacity(0.3);
function goToMyLocation(lat,long,d){


        // var bodyHeight=getheight();
        // var svgHeight=$('#timeline').height();
     



       var date1=new Date(d.start);
        document.body.scrollTop= y(date1) ;
        mouseY =  y(date1);

        var move =parseInt($('line').attr('y1'))+mouseY;

        console.log("scrol onclic",scrolbybot);
        dot.attr("cy", mouseY);
        dot.style("visibility", "visible");
        events.style("visibility", "visible");
        var wickedLocation =  new google.maps.LatLng(d.start_lat, d.start_lon);

         openImg(d);
        var infoWindow = new google.maps.InfoWindow({ content: d.event });
        // console.log(markers[i].index); // get index of current timeline node
        //google.maps.event.trigger(markers[i], "click");
        googleMap.panTo(wickedLocation);
      
        events.each(function(e, i) {
         var distance = Math.abs(d3.select(this).attr("cy") - mouseY);
        if (distance < 1.2) {
         var t = mouseY + 102;
         var wickedLocation =  new google.maps.LatLng(e.start_lat, e.start_lon);
           google.maps.event.trigger(markers[i], "click");
           googleMap.panTo(wickedLocation);

           date.style("visibility", "visible");
          // date.text(e.date);
         date.style("top", t + "px").style("right", 90 + "px");

            $("#current_date").html(
             '<span style="color:yellow">Date : <span><span style="color:white">' +
                e.date +
                "</span>"
             );

      var ty = d3.select(this).attr("cy");
      stateLine
        .transition()
        .duration(520)
        .attr("y1", ty);
       if (e.event != eventname) {
        var current_position = proj([e.start_lon, e.start_lat]); // lon, lat
        console.log("current_post",current_position);
        current.attr("transform", "translate(" + current_position + ")");
        current2.attr("transform", "translate(" + current_position + ")");


      }
    } else {
      d3.select(this).attr("x1", width / 2 - 7);
      d3.select(this).style("stroke-width", 1.2);


      // tooltip.style("visibility", "visible");
    }
    });


}