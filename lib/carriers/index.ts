import {Chronopost} from "./chronopost";
import {Colissimo} from "./colissimo";
import {UPS} from "./ups";
import {DHL} from "./dhl";
import {RoyalMail} from "./royal-mail";


export const Carriers = {
    [Colissimo.id]: Colissimo,
    [Chronopost.id]: Chronopost,
    [UPS.id]: UPS,
    [DHL.id]: DHL,
    [RoyalMail.id]: RoyalMail,
}
