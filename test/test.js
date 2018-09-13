const assert = require('assert');
const TileifyAGS = require('../');

describe('TileifyAGS', function() {
  describe('#getTileUrl()', function() {
    it('should return a properly formatted URL', function() {
      const agsServerUrl = 'http://gis-web.co.union.nc.us/arcgis/rest/services/PWGIS_Web/Operational_Layers/MapServer';

      const urlParamConfig = {
        transparent: 'true',
        layers: 'show:20',
      };

      const x = 144666;
      const y = 207574;
      const z = 19;
      const pixelRatio = 2;

      const tiler = new TileifyAGS(agsServerUrl, urlParamConfig, pixelRatio);
      const url = tiler.getTileUrl(x, y, z);

      const expectedUrl = 'http://gis-web.co.union.nc.us/arcgis/rest/services/PWGIS_Web/Operational_Layers/MapServer/export?&bbox=-80.66574096679688%2C35.0530458107596%2C-80.66505432128906%2C35.053607911025594&bboxSR=4326&imageSR=3857&f=image&size=512%2C512&transparent=true&layers=show:20';

      assert.equal(url, expectedUrl);
    });
  });
});
