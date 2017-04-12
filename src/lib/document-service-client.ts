import * as request from 'request';
import * as fs from 'fs';
import * as _ from 'lodash';
import * as mime from 'mime';
import * as Promise from 'bluebird';

import { DocumentServiceConfig, DocumentServiceFileConfig, DocumentServiceSigningData,
         DocumentServiceDownloadInfo, DocumentServiceSigningDataByFile } from './document-service-interfaces';

export class DocumentService {

    documentApiKey: string;
    documentApiSecret: string;
    documentApiCustomer: string;
    documentApiUrl: string;

    constructor(config: DocumentServiceConfig) {
        this.documentApiKey = config.documentApiKey;
        this.documentApiSecret = config.documentApiSecret;
        this.documentApiCustomer = config.documentApiCustomer;
        this.documentApiUrl = config.documentApiUrl;
    }

    getSigningData(): Promise<{}> {
        return new Promise((resolve, reject) => {

            request({
                headers: {
                    'media-api-key': this.documentApiKey,
                    'media-api-secret': this.documentApiSecret,
                    'media-api-customer': this.documentApiCustomer
                },
                uri: this.documentApiUrl + 'pre-sign',
                method: 'GET'
            }, (err, res, body) => {
                if (err != undefined) {
                    reject(err);
                }

                console.log("Signing Data Returned");
                console.log(body);

                try {
                    resolve(JSON.parse(body));
                } catch(e) {
                    reject(e);
                }
                
            });

        });
    }

    uploadFile(fileData: DocumentServiceFileConfig): Promise<{}> {

        var localFile = fileData.directory + '/' + fileData.filename;
        var fileExtension = (fileData.fileExtension ? fileData.fileExtension : fileData.filename.split(".").pop());

        console.log("Calling Upload File");

        return this.getSigningData().then((signingData: DocumentServiceSigningData) => {

            return new Promise((resolve, reject) => {

                if (!fs.existsSync(localFile)) {
                    reject("Missing File: " + localFile);
                }

                console.log("Prepping Form Data");

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

    uploadBulkFiles(localFiles: {}[]): Promise<{}> {

            var promises: Promise<{}>[] = [];

            console.log("Bulk Upload Start");

            _.each(localFiles, (localFile: DocumentServiceFileConfig) => {
                promises.push(this.uploadFile(localFile));
            });

            return Promise.all(promises).then((files) => {
                console.log("Bulk Upload Complete");
                return _.keyBy(files, 'originalFilename');
            });

    }

    getFileUrlForDownload(keyUrl: string): Promise<{}> {
        return new Promise((resolve, reject) => {
            
            request({
                headers: {
                    'media-api-key': this.documentApiKey,
                    'media-api-secret': this.documentApiSecret,
                    'media-api-customer': this.documentApiCustomer
                },
                uri: this.documentApiUrl + 'sign?path=' + keyUrl,
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
