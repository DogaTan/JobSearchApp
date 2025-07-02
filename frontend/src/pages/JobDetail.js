// src/pages/JobDetail.js
import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import Navbar from "../components/Navbar";
import ShareIcon from "@mui/icons-material/Share";
import ApplyModal from "../components/ApplyModal";
import { useParams } from "react-router-dom";
import axios from "axios";

const JobDetail = () => {
  const { id } = useParams(); // ✅ jobId route parametresinden alınıyor
  const [job, setJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Bu API çağrısını backend bağlantısı hazır olduğunda aktif hale getirebilirsin.
    // axios.get(`/api/jobs/${id}`)
    //   .then((res) => setJob(res.data))
    //   .catch(() => console.error('İlan verisi alınamadı'));
  }, [id]);

  const relatedJobs = [
    {
      title: "Backend Developer - Node.Js",
      company: "VIGO TEKNOLOJİ VE LOJİSTİK A.Ş.",
      city: "İstanbul(Asya)",
      type: "Hibrit",
      date: "Bugün",
    },
    {
      title: "Yazılım Uzmanı",
      company: "DATASİSTEM İŞE ALIM HİZMETLERİ",
      city: "İstanbul(Avr)",
      type: "Hibrit",
      date: "Bugün",
    },
  ];

  return (
    <>
      <Navbar />
      <Box sx={{ bgcolor: "#f9f9f9", pt: 3, pb: 8 }}>
        <Box sx={{ bgcolor: "#f9f9f9", px: { xs: 2, md: 6 }, mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="h6" fontWeight="bold">
                {job?.title || "Yazılım Uzmanı"}
              </Typography>
              <Typography variant="subtitle1">
                {job?.company || "Alfemo"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {job?.city || "İzmir(Torbalı)"} • İş Yerinde
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="contained"
                sx={{ bgcolor: "#7b1fa2" }}
                onClick={() => setIsModalOpen(true)}
              >
                BAŞVUR
              </Button>
              <Button variant="outlined">KAYDET</Button>
              <Button variant="text">
                <ShareIcon />
              </Button>
            </Box>
          </Box>

          <Paper
            elevation={1}
            sx={{
              p: 3,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Box>
              <Typography color="text.secondary">Çalışma Şekli</Typography>
              <Typography fontWeight="bold">
                {job?.workType || "Tam Zamanlı"}
              </Typography>
            </Box>
            <Box>
              <Typography color="text.secondary">Pozisyon Seviyesi</Typography>
              <Typography fontWeight="bold">{job?.level || "Uzman"}</Typography>
            </Box>
            <Box>
              <Typography color="text.secondary">Departman</Typography>
              <Typography fontWeight="bold">
                {job?.department || "Bilgi Teknolojileri / IT"}
              </Typography>
            </Box>
            <Box>
              <Typography color="text.secondary">Başvuru Sayısı</Typography>
              <Typography fontWeight="bold">
                {job?.applicationCount || "282 başvuru"}
              </Typography>
            </Box>
          </Paper>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
            px: { xs: 2, md: 6 },
          }}
        >
          <Box sx={{ flex: 3 }}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                {job?.title || "Yazılım Uzmanı"}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                {job?.company || "Alfemo"}
              </Typography>
              <ul>
                <li>Üniversitelerin ilgili bölümlerinden mezun...</li>
                <li>Html5, Css3, Bootstrap, Javascript, Jquery...</li>
                <li>Microsoft .NET platformu, C#, ASP.NET MVC...</li>
                <li>Tercihen MS SQL Server konusunda bilgi sahibi...</li>
              </ul>
              <Typography sx={{ mt: 2 }} fontWeight="bold" color="#7b1fa2">
                DAHA FAZLA GÖR
              </Typography>
            </Paper>

            <Paper sx={{ p: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Aday Kriterleri
              </Typography>
              <Typography variant="body2" gutterBottom>
                Tecrübe: <b>En az 2 yıl tecrübeli</b>
              </Typography>
              <Typography variant="body2" gutterBottom>
                Eğitim Seviyesi:{" "}
                <b>
                  Üniversite(Mezun), Yüksek Lisans(Öğrenci), Yüksek
                  Lisans(Mezun)
                </b>
              </Typography>
              <Typography variant="body2">
                Askerlik Durumu: <b>Yapıldı, Muaf</b>
              </Typography>
            </Paper>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                İlgini Çekebilecek İlanlar
              </Typography>
              {relatedJobs.map((job, index) => (
                <Paper
                  key={index}
                  sx={{
                    p: 2,
                    mb: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Typography fontWeight="bold" fontSize="0.95rem">
                    {job.title}
                  </Typography>
                  <Typography variant="body2">{job.company}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {job.city} • {job.type}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="right"
                  >
                    {job.date}
                  </Typography>
                </Paper>
              ))}
            </Paper>
          </Box>
        </Box>
      </Box>

      <ApplyModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobId={id}
      />
    </>
  );
};

export default JobDetail;
