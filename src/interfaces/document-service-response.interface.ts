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
        // The aws signed url for downloading
        downloadUrl: string;
        // The expiration of the signed url
        expiration: string;
        // (PDF only) The JWT needed for opening the pdf with PSPDFKit
        jwt?: string;
        // (PDF Only) The documentId needed for opening the pdf with PSPDFKit
        documentId?: number;
        // If still processing you might get back a code
        code?: string;
    }

    export interface RegistrationResponse {
        code: string;
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
