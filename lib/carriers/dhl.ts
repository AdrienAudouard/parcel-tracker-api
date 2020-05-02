import {Carrier} from "./carrier";
import {ParcelEvent} from "../apis/parcel-informations";

export const DHL = {
    id: 'DHL',
    getPath: trackingNumber => `https://api-eu.dhl.com/track/shipments?trackingNumber=${trackingNumber}`,
    needApiKey: true,
    apiKey: 'DHL',
    method: 'GET',
    regex: /^[0-9]{10,11}$/ig,
    getBody: (trackingNumber: string) => {
        return {}
    },
    getHeaders: (apiKey: string) => {
        return {
            'DHL-API-Key': apiKey,
            'accept': 'application/json'
        }
    },
    responseMapper: (response: any) => {
        const events = response.shipments[0].events.map((event: any) => {
            const mappedEvent = {
                label: event.description,
                date: new Date(event.timestamp),
            } as ParcelEvent;

            if (event.location && event.location.address && event.location.address.addressLocality) {
                mappedEvent.location = event.location.address.addressLocality;
            }

            return mappedEvent;
        });

        return {
            carrier: 'DHL',
            isDelivered: response.shipments[0].status.statusCode === 'delivered',
            events
        };
    },
} as Carrier;