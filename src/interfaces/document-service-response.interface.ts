import { MediaProcessingCallbackType } from '../types';

// tslint:disable-next-line:no-namespace
export namespace DocumentServiceResponse {

    export interface MediaProcessingCallback {
        type: MediaProcessingCallbackType;
        identity: string;
        locationUrl?: string;
        errorMessage?: string;
    }
}
