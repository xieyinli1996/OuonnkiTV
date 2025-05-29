// 搜索功能工具函数
import { SearchHistoryItem, CustomApi, SearchResultItem } from "./types";
import {
  SEARCH_HISTORY_KEY,
  MAX_HISTORY_ITEMS,
  ADULT_CONTENT_KEYWORDS,
} from "./config";

// 防止XSS攻击的文本清理函数
export function sanitizeText(text: string): string {
  return text
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// 获取搜索历史
export function getSearchHistory(): SearchHistoryItem[] {
  try {
    const data = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (!data) return [];

    const parsed = JSON.parse(data);

    // 确保是数组
    if (!Array.isArray(parsed)) return [];

    // 支持旧格式（字符串数组）和新格式（对象数组）
    return parsed
      .map((item) => {
        if (typeof item === "string") {
          return { text: item, timestamp: 0 };
        }
        return item;
      })
      .filter((item) => item && item.text);
  } catch (e) {
    console.error("获取搜索历史出错:", e);
    return [];
  }
}

// 保存搜索历史
export function saveSearchHistoryToStorage(query: string): void {
  if (!query || !query.trim()) return;

  // 清理输入
  query = query.trim().substring(0, 50);

  let history = getSearchHistory();

  const now = Date.now();

  // 过滤掉超过2个月的记录（60天）
  const twoMonthsAgo = 60 * 24 * 60 * 60 * 1000;
  history = history.filter(
    (item) => item.time && now - item.time < twoMonthsAgo,
  );

  // 删除已存在的相同项
  history = history.filter((item) => item.name !== query);

  // 新项添加到开头
  history.unshift({
    id: query,
    name: query,
    time: now,
  });

  // 限制历史记录数量
  if (history.length > MAX_HISTORY_ITEMS) {
    history = history.slice(0, MAX_HISTORY_ITEMS);
  }

  try {
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
  } catch (e) {
    console.error("保存搜索历史失败:", e);
    // 如果存储失败，尝试清理旧数据
    try {
      localStorage.removeItem(SEARCH_HISTORY_KEY);
      localStorage.setItem(
        SEARCH_HISTORY_KEY,
        JSON.stringify(history.slice(0, 3)),
      );
    } catch (e2) {
      console.error("再次保存搜索历史失败:", e2);
    }
  }
}

// 清除搜索历史
export function clearSearchHistoryFromStorage(): void {
  try {
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  } catch (e) {
    console.error("清除搜索历史失败:", e);
  }
}

// 获取自定义API列表
export function getCustomAPIs(): CustomApi[] {
  try {
    const data = localStorage.getItem("customAPIs");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("获取自定义API失败:", e);
    return [];
  }
}

// 保存自定义API列表
export function saveCustomAPIs(apis: CustomApi[]): void {
  try {
    localStorage.setItem("customAPIs", JSON.stringify(apis));
  } catch (e) {
    console.error("保存自定义API失败:", e);
  }
}

// 获取选中的API列表
export function getSelectedAPIs(): string[] {
  try {
    const data = localStorage.getItem("selectedAPIs");
    return data ? JSON.parse(data) : ["heimuer"];
  } catch (e) {
    console.error("获取选中API失败:", e);
    return ["heimuer"];
  }
}

// 保存选中的API列表
export function saveSelectedAPIs(apis: string[]): void {
  try {
    localStorage.setItem("selectedAPIs", JSON.stringify(apis));
  } catch (e) {
    console.error("保存选中API失败:", e);
  }
}

// 过滤成人内容
export function filterAdultContent(
  results: SearchResultItem[],
  enableFilter: boolean,
): SearchResultItem[] {
  if (!enableFilter) return results;

  return results.filter((item) => {
    const typeName = item.type_name || "";
    return !ADULT_CONTENT_KEYWORDS.some((keyword) =>
      typeName.includes(keyword),
    );
  });
}

// 格式化时间戳
export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  // 小于1小时
  if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000);
    return minutes <= 0 ? "刚刚" : `${minutes}分钟前`;
  }

  // 小于24小时
  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000);
    return `${hours}小时前`;
  }

  // 小于7天
  if (diff < 604800000) {
    const days = Math.floor(diff / 86400000);
    return `${days}天前`;
  }

  // 其他情况，显示完整日期
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hour}:${minute}`;
}

// 构建搜索API URL
export function buildSearchUrl(
  apiUrl: string,
  query: string,
  apiConfig: any,
): string {
  return `${apiUrl}${apiConfig.search.path}${encodeURIComponent(query)}`;
}

// 创建带超时的fetch
export function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout: number,
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  return fetch(url, {
    ...options,
    signal: controller.signal,
  }).finally(() => {
    clearTimeout(timeoutId);
  });
}

// 验证API响应数据
export function validateApiResponse(data: any): boolean {
  return data && data.list && Array.isArray(data.list) && data.list.length > 0;
}

// 获取自定义API信息
export function getCustomApiInfo(
  customAPIs: CustomApi[],
  customApiIndex: string,
): CustomApi | null {
  const index = parseInt(customApiIndex);
  if (isNaN(index) || index < 0 || index >= customAPIs.length) {
    return null;
  }
  return customAPIs[index];
}
