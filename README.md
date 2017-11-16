# node-document-service-client
A TypeScript NodeJS client that interfaces with the Maestro Document Management Service

## Getting Started

Run this to install the latest stable version.

> npm i @teammaestro/node-document-service-client

All you need to do is point is import `@teammaestro/node-document-service-client` within your project and the client will be exported into your script from the latest build.

`import { DocumentService } from 'node-document-service-client';`

# Documentation
## Overview
### new DocumentService(options: any)
**Parameters:**
* host (string | _optional_ | _default: 127.0.0.1_) - The domain that the Maestro Document Service is located at
* apiKey (string | _required_) - The API Key you are given to communication with DMS
* apiSecret (string | _required_) - The API Secret you are given to communication with DMS
* apiCustomer (string | _required_) - The API Customer you are given to communication with DMS
* logging (boolean | _optional_ | _default: false_) - Use this to turn on logging of all requests


**Request Example:**
```javascript
new DocumentService({
    host: 'https://dev-dms.meetmaestro.com';
    apiKey: '432432',
    apiSecret: '432432',
    apiCustomer: '432432',
    logging: true
})
```

### .catch()
Whenever the API makes a call and runs into a catch block, you will get an error block that looks consistently like this:
* error (Error) - The exception that was thrown
* status (number) - The HTTP Status Code
* message (string) - The HTTP error message (some are custom mapped)
* duration (number) - How long the response took in miliseconds
**Response Example:**
```
{
    error: Error
    status: 500,
    message: 'Internal Server Error',
    duration: 300
}
```

### getPreSignedConfig() [GET /api/v1/pre-sign](https://dev-dms.meetmaestro.com:3000/#api-Signing-Pre_Sign_Url)
This endpoint is used for creating policies in order to upload content to your S3 bucket Note: You must send the payload to S3 in the order that we send them back

**Request Example:**
```javascript
dms.getPreSignedConfig()
```
**Response Example:**
```
{
    "url": "https://new-media-test-bucket.s3.amazonaws.com",
    "key": "a8231d87-c327-4cfc-a225-d1567de732ce",
    "Content-Type": "binary/octet-stream",
    "AWSAccessKeyId": "AKIAIF4CQIVFLH2VGVNA",
    "acl": "public-read",
    "policy": "eyJleHBpcmF0aW9uIjoiMjAxNy0wMi0xM1QwN...",
    "signature": "mmgVVFG6swkWvm3AmWZ9FB71R8s=",
    "expiration": "2017-04-06T14:49:16.267Z"
}
```

### getSignedUrl() [GET /api/v1/sign](https://dev-dms.meetmaestro.com:3000/#api-Signing-Sign_Url)
This endpoint is used for signing your S3 private content


**Request Example:**
```javascript
dms.getSignedUrl('https://new-media-test-bucket.s3.amazonaws.com/test.pdf')
```
**Response Example:**
```
{
  "url": "https://bucket.s3.amazonaws.com/73aff5ee-a986-4af...",
  "expiration": "2017-04-06T14:49:16.267Z"
}
```