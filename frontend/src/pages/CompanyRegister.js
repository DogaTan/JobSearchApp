import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { companyRegister } from "../services/auth";
import { useNavigate } from "react-router-dom";

const CompanyRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    companyName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await companyRegister({
        companyName: form.companyName,
        email: form.email,
        phoneNumber: form.phoneNumber,
        password: form.password,});
      alert("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...");
      navigate("/company-login");
    } catch (err) {
      alert("Kayıt sırasında bir hata oluştu.");
    }
  };

  return (
    <Box sx={{ bgcolor: "#7b1fa2", minHeight: "100vh", py: 8 }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2, bgcolor: "#fff" }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            align="center"
            gutterBottom
            sx={{ color: "#7b1fa2" }}
          >
            İşveren Üyelik
          </Typography>
          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            Hemen üye olun, ilanınızı yayınlamaya başlayın!
          </Typography>
          <form onSubmit={handleRegister}>
            <TextField
              fullWidth
              name="companyName"
              label="Şirket Adı"
              margin="normal"
              value={form.companyName}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              name="email"
              label="E-posta"
              type="email"
              margin="normal"
              value={form.email}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              name="phoneNumber"
              label="Telefon"
              margin="normal"
              value={form.phoneNumber}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              name="password"
              label="Şifre"
              type="password"
              margin="normal"
              value={form.password}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                bgcolor: "#7b1fa2",
                textTransform: "none",
                "&:hover": { bgcolor: "#6a1890" },
              }}
            >
              Üye Ol
            </Button>
          </form>

          {/* Giriş yap linki */}
          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Zaten hesabınız var mı?{" "}
            <span
              onClick={() => (window.location.href = "/company-login")}
              style={{
                color: "#7b1fa2",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Giriş Yap
            </span>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default CompanyRegister;
