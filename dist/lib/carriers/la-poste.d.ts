import { ParcelInformations } from "../apis/parcel-informations";
export declare const LaPoste: {
    needApiKey: boolean;
    apiKey: string;
    getHeaders: (apiKey: string) => {
        Accept: string;
        'X-Okapi-Key': string;
    };
    method: string;
    getPath: (trackingNumber: string) => string;
    responseMapper: (response: any) => ParcelInformations;
};
