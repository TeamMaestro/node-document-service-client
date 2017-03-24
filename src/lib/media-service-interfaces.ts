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
    // Everything in this top section is returned by the Media Service Sign Upload
    key: string;
    AWSAccessKeyId: string;
    acl: string;
    policy: string;
    signature: string;
    url: string;
    // The optional properties in this bottom section are configured in this client and returned to calling functions
    originalFilename?: string;
    fileExtension? : string;                
}

export interface MediaServiceDownloadInfo {
  url: string;
  expiration: number;
}

export interface MediaServiceSigningDataByFile {
    [index: string]: MediaServiceSigningData
}