"use client";
import { Box } from "@mui/material";
import { useSearchParams } from "next/navigation";
import Searcher from "@/app/ui/components/search/searcher";
import { motion } from "framer-motion";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const searchText = searchParams.get("name") || "";
  return (
    <motion.div
      className="flex w-full flex-col items-start"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div className="w-full">
        <Searcher />
      </motion.div>

      <motion.div
        className="mt-4 flex w-full flex-col"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex-1 overflow-auto">
          <h1 className="text-2xl font-bold">Search Page - {searchText}</h1>
          {/* Add your search input and results here */}
        </div>
      </motion.div>
    </motion.div>
  );
}
