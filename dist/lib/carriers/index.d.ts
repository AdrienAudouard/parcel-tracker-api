export declare const Carriers: {
    [x: string]: import("./carrier").Carrier | {
        getBody: (trackingNumber: string) => {};
        responseMapper: (response: any) => import("../apis/parcel-informations").ParcelInformations;
        needApiKey: boolean;
        apiKey: string;
        getHeaders: (apiKey: string) => {
            Accept: string;
            'X-Okapi-Key': string;
        };
        method: string;
        getPath: (trackingNumber: string) => string;
        id: string;
        regex: RegExp;
    };
};
