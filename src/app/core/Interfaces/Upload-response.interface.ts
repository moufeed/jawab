export interface UploadResponse {
  uploadTransactionId: string | null;
  urls: Array<{
    url: string;
    name: string;
    thumbnailName: string;
    type: string;
    uploadedDate: string;
  }>;
}
