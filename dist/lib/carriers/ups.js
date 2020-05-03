"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var string_service_1 = require("../utils/string-service");
var date_time_service_1 = require("../utils/date-time-service");
function mapResponse(response) {
    var events = response.trackDetails[0].shipmentProgressActivities.map(function (event) {
        return {
            location: string_service_1.default.decode(event.location),
            label: string_service_1.default.decode(event.activityScan),
            date: date_time_service_1.default.upsDateToDate(event.date + ' ' + event.time),
        };
    });
    return {
        carrier: exports.UPS.id,
        isDelivered: response.trackDetails[0].progressBarType === 'Delivered',
        events: events,
        trackingNumber: '',
        raw: response
    };
}
exports.UPS = {
    id: 'UPS',
    needApiKey: false,
    regex: /\b(1Z ?[0-9A-Z]{3} ?[0-9A-Z]{3} ?[0-9A-Z]{2} ?[0-9A-Z]{4} ?[0-9A-Z]{3} ?[0-9A-Z]|[\dT]\d\d\d ?\d\d\d\d ?\d\d\d)\b/,
    getPath: function (trackingNumber) { return 'https://wwwapps.ups.com/track/api/Track/GetStatus?loc=fr_FR'; },
    method: 'POST',
    getBody: function (trackingNumber) {
        return {
            Locale: 'fr_FR',
            Requester: 'UPSHome',
            TrackingNumber: [trackingNumber],
        };
    },
    getHeaders: function () {
        return {
            'content-type': 'application/json',
        };
    },
    responseMapper: mapResponse
};
