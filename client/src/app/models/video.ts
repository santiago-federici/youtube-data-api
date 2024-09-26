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

export interface VideosListResponse {
  kind?: string;
  etag?: string;
  pageInfo?: PageInfo;
  items?: Video[];
}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface Video {
  kind: string;
  etag: string;
  id: ID;
  snippet: Snippet;
  contentDetails?: ContentDetails;
}

export interface ID {
  kind: string;
  videoId: string;
}

export interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
  tags?: string[];
  categoryId?: string;
}
export interface Thumbnails {
  default: Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
  standard: Thumbnail;
}

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface ContentDetails {
  caption: string;
  contentRating: Record<string, null>;
  definition: string;
  dimension: string;
  duration: string;
  hasCustomThumbnail: boolean;
  licensedContent: boolean;
  projection: string;
}
