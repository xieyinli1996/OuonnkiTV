"use client";

import { Box } from "@mui/material";
import Chip from "@mui/material/Chip";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRecentSearch } from "@/app/lib/search/recentSearch";
import type { RecentSearchItem } from "@/app/lib/search/type";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { searchTextAtom } from "@/app/lib/search/state";

export default function RecentSearch() {
  const [searchText, setSearchText] = useAtom(searchTextAtom);
  const { recentSearchList, addRecentSearch, deleteRecentSearch } =
    useRecentSearch();
  const router = useRouter();
  function handleClick(item: RecentSearchItem) {
    addRecentSearch(item.name);
    setSearchText(item.name);
    router.push(`/search?name=${item.name}`);
  }
  function handleDelete(item: RecentSearchItem) {
    deleteRecentSearch(item.name);
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
