"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var chronopost_1 = require("./chronopost");
var colissimo_1 = require("./colissimo");
var ups_1 = require("./ups");
var dhl_1 = require("./dhl");
var royal_mail_1 = require("./royal-mail");
exports.Carriers = (_a = {},
    _a[colissimo_1.Colissimo.id] = colissimo_1.Colissimo,
    _a[chronopost_1.Chronopost.id] = chronopost_1.Chronopost,
    _a[ups_1.UPS.id] = ups_1.UPS,
    _a[dhl_1.DHL.id] = dhl_1.DHL,
    _a[royal_mail_1.RoyalMail.id] = royal_mail_1.RoyalMail,
    _a);
