import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  Divider,
  ListItemText,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function Navbar() {
  const isLoggedIn = Boolean(localStorage.getItem("token"));

  // Menü durumları
  const [anchorEl, setAnchorEl] = useState(null);
  const [avatarMenuAnchor, setAvatarMenuAnchor] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarMenuOpen = (event) => {
    setAvatarMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setAvatarMenuAnchor(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    handleMenuClose();
    window.location.href = "/";
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fff",
        color: "#000",
        borderBottom: "1px solid #e0e0e0",
      }}
      elevation={0}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{ justifyContent: "space-between", minHeight: 64 }}
        >
          {/* Logo */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#7b1fa2",
              fontSize: "1.6rem",
              textTransform: "lowercase",
            }}
          >
            kariyer.net
          </Typography>

          {/* Sağ Menü */}
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Button variant="text" size="small">
              EN
            </Button>

            {!isLoggedIn ? (
              <>
                <Button
                  variant="contained"
                  size="small"
                  endIcon={<ArrowDropDownIcon />}
                  sx={{
                    backgroundColor: "#7b1fa2",
                    textTransform: "none",
                    px: 2,
                  }}
                  onClick={handleMenuOpen}
                >
                  Giriş Yap / Üye Ol
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{ sx: { width: 260 } }}
                >
                  <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      Aday (İş mi Arıyorsun?)
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Burada seni bekleyen binlerce ilan var!
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        fullWidth
                        variant="outlined"
                        size="small"
                        onClick={() => (window.location.href = "/login")}
                      >
                        Aday Girişi
                      </Button>
                      <Button
                        fullWidth
                        variant="contained"
                        size="small"
                        sx={{ backgroundColor: "#7b1fa2" }}
                        onClick={() => (window.location.href = "/register")}
                      >
                        Üye Ol
                      </Button>
                    </Box>
                  </Box>
                  <Divider />
                  <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      İşveren (İlan mı Vereceksiniz?)
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Pozisyonunuza en uygun aday burada!
                    </Typography>
                    <Button
                      fullWidth
                      variant="text"
                      size="small"
                      sx={{ color: "#7b1fa2" }}
                      onClick={() => (window.location.href = "/company-login")}
                    >
                      İşveren Girişi
                    </Button>
                  </Box>
                </Menu>
              </>
            ) : (
              <>
                <IconButton onClick={handleAvatarMenuOpen}>
                  <Avatar sx={{ bgcolor: "#7b1fa2" }}>
                    <AccountCircleIcon />
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={avatarMenuAnchor}
                  open={Boolean(avatarMenuAnchor)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => (window.location.href = "/profile")}>
                    <ListItemText primary="Profilim" />
                  </MenuItem>
                  <MenuItem
                    onClick={() => (window.location.href = "/my-applications")}
                  >
                    <ListItemText primary="Başvurularım" />
                  </MenuItem>
                  <MenuItem
                    onClick={() => (window.location.href = "/job-alert")}
                  >
                    <ListItemText primary="İş Alarmı Oluştur" />
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <ListItemText primary="Çıkış Yap" />
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
