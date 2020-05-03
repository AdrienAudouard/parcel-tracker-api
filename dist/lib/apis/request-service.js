"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var RequestService = /** @class */ (function () {
    function RequestService() {
    }
    RequestService.prototype.makeRequest = function (carrier, trackingNumber, options) {
        var apiKey = this.getApiKey(carrier, options);
        var config = this.createAxiosConfig(carrier, trackingNumber, apiKey, options);
        return axios_1.default(config)
            .then(function (response) {
            var data = response.data;
            var mapped = carrier.responseMapper(data);
            mapped.events = mapped.events.sort(function (a, b) { return b.date.getTime() - a.date.getTime(); });
            if (mapped.events.length > 0) {
                mapped.status = mapped.events[0].label;
                mapped.lastUpdate = mapped.events[0].date;
                mapped.entryDate = mapped.events[mapped.events.length - 1].date;
            }
            mapped.trackingNumber = trackingNumber;
            mapped.raw = data;
            return mapped;
        });
    };
    RequestService.prototype.createAxiosConfig = function (carrier, trackingNumber, apiKey, options) {
        var body = carrier.method !== 'GET' ? carrier.getBody(trackingNumber) : {};
        var url = carrier.getPath(trackingNumber);
        var config = {
            method: carrier.method,
            url: url,
            headers: carrier.getHeaders(apiKey),
        };
        if (carrier.method === 'POST') {
            config.data = body;
        }
        if (options.enableCrossOrigin) {
            config.url = 'https://cors-anywhere.herokuapp.com/' + config.url;
        }
        return config;
    };
    RequestService.prototype.getApiKey = function (carrier, options) {
        if (carrier.needApiKey) {
            var apiError = "Carrier " + carrier.id + " need a api key. Please set it in TrackerConfig.apiKeys";
            if (!options.apiKeys) {
                throw new Error(apiError);
            }
            var apiIndex = carrier.apiKey;
            // @ts-ignore
            if (!options.apiKeys[apiIndex]) {
                throw new Error(apiError);
            }
            // @ts-ignore
            return options.apiKeys[apiIndex];
        }
        return '';
    };
    return RequestService;
}());
exports.default = new RequestService();
