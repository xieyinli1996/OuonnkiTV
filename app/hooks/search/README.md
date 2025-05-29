# 搜索功能 Hooks 使用文档

这是一个功能完整的 TypeScript 搜索 Hook，从原始的 JavaScript 代码中抽离并重构而成，适配了项目的 Next.js + TypeScript + Jotai 架构。

## 主要功能

### 1. 搜索功能

- 支持从多个 API 源并行搜索
- 搜索结果聚合和去重
- 成人内容过滤
- 搜索超时处理
- 错误处理和提示

### 2. 搜索历史

- 自动保存搜索历史
- 历史记录时间戳
- 历史记录数量限制
- 清除历史功能

### 3. API 源管理

- 内置多个视频 API 源
- 支持添加自定义 API
- API 源选择和切换
- 成人内容 API 标记

### 4. 自定义 API

- 添加自定义 API 源
- 编辑和删除自定义 API
- 自定义 API 持久化存储

## 使用方法

### 基本使用

```tsx
import { useSearch } from "@/app/hooks/search";

function MySearchComponent() {
  const { searchText, setSearchText, search, searchState, searchHistory } =
    useSearch();

  const handleSearch = async () => {
    await search(); // 使用当前 searchText
    // 或者
    await search("自定义搜索词");
  };

  return (
    <>
      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button onClick={handleSearch}>搜索</button>

      {searchState.isLoading && <div>搜索中...</div>}
      {searchState.error && <div>{searchState.error}</div>}

      {searchState.results.map((item) => (
        <div key={item.vod_id}>{item.vod_name}</div>
      ))}
    </>
  );
}
```

### API 源管理

```tsx
const { selectedAPIs, toggleAPI, selectAllAPIs } = useSearch();

// 切换单个 API
toggleAPI("heimuer");

// 全选所有 API
selectAllAPIs(true);

// 全选非成人 API
selectAllAPIs(true, true);

// 取消全选
selectAllAPIs(false);
```

### 自定义 API 管理

```tsx
const { customAPIs, addCustomAPI, removeCustomAPI, updateCustomAPI } =
  useSearch();

// 添加自定义 API
addCustomAPI({
  name: "我的API",
  url: "https://api.example.com",
  isActive: true,
  isAdult: false,
});

// 更新自定义 API
updateCustomAPI(0, {
  name: "更新的API",
  url: "https://api.example.com",
  isActive: true,
  isAdult: false,
});

// 删除自定义 API
removeCustomAPI(0);
```

### 搜索历史管理

```tsx
const { searchHistory, saveSearchHistory, clearSearchHistory } = useSearch();

// 手动保存搜索历史
saveSearchHistory("搜索词");

// 清除所有历史
clearSearchHistory();

// 使用历史记录
searchHistory.forEach((item) => {
  console.log(item.text, item.timestamp);
});
```

## 类型定义

### SearchResultItem

```typescript
interface SearchResultItem {
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
```

### CustomApi

```typescript
interface CustomApi {
  name: string;
  url: string;
  isActive: boolean;
  isAdult?: boolean;
}
```

### SearchState

```typescript
interface SearchState {
  isLoading: boolean;
  error: string | null;
  results: SearchResultItem[];
  selectedAPIs: string[];
  customAPIs: CustomApi[];
}
```

## 配置选项

可以通过修改 `config.ts` 文件来自定义配置：

- `PROXY_URL`: 代理服务器 URL
- `MAX_HISTORY_ITEMS`: 最大历史记录数
- `DEFAULT_SEARCH_CONFIG`: 默认搜索配置
- `ADULT_CONTENT_KEYWORDS`: 成人内容过滤关键词

## 注意事项

1. **XSS 防护**: 所有用户输入都经过了 `sanitizeText` 函数处理
2. **本地存储**: 搜索历史和自定义 API 保存在 localStorage 中
3. **超时处理**: 默认搜索超时时间为 8 秒
4. **并发限制**: 并行搜索所有选中的 API 源

## 示例项目

查看 `example.tsx` 文件获取完整的使用示例。

## 从旧代码迁移

如果你之前使用的是 JavaScript 版本的搜索功能，以下是主要的迁移步骤：

1. 导入新的 Hook：

   ```tsx
   import { useSearch } from "@/app/hooks/search";
   ```

2. 替换全局函数调用为 Hook 方法
3. 使用 TypeScript 类型定义
4. 更新状态管理为 Hook 返回的状态

## License

MIT
