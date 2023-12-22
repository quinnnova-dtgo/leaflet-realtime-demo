var map = L.map('map').setView([13.655367585018345, 100.6655496042884], 16);

var weather = {
  type: 'Feature',
  properties: {
    id: 100
  },
  geometry: {
    type: 'Point',
    coordinates: []
  },
};

var realtime = get_realtime();
realtime.addTo(map);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(map);

realtime.on('update', function (elem) {

  var popupContent = function (featureId) {
    var feature = elem.features[featureId];

    console.log(feature.properties.temp);

    return '<h3>' + feature.properties.temp + '°C</h3>';
  };

  var bindFeaturePopup = function (featureId) {
    realtime.getLayer(featureId).bindPopup(popupContent(featureId));
  };

  var updateFeaturePopup = function (featureId) {
    realtime.getLayer(featureId).getPopup().setContent(popupContent(featureId));
  };


  // map.fitBounds(realtime.getBounds(), { maxZoom: 3 });
  Object.keys(elem.enter).forEach(bindFeaturePopup);
  Object.keys(elem.update).forEach(updateFeaturePopup);
});

function get_realtime() {
  realtime = L.realtime(
    function (success, error) {
      fetch('https://api.openweathermap.org/data/2.5/weather?lat=13.655367585018345&lon=100.6655496042884&appid=b2e15b5d84536c4f6ef77cbe5d0e225a&units=metric')
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          var weatherCoords = weather.geometry.coordinates;
          weatherCoords.push(data.coord.lon, data.coord.lat);

          Object.assign(weather.properties, data.main);

          success({
            type: 'FeatureCollection',
            features: [weather]
          });
        })
        .catch(error);
    }, {
    interval: 60 * 1000,
    onEachFeature(feature, l) {
      const temperature = parseFloat(feature.properties.temp);

      l.bindPopup(function () {
        return `<h3>${temperature ? temperature.toFixed(2) : 'N/A'}°C</h3>`;
      });
    }
  });

  return realtime;
}
