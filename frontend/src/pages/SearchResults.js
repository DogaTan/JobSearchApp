import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Container,
  Divider,
  FormControlLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Navbar from "../components/Navbar";
import placeholderLogo from "../assets/images/placeholder-logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { searchJobs } from "../services/job";

const SearchResults = () => {
  const locationHook = useLocation();
  const navigate = useNavigate();

  // Query parametrelerini alıyoruz
  const queryParams = new URLSearchParams(locationHook.search);
  const initialPosition = queryParams.get("position") || "";
  const initialCity = queryParams.get("city") || "";

  const [position, setPosition] = useState(initialPosition);
  const [city, setCity] = useState(initialCity);
  const [filters, setFilters] = useState([initialPosition, initialCity].filter(Boolean));
  const [jobResults, setJobResults] = useState([]);

  useEffect(() => {
    if (!position && !city) return;

    // Backend'den iş ilanlarını al
    searchJobs(position, city)
      .then((data) => setJobResults(data))
      .catch(() => setJobResults([]));
  }, [position, city]);

  const handleClearFilters = () => {
    setFilters([]);
    setPosition("");
    setCity("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Yeni arama yapınca sayfayı güncelle
    const query = [];
    if (position) query.push(`position=${encodeURIComponent(position)}`);
    if (city) query.push(`city=${encodeURIComponent(city)}`);

    const queryString = query.length ? `?${query.join("&")}` : "";
    navigate(`/search${queryString}`);
  };

  return (
    <>
      <Navbar />
      <Box sx={{ bgcolor: "#f9f9f9", py: 4 }}>
        <Container maxWidth="lg">
          {/* Arama Çubuğu */}
          <Box component="form" onSubmit={handleSearch} sx={{ display: "flex", gap: 2, mb: 4 }}>
            <TextField
              placeholder="Pozisyon"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              sx={{ flex: 1, minWidth: 180 }}
            />
            <TextField
              placeholder="Şehir"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              sx={{ flex: 1, minWidth: 180 }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "#7b1fa2",
                px: 3,
                minWidth: 100,
                whiteSpace: "nowrap",
                fontWeight: "bold",
              }}
              startIcon={<SearchIcon />}
            >
              İş Ara
            </Button>
          </Box>

          <Box sx={{ display: "flex", gap: 3 }}>
            {/* Sol Filtre Paneli */}
            <Box sx={{ width: "280px", bgcolor: "#fff", p: 2, borderRadius: 1 }}>
              <Typography fontWeight="bold" gutterBottom>
                Ülke / Şehir / İlçe
              </Typography>
              <Select fullWidth size="small" value="Türkiye" disabled>
                <MenuItem value="Türkiye">Türkiye</MenuItem>
              </Select>
              <Select
                fullWidth
                size="small"
                sx={{ mt: 2 }}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <MenuItem value="">İlçe seçin</MenuItem>
                <MenuItem value="İzmir">İzmir</MenuItem>
                <MenuItem value="İstanbul">İstanbul</MenuItem>
                <MenuItem value="Ankara">Ankara</MenuItem>
              </Select>
              <Select fullWidth size="small" sx={{ mt: 2 }} value="">
                <MenuItem value="">İlçe seçin</MenuItem>
              </Select>

              <Divider sx={{ my: 2 }} />

              <Typography fontWeight="bold" gutterBottom>
                Çalışma Tercihi
              </Typography>
              <FormControlLabel control={<Checkbox />} label="İş Yerinde" />
              <FormControlLabel control={<Checkbox />} label="Uzaktan / Remote" />
              <FormControlLabel control={<Checkbox />} label="Hibrit" />

              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, bgcolor: "#7b1fa2", fontWeight: "bold" }}
              >
                Uygula
              </Button>
            </Box>

            {/* Sağ Sonuç Paneli */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" gutterBottom>
                {jobResults.length} <strong>{position || "İş"}</strong> {city || "ilanları"}
              </Typography>

              {/* Filtre Etiketleri */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                {filters.map((f, idx) => (
                  <Chip
                    key={idx}
                    label={f}
                    onDelete={() => {
                      const newFilters = filters.filter((_, i) => i !== idx);
                      setFilters(newFilters);
                      if (f === position) setPosition("");
                      if (f === city) setCity("");
                    }}
                  />
                ))}
                {filters.length > 0 && (
                  <Button
                    onClick={handleClearFilters}
                    size="small"
                    sx={{
                      textTransform: "none",
                      color: "#7b1fa2",
                      fontWeight: "bold",
                    }}
                  >
                    Filtreleri Temizle
                  </Button>
                )}
              </Box>

              {/* İş İlan Kartları */}
              {jobResults.map((job) => (
                <Paper
                  key={job.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    p: 2,
                    mb: 2,
                    borderRadius: 2,
                    bgcolor: "#fff",
                    boxShadow: "0px 2px 4px rgba(0,0,0,0.05)",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/jobs/${job.id}`)}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <img
                      src={job.logo || placeholderLogo}
                      alt="Logo"
                      style={{ width: 50, height: 50, objectFit: "contain" }}
                    />
                    <Box>
                      <Typography fontWeight="bold">{job.title}</Typography>
                      <Typography variant="body2">{job.company}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {job.city} &nbsp;•&nbsp; {job.type || "Belirtilmemiş"}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {job.time || "Belirtilmemiş"}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ color: "gray", fontSize: "0.875rem" }}
                  >
                    {job.date || ""}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default SearchResults;
