"use client";
import Box from "@mui/material/Box";
import Header from "@/app/ui/components/header";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { useAtom } from "jotai";
import { searchTextAtom } from "./lib/search/main";
import Button from "@mui/material/Button";

export default function Page() {
  const [searchText, setSearchText] = useAtom(searchTextAtom);
  function handleSearch() {
    console.log(searchText);
  }
  return (
    <>
      <header>
        <Header />
      </header>
      <main className="mb-5 mt-20">
        <Container maxWidth="lg" className="h-80 bg-gray-300">
          <Box className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-light text-gray-500">
              自由观影 随心所欲
            </h2>
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
          </Box>
        </Container>
      </main>
      <footer>
        <Box className="h-15 flex items-center justify-center bg-pink-200">
          <p>footer</p>
        </Box>
      </footer>
    </>
  );
}
