"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var carriers_1 = require("./carriers");
var request_service_1 = require("./apis/request-service");
var Tracker = /** @class */ (function () {
    function Tracker(config) {
        if (config === void 0) { config = {}; }
        this.config = config;
    }
    Tracker.prototype.getCarriersList = function () {
        return Object.keys(carriers_1.Carriers);
    };
    Tracker.prototype.getTrackingInformations = function (trackingNumber, carrier, options) {
        if (options === void 0) { options = {}; }
        var carrierApi = carriers_1.Carriers[carrier];
        var requestConfig = __assign(__assign({}, this.config), options);
        if (!carrierApi) {
            throw new Error("Carrier \"" + carrier + "\" is not supported yet :(");
        }
        return request_service_1.default.makeRequest(carrierApi, trackingNumber, requestConfig);
    };
    Tracker.prototype.getCourier = function (trackingNumber) {
        var carriers = Object.keys(carriers_1.Carriers);
        var carriersFound = [];
        for (var _i = 0, carriers_2 = carriers; _i < carriers_2.length; _i++) {
            var carrier = carriers_2[_i];
            var carrierApi = carriers_1.Carriers[carrier];
            if (trackingNumber.match(carrierApi.regex)) {
                carriersFound.push(carrier);
            }
        }
        return carriersFound;
    };
    return Tracker;
}());
exports.default = Tracker;
