export namespace DocumentServiceOptions {

    export interface Config {
        apiKey: string;
        apiSecret: string;
        apiCustomer: string;
        host?: string;
        logging?: boolean;
    }

    export interface RequestOptions {
        path?: string;
        uri?: string;
        postData?: any;
        resolveWithFullResponse?: boolean;
        json?: boolean;
        statusCodes?: { [key: number]: string };
        headers?: { [key: string]: any };
        body?: any;
        formData?: any;
        method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'COPY' | 'HEAD';
    }

    export interface FileConfig {
        directory: string;
        filename: string;
        fileExtension?: string;
    }

    export interface PreSignOptions {
        fileName?: string;
        acl?: 'private' | 'public';
        expiration?: number;
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

    export type MediaType = 'PDF'|'Documents'|'Audio'|'Courses'|'Images'|'Interactives'|'Websites'|'Video'|'Unsupported';

    export interface RegistrationData {
        // The title of the content
        title: string;
        // The identity of the content that DMS will use for callbacks
        identity: string;
        // The location of the content in S3
        path: string;
        // The contents media type used for determining all the registration requirements
        mediaType: MediaType;
    }

    export interface RegistrationResponse {
        code: string;
    }

    export interface ViewResponse {
        // The aws signed url for pulling directly from s3
        url: string;
        // The aws signed url for downloading
        downloadUrl: string;
        // The expiration of the signed url
        expiration:	string;
        // (PDF only) The JWT needed for opening the pdf with PSPDFKit
        jwt?: string;
        // (PDF Only) The documentId needed for opening the pdf with PSPDFKit
        documentId?: number;
        // If still processing you might get back a code
        code?: string;
    }

    export interface DownloadInfo {
        url: string;
        expiration: number;
    }

    export interface SigningDataByFile {
        [index: string]: SigningData;
    }
}
