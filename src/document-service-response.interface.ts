// tslint:disable-next-line:no-namespace
export namespace DocumentServiceResponse {

    export interface ThumbnailCallback {
        identity: string;
        thumbnailUrl?: string;
        errorMessage?: string;
    }

    export interface ConversionCallback {
        identity: string;
        convertedFileLocationUrl?: string;
        errorMessage?: string;
    }
}
