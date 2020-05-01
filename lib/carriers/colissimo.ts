import {LaPoste} from "./la-poste";

export const Colissimo = {
    id: 'Colissimo',
    regex: /^(([5-9]|(C))[a-zA-Z])\d{11}(FR)?$/i,
    ...LaPoste,
    getBody: (trackingNumber: string) => {
        return {}
    },
    responseMapper: (response:any) => {
        const mapped = LaPoste.responseMapper(response);
        mapped.carrier = 'Colissimo';

        return mapped;
    }
}