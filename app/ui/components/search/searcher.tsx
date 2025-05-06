"use client";

import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import RecentSearch from "@/app/ui/components/search/recentSearch";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRecentSearch } from "@/app/lib/search/recentSearch";

export default function Searcher() {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const { addRecentSearch } = useRecentSearch();
  function handleSearch() {
    if (searchText !== "") {
      addRecentSearch(searchText);
      setSearchText("");
      router.push(`/search?name=${searchText}`);
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
          disabled={searchText === ""}
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
