import * as request from 'request-promise';
import * as querystring from 'query-string';
import * as _ from 'lodash';
import { DocumentServiceOptions, DocumentServiceResponse } from './interfaces';

export class DocumentService {

    private apiKey: string;
    private host: string;
    private logging: boolean;

    constructor(config: DocumentServiceOptions.Config) {
        this.apiKey = config.apiKey;
        this.host = config.host || 'https://dms.meetmaestro.com';
        this.logging = config.logging || false;
    }

    /**
     * The default request options used with request
     * @return {Object}
     */
    private get defaultRequestOptions(): DocumentServiceOptions.RequestOptions {
        return {
            uri: `${this.host}`,
            method: 'GET',
            json: true,
            headers: {
                Authorization: this.apiKey
            },
            resolveWithFullResponse: true
        };
    }

    /**
     * This method fetches the pre-signed data used to upload data to S3
     * @return {Promise<T>}
     */
    getPreSignedData(options: DocumentServiceOptions.PreSignOptions = {}) {
        const params = this.createQueryString(options);
        return this.request<DocumentServiceResponse.SigningData>({
            path: `api/v1/pre-sign${params}`
        });
    }

    /**
     * This method fetches a signed url used to view private S3 content
     * @return {Promise<T>}
     */
    getSignedUrl(path: string, expiration: number = 1800) {
        const params = this.createQueryString({
            path,
            expiration
        });
        return this.request<DocumentServiceResponse.DownloadInfo>({
            path: `api/v1/sign${params}`,
        });
    }

    /**
     * This method will register the media with DMS
     * @return {Promise<T>}
     */
    register(options = {} as DocumentServiceOptions.RegistrationData) {
        if (!options.title || !options.path || !options.fileFormat) {
            throw new Error('Invalid Registration Data');
        }

        return this.request<DocumentServiceResponse.RegistrationResponse>({
            path: 'api/v1/content',
            method: 'POST',
            body: options
        });
    }

    /**
     * This method will ping DMS for the view information on registered media
     * @return {Promise<T>}
     */
    view(options = {} as DocumentServiceOptions.ViewOptions) {
        if (!options.identity) {
            throw new Error('Invalid View Data');
        }

        const params = this.createQueryString({
            registrationId: options.registrationId
        });

        return this.request<DocumentServiceResponse.ViewResponse>({
            path: `api/v1/view/${options.identity}${params}`
        });
    }

    /**
     * This method with go through an create the query string used for
     * several methods
     * @return {String}
     */
    private createQueryString(queryObj: any) {
        return Object.keys(queryObj).length ? `?${querystring.stringify(queryObj)}` : '';
    }

    /**
     * This method builds the request and returns the promise chain
     * @return {Promise<T>}
     */
    private async request<T>(options: DocumentServiceOptions.RequestOptions = {}): Promise<T> {
        const startTime = Date.now();
        const requestOptions = this.defaultRequestOptions;
        requestOptions.method = options.method || requestOptions.method;
        requestOptions.uri += `/${options.path}`;
        requestOptions.body = options.body;
        requestOptions.formData = options.formData;

        if (options.headers && options.headers.length > 0) {
            requestOptions.headers = { ...requestOptions.headers, ...options.headers };
        }

        return new Promise((resolve, reject) => {
            request(requestOptions as any).then(response => {
                if (this.logging) {
                    // tslint:disable-next-line:no-console
                    console.info({
                        statusCode: response.statusCode,
                        body: response.body,
                        duration: Date.now() - startTime
                    });
                }
                resolve(response.body);
            }).catch(error => {
                reject({
                    error,
                    status: error.statusCode || 500,
                    message: error.message,
                    duration: Date.now() - startTime
                });
            });
        });
    }
}
