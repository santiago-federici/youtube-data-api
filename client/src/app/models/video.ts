export interface VideoUpload {
  title: string;
  description: string;
  categoryId: string;
  tags: string[];
  file: File;
}

export interface VideoUploadResponse {
  message?: string;
  errorMessage?: string;
  data?: VideoUpload;
}
