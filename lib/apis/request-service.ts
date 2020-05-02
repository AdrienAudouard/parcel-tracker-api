import {Carrier} from "../carriers/carrier";
import {TrackerConfig} from "./tracker-config";
import {ParcelEvent, ParcelInformations} from "./parcel-informations";
import axios, {AxiosRequestConfig} from "axios";

class RequestService {
    makeRequest(carrier: Carrier, trackingNumber: string, options: TrackerConfig): Promise<ParcelInformations> {
        const apiKey = this.getApiKey(carrier, options);
        const config = this.createAxiosConfig(carrier, trackingNumber, apiKey, options);

        return axios(config)
            .then(response => {
                const {data} = response;
                const mapped = carrier.responseMapper(data);

                mapped.events = mapped.events.sort((a: ParcelEvent, b: ParcelEvent) => b.date.getTime() - a.date.getTime())

                if (mapped.events.length > 0) {
                    mapped.status = mapped.events[0].label;
                    mapped.lastUpdate = mapped.events[0].date;
                    mapped.entryDate = mapped.events[mapped.events.length - 1].date;
                }

                mapped.trackingNumber = trackingNumber;

                return mapped;
            })
    }

    private createAxiosConfig(carrier: Carrier, trackingNumber: string, apiKey: string, options: TrackerConfig) {
        const body = carrier.method !== 'GET' ? carrier.getBody(trackingNumber) : {};
        const url = carrier.getPath(trackingNumber);

        const config = {
            method: carrier.method,
            url,
            headers: carrier.getHeaders(apiKey),
        } as AxiosRequestConfig;

        if (carrier.method === 'POST') {
            config.data = body;
        }

        if (options.enableCrossOrigin) {
            config.url = 'https://cors-anywhere.herokuapp.com/' + config.url;
        }
        return config;
    }

    private getApiKey(carrier: Carrier, options: TrackerConfig): string {
        if (carrier.needApiKey) {
            const apiError = `Carrier ${carrier.id} need a api key. Please set it in TrackerConfig.apiKeys`;

            if (!options.apiKeys) {
                throw new Error(apiError);
            }

            const apiIndex = carrier.apiKey as string;

            // @ts-ignore
            if (!options.apiKeys[apiIndex]) {
                throw new Error(apiError)
            }

            // @ts-ignore
            return (options.apiKeys[apiIndex] as string);
        }

        return '';
    }
}

export default new RequestService();