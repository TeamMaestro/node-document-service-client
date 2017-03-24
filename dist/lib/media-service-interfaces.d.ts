export interface MediaServiceConfig {
    mediaApiKey: string;
    mediaApiSecret: string;
    mediaApiCustomer: string;
    mediaApiUrl: string;
}
export interface MediaServiceFileConfig {
    directory: string;
    filename: string;
    fileExtension?: string;
}
export interface MediaServiceSigningData {
    key: string;
    AWSAccessKeyId: string;
    acl: string;
    policy: string;
    signature: string;
    url: string;
    originalFilename?: string;
    fileExtension?: string;
}
export interface MediaServiceDownloadInfo {
    url: string;
    expiration: number;
}
export interface MediaServiceSigningDataByFile {
    [index: string]: MediaServiceSigningData;
}
