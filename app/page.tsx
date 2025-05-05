"use client";
import Header from "@/app/ui/components/header";
import Container from "@mui/material/Container";
import Footer from "@/app/ui/components/footer";
import Searcher from "@/app/ui/components/search/searcher";
import { Box } from "@mui/material";

export default function Page() {
  return (
    <>
      <Box className="relative h-dvh">
        <header className="fixed top-0 z-10 w-full">
          <Header />
        </header>
        <main className="absolute top-0 h-full w-full">
          <Container maxWidth="lg" className="pb-5 pt-20">
            <Searcher />
          </Container>
        </main>
        <footer className="absolute bottom-0 w-full">
          <Footer />
        </footer>
      </Box>
    </>
  );
}
