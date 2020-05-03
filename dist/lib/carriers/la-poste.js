"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaPoste = {
    needApiKey: true,
    apiKey: 'laPoste',
    getHeaders: function (apiKey) {
        return {
            Accept: 'application/json',
            'X-Okapi-Key': apiKey,
        };
    },
    method: 'GET',
    getPath: function (trackingNumber) { return 'https://api.laposte.fr/suivi/v2/idships/' + trackingNumber; },
    responseMapper: function (response) {
        var events = response.shipment.event.map(function (event) {
            return { label: event.label, date: new Date(event.date) };
        });
        return {
            isDelivered: response.shipment.isFinal,
            events: events, trackingNumber: '',
            raw: response
        };
    },
};
