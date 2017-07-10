export interface DocumentServiceConfig {
    documentApiKey: string;
    documentApiSecret: string;
    documentApiCustomer: string;
    documentApiUrl: string;
}
export interface DocumentServiceFileConfig {
    directory: string;
    filename: string;
    fileExtension?: string;
}
export interface DocumentServiceSigningData {
    key: string;
    AWSAccessKeyId: string;
    acl: string;
    policy: string;
    signature: string;
    url: string;
    originalFilename?: string;
    fileExtension?: string;
}
export interface DocumentServiceDownloadInfo {
    url: string;
    expiration: number;
}
export interface DocumentServiceSigningDataByFile {
    [index: string]: DocumentServiceSigningData;
}
