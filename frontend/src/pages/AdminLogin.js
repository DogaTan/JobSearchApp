import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { token, role } = await login(form.email, form.password);

      if (role !== "ROLE_ADMIN") {
        return setError("Bu sayfaya sadece admin erişebilir.");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      navigate("/admin-dashboard");
    } catch (err) {
      setError("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
    }
  };

  return (
    <Box sx={{ bgcolor: "#7b1fa2", minHeight: "100vh", py: 8 }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Admin Girişi
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="E-mail"
              name="email"
              value={form.email}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Şifre"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              margin="normal"
            />
            {error && (
              <Typography color="error" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mt: 3, backgroundColor: "#7b1fa2", textTransform: "none" }}
            >
              Giriş Yap
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminLogin;
