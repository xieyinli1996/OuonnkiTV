import { Metadata } from "next";

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
