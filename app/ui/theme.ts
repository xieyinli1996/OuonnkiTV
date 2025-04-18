"use client";
import { createTheme } from "@mui/material/styles";
import { createRoot } from "react-dom/client";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-roboto)",
  },
  // 启用暗黑模式和亮色模式
  colorSchemes: {
    dark: true,
    light: true,
  },
  // 启用 CSS 变量
  cssVariables: {
    colorSchemeSelector: "class",
  },
});

export default theme;
