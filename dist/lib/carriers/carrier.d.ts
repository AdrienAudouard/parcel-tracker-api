import { ParcelInformations } from "../apis/parcel-informations";
export interface Carrier {
    id: string;
    regex: RegExp;
    needApiKey: boolean;
    apiKey?: string;
    getPath: (trackingNumber: string) => string;
    method: 'GET' | 'POST';
    getBody: (trackingNumber: string) => {};
    responseMapper: (response: any) => ParcelInformations;
    getHeaders: (apiKey?: string) => any;
}
