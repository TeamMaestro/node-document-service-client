export interface DocumentServiceConfig {
    mediaApiKey: string;
    mediaApiSecret: string;
    mediaApiCustomer: string;
    mediaApiUrl: string;
}

export interface DocumentServiceFileConfig {
    directory: string;
    filename: string;
    fileExtension?: string;
}

export interface DocumentServiceSigningData {
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

export interface DocumentServiceDownloadInfo {
  url: string;
  expiration: number;
}

export interface DocumentServiceSigningDataByFile {
    [index: string]: DocumentServiceSigningData
}