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

    export interface ViewResponse {
        // The aws signed url for pulling directly from s3
        url: string;
        // The expiration of the signed url
        expiration: string;
        // The aws signed url for downloading
        downloadUrl?: string;
        // The view response for the converted content
        convertedContent?: ViewResponse;
    }

    export interface RegistrationResponse {
        // The identity of the content in the Document Service
        identity: string;
    }

    export interface SigningData {
        // Everything in this top section is returned by the Document Service Sign Upload
        key: string;
        AWSAccessKeyId: string;
        acl: string;
        policy: string;
        signature: string;
        url: string;
        // The optional properties in this bottom section are configured in this client and returned to calling functions
        originalFilename?: string;
        fileExtension?: string;
    }

    export interface DownloadInfo {
        url: string;
        expiration: number;
    }
}
