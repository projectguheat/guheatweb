



/* Basemap Layers */
var carto = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CARTO</a>'
});

var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var google = L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
    attribution: '&copy; <a href="">Google</a>'
});


var drawn_feature = L.featureGroup()

var basemaps = {
    "CARTO": carto,
    "OpenStreetMap": osm,
    "Google": google
}

var overlaymaps = {
//    "Solar Energy (GHI)": solar_ann,
    "Drawn Feature": drawn_feature
}

var map = L.map('map', {
    center: [14.35, 121.25],
    zoom: 9,
    minZoom: 6,
    maxZoom: 18,
    zoomControl: true,
    
    maxBoundsViscosity: 0.5,
//    layers: [google, solar_ann, drawn_feature]
    layers: [carto, drawn_feature]
});
map.zoomControl.setPosition('topright');
L.control.layers(basemaps, overlaymaps, {position:'topleft'}, {collapsed: false}).addTo(map);
L.control.scale({position:'bottomright', maxWidth:100}).addTo(map);


$(function(){
    var dates_allowed = {
        '2018-04-01': 1,
        '2018-04-06': 1,
        '2018-04-13': 1,
        '2018-04-21': 1,
    }

    $( "#datepicker" ).datepicker({
        dateFormat: "yy-mm-dd",
        minDate: new Date(2017, 1-1),

        beforeShowDay: function(date) {
            function addZero(no) {
                if (no < 10){
                    return "0" +no;
                } else {
                    return no;
                }  
            }
            var date_str = [
                addZero(date.getFullYear()),
                addZero(date.getMonth() + 1),
                addZero(date.getDate())      
            ].join('-');

            if (dates_allowed[date_str]) {
                return [true, 'good_date', 'This date is selectable'];
            } else {
                return [false, 'bad_date', 'This date is NOT selectable'];
            }
        }

    });
    $("#datepicker").datepicker('setDate', 'today');   
});

// var allowedDates = new Object();

// function queryAllowedDates (year, month, id) {
//   $.ajax({
//     type: 'GET',
//     url: 'calendar_days.php',
//     dataType: 'json',
//     success: function(response) { 
//       allowedDates[id] = response.allowedDates;
//     },
//     data: {year:year,month:month},
//     async: false
//   });
// }

// $("#datepicker1").datepicker({
//   dateFormat: 'dd.mm.yy', 
//   changeMonth: true, 
//   changeYear: true ,
//   beforeShow: function (input) {
//     var currentDate = $(input).datepicker('getDate');
//     var id = $(input).attr('id');
//     queryAllowedDates(currentDate.getFullYear(), currentDate.getMonth()+1,id);
//   },
//   onChangeMonthYear: function (year, month, inst) {
//     queryAllowedDates(year, month, inst.input.attr('id'));
//   },
//   beforeShowDay: function (day) {
//     var id = $(this).attr('id');

//     var date_str = [
//       day.getFullYear(),
//       day.getMonth() + 1,
//       day.getDate()
//     ].join('-');

//     if (allowedDates[id] != undefined && allowedDates[id][date_str]) {
//       return [true, 'good_date', 'This date is selectable'];
//     } else {
//       return [false, 'bad_date', 'This date is NOT selectable'];
//     } 
//   }
// });

function animateSidebar() {
    $("#sidebar").animate({
      width: "toggle"
    }, 350, function() {
      map.invalidateSize();
    });
  }

  $("#list-btn").click(function() {
    animateSidebar();
    return false;
  });

  $(".dropdown-menu li a").click(function(){
    $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
    $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
  });

 

   

L.geoJSON(geojsonFeature).addTo(map);