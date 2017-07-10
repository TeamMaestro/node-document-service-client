"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request");
var fs = require("fs");
var _ = require("lodash");
var mime = require("mime");
var Promise = require("bluebird");
var DocumentService = (function () {
    function DocumentService(config) {
        this.documentApiKey = config.documentApiKey;
        this.documentApiSecret = config.documentApiSecret;
        this.documentApiCustomer = config.documentApiCustomer;
        this.documentApiUrl = config.documentApiUrl;
    }
    DocumentService.prototype.getSigningData = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            request({
                headers: {
                    'media-api-key': _this.documentApiKey,
                    'media-api-secret': _this.documentApiSecret,
                    'media-api-customer': _this.documentApiCustomer
                },
                uri: _this.documentApiUrl + 'pre-sign',
                method: 'GET'
            }, function (err, res, body) {
                if (err != undefined) {
                    reject(err);
                }
                if (body.code !== undefined) {
                    reject(body.code);
                }
                try {
                    resolve(JSON.parse(body));
                }
                catch (e) {
                    console.log("JSON ERROR");
                    console.log(body);
                    reject(e);
                }
            });
        });
    };
    DocumentService.prototype.uploadFile = function (fileData) {
        var localFile = fileData.directory + '/' + fileData.filename;
        var fileExtension = (fileData.fileExtension ? fileData.fileExtension : fileData.filename.split(".").pop());
        return this.getSigningData().then(function (signingData) {
            return new Promise(function (resolve, reject) {
                if (!fs.existsSync(localFile)) {
                    reject("Missing File: " + localFile);
                }
                var form = {
                    key: signingData.key + "." + fileExtension,
                    'Content-Type': mime.lookup(fileExtension),
                    AWSAccessKeyId: signingData.AWSAccessKeyId,
                    acl: signingData.acl,
                    policy: signingData.policy,
                    signature: signingData.signature,
                    file: fs.createReadStream(localFile)
                };
                request.post({
                    url: signingData.url,
                    formData: form
                }, function (err, res, body) {
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
    };
    DocumentService.prototype.uploadBulkFiles = function (localFiles) {
        var _this = this;
        var promises = [];
        _.each(localFiles, function (localFile) {
            promises.push(_this.uploadFile(localFile));
        });
        return Promise.all(promises).then(function (files) {
            return _.keyBy(files, 'originalFilename');
        });
    };
    DocumentService.prototype.getFileUrlForDownload = function (keyUrl) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            request({
                headers: {
                    'media-api-key': _this.documentApiKey,
                    'media-api-secret': _this.documentApiSecret,
                    'media-api-customer': _this.documentApiCustomer
                },
                uri: _this.documentApiUrl + 'sign?path=' + keyUrl,
                method: 'GET'
            }, function (err, res, body) {
                if (err != undefined) {
                    reject(err);
                }
                try {
                    resolve(JSON.parse(body));
                }
                catch (e) {
                    console.log("JSON ERROR");
                    console.log(body);
                    reject(e);
                }
            });
        });
    };
    return DocumentService;
}());
exports.DocumentService = DocumentService;
