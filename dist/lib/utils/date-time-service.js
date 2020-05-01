"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var date_and_time_1 = require("date-and-time");
var DateTimeService = /** @class */ (function () {
    function DateTimeService() {
    }
    DateTimeService.prototype.upsDateToDate = function (date) {
        return date_and_time_1.default.parse(date, 'DD/MM/YYYY h:mm');
    };
    DateTimeService.prototype.toDateString = function (date) {
        return date_and_time_1.default.format(date, 'DD MMMM YYYY');
    };
    DateTimeService.prototype.toDateTimeString = function (date) {
        return date_and_time_1.default.format(date, 'DD MMMM YYYY HH:mm');
    };
    return DateTimeService;
}());
exports.default = new DateTimeService();
