import { MediaServiceConfig, MediaServiceFileConfig, MediaServiceSigningData, MediaServiceDownloadInfo, MediaServiceSigningDataByFile } from './media-service-interfaces';
export declare class mediaService {
    mediaApiKey: string;
    mediaApiSecret: string;
    mediaApiCustomer: string;
    mediaApiUrl: string;
    constructor(config: MediaServiceConfig);
    getSigningData(): Promise<MediaServiceSigningData>;
    uploadFile(fileData: MediaServiceFileConfig): Promise<MediaServiceSigningData>;
    uploadBulkFiles(localFiles: MediaServiceFileConfig[]): Promise<MediaServiceSigningDataByFile>;
    getFileUrlForDownload(keyUrl: string): Promise<MediaServiceDownloadInfo>;
}
