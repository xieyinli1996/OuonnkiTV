"use client";
import { Box } from "@mui/material";
import { useSearchParams } from "next/navigation";
import Searcher from "@/app/ui/components/search/searcher";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const searchText = searchParams.get("name") || "";
  return (
    <>
      <Searcher />

      <div className="flex flex-col">
        <div className="flex-1 overflow-auto">
          <h1 className="text-2xl font-bold">Search Page - {searchText}</h1>
          {/* Add your search input and results here */}
        </div>
      </div>
    </>
  );
}
