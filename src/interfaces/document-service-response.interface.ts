import { MediaProcessingCallbackType, MediaProcessingCallbackStatus } from '../types';

// tslint:disable-next-line:no-namespace
export namespace DocumentServiceResponse {

    export interface MediaProcessingCallback {
        type: MediaProcessingCallbackType;
        status: MediaProcessingCallbackStatus;
        identity: string;
        locationUrl?: string;
        processUrl?: string;
        errorMessage?: string;
    }
}
