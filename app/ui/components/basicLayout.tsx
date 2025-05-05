import Header from "@/app/ui/components/header";
import Container from "@mui/material/Container";
import Footer from "@/app/ui/components/footer";
import { Box } from "@mui/material";

export default function BasicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="fixed top-0 z-10 w-full">
        <Header />
      </header>
      <Box className="flex min-h-dvh flex-col">
        <main className="w-full flex-1">
          <Container maxWidth="lg" className="h-fit pb-5 pt-20">
            {children}
          </Container>
        </main>
        <footer className="w-full">
          <Footer />
        </footer>
      </Box>
    </>
  );
}
