export declare const s3Service: {
  getPresignedUploadKey(
    key: string,
    contentType: string,
    expires?: number
  ): Promise<{
    url: string;
    key: string;
  }>;
};
