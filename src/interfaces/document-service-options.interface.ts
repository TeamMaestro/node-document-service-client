export namespace DocumentServiceOptions {

    export interface Config {
        host?: string;
        logging?: boolean | ((message: any) => void);
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

    export interface PreSignPayload {
        filename?: string;
        acl?: 'private' | 'public';
        expiration?: number;
    }

    export interface SigningPayload {
        path: string;
        filename?: string;
        expiration?: number;
    }

    export interface RegistrationPayload {
        // The title of the content
        title: string;
        // The location of the content in S3
        path: string;
        // The format of the file
        fileFormat: string;
        // The format to convert the file to
        convertFormat?: string;
        // If a thumbnail should be generated
        shouldGenerateThumbnail?: boolean;
    }

    export interface ViewPayload {
        // The identity of the content
        identity: string;
        // The registrationId of the course in scorm engine
        registrationId?: string;
    }
}
