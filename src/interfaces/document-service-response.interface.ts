import { MediaProcessingCallbackStatus, MediaProcessingCallbackType } from '../types';

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

    export interface PreSignResponse {
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
    export interface SigningResponse {
        url: string;
        expiration: number;
    }

    export interface RegistrationResponse {
        identity: string;
    }

    export interface ViewResponse {
        // The status code
        statusCode: number;
        // The status message
        message?: string;
        // The aws signed url for pulling directly from s3
        url: string;
        // The expiration of the signed url
        expiration:	string;
        // The file format
        fileFormat: string;
        // The aws signed url for downloading
        downloadUrl?: string;
        // The converted content's view response
        convertedContent?: ViewResponse;
    }
}
