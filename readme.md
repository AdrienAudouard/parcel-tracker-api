# Parcel Tracker Api
[![npm version](https://img.shields.io/npm/v/parcel-tracker-api.svg?style=flat-square)](https://www.npmjs.org/package/parcel-tracker-api)
[![download](https://img.shields.io/npm/dm/parcel-tracker-api.svg)](https://www.npmjs.com/package/parcel-tracker-api)

Parcel tracker for Node.js

## Installation

Using npm:
````
npm install parcel-tracker-api
````

## Supported carrier

* DHL
* UPS
* Colissimo
* Chronopost
* Royal Mail

## Usage

* Node.js

````javascript
const Tracker = require('parcel-tracker-api');
````

* ES6 Import

````javascript
import {Tracker} from "parcel-tracker-api";
````

## API

### Tracker configuration

You can configure the tracker by using a TrackerConfig object.

#### Api keys

Many carriers needs a api key to use their API's. **You need to put them in the config object !**.

**Example:** 

````javascript
const config = {
    apiKeys: {
        laPoste: 'API_KEY', // For Colissimo and Chronopost API
        DHL: 'API_KEY',
        royalMail: 'CLIENT_ID;CLIENT_SECRET',
    }
};

const tracker = new Tracker(config);
````

#### Disable CORS 

Many carrier api's do not support CORS, which can be a problem if we want to use the API on front-end applications.

To bypass this problem you can use the `enableCrossOrigin`. With this option requests may be longer than expected, it's because a proxy to put CORS headers is used.

**Example:**
````javascript
const config = {
    enableCrossOrigin: true,
};

const tracker = new Tracker(config);
````

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

#### ParcelInformations

````javascript
{
    //  Carrier used to get data
    carrier: string;

    // True if the parcel is delivered
    isDelivered: boolean;

    // Tracking events
    events: ParcelEvent[];

    // Tracker number
    trackingNumber: string;

    // The last status provided by the carrier
    status?: string;

    // Date of the last event
    lastUpdate?: Date;

    // Date of the first event
    entryDate?: Date;

    // Raw response from the api
    raw: any;
}
````

#### ParcelEvent

````javascript
{
    // Label of the event
    label: string;
    
    // Event's date
    date: Date;
    
    // Event's location if it provided by the carrier
    location?: string;
}
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

## License

[MIT](LICENSE)