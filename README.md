#Tileify-AGS

This project is designed to create a tile service out of an uncached ArcGIS Server layer.

##Installation

Currently the `tileify-ags` npm package isn't published. Until then, to install locally, perform these steps:

```
> cd tileify-ags-proxy
> npm install ../tileify-ags
> npm install
> node index.js
```

##Testing

Once you've got it started locally, try out this url:

[http://localhost:5000/tiles/13/2257/3227?url=http%3A%2F%2Fgis1.co.iredell.nc.us%3A6080%2Farcgis%2Frest%2Fservices%2F6miFireDistricts%2FMapServer](http://localhost:5000/tiles/13/2257/3227?url=http%3A%2F%2Fgis1.co.iredell.nc.us%3A6080%2Farcgis%2Frest%2Fservices%2F6miFireDistricts%2FMapServer)