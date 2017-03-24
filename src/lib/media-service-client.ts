import * as request from 'request';
import * as fs from 'fs';
import * as _ from 'lodash';
import * as mime from 'mime';

import { MediaServiceConfig, MediaServiceFileConfig, MediaServiceSigningData, MediaServiceDownloadInfo, MediaServiceSigningDataByFile } from './media-service-interfaces';

export class mediaService {

    mediaApiKey: string;
    mediaApiSecret: string;
    mediaApiCustomer: string;
    mediaApiUrl: string;

    constructor(config: MediaServiceConfig) {
        this.mediaApiKey = config.mediaApiKey;
        this.mediaApiSecret = config.mediaApiSecret;
        this.mediaApiCustomer = config.mediaApiCustomer;
        this.mediaApiUrl = config.mediaApiUrl;
    }

    getSigningData(): Promise<MediaServiceSigningData> {
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

    uploadFile(fileData: MediaServiceFileConfig): Promise<MediaServiceSigningData> {

        var localFile = fileData.directory + '/' + fileData.filename;
        var fileExtension = (fileData.fileExtension ? fileData.fileExtension : fileData.filename.split(".").pop());

        return this.getSigningData().then((signingData) => {

            return new Promise((resolve, reject) => {

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

    uploadBulkFiles(localFiles: MediaServiceFileConfig[]): Promise<MediaServiceSigningDataByFile> {

            var promises: Promise<MediaServiceSigningData>[] = [];

            _.each(localFiles, (localFile) => {
                promises.push(this.uploadFile(localFile));
            });

            return Promise.all(promises).then((files) => {
                return _.keyBy(files, 'originalFilename');
            });

    }

    getFileUrlForDownload(keyUrl: string): Promise<MediaServiceDownloadInfo> {
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
