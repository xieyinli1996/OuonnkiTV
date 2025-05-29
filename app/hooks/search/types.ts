// 搜索功能相关的类型定义

// API源类型
export interface ApiSource {
  id: string;
  api: string;
  name: string;
  detail?: string;
  adult?: boolean;
}

// 自定义API类型
export interface CustomApi {
  name: string;
  url: string;
  isActive: boolean;
  isAdult?: boolean;
}

// 搜索配置类型
export interface SearchConfig {
  proxy_url: string;
  max_history_items: number;
  search_history_key: string;
  timeout: number;
  enable_adult_filter: boolean;
  enable_ad_filter: boolean;
  aggregated_search: {
    enabled: boolean;
    timeout: number;
    max_results: number;
    parallel_requests: boolean;
    show_source_badges: boolean;
  };
}

// 搜索结果项类型
export interface SearchResultItem {
  vod_id: string;
  vod_name: string;
  type_name?: string;
  vod_year?: string;
  vod_pic?: string;
  vod_remarks?: string;
  source_name: string;
  source_code: string;
  api_url?: string;
}

// 搜索历史项类型（扩展现有类型）
export interface SearchHistoryItem {
  id: string;
  name: string;
  time: number;
}

// 搜索状态类型
export interface SearchState {
  isLoading: boolean;
  error: string | null;
  results: SearchResultItem[];
  selectedAPIs: string[];
  customAPIs: CustomApi[];
}

// 搜索钩子返回类型
export interface UseSearchReturn {
  // 状态
  searchText: string;
  setSearchText: (text: string) => void;
  searchState: SearchState;
  searchHistory: SearchHistoryItem[];

  // 方法
  search: (query?: string) => Promise<void>;
  resetSearch: () => void;
  saveSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;

  // API管理
  selectedAPIs: string[];
  toggleAPI: (apiId: string) => void;
  selectAllAPIs: (selectAll?: boolean, excludeAdult?: boolean) => void;

  // 自定义API管理
  customAPIs: CustomApi[];
  addCustomAPI: (api: CustomApi) => void;
  removeCustomAPI: (index: number) => void;
  updateCustomAPI: (index: number, api: CustomApi) => void;
}

// 视频详情类型
export interface VideoDetail {
  id: string;
  name: string;
  source_code: string;
  episodes: string[];
  source_name?: string;
}

// 播放历史项类型
export interface ViewingHistoryItem {
  title: string;
  url: string;
  episodeIndex?: number;
  sourceName?: string;
  timestamp: number;
  playbackPosition?: number;
  duration?: number;
}
