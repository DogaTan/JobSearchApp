import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Chip,
  Paper,
  useMediaQuery,
} from "@mui/material";
import Navbar from "../components/Navbar";
import AIAgentButton from "../components/AIAgentButton";
import SearchIcon from "@mui/icons-material/Search";
import placeholderLogo from "../assets/images/placeholder-logo.png";
import kLogo from "../assets/images/k-logo.png";
import { fetchFeaturedJobs } from "../services/job";
import { fetchRecentSearches } from "../services/search";

function Home() {
  const [position, setPosition] = useState("");
  const [city, setCity] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [userCity, setUserCity] = useState("İstanbul");
  const navigate = useNavigate();

  const isLargeScreen = useMediaQuery("(min-width:960px)");

  const etiketler = [
    "Yazılım Uzmanı",
    "Finans Uzmanı",
    "Pazarlama Uzmanı",
    "Proje Yöneticisi",
    "İK Uzmanı",
    "İstanbul",
    "Ankara",
    "İzmir",
    "Bursa",
  ];

  const dummyJobs = [
    {
      id: 1,
      title: "Pazarlama Uzmanı",
      company: "Örnek A.Ş.",
      city: "İstanbul",
      logo: placeholderLogo,
    },
    {
      id: 2,
      title: "Back-end Geliştirici",
      company: "YazılımCo",
      city: "İzmir",
      logo: placeholderLogo,
    },
    {
      id: 3,
      title: "UI/UX Tasarımcısı",
      company: "Tasarım Ltd.",
      city: "Ankara",
      logo: placeholderLogo,
    },
    {
      id: 4,
      title: "Satış Yöneticisi",
      company: "SatışGrup",
      city: "Bursa",
      logo: placeholderLogo,
    },
    {
      id: 5,
      title: "İK Asistanı",
      company: "İnsanKaynakları",
      city: "İstanbul",
      logo: placeholderLogo,
    },
  ];

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          const cityName = data.address?.city || "İstanbul";
          setUserCity(cityName);
        } catch {
          setUserCity("İstanbul");
        }
      },
      () => setUserCity("İstanbul")
    );
  }, []);

  useEffect(() => {
    if (!userCity) return;
    fetchFeaturedJobs(userCity)
      .then((data) => setFeaturedJobs(data.length ? data : dummyJobs))
      .catch(() => setFeaturedJobs(dummyJobs));
  }, [userCity]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token || !userId) return;
    fetchRecentSearches(userId)
      .then((data) => setRecentSearches(data))
      .catch(() => setRecentSearches([]));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      `/search?position=${encodeURIComponent(position)}&city=${encodeURIComponent(city)}`
    );
  };

  return (
    <>
      <Navbar />
      <Box sx={{ bgcolor: "#f9f9f9", py: 6 }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 } }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              gap: 6,
              mb: 6,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" fontWeight="bold">
                Kariyer Fırsatlarını Keşfet
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ mt: 1, color: "text.secondary" }}
              >
                <b>72.985</b> iş ilanı <b>on binlerce</b> şirketten
              </Typography>

              <Box
                component="form"
                onSubmit={handleSearch}
                sx={{
                  display: "flex",
                  gap: 2,
                  mt: 3,
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <TextField
                  fullWidth
                  label="Pozisyon"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  sx={{ flex: 1, minWidth: 200 }}
                />
                <TextField
                  fullWidth
                  label="Şehir"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  sx={{ flex: 1, minWidth: 200 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SearchIcon />}
                  sx={{
                    bgcolor: "#7b1fa2",
                    px: 5,
                    height: "56px",
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    flex: 1,
                  }}
                >
                  İŞ BUL
                </Button>
              </Box>

              <Box sx={{ mt: 4 }}>
                <Typography variant="subtitle2" sx={{ color: "#666", mb: 1 }}>
                  POPÜLER ARAMALAR
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {etiketler.map((tag, i) => (
                    <Chip
                      key={i}
                      label={tag}
                      onClick={() =>
                        tag.includes(" ") ? setPosition(tag) : setCity(tag)
                      }
                      sx={{
                        bgcolor: "#fff",
                        fontWeight: 500,
                        color: "#8316b5",
                        border: "1px solid #dee2e6",
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Box>

            {isLargeScreen && (
              <Box sx={{ flex: 1, textAlign: "end" }}>
                <img
                  src={kLogo}
                  alt="kariyer"
                  style={{ width: "100%", maxWidth: 360 }}
                />
              </Box>
            )}
          </Box>

          {recentSearches.length > 0 && (
            <Box sx={{ mt: 6 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Son Aramalarım
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                {recentSearches.map((search, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      flex: "1 1 calc(20% - 16px)",
                      minWidth: "200px",
                      maxWidth: "240px",
                    }}
                  >
                    <Paper
                      sx={{
                        p: 2,
                        minHeight: 120,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Typography fontWeight="bold">
                        {search.city} – {search.position}
                      </Typography>
                    </Paper>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          <Box sx={{ mt: 8 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Öne Çıkan İlanlar
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              {featuredJobs.slice(0, 5).map((job, idx) => (
                <Box
                  key={idx}
                  sx={{
                    flex: "1 1 calc(20% - 16px)",
                    minWidth: "200px",
                    maxWidth: "240px",
                  }}
                >
                  <Paper
                    onClick={() => navigate(`/jobs/${job.id}`)}
                    sx={{
                      p: 2,
                      minHeight: 200,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-evenly",
                      textAlign: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      transition: "transform 0.2s",
                      "&:hover": {
                        transform: "scale(1.02)",
                      },
                    }}
                  >
                    {job.logo && (
                      <Box sx={{ mb: 1 }}>
                        <img
                          src={job.logo}
                          alt="logo"
                          style={{
                            width: 50,
                            height: 50,
                            objectFit: "contain",
                          }}
                        />
                      </Box>
                    )}
                    <Box>
                      <Typography fontWeight="bold" sx={{ fontSize: "1rem" }}>
                        {job.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {job.company}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {job.city}
                      </Typography>
                    </Box>
                  </Paper>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
      <AIAgentButton />
    </>
  );
}

export default Home;
