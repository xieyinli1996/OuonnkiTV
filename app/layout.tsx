import "@/app/ui/global.css";
import { Metadata, Viewport } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/app/ui/theme";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: "%s | Ouonnki TV",
    default: "Ouonnki TV - 免费视频搜索与播放平台",
  },
  description: "Ouonnki TV - 免费视频搜索与播放平台",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  keywords: ["Ouonnki TV", "免费在线视频", "视频搜索", "视频观看"],
  authors: [{ name: "Ouonnki" }],
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className={roboto.variable} suppressHydrationWarning>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <ThemeProvider theme={theme} disableTransitionOnChange={false}>
          <body>
            {/* 保证在服务端渲染时，颜色方案已经设置好 */}
            <InitColorSchemeScript attribute="class" />
            <main>{children}</main>
          </body>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </html>
  );
}
