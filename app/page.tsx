"use client";
import Searcher from "@/app/ui/components/search/searcher";
import RecentSearch from "@/app/ui/components/search/recentSearch";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

export default function Page() {
  return (
    <AnimatePresence mode="sync">
      <motion.div
        className="flex w-full flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.h2
          className="text-2xl font-light text-gray-500"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          自由观影 随心所欲
        </motion.h2>

        <motion.div className="mt-4 w-10/12">
          <Searcher />
        </motion.div>

        <Box className="mt-5 flex w-10/12 justify-center">
          <RecentSearch />
        </Box>
      </motion.div>
    </AnimatePresence>
  );
}
