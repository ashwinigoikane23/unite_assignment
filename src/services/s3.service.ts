import AWS from "aws-sdk";
const s3 = new AWS.S3({ region: process.env.AWS_REGION });

export const s3Service = {
  async getPresignedUploadKey(key: string, contentType: string, expires = 60) {
    const params = {
      Bucket: process.env.S3_BUCKET || "local-bucket",
      Key: key,
      Expires: expires,
      ContentType: contentType,
    };
    try {
      const url = await s3.getSignedUrlPromise("putObject", params);
      return { url, key };
    } catch (e) {
      return { url: `https://s3.amazonaws.com/${params.Bucket}/${key}`, key };
    }
  },
};
