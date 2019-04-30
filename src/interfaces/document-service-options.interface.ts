export namespace DocumentServiceOptions {

    export interface Config {
        apiKey: string;
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
        // If the file should be converted
        shouldConvert?: boolean;
        // If a thumbnail should be generated
        shouldGenerateThumbnail?: boolean;
    }

    export interface ViewOptions {
        // The identity of the content
        identity: string;
        // The registrationId of the course in scorm engine
        registrationId?: string;
    }
}
