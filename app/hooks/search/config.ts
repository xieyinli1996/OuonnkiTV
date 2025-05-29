// 搜索功能配置
import { ApiSource, SearchConfig } from "./types";

// 代理URL
export const PROXY_URL = "https://cors.zme.ink/";

// 搜索历史键名
export const SEARCH_HISTORY_KEY = "videoSearchHistory";

// 最大历史记录数
export const MAX_HISTORY_ITEMS = 5;

// API站点配置
export const API_SITES: Record<string, ApiSource> = {
  heimuer: {
    id: "heimuer",
    api: "https://json.heimuer.xyz",
    name: "黑木耳",
    detail: "https://heimuer.tv",
  },
  ffzy: {
    id: "ffzy",
    api: "http://ffzy5.tv",
    name: "非凡影视",
    detail: "http://ffzy5.tv",
  },
  tyyszy: {
    id: "tyyszy",
    api: "https://tyyszy.com",
    name: "天涯资源",
  },
  ckzy: {
    id: "ckzy",
    api: "https://www.ckzy1.com",
    name: "CK资源",
    adult: true,
  },
  zy360: {
    id: "zy360",
    api: "https://360zy.com",
    name: "360资源",
  },
  wolong: {
    id: "wolong",
    api: "https://wolongzyw.com",
    name: "卧龙资源",
  },
  cjhw: {
    id: "cjhw",
    api: "https://cjhwba.com",
    name: "新华为",
  },
  hwba: {
    id: "hwba",
    api: "https://cjwba.com",
    name: "华为吧资源",
  },
  jisu: {
    id: "jisu",
    api: "https://jszyapi.com",
    name: "极速资源",
    detail: "https://jszyapi.com",
  },
  dbzy: {
    id: "dbzy",
    api: "https://dbzy.com",
    name: "豆瓣资源",
  },
  bfzy: {
    id: "bfzy",
    api: "https://bfzyapi.com",
    name: "暴风资源",
  },
  mozhua: {
    id: "mozhua",
    api: "https://mozhuazy.com",
    name: "魔爪资源",
  },
  mdzy: {
    id: "mdzy",
    api: "https://www.mdzyapi.com",
    name: "魔都资源",
  },
  ruyi: {
    id: "ruyi",
    api: "https://cj.rycjapi.com",
    name: "如意资源",
  },
  jkun: {
    id: "jkun",
    api: "https://jkunzyapi.com",
    name: "jkun资源",
    adult: true,
  },
  bwzy: {
    id: "bwzy",
    api: "https://api.bwzym3u8.com",
    name: "百万资源",
    adult: true,
  },
  souav: {
    id: "souav",
    api: "https://api.souavzy.vip",
    name: "souav资源",
    adult: true,
  },
  siwa: {
    id: "siwa",
    api: "https://siwazyw.tv",
    name: "丝袜资源",
    adult: true,
  },
  r155: {
    id: "r155",
    api: "https://155api.com",
    name: "155资源",
    adult: true,
  },
  lsb: {
    id: "lsb",
    api: "https://apilsbzy1.com",
    name: "lsb资源",
    adult: true,
  },
  huangcang: {
    id: "huangcang",
    api: "https://hsckzy.vip",
    name: "黄色仓库",
    adult: true,
    detail: "https://hsckzy.vip",
  },
};

// API请求配置
export const API_CONFIG = {
  search: {
    path: "/api.php/provide/vod/?ac=videolist&wd=",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      Accept: "application/json",
    },
  },
  detail: {
    path: "/api.php/provide/vod/?ac=videolist&ids=",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      Accept: "application/json",
    },
  },
};

// 默认搜索配置
export const DEFAULT_SEARCH_CONFIG: SearchConfig = {
  proxy_url: PROXY_URL,
  max_history_items: MAX_HISTORY_ITEMS,
  search_history_key: SEARCH_HISTORY_KEY,
  timeout: 8000,
  enable_adult_filter: true,
  enable_ad_filter: true,
  aggregated_search: {
    enabled: true,
    timeout: 8000,
    max_results: 10000,
    parallel_requests: true,
    show_source_badges: true,
  },
};

// 黄色内容过滤关键词
export const ADULT_CONTENT_KEYWORDS = [
  "伦理片",
  "门事件",
  "萝莉少女",
  "制服诱惑",
  "国产传媒",
  "cosplay",
  "黑丝诱惑",
  "无码",
  "日本无码",
  "有码",
  "日本有码",
  "SWAG",
  "网红主播",
  "色情片",
  "同性片",
  "福利视频",
  "福利片",
];

// 错误消息
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "网络连接错误，请检查网络设置",
  TIMEOUT_ERROR: "请求超时，服务器响应时间过长",
  API_ERROR: "API接口返回错误，请尝试更换数据源",
  PLAYER_ERROR: "播放器加载失败，请尝试其他视频源",
  UNKNOWN_ERROR: "发生未知错误，请刷新页面重试",
  EMPTY_SEARCH: "请输入搜索内容",
  NO_API_SELECTED: "请至少选择一个API源",
  NO_RESULTS: "没有找到匹配的结果",
};
