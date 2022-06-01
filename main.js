var drawingManager;
var selectedShape;
var colors = ["#1E90FF", "#FF1493", "#32CD32", "#FF8C00", "#4B0082"];
var selectedColor;
var colorButtons = {};
let infoWindow;
var anotherArea;
var occupiedPath;
var map;

function initialize() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: new google.maps.LatLng(acheived_lat, acheived_lon),
    mapTypeId: "satellite",
    disableDefaultUI: true,
    zoomControl: true,
  });

  // var searchBox = new google.maps.places.SearchBox(
  //   document.getElementById("pac-input")
  // );
  // map.controls[google.maps.ControlPosition.TOP_CENTER].push(
  //   document.getElementById("pac-input")
  // );
  // google.maps.event.addListener(searchBox, "places_changed", function () {
  //   searchBox.set("map", null);

  //   var places = searchBox.getPlaces();

  //   var bounds = new google.maps.LatLngBounds();
  //   var i, place;
  //   for (i = 0; (place = places[i]); i++) {
  //     (function (place) {
  //       var marker = new google.maps.Marker({
  //         position: place.geometry.location,
  //       });
  //       marker.bindTo("map", searchBox, "map");
  //       google.maps.event.addListener(marker, "map_changed", function () {
  //         if (!this.getMap()) {
  //           this.unbindAll();
  //         }
  //       });
  //       bounds.extend(place.geometry.location);
  //     })(place);
  //   }
  //   map.fitBounds(bounds);
  //   searchBox.set("map", map);
  //   map.setZoom(Math.min(map.getZoom(), 12));
  // });

  const occupied = [
    { lat: 32.04423387410923, lng: 73.9169654822523 },
    { lat: 32.04423387410923, lng: 73.9171478724653 },
    { lat: 32.04436005572798, lng: 73.91715055467432 },
    { lat: 32.04436346603957, lng: 73.91711836816614 },
    { lat: 32.044327089375905, lng: 73.91711702706164 },
    { lat: 32.044327089375905, lng: 73.91707277061289 },
    { lat: 32.044366876351056, lng: 73.91707008840388 },
    { lat: 32.04436801312153, lng: 73.91696950556582 },
  ];

  const Gulistan = [
    { lat: 27.681062, lng: 65.183177 },
    { lat: 27.682043, lng: 65.183298 },
    { lat: 27.682738, lng: 65.183312 },
    { lat: 27.683057, lng: 65.183136 },
    { lat: 27.683132, lng: 65.178363 },
    { lat: 27.680615, lng: 65.180634 },
  ];

  const warezai = [
    { lat: 28.198568, lng: 65.03763 },
    { lat: 28.229368, lng: 65.048974 },
    { lat: 28.236781, lng: 65.031183 },
    { lat: 28.206772, lng: 65.019858 },
  ];

  const temp = [
    { lat: 27.945254, lng: 64.547365 },
    { lat: 28.084626, lng: 64.906384 },
    { lat: 27.86828, lng: 64.903171 },
    { lat: 27.791387, lng: 64.593382 },
  ];

  const temp2 = [
    { lat: 27.943466773783978, lng: 64.77155055859374 },
    { lat: 27.947106251105247, lng: 65.00089015820312 },
    { lat: 27.75161458375539, lng: 65.0105031953125 },
    { lat: 27.729736490857274, lng: 64.86356105664062 },
  ];

  anotherArea = new google.maps.Polygon({
    paths: temp2,
    strokeColor: "#0000FF",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#0000FF",
    fillOpacity: 0.35,
  });

  // const occupiedPath = new google.maps.Polyline({
  //   path: occupied,
  //   // geodesic: true,
  //   strokeColor: "#FF0000",
  //   strokeOpacity: 1.0,
  //   strokeWeight: 2,
  // });

  occupiedPath = new google.maps.Polygon({
    paths: temp,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 0,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
  });

  // const occupiedPath2 = new google.maps.Polygon({
  //   paths: warezai,
  //   strokeColor: "#FF0000",
  //   strokeOpacity: 0.8,
  //   strokeWeight: 0,
  //   fillColor: "#FF0000",
  //   fillOpacity: 0.35,
  // });

  occupiedPath.setMap(map);
  anotherArea.setMap(map);

  // var geometryFactory = new jsts.geom.GeometryFactory();
  // var occupiedPolygon = createJstsPolygon(geometryFactory, occupiedPath);
  // var anotherPolygon = createJstsPolygon(geometryFactory, anotherArea);
  // var intersection = occupiedPolygon.intersection(anotherPolygon);
  // drawIntersectionArea(map, intersection);

  // occupiedPath2.setMap(map);

  //   var infoWindow=new google.maps.InfoWindow({ content: "foo",
  //     position: occupied});
  //     google.maps.event.addListener(occupiedPath, "click", function(){
  //       console.log("Hello g")
  //     infoWindow.open(map, this);
  // });

  google.maps.event.addListener(occupiedPath, "click", function (event) {
    console.log("Hello", event);
    // var contentString = '<div id="content:">' + "Occupied Area" + '</div>';
    var contentString =
      "<b>Occupied Area Polygon</b><br>" +
      "Clicked location: <br>" +
      event.latLng.lat() +
      "," +
      event.latLng.lng() +
      "<br>";
    var infowindow1 = new google.maps.InfoWindow();
    infowindow1.setContent(contentString);
    infowindow1.setPosition(event.latLng);
    infowindow1.open(map);
  });

  // var infowindow = new google.maps.InfoWindow({
  //   content: "Pin1 Popup"
  // });

  // occupiedPath.addListener('click', function () {
  //   infowindow.open(map, occupiedPath);
  // });

  var polyOptions = {
    strokeWeight: 0,
    fillOpacity: 0.45,
    editable: true,
  };

  drawingManager = new google.maps.drawing.DrawingManager({
    // drawingMode: google.maps.drawing.OverlayType.POLYGON,
    drawingControl: true,
    drawingControlOptions: {
      drawingModes: [google.maps.drawing.OverlayType.POLYGON],
    },
    markerOptions: {
      draggable: true,
    },
    polylineOptions: {
      editable: true,
    },
    rectangleOptions: polyOptions,
    circleOptions: polyOptions,
    polygonOptions: polyOptions,
    map: map,
  });

  google.maps.event.addListener(
    drawingManager,
    "overlaycomplete",
    function (e) {
      if (e.type != google.maps.drawing.OverlayType.MARKER) {
        drawingManager.setDrawingMode(null);
        var newShape = e.overlay;
        newShape.type = e.type;
        google.maps.event.addListener(newShape, "click", function () {
          setSelection(newShape);
        });

        setSelection(newShape);

        if (
          e.type == google.maps.drawing.OverlayType.POLYLINE ||
          e.type == google.maps.drawing.OverlayType.POLYGON
        ) {
          var locations = e.overlay.getPath().getArray();
          console.log("POLY:" + locations.toString());
          newPolygonIntersection();
          //alert(locations.toString() + " 1st instace");
        } else if (e.type == google.maps.drawing.OverlayType.CIRCLE) {
          console.log(
            "CIRCLE center=" +
              e.overlay.getCenter().toUrlValue(6) +
              " radius=" +
              e.overlay.getRadius()
          );
        } else if (e.type == google.maps.drawing.OverlayType.RECTANGLE) {
          //get lat/lng bounds of the current shape
          var bounds = e.overlay.getBounds();
          var start = bounds.getNorthEast();
          var end = bounds.getSouthWest();
          var center = bounds.getCenter();
          console.log("RECTANGLE:" + bounds.toString());
          // alert(bounds.toString() + " 2nd instance");
        }
      }
    }
  );

  // Clear the current selection when the drawing mode is changed, or when the
  // map is clicked.
  google.maps.event.addListener(
    drawingManager,
    "drawingmode_changed",
    clearSelection
  );
  google.maps.event.addListener(map, "click", clearSelection);
  // google.maps.event.addListener(occupiedPath, 'click', showArrays);
  // infoWindow = new google.maps.InfoWindow();
  google.maps.event.addDomListener(
    document.getElementById("delete-button"),
    "click",
    deleteSelectedShape
  );

  buildColorPalette();
}

function drawIntersectionArea(map, polygon) {
  var coords = polygon.getCoordinates().map(function (coord) {
    return { lat: coord.x, lng: coord.y };
  });

  console.log("coords: ", coords);
  if (coords.length) {
    alert("Polygon intersects itself");
  } else {
    alert("Polygon does not intersect itself");
  }

  var intersectionArea = new google.maps.Polygon({
    paths: coords,
    strokeColor: "#00FF00",
    strokeOpacity: 0.8,
    strokeWeight: 4,
    fillColor: "#00FF00",
    fillOpacity: 0.35,
  });
  intersectionArea.setMap(map);
}

function createJstsPolygon(geometryFactory, polygon) {
  var path = polygon.getPath();
  var coordinates = path.getArray().map(function name(coord) {
    return new jsts.geom.Coordinate(coord.lat(), coord.lng());
  });
  coordinates.push(coordinates[0]);
  var shell = geometryFactory.createLinearRing(coordinates);
  return geometryFactory.createPolygon(shell);
}

function clearSelection() {
  if (selectedShape) {
    selectedShape.setEditable(false);
    selectedShape = null;
  }
}

function setSelection(shape) {
  clearSelection();
  selectedShape = shape;
  shape.setEditable(true);
  selectColor(shape.get("fillColor") || shape.get("strokeColor"));
}

function deleteSelectedShape() {
  if (selectedShape) {
    selectedShape.setMap(null);
  }
}

function newPolygonIntersection(testVariable) {
  console.log("Aoa na jani", testVariable);

  var geometryFactory = new jsts.geom.GeometryFactory();
  var occupiedPolygon = createJstsPolygon(geometryFactory, occupiedPath);
  var anotherPolygon = createJstsPolygon(geometryFactory, anotherArea);
  var intersection = occupiedPolygon.intersection(anotherPolygon);
  drawIntersectionArea(map, intersection);
}

function selectColor(color) {
  selectedColor = color;
  for (var i = 0; i < colors.length; ++i) {
    var currColor = colors[i];
    colorButtons[currColor].style.border =
      currColor == color ? "2px solid #789" : "2px solid #fff";
  }

  // Retrieves the current options from the drawing manager and replaces the
  // stroke or fill color as appropriate.
  var polylineOptions = drawingManager.get("polylineOptions");
  polylineOptions.strokeColor = color;
  drawingManager.set("polylineOptions", polylineOptions);

  var rectangleOptions = drawingManager.get("rectangleOptions");
  rectangleOptions.fillColor = color;
  drawingManager.set("rectangleOptions", rectangleOptions);

  var circleOptions = drawingManager.get("circleOptions");
  circleOptions.fillColor = color;
  drawingManager.set("circleOptions", circleOptions);

  var polygonOptions = drawingManager.get("polygonOptions");
  polygonOptions.fillColor = color;
  drawingManager.set("polygonOptions", polygonOptions);
}

function setSelectedShapeColor(color) {
  if (selectedShape) {
    if (selectedShape.type == google.maps.drawing.OverlayType.POLYLINE) {
      selectedShape.set("strokeColor", color);
    } else {
      selectedShape.set("fillColor", color);
    }
  }
}

function makeColorButton(color) {
  var button = document.createElement("span");
  button.className = "color-button";
  button.style.backgroundColor = color;
  google.maps.event.addDomListener(button, "click", function () {
    selectColor(color);
    setSelectedShapeColor(color);
  });

  return button;
}

function buildColorPalette() {
  var colorPalette = document.getElementById("color-palette");
  for (var i = 0; i < colors.length; ++i) {
    var currColor = colors[i];
    var colorButton = makeColorButton(currColor);
    colorPalette.appendChild(colorButton);
    colorButtons[currColor] = colorButton;
  }
  selectColor(colors[0]);
}

function showArrays(event) {
  const polygon = this;
  const vertices = polygon.getPath();
  let contentString =
    "<b>Bermuda Triangle polygon</b><br>" +
    "Clicked location: <br>" +
    event.latLng.lat() +
    "," +
    event.latLng.lng() +
    "<br>";

  // Iterate over the vertices.
  for (let i = 0; i < vertices.getLength(); i++) {
    const xy = vertices.getAt(i);

    contentString +=
      "<br>" + "Coordinate " + i + ":<br>" + xy.lat() + "," + xy.lng();
  }

  // Replace the info window's content and position.
  infoWindow.setContent(contentString);
  infoWindow.setPosition(event.latLng);
  infoWindow.open(map);
  //   var mapInfoWindow = new google.maps.InfoWindow({
  //     content: "foo",
  // });
  // mapInfoWindow.open(map);
  // const contentString = 'Hello World'
  // var infoWindow = new google.maps.InfoWindow();

  // infoWindow.setContent(contentString);
  // infoWindow.open(map);

  // var vertices = this.getPath();
  // var contentString = '<b>Bermuda Triangle polygon</b><br>' +
  //   'Clicked location: <br>' + event.latLng.lat() + ',' + event.latLng.lng() +
  //   '<br>';

  // // Iterate over the vertices.
  // for (var i = 0; i < vertices.getLength(); i++) {
  //   var xy = vertices.getAt(i);
  //   contentString += '<br>' + 'Coordinate ' + i + ':<br>' + xy.lat() + ',' +
  //     xy.lng();
  // }
}
google.maps.event.addDomListener(window, "load", initialize);
