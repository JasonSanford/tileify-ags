## Tileify AGS

This is the core package that powers [tileify-ags-proxy](https://github.com/JasonSanford/tileify-ags-proxy). If you want to create a slippy map tile service from your ArcGIS Server maps, you should probably [head over there](https://github.com/JasonSanford/tileify-ags-proxy).

## Usage

```javascript
const TileifyAGS = require('tileify-ags');

const agsServerUrl = 'http://gis-web.co.union.nc.us/arcgis/rest/services/PWGIS_Web/Operational_Layers/MapServer';

const urlParamConfig = {
  transparent: 'true',
  layers: 'show:20',
};

const x = 144666;
const y = 207574;
const z = 19;
const pixelRatio = 2; // Optional: Use 2 to generate 512x512 tiles. Defaults to 1 (256x256 tiles).

const tiler = new TileifyAGS(agsServerUrl, urlParamConfig, pixelRatio);
const url = tiler.getTileUrl(x, y, z);

console.log(url);
// http://gis-web.co.union.nc.us/arcgis/rest/services/PWGIS_Web/Operational_Layers/MapServer/export?&bbox=-80.66574096679688%2C35.0530458107596%2C-80.66505432128906%2C35.053607911025594&bboxSR=4326&imageSR=3857&f=image&size=512%2C512&transparent=true&layers=show:20
```
