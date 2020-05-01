import {ParcelEvent, ParcelInformations} from "../apis/parcel-informations";

export const LaPoste = {
    needApiKey: true,
    apiKey: 'laPoste',
    getHeaders:(apiKey: string) => {
        return {
            Accept: 'application/json',
                'X-Okapi-Key': apiKey,
        }
    },
    method: 'GET',
    path: 'https://api.laposte.fr/suivi/v2/idships/',
    responseMapper: (response: any) => {
        const events = response.shipment.event.map((event: any) => {
            return {label: event.label, date: new Date(event.date)} as ParcelEvent;
        });

        return {isDelivered: response.shipment.isFinal, events} as ParcelInformations;
    },
}