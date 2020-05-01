import { TrackerConfig } from "./apis/tracker-config";
export default class Tracker {
    config: TrackerConfig;
    constructor(config?: TrackerConfig);
    getCarriersList(): string[];
    getTrackingInformations(trackingNumber: string, carrier: string, options?: TrackerConfig): Promise<any>;
    getCourier(trackingNumber: string): string[];
}
