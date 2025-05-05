import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAtom } from "jotai";
import { searchTextAtom, recentSearchListAtom } from "@/app/lib/search/main";
import RecentSearch from "@/app/ui/components/search/recentSearch";
import type { RecentSearchItem } from "@/app/lib/type";
import { v4 as uuidv4 } from "uuid";

export default function Searcher() {
  const [searchText, setSearchText] = useAtom(searchTextAtom);
  const [recentSearchList, setRecentSearchList] = useAtom(recentSearchListAtom);
  function handleSearch() {
    if (searchText !== "") {
      const copyList = [...recentSearchList];
      let searchItem = copyList.find((item) => item.name === searchText);
      if (searchItem) {
        searchItem.time = Date.now();
      } else {
        searchItem = {
          id: uuidv4(),
          name: searchText,
          time: Date.now(),
        } as RecentSearchItem;
        copyList.unshift(searchItem);
      }
      setRecentSearchList(copyList);
      setSearchText("");
    }
  }
  return (
    <Box className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-light text-gray-500">自由观影 随心所欲</h2>
      <Box className="flex w-10/12 justify-center">
        <TextField
          className="w-9/12"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          label="输入你想看的影片"
          variant="outlined"
          autoFocus
          fullWidth
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <Button
          className="w-1/12"
          variant="outlined"
          color="primary"
          onClick={handleSearch}
        >
          搜索
        </Button>
      </Box>
      <Box className="mt-5 flex w-10/12 justify-center">
        <RecentSearch />
      </Box>
    </Box>
  );
}
