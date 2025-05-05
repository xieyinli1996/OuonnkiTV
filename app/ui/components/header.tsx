import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";

export default function Header() {
  function handleClickSettings() {}
  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters className="flex justify-between">
          <Box className="flex items-center">
            <LiveTvIcon
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                mt: -0.5,
                fontSize: "2rem",
              }}
            />
            <Link href="/" className="text-decoration-none">
              <Typography
                variant="h6"
                noWrap
                align="left"
                component="span"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                OUONNKI TV
              </Typography>
            </Link>
            <LiveTvIcon
              sx={{
                display: { xs: "flex", md: "none" },
                mr: 1,
                fontSize: "2rem",
                mt: -0.5,
              }}
            />
            <Link href="/">
              <Typography
                variant="h6"
                noWrap
                align="left"
                component="span"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                OUONNKI TV
              </Typography>
            </Link>
          </Box>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="settings"
            onClick={handleClickSettings}
          >
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
