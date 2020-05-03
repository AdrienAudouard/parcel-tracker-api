export interface ParcelInformations {
    //  Carrier used to get data
    carrier: string;

    // True if the parcel is delivered
    isDelivered: boolean;

    // Tracking events
    events: ParcelEvent[];

    // Tracker number
    trackingNumber: string;

    // The last status provided by the carrier
    status?: string;

    // Date of the last event
    lastUpdate?: Date;

    // Date of the first event
    entryDate?: Date;

    // Raw response from the api
    raw: any;
}

export interface ParcelEvent {
    // Label of the event
    label: string;

    // Event's date
    date: Date;

    // Event's location if it provided by the carrier
    location?: string;
}