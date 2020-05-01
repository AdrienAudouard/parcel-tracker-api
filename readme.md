# Parcel Tracker Api
[![npm version](https://img.shields.io/npm/v/parcel-tracker-api.svg?style=flat-square)](https://www.npmjs.org/package/parcel-tracker-api)
[![download](https://img.shields.io/npm/dm/parcel-tracker-api.svg)](https://www.npmjs.com/package/parcel-tracker-api)

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
  * @return {**ParcelInformations**} parcel's informations

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

### getCarrier(trackingNumber)
* Return the possible carriers for a given tracking number
  * @param {**string**} **trackingNumber**:  Tracking number
  * @return {**Array<string>**} possible carriers founds
 
 ````javascript
const tracker = new Tracker();

tracker.getCarrier('1Z9999999999999999') // => ['UPS']
````

### getCarriersList()
* Return all available carriers
  * @return {**Array<string>**} carriers

 ````javascript
const tracker = new Tracker();

tracker.getCarriersList() // => ['UPS', 'DHL', 'Colissimo', ...]
````
