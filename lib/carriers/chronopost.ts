import {LaPoste} from "./la-poste";
import {Carrier} from "./carrier";

export const Chronopost = {
    id: 'Chronopost',
    regex: /^([a-zA-Z]{2}\d{9}[a-zA-Z]{2})|([a-zA-Z\w]{15})$/i, // 2 lettres + 9 chiffres + 2 lettres (ex: XX123456789FR) ou 15 caractères
    ...LaPoste,
    getBody: (trackingNumber: string) => {
        return {}
    },
    responseMapper: (response:any) => {
        const mapped = LaPoste.responseMapper(response);
        mapped.carrier = 'Chronopost';

        return mapped;
    }
} as Carrier;