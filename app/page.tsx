import Searcher from "@/app/ui/components/search/searcher";
import RecentSearch from "@/app/ui/components/search/recentSearch";
import { Box } from "@mui/material";

export default function Page() {
  return (
    <>
      <h2 className="text-2xl font-light text-gray-500">自由观影 随心所欲</h2>
      <Searcher />
      <Box className="mt-5 flex w-10/12 justify-center">
        <RecentSearch />
      </Box>
    </>
  );
}
