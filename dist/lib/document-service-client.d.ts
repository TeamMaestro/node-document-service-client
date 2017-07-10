/// <reference types="bluebird" />
import * as Promise from 'bluebird';
import { DocumentServiceConfig, DocumentServiceFileConfig } from './document-service-interfaces';
export declare class DocumentService {
    documentApiKey: string;
    documentApiSecret: string;
    documentApiCustomer: string;
    documentApiUrl: string;
    constructor(config: DocumentServiceConfig);
    getSigningData(): Promise<{}>;
    uploadFile(fileData: DocumentServiceFileConfig): Promise<{}>;
    uploadBulkFiles(localFiles: {}[]): Promise<{}>;
    getFileUrlForDownload(keyUrl: string): Promise<{}>;
}
