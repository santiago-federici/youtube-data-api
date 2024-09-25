export interface ChannelListResponse {
  kind?: string;
  etag?: string;
  pageInfo?: PageInfo;
  items?: ChannelItem[];
}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface ChannelItem {
  kind: string;
  etag: string;
  id: ID;
  snippet: ChannelSnippet;
  contentDetails: ChannelContentDetails;
  statistics: ChannelStatistics;
}

export interface ID {
  kind: string;
  videoId: string;
}

export interface ChannelSnippet {
  title: string;
  description: string;
  customUrl: string;
  publishedAt: string;
  thumbnails: Thumbnails;
  localized: Localized;
}

export interface Thumbnails {
  default: Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
}

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Localized {
  title: string;
  description: string;
}

export interface ChannelContentDetails {
  relatedPlaylists: RelatedPlaylists;
}

export interface RelatedPlaylists {
  likes: string;
  uploads: string;
}

export interface ChannelStatistics {
  hiddenSubscriberCount: boolean;
  subscriberCount: string;
  videoCount: string;
  viewCount: string;
}
