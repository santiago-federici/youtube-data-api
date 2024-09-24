export interface VideoUpload {
  title: string;
  description: string;
  categoryId: string;
  tags: string[];
  file: File | null;
}
