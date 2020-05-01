import { TrackerConfig } from "./apis/tracker-config";
import { ParcelInformations } from "./apis/parcel-informations";
declare class Tracker {
    config: TrackerConfig;
    constructor(config?: TrackerConfig);
    /**
     * Return all available carriers
     */
    getCarriersList(): string[];
    /**
     * Return tracking informations for a given tracking number and carrier
     * @param trackingNumber Tracking number
     * @param carrier Carrier name
     * @param options Tracking configaration can be optionnal, override the default config
     * @return {Promise<ParcelInformations>} parcel's informations
     */
    getTrackingInformations(trackingNumber: string, carrier: string, options?: TrackerConfig): Promise<ParcelInformations>;
    /**
     * Return the possible carriers for a given tracking numbe
     * @param trackingNumber Tracking number
     * @return {Array<string>} possible carriers founds
     */
    getCarrier(trackingNumber: string): string[];
}
export { Tracker };
declare const _default: {
    Tracker: typeof Tracker;
};
export default _default;
