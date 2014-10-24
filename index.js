var express = require('express');
var request = require('request');
var tilebelt = require('tilebelt');

var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, resp) {
  response.send('Hello World!');
});

app.get('/tiles/:z/:x/:y', function(req, resp) {
  var z = parseInt(req.params.z, 10);
  var x = parseInt(req.params.x, 10);
  var y = parseInt(req.params.y, 10);

  var tile = [x, y, z];

  var tile_geojson = tilebelt.tileToGeoJSON(tile);
  var polygon = tile_geojson.geometry;

  var bbox = polygonToBbox(polygon);

  var url = req.query.url;
  url += '&bbox=' + encodeURIComponent(bbox.join(','));
  for (var key in url_parameters) {
    var value = url_parameters[key];
    url += '&' + key + '=' + value;
  }

  var redirect = req.query.redirect ? true : false;

  if (redirect) {
    response.redirect(url);
  } else {
    req.pipe(request(url)).pipe(resp);
  }
});

var url_parameters = {
  'bboxSR': '4326',
  'size': encodeURIComponent('256,256'),
  'imageSR': '3857',
  'f': 'image'
};

function polygonToBbox(polygon) {
  var ring = polygon.coordinates[0];
  var min_x = ring[0][0];
  var min_y = ring[0][1];
  var max_x = ring[2][0];
  var max_y = ring[2][1];

  return [min_x, min_y, max_x, max_y];
}

app.listen(app.get('port'), function() {
  console.log('Running at port: ' + app.get('port'));
});