const tilebelt = require('tilebelt');

function polygonToBbox(polygon) {
  const ring = polygon.coordinates[0];

  const minX = ring[0][0];
  const minY = ring[0][1];
  const maxX = ring[2][0];
  const maxY = ring[2][1];

  return [minX, minY, maxX, maxY].join(',');
}

class TileifyAGS {
  constructor(url, urlParamConfig, pixelRatio) {
    this.url = url;

    this.urlParameters = {
      bboxSR: '4326',
      imageSR: '3857',
      f: 'image',
    };

    let tileSize = 256;

    if (pixelRatio) {
      tileSize *= pixelRatio;
    }

    this.urlParameters.size = encodeURIComponent(`${tileSize},${tileSize}`);

    if (urlParamConfig != null) {
      Object.entries(urlParamConfig).forEach(([key, value]) => {
        this.urlParameters[key] = value;
      });
    }
  }

  getTileUrl(x, y, z) {
    const tile = [x, y, z];
    const tileGeojson = tilebelt.tileToGeoJSON(tile);
    const polygon = tileGeojson.geometry;
    const bbox = polygonToBbox(polygon);

    let fullUrl = `${this.url}/export?`;
    fullUrl += `&bbox=${encodeURIComponent(bbox)}`;

    Object.entries(this.urlParameters).forEach(([key, value]) => {
      fullUrl += `&${key}=${value}`;
    });

    return fullUrl;
  }
}

module.exports = TileifyAGS;
