export interface ParcelInformations {
    carrier: string;
    isDelivered: boolean;
    events: ParcelEvent[];
    trackingNumber: string;
    status?: string;
    lastUpdate?: Date;
    entryDate?: Date;
    raw: any;
}
export interface ParcelEvent {
    label: string;
    date: Date;
    location?: string;
}
