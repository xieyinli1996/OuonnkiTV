// 搜索功能的主要导出文件

// 导出hooks
export { useSearch } from "./useSearch";

// 导出类型
export type {
  ApiSource,
  CustomApi,
  SearchConfig,
  SearchResultItem,
  SearchHistoryItem,
  SearchState,
  UseSearchReturn,
  VideoDetail,
  ViewingHistoryItem,
} from "./types";

// 导出配置
export {
  PROXY_URL,
  SEARCH_HISTORY_KEY,
  MAX_HISTORY_ITEMS,
  API_SITES,
  API_CONFIG,
  DEFAULT_SEARCH_CONFIG,
  ADULT_CONTENT_KEYWORDS,
  ERROR_MESSAGES,
} from "./config";

// 导出工具函数
export {
  sanitizeText,
  getSearchHistory,
  saveSearchHistoryToStorage,
  clearSearchHistoryFromStorage,
  getCustomAPIs,
  saveCustomAPIs,
  getSelectedAPIs,
  saveSelectedAPIs,
  filterAdultContent,
  formatTimestamp,
  buildSearchUrl,
  fetchWithTimeout,
  validateApiResponse,
  getCustomApiInfo,
} from "./utils";
