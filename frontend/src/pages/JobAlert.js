import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from "../components/Navbar";

const JobAlert = () => {
  const [position, setPosition] = useState("");
  const [city, setCity] = useState("");
  const [alerts, setAlerts] = useState([]);

  // LocalStorage'dan alarmları yükle
  useEffect(() => {
    const stored = localStorage.getItem("jobAlerts");
    if (stored) {
      setAlerts(JSON.parse(stored));
    }
  }, []);

  // Alarmları kaydet
  const saveAlerts = (data) => {
    localStorage.setItem("jobAlerts", JSON.stringify(data));
  };

  const handleAdd = () => {
    if (!position || !city) return;
    const newAlert = { position, city };
    const updated = [...alerts, newAlert];
    setAlerts(updated);
    saveAlerts(updated);
    setPosition("");
    setCity("");
  };

  const handleDelete = (index) => {
    const updated = alerts.filter((_, i) => i !== index);
    setAlerts(updated);
    saveAlerts(updated);
  };

  return (
    <>
      <Navbar />
      <Box sx={{ bgcolor: "#f9f9f9", minHeight: "100vh", py: 6 }}>
        <Container maxWidth="md">
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            İş Alarmı Oluştur
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Uygun pozisyonlar yayınlandığında haberdar olun.
          </Typography>

          {/* Alarm oluşturma formu */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              mb: 4,
            }}
          >
            <TextField
              label="Pozisyon"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              fullWidth
            />
            <TextField
              label="Şehir"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              sx={{ bgcolor: "#7b1fa2", whiteSpace: "nowrap" }}
              onClick={handleAdd}
            >
              Oluştur
            </Button>
          </Box>

          {/* Mevcut alarmlar listesi */}
          {alerts.length > 0 ? (
            <Box>
              <Typography variant="h6" gutterBottom>
                Oluşturduğunuz Alarmlar
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {alerts.map((alert, index) => (
                  <Paper
                    key={index}
                    sx={{
                      p: 2,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography fontWeight="bold">{alert.position}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {alert.city}
                      </Typography>
                    </Box>
                    <IconButton onClick={() => handleDelete(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </Paper>
                ))}
              </Box>
            </Box>
          ) : (
            <Typography color="text.secondary">Henüz bir alarm oluşturulmadı.</Typography>
          )}
        </Container>
      </Box>
    </>
  );
};

export default JobAlert;
