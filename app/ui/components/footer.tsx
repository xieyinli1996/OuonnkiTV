import Box from "@mui/material/Box";

export default function Footer() {
  return (
    <Box className="h-15 flex items-center justify-between bg-blue-500 px-4 text-white">
      <p className="max-w-md text-xs">
        免责声明：本站仅为视频搜索工具，不存储、上传或分发任何视频内容。
        所有视频均来自第三方API接口。如有侵权，请联系相关内容提供方。
      </p>
      <p>Ouonnki TV —— 畅快观影</p>
    </Box>
  );
}
