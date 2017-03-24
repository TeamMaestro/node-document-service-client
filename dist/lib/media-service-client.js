"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require("request");
var fs = require("fs");
var _ = require("lodash");
var mime = require("mime");
var mediaService = (function () {
    function mediaService(config) {
        this.mediaApiKey = config.mediaApiKey;
        this.mediaApiSecret = config.mediaApiSecret;
        this.mediaApiCustomer = config.mediaApiCustomer;
        this.mediaApiUrl = config.mediaApiUrl;
    }
    mediaService.prototype.getSigningData = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            request({
                headers: {
                    'media-api-key': _this.mediaApiKey,
                    'media-api-secret': _this.mediaApiSecret,
                    'media-api-customer': _this.mediaApiCustomer
                },
                uri: _this.mediaApiUrl + '/sign/upload',
                method: 'GET'
            }, function (err, res, body) {
                if (err != undefined) {
                    reject(err);
                }
                resolve(JSON.parse(body));
            });
        });
    };
    mediaService.prototype.uploadFile = function (fileData) {
        var localFile = fileData.directory + '/' + fileData.filename;
        var fileExtension = (fileData.fileExtension ? fileData.fileExtension : fileData.filename.split(".").pop());
        return this.getSigningData().then(function (signingData) {
            return new Promise(function (resolve, reject) {
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
    mediaService.prototype.uploadBulkFiles = function (localFiles) {
        var _this = this;
        var promises = [];
        _.each(localFiles, function (localFile) {
            promises.push(_this.uploadFile(localFile));
        });
        return Promise.all(promises).then(function (files) {
            return _.keyBy(files, 'originalFilename');
        });
    };
    mediaService.prototype.getFileUrlForDownload = function (keyUrl) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            request({
                headers: {
                    'media-api-key': _this.mediaApiKey,
                    'media-api-secret': _this.mediaApiSecret,
                    'media-api-customer': _this.mediaApiCustomer
                },
                uri: _this.mediaApiUrl + '/sign/url?path=' + keyUrl,
                method: 'GET'
            }, function (err, res, body) {
                if (err != undefined) {
                    reject(err);
                }
                resolve(JSON.parse(body));
            });
        });
    };
    return mediaService;
}());
exports.mediaService = mediaService;
