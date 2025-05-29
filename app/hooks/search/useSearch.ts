"use client";
import { useState, useCallback, useEffect } from "react";
import { useAtom } from "jotai";
import { searchTextAtom } from "@/app/lib/search/state";
import {
  SearchState,
  UseSearchReturn,
  SearchResultItem,
  CustomApi,
  SearchHistoryItem,
} from "./types";
import {
  API_SITES,
  API_CONFIG,
  DEFAULT_SEARCH_CONFIG,
  ERROR_MESSAGES,
} from "./config";
import {
  getSearchHistory,
  saveSearchHistoryToStorage,
  clearSearchHistoryFromStorage,
  getCustomAPIs,
  saveCustomAPIs,
  getSelectedAPIs,
  saveSelectedAPIs,
  filterAdultContent,
  buildSearchUrl,
  fetchWithTimeout,
  validateApiResponse,
  getCustomApiInfo,
} from "./utils";

export function useSearch(): UseSearchReturn {
  // 搜索文本状态（使用Jotai）
  const [searchText, setSearchText] = useAtom(searchTextAtom);

  // 搜索状态
  const [searchState, setSearchState] = useState<SearchState>({
    isLoading: false,
    error: null,
    results: [],
    selectedAPIs: getSelectedAPIs(),
    customAPIs: getCustomAPIs(),
  });

  // 搜索历史
  const [searchHistory, setSearchHistory] =
    useState<SearchHistoryItem[]>(getSearchHistory());

  // 搜索配置
  const [config] = useState(DEFAULT_SEARCH_CONFIG);

  // 重置搜索
  const resetSearch = useCallback(() => {
    setSearchText("");
    setSearchState((prev) => ({
      ...prev,
      results: [],
      error: null,
    }));
  }, [setSearchText]);

  // 保存搜索历史
  const saveSearchHistory = useCallback((query: string) => {
    saveSearchHistoryToStorage(query);
    setSearchHistory(getSearchHistory());
  }, []);

  // 清除搜索历史
  const clearSearchHistory = useCallback(() => {
    clearSearchHistoryFromStorage();
    setSearchHistory([]);
  }, []);

  // 切换API选择
  const toggleAPI = useCallback((apiId: string) => {
    setSearchState((prev) => {
      const newSelectedAPIs = prev.selectedAPIs.includes(apiId)
        ? prev.selectedAPIs.filter((id) => id !== apiId)
        : [...prev.selectedAPIs, apiId];

      saveSelectedAPIs(newSelectedAPIs);

      return {
        ...prev,
        selectedAPIs: newSelectedAPIs,
      };
    });
  }, []);

  // 全选/取消全选API
  const selectAllAPIs = useCallback(
    (selectAll = true, excludeAdult = false) => {
      const allApiIds = Object.keys(API_SITES).filter((id) => {
        if (excludeAdult) {
          return !API_SITES[id].adult;
        }
        return true;
      });

      const customApiIds = searchState.customAPIs.map(
        (_, index) => `custom_${index}`,
      );
      const allIds = [...allApiIds, ...customApiIds];

      const newSelectedAPIs = selectAll ? allIds : [];
      saveSelectedAPIs(newSelectedAPIs);

      setSearchState((prev) => ({
        ...prev,
        selectedAPIs: newSelectedAPIs,
      }));
    },
    [searchState.customAPIs],
  );

  // 添加自定义API
  const addCustomAPI = useCallback(
    (api: CustomApi) => {
      const newCustomAPIs = [...searchState.customAPIs, api];
      saveCustomAPIs(newCustomAPIs);

      setSearchState((prev) => ({
        ...prev,
        customAPIs: newCustomAPIs,
      }));
    },
    [searchState.customAPIs],
  );

  // 删除自定义API
  const removeCustomAPI = useCallback(
    (index: number) => {
      const newCustomAPIs = searchState.customAPIs.filter(
        (_, i) => i !== index,
      );
      saveCustomAPIs(newCustomAPIs);

      // 更新选中的API列表
      const customApiId = `custom_${index}`;
      const newSelectedAPIs = searchState.selectedAPIs.filter(
        (id) => id !== customApiId,
      );

      // 更新大于此索引的自定义API ID
      const updatedSelectedAPIs = newSelectedAPIs.map((id) => {
        if (id.startsWith("custom_")) {
          const currentIndex = parseInt(id.replace("custom_", ""));
          if (currentIndex > index) {
            return `custom_${currentIndex - 1}`;
          }
        }
        return id;
      });

      saveSelectedAPIs(updatedSelectedAPIs);

      setSearchState((prev) => ({
        ...prev,
        customAPIs: newCustomAPIs,
        selectedAPIs: updatedSelectedAPIs,
      }));
    },
    [searchState.customAPIs, searchState.selectedAPIs],
  );

  // 更新自定义API
  const updateCustomAPI = useCallback(
    (index: number, api: CustomApi) => {
      const newCustomAPIs = [...searchState.customAPIs];
      newCustomAPIs[index] = api;
      saveCustomAPIs(newCustomAPIs);

      setSearchState((prev) => ({
        ...prev,
        customAPIs: newCustomAPIs,
      }));
    },
    [searchState.customAPIs],
  );

  // 执行搜索的单个API源
  const searchSingleAPI = async (
    apiId: string,
    query: string,
  ): Promise<SearchResultItem[]> => {
    try {
      let apiUrl: string;
      let apiName: string;

      // 处理自定义API
      if (apiId.startsWith("custom_")) {
        const customIndex = apiId.replace("custom_", "");
        const customApi = getCustomApiInfo(searchState.customAPIs, customIndex);
        if (!customApi) return [];

        apiUrl = buildSearchUrl(customApi.url, query, API_CONFIG);
        apiName = customApi.name;
      } else {
        // 内置API
        if (!API_SITES[apiId]) return [];
        apiUrl = buildSearchUrl(API_SITES[apiId].api, query, API_CONFIG);
        apiName = API_SITES[apiId].name;
      }

      // 使用代理URL
      const proxyUrl = config.proxy_url + encodeURIComponent(apiUrl);

      const response = await fetchWithTimeout(
        proxyUrl,
        { headers: API_CONFIG.search.headers },
        config.timeout,
      );

      if (!response.ok) {
        console.warn(`API ${apiId} 响应错误:`, response.status);
        return [];
      }

      const data = await response.json();

      if (!validateApiResponse(data)) {
        return [];
      }

      // 添加源信息到每个结果
      const results: SearchResultItem[] = data.list.map((item: any) => ({
        vod_id: item.vod_id,
        vod_name: item.vod_name,
        type_name: item.type_name,
        vod_year: item.vod_year,
        vod_pic: item.vod_pic,
        vod_remarks: item.vod_remarks,
        source_name: apiName,
        source_code: apiId,
        api_url: apiId.startsWith("custom_")
          ? getCustomApiInfo(
              searchState.customAPIs,
              apiId.replace("custom_", ""),
            )?.url
          : undefined,
      }));

      return results;
    } catch (error) {
      console.warn(`API ${apiId} 搜索失败:`, error);
      return [];
    }
  };

  // 主搜索函数
  const search = useCallback(
    async (query?: string) => {
      const searchQuery = query || searchText;

      if (!searchQuery?.trim()) {
        setSearchState((prev) => ({
          ...prev,
          error: ERROR_MESSAGES.EMPTY_SEARCH,
        }));
        return;
      }

      if (searchState.selectedAPIs.length === 0) {
        setSearchState((prev) => ({
          ...prev,
          error: ERROR_MESSAGES.NO_API_SELECTED,
        }));
        return;
      }

      setSearchState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
      }));

      try {
        // 保存搜索历史
        saveSearchHistory(searchQuery);

        // 并行搜索所有选中的API
        const searchPromises = searchState.selectedAPIs.map((apiId) =>
          searchSingleAPI(apiId, searchQuery),
        );

        // 等待所有搜索完成
        const resultsArray = await Promise.all(searchPromises);

        // 合并所有结果
        let allResults: SearchResultItem[] = [];
        resultsArray.forEach((results) => {
          if (Array.isArray(results) && results.length > 0) {
            allResults = allResults.concat(results);
          }
        });

        // 过滤成人内容（如果启用）
        const yellowFilterEnabled =
          localStorage.getItem("yellowFilterEnabled") === "true";
        allResults = filterAdultContent(allResults, yellowFilterEnabled);

        // 更新搜索结果
        setSearchState((prev) => ({
          ...prev,
          isLoading: false,
          results: allResults,
          error: allResults.length === 0 ? ERROR_MESSAGES.NO_RESULTS : null,
        }));
      } catch (error) {
        console.error("搜索错误:", error);
        setSearchState((prev) => ({
          ...prev,
          isLoading: false,
          error:
            error instanceof Error && error.name === "AbortError"
              ? ERROR_MESSAGES.TIMEOUT_ERROR
              : ERROR_MESSAGES.UNKNOWN_ERROR,
        }));
      }
    },
    [
      searchText,
      searchState.selectedAPIs,
      searchState.customAPIs,
      config,
      saveSearchHistory,
    ],
  );

  // 监听选中API的变化
  useEffect(() => {
    const selectedAPIs = getSelectedAPIs();
    setSearchState((prev) => ({
      ...prev,
      selectedAPIs,
    }));
  }, []);

  return {
    // 状态
    searchText,
    setSearchText,
    searchState,
    searchHistory,

    // 方法
    search,
    resetSearch,
    saveSearchHistory,
    clearSearchHistory,

    // API管理
    selectedAPIs: searchState.selectedAPIs,
    toggleAPI,
    selectAllAPIs,

    // 自定义API管理
    customAPIs: searchState.customAPIs,
    addCustomAPI,
    removeCustomAPI,
    updateCustomAPI,
  };
}
