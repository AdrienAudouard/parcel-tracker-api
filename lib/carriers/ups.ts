import {Carrier} from "./carrier";
import {ParcelEvent, ParcelInformations} from "../apis/parcel-informations";
import StringService from '../utils/string-service';
import DateTimeService from '../utils/date-time-service';

function mapResponse(response: any): ParcelInformations {
    const events = response.trackDetails[0].shipmentProgressActivities.map(
        (event: any) => {
            return {
                location: StringService.decode(event.location),
                label: StringService.decode(event.activityScan),
                date: DateTimeService.upsDateToDate(event.date + ' ' + event.time),
            } as ParcelEvent;
        },
    );

    return {
        carrier: UPS.id,
        isDelivered: response.trackDetails[0].progressBarType === 'Delivered',
        events,
    };
}

export const UPS = {
    id: 'UPS',
    needApiKey: false,
    regex: /\b(1Z ?[0-9A-Z]{3} ?[0-9A-Z]{3} ?[0-9A-Z]{2} ?[0-9A-Z]{4} ?[0-9A-Z]{3} ?[0-9A-Z]|[\dT]\d\d\d ?\d\d\d\d ?\d\d\d)\b/, // https://www.ups.com/fr/fr/tracking/help/tracking/tnh.page
    getPath: trackingNumber => 'https://wwwapps.ups.com/track/api/Track/GetStatus?loc=fr_FR',
    method: 'POST',
    getBody: (trackingNumber: string) => {
        return {
            Locale: 'fr_FR',
            Requester: 'UPSHome',
            TrackingNumber: [trackingNumber],
        };
    },
    getHeaders: () => {
        return {
            'content-type': 'application/json',
        }
    },
    responseMapper: mapResponse
} as Carrier;