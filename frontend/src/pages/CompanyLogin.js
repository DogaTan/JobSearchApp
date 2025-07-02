import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";

const CompanyLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { token, role } = await login(email, password);

      if (role !== "ROLE_COMPANY") {
        return alert("Bu sayfa sadece şirket kullanıcıları içindir.");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      navigate("/company-dashboard");
    } catch (err) {
      alert("Giriş başarısız.");
    }
  };

  return (
    <Box sx={{ bgcolor: "#7b1fa2", minHeight: "100vh", py: 8 }}>
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            backgroundColor: "#fff",
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            align="center"
            sx={{ color: "#7b1fa2" }}
          >
            İşveren Girişi
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mb: 3 }}
          >
            Pozisyonunuza en uygun adaylar burada!
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="E-posta"
              type="email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Şifre"
              type="password"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                bgcolor: "#7b1fa2",
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#6a1890",
                },
              }}
              type="submit"
            >
              Giriş Yap
            </Button>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Hesabınız yok mu?{" "}
              <span
                onClick={() => (window.location.href = "/company-register")}
                style={{
                  color: "#7b1fa2",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Üye Ol
              </span>
            </Typography>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default CompanyLogin;
