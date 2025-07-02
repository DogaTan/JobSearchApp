// src/pages/Register.js
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  Paper,
  Alert,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { register } from "../services/auth";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const validate = () => {
    const { firstName, lastName, email, password, confirmPassword } = form;
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Lütfen tüm alanları doldurun.");
      return false;
    }
    if (!email.includes("@")) {
      setError("Geçerli bir e-posta girin.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Şifreler uyuşmuyor.");
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      });
      setSuccess("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("Kayıt sırasında bir hata oluştu.");
    }
  };

  return (
    <Box sx={{ bgcolor: "#f9f9f9", py: 8, minHeight: "100vh" }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Kayıt Ol
          </Typography>

          <form onSubmit={handleRegister}>
            <TextField
              label="Ad"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Soyad"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Şifre"
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Şifre Tekrar"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              type="password"
              fullWidth
              margin="normal"
              required
            />

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mt: 2 }}>
                {success}
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3, bgcolor: "#7b1fa2", fontWeight: "bold" }}
            >
              Kayıt Ol
            </Button>
          </form>

          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography variant="body2">
              Zaten hesabın var mı?{" "}
              <Link href="/login" underline="hover">
                Giriş Yap
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Register;
