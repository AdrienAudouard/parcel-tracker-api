import {Carriers} from "./carriers";
import {Carrier} from "./carriers/carrier";
import {TrackerConfig} from "./apis/tracker-config";
import RequestService from './apis/request-service';
import {ParcelInformations} from "./apis/parcel-informations";

export default class Tracker {
    config: TrackerConfig;

    constructor(config: TrackerConfig = {}) {
        this.config = config;
    }

    getCarriersList(): string[] {
        return Object.keys(Carriers);
    }

    getTrackingInformations(trackingNumber: string, carrier: string, options: TrackerConfig = {}): Promise<ParcelInformations> {
        const carrierApi = Carriers[carrier] as Carrier;
        const requestConfig = {...this.config, ...options};

        if (!carrierApi) {
            throw new Error(`Carrier "${carrier}" is not supported yet :(`)
        }

        return RequestService.makeRequest(carrierApi, trackingNumber, requestConfig);
    }

    getCarrier(trackingNumber: string): string[] {
        const carriers = Object.keys(Carriers);
        const carriersFound = [];

        for (const carrier of carriers) {
            const carrierApi = Carriers[carrier] as Carrier;

            if (trackingNumber.match(carrierApi.regex)) {
                carriersFound.push(carrier);
            }
        }

        return carriersFound;
    }
}