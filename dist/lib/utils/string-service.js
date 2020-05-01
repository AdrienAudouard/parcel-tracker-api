"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var html_entities_1 = require("html-entities");
var StringService = /** @class */ (function () {
    function StringService() {
    }
    StringService.prototype.decode = function (str) {
        var entities = new html_entities_1.XmlEntities();
        return entities.decode(str);
    };
    return StringService;
}());
exports.default = new StringService();
