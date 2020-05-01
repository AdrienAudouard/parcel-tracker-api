"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DHL = {
    id: 'DHL',
    path: 'https://api-eu.dhl.com/track/shipments?trackingNumber=',
    needApiKey: true,
    apiKey: 'DHL',
    method: 'GET',
    regex: /^[0-9]{10,11}$/ig,
    getBody: function (trackingNumber) {
        return {};
    },
    getHeaders: function (apiKey) {
        return {
            'DHL-API-Key': apiKey,
            'accept': 'application/json'
        };
    },
    responseMapper: function (response) {
        var events = response.shipments[0].events.map(function (event) {
            var mappedEvent = {
                label: event.description,
                date: new Date(event.timestamp),
            };
            if (event.location && event.location.address && event.location.address.addressLocality) {
                mappedEvent.location = event.location.address.addressLocality;
            }
            return mappedEvent;
        });
        return {
            carrier: 'DHL',
            isDelivered: response.shipments[0].status.statusCode === 'delivered',
            events: events
        };
    },
};