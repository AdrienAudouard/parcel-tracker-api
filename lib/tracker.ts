import {Carriers} from "./carriers";
import {Carrier} from "./carriers/carrier";
import {TrackerConfig} from "./apis/tracker-config";
import RequestService from './apis/request-service';
import {ParcelInformations} from "./apis/parcel-informations";

class Tracker {
    config: TrackerConfig;

    constructor(config: TrackerConfig = {}) {
        this.config = config;
    }

    /**
     * Return all available carriers
     */
    getCarriersList(): string[] {
        return Object.keys(Carriers);
    }

    /**
     * Return tracking informations for a given tracking number and carrier
     * @param trackingNumber Tracking number
     * @param carrier Carrier name
     * @param options Tracking configaration can be optionnal, override the default config
     * @return {Promise<ParcelInformations>} parcel's informations
     */
    getTrackingInformations(trackingNumber: string, carrier: string, options: TrackerConfig = {}): Promise<ParcelInformations> {
        const carrierApi = Carriers[carrier] as Carrier;
        const requestConfig = {...this.config, ...options};

        if (!carrierApi) {
            throw new Error(`Carrier "${carrier}" is not supported yet :(`)
        }

        return RequestService.makeRequest(carrierApi, trackingNumber, requestConfig);
    }

    /**
     * Return the possible carriers for a given tracking numbe
     * @param trackingNumber Tracking number
     * @return {Array<string>} possible carriers founds
     */
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

export { Tracker };
export default { Tracker };