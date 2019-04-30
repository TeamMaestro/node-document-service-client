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

    export interface RegistrationData {
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

    export interface ViewOptions {
        // The identity of the content
        identity: string;
        // The registrationId of the course in scorm engine
        registrationId?: string;
    }
}
