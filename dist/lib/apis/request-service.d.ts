import { Carrier } from "../carriers/carrier";
import { TrackerConfig } from "./tracker-config";
import { ParcelInformations } from "./parcel-informations";
declare class RequestService {
    makeRequest(carrier: Carrier, trackingNumber: string, options: TrackerConfig): Promise<ParcelInformations>;
    private createAxiosConfig;
    private getApiKey;
}
declare const _default: RequestService;
export default _default;
