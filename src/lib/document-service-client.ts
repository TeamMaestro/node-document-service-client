import * as request from 'request';
import * as fs from 'fs';
import * as _ from 'lodash';
import * as mime from 'mime';

import { DocumentServiceConfig, DocumentServiceFileConfig, DocumentServiceSigningData,
         DocumentServiceDownloadInfo, DocumentServiceSigningDataByFile } from './document-service-interfaces';

export class DocumentService {

    mediaApiKey: string;
    mediaApiSecret: string;
    mediaApiCustomer: string;
    mediaApiUrl: string;

    constructor(config: DocumentServiceConfig) {
        this.mediaApiKey = config.mediaApiKey;
        this.mediaApiSecret = config.mediaApiSecret;
        this.mediaApiCustomer = config.mediaApiCustomer;
        this.mediaApiUrl = config.mediaApiUrl;
    }

    getSigningData(): Promise<DocumentServiceSigningData> {
        return new Promise((resolve, reject) => {

            request({
                headers: {
                    'media-api-key': this.mediaApiKey,
                    'media-api-secret': this.mediaApiSecret,
                    'media-api-customer': this.mediaApiCustomer
                },
                uri: this.mediaApiUrl + 'sign/upload',
                method: 'GET'
            }, (err, res, body) => {
                if (err != undefined) {
                    reject(err);
                }

                try {
                    resolve(JSON.parse(body));
                } catch(e) {
                    reject(e);
                }
                
            });

        });
    }

    uploadFile(fileData: DocumentServiceFileConfig): Promise<DocumentServiceSigningData> {

        var localFile = fileData.directory + '/' + fileData.filename;
        var fileExtension = (fileData.fileExtension ? fileData.fileExtension : fileData.filename.split(".").pop());

        return this.getSigningData().then((signingData) => {

            return new Promise((resolve, reject) => {

                if (!fs.existsSync(localFile)) {
                    reject("Missing File: " + localFile);
                }

                var form = {
                    key: signingData.key + "." + fileExtension,
                    'Content-Type': mime.lookup(fileExtension),
                    AWSAccessKeyId: signingData.AWSAccessKeyId,
                    acl: signingData.acl,
                    policy: signingData.policy,
                    signature: signingData.signature,
                    file: fs.createReadStream(localFile)
                };

                console.log("Sending POST to: " + signingData.url);

                request.post({
                    url: signingData.url,
                    formData: form
                }, (err, res, body) => {
                    
                    if (err != undefined) {
                        reject(err);
                    }
                    signingData.originalFilename = fileData.filename;
                    signingData.fileExtension = fileExtension;
                    // We want to return the signing data, not the file upload response, as that doesn't contain any important info unlike the signing data.
                    resolve(signingData);

                });

            });

        });

    }

    uploadBulkFiles(localFiles: DocumentServiceFileConfig[]): Promise<DocumentServiceSigningDataByFile> {

            var promises: Promise<DocumentServiceSigningData>[] = [];

            _.each(localFiles, localFile => {
                promises.push(this.uploadFile(localFile));
            });

            return Promise.all(promises).then((files) => {
                return _.keyBy(files, 'originalFilename');
            });

    }

    getFileUrlForDownload(keyUrl: string): Promise<DocumentServiceDownloadInfo> {
        return new Promise((resolve, reject) => {
            
            request({
                headers: {
                    'media-api-key': this.mediaApiKey,
                    'media-api-secret': this.mediaApiSecret,
                    'media-api-customer': this.mediaApiCustomer
                },
                uri: this.mediaApiUrl + 'sign/url?path=' + keyUrl,
                method: 'GET'
            }, (err, res, body) => {
                if (err != undefined) {
                    reject(err);
                }

                try {
                    resolve(JSON.parse(body));
                } catch(e) {
                    reject(e);
                }
            });

        });
    }

}
