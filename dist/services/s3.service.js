"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Service = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const s3 = new aws_sdk_1.default.S3({ region: process.env.AWS_REGION });
exports.s3Service = {
    async getPresignedUploadKey(key, contentType, expires = 60) {
        const params = {
            Bucket: process.env.S3_BUCKET || "local-bucket",
            Key: key,
            Expires: expires,
            ContentType: contentType,
        };
        try {
            const url = await s3.getSignedUrlPromise("putObject", params);
            return { url, key };
        }
        catch (e) {
            return { url: `https://s3.amazonaws.com/${params.Bucket}/${key}`, key };
        }
    },
};
//# sourceMappingURL=s3.service.js.map