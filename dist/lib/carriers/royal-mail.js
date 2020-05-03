"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoyalMail = {
    id: 'Royal Mail',
    needApiKey: true,
    apiKey: 'royalMail',
    regex: /^[a-z]{2}[0-9]{9}[a-z]{2}$/i,
    method: 'GET',
    getPath: function (trackingNumber) { return "https://api.royalmail.net/mailpieces/v2/" + trackingNumber + "/events"; },
    getHeaders: function (apiKey) {
        return {
            'accept': 'application/json',
            'x-accept-rmg-terms': 'yes',
            'x-ibm-client-id': apiKey.split(';')[0],
            'x-ibm-client-secret': apiKey.split(';')[1],
        };
    },
    getBody: function (trackingNumber) {
        return {};
    },
    responseMapper: function (response) {
        var events = response.mailPieces.events.map(function (event) {
            return {
                label: event.eventName,
                location: event.locationName,
                date: event.eventDateTime,
            };
        });
        return {
            carrier: 'Royal Mail',
            isDelivered: response.mailPieces.summary.statusCategory === 'DELIVERED' || response.mailPieces.summary.statusCategory === 'delivered',
            events: events,
            trackingNumber: '',
            raw: response
        };
    },
};
