import {Carrier} from "./carrier";
import {ParcelEvent} from "../apis/parcel-informations";

export const RoyalMail = {
    id: 'Royal Mail',
    needApiKey: true,
    apiKey: 'royalMail',
    regex: /^[a-z]{2}[0-9]{9}[a-z]{2}$/i,
    method: 'GET',
    getPath: trackingNumber => `https://api.royalmail.net/mailpieces/v2/${trackingNumber}/events`,
    getHeaders: (apiKey: string) => {
        return {
            'accept': 'application/json',
            'x-accept-rmg-terms': 'yes',
            'x-ibm-client-id': apiKey.split(';')[0],
            'x-ibm-client-secret': apiKey.split(';')[1],
        };
    },
    getBody: (trackingNumber: string) => {
        return {}
    },
    responseMapper: (response:any) => {
        const events = response.mailPieces.events.map((event: any) => {
            return {
                label: event.eventName,
                location: event.locationName,
                date: event.eventDateTime,
            } as ParcelEvent;
        });

        return {
            carrier: 'Royal Mail',
            isDelivered: response.mailPieces.summary.statusCategory === 'DELIVERED' || response.mailPieces.summary.statusCategory === 'delivered',
            events,
            trackingNumber: '',
            raw: response
        };
    },
} as Carrier;