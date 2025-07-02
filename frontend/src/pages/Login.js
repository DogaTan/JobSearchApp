// src/pages/Login.js
import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Alert,
  Link,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login(email, password);
      console.log("Gelen yanıt:", res); // <-- BUNU EKLE

      const token = res.token;
      const role = res.role;
      const userId = res.userId; // Yeni eklenen userId

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId); // Yeni eklenen userId'yi localStorage'a kaydet

      if (role !== "ROLE_USER") {
        setError("Bu giriş sadece kullanıcılar içindir.");
        return;
      }

      navigate("/");
    } catch (err) {
      setError("Email veya şifre hatalı.");
    }
  };

  return (
    <Box sx={{ bgcolor: "#f9f9f9", py: 8, minHeight: "100vh" }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Giriş Yap
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Şifre"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
            />

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3, bgcolor: "#7b1fa2", fontWeight: "bold" }}
            >
              Giriş Yap
            </Button>
          </form>

          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography variant="body2">
              Hesabınız yok mu?{" "}
              <Link href="/register" underline="hover">
                Kayıt Ol
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;
