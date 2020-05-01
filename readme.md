# Parcel Tracker Api

Parcel tracker for Node.js

## Installation

TODO

## Supported carrier

* DHL
* UPS
* Colissimo
* Chronopost

## Usage

* Node.js

````javascript
const Tracker = require('parcel-tracker-api').default;
````

* ES6 Import

````javascript
import Tracker from('parcel-tracker-api');
````

## API

### getTrackingInformations(trackingNumber, carrier[, config])
* Return tracking informations for a given tracking number and carrier
  * @param {**string**} **trackingNumber**:  Tracking number
  * @param {**string**} **carrier**: Carrier name
  * @param {**TrackerConfig**} **config**: Tracking configaration can be optionnal
  * return {**ParcelInformations**} parcel's informations

````javascript
const config = {
    apiKeys: {
        DHL: 'API_KEY'
    }
};

const tracker = new Tracker(config);

tracker.getTrackingInformations('TRACKING_NUMBER', 'DHL').then((response) => {
    // DO WORK
})
````

You can use a specific tracker configuration for a unique request, it will override the default one

````javascript
const defaultConfig = {
    apiKeys: {
        DHL: 'API_KEY'
    }
};

const specificOne = {
    enableCrossOrigin: true
};

const tracker = new Tracker(config);

tracker.getTrackingInformations('TRACKING_NUMBER', 'DHL', specificOne).then((response) => {
    // DO WORK
})
````
