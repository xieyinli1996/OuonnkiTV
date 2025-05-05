import { Box, Container } from "@mui/material";
import Chip from "@mui/material/Chip";
import type { RecentSearchItem } from "@/app/lib/type";
import DeleteIcon from "@mui/icons-material/Delete";
import { recentSearchListAtom, searchTextAtom } from "@/app/lib/search/main";
import { useAtom } from "jotai";

export default function RecentSearch() {
  const [recentSearchList, setRecentSearchList] = useAtom(recentSearchListAtom);
  const [searchText, setSearchText] = useAtom(searchTextAtom);
  function handleClick(item: RecentSearchItem) {
    setSearchText(item.name);
  }
  function handleDelete(item: RecentSearchItem) {
    setRecentSearchList(recentSearchList.filter((i) => i.id !== item.id));
  }
  return (
    <>
      <Box className="flex w-full justify-center">
        <Box className="w-1/10">
          <p className="text-gray-400">最近搜索：</p>
        </Box>
        <Box className="flex w-9/12 flex-wrap items-center gap-x-3">
          {recentSearchList
            .sort((a, b) => b.time - a.time)
            .map((item) => (
              <Chip
                key={item.id}
                label={item.name}
                onClick={() => handleClick(item)}
                onDelete={() => handleDelete(item)}
                variant="outlined"
                deleteIcon={<DeleteIcon className="hover:text-red-500" />}
              />
            ))}
        </Box>
      </Box>
    </>
  );
}
