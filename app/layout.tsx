import "@/app/ui/global.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Basic, Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/app/ui/theme";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { StyledEngineProvider } from "@mui/material/styles";
import createCache from "@emotion/cache";
import JotaiProviders from "@/app/ui/components/providers/JotaiProviders";
import BasicLayout from "@/app/ui/components/basicLayout";

// 导出 metadata 和 viewport
export { metadata } from "@/app/lib/metadata";
export { viewport } from "@/app/lib/viewport";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
  preload: true,
});

// 创建缓存
const cache = createCache({
  key: "css",
  prepend: true,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className={roboto.variable} suppressHydrationWarning>
      <body>
        <JotaiProviders>
          <StyledEngineProvider injectFirst>
            <AppRouterCacheProvider options={{ enableCssLayer: true }}>
              <ThemeProvider theme={theme}>
                <InitColorSchemeScript attribute="class" />
                <BasicLayout>{children}</BasicLayout>
              </ThemeProvider>
            </AppRouterCacheProvider>
          </StyledEngineProvider>
        </JotaiProviders>
      </body>
    </html>
  );
}
