"use client";

import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { searchTextAtom } from "@/app/lib/search/state";
import { useRecentSearch } from "@/app/lib/search/recentSearch";
import { motion } from "framer-motion";

export default function Searcher() {
  const [searchText, setSearchText] = useAtom(searchTextAtom);
  const router = useRouter();
  const { addRecentSearch } = useRecentSearch();

  function handleSearch() {
    if (searchText !== "") {
      addRecentSearch(searchText);
      router.push(`/search?name=${searchText}`);
    }
  }

  return (
    <motion.div
      className="flex w-full justify-center"
      layoutId="searcher-container"
      layout
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.5,
      }}
    >
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
        className="ml-2 w-1/12"
        variant="outlined"
        color="primary"
        onClick={handleSearch}
        disabled={searchText === ""}
      >
        搜索
      </Button>
    </motion.div>
  );
}
