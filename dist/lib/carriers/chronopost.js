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
var la_poste_1 = require("./la-poste");
exports.Chronopost = __assign(__assign({ id: 'Chronopost', regex: /^([a-zA-Z]{2}\d{9}[a-zA-Z]{2})|([a-zA-Z\w]{15})$/i }, la_poste_1.LaPoste), { getBody: function (trackingNumber) {
        return {};
    }, responseMapper: function (response) {
        var mapped = la_poste_1.LaPoste.responseMapper(response);
        mapped.carrier = 'Chronopost';
        return mapped;
    } });
