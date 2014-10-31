var tilebelt = require('tilebelt');

/**
 * The TileifyAGS class is designed to take a tile index, and return an appropriate bounding box image query for an AGS uncached image server.
 *
 * @param url_param_config - optional
 * @constructor
 */
exports.TileifyAGS = function (url_param_config) {
    "use strict";
    this.url_parameters = {
        'bboxSR': '4326',
        'size': encodeURIComponent('256,256'),
        'imageSR': '3857',
        'f': 'image'
    };

    if (url_param_config != null) {
        for (var key in url_param_config) {
            var value = url_param_config[key];
            this.url_parameters[key] = value;
        }
    }
};

/**
 * This method creates a AGS image query url for an uncached Image Server from a tile index.
 *
 * @param url - URL to the AGS uncached image server
 * @param x - tile index x
 * @param y - tile index y
 * @param z - tile index z
 * @returns {string}
 */
exports.TileifyAGS.prototype.getTileUrl = function(url, x, y, z) {
    "use strict";
    var tile = [x, y, z];
    var tile_geojson = tilebelt.tileToGeoJSON(tile);
    var polygon = tile_geojson.geometry;
    var bbox = polygonToBbox(polygon);

    var url_parts = url.split('/');
    var mapserver_or_imageserver = url_parts[url_parts.length - 1];
    var path = mapserver_or_imageserver == 'MapServer' ? 'export' : 'exportImage';

    url += '/' + path + '?';
    url += 'bbox=' + encodeURIComponent(bbox.join(','));
    for (var key in this.url_parameters) {
        var value = this.url_parameters[key];
        url += '&' + key + '=' + value;
    }

    return url;
};

/**
 *
 * @param polygon
 * @returns {*[]}
 */
function polygonToBbox(polygon) {
  "use strict";
  var ring = polygon.coordinates[0];
  var min_x = ring[0][0];
  var min_y = ring[0][1];
  var max_x = ring[2][0];
  var max_y = ring[2][1];

  return [min_x, min_y, max_x, max_y];
}
