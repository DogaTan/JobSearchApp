import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Toolbar,
  AppBar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddJobModal from "../components/AddJobModal";
import EditJobModal from "../components/EditJobModal";
import { fetchAllJobsAdmin, deleteJobAdmin, addJobAdmin, updateJobAdmin } from "../services/job";

const CompanyDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const fetchJobs = () => {
    fetchAllJobsAdmin(userId)
      .then((data) => setJobs(data))
      .catch((err) => console.error("İlanlar alınamadı", err));
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Bu ilanı silmek istediğinizden emin misiniz?")) return;
    deleteJobAdmin(id)
      .then(() => fetchJobs())
      .catch((err) => alert("Silme hatası: " + err));
  };

  const handleAddJob = (newJob) => {
    addJobAdmin(newJob)
      .then(() => {
        fetchJobs();
        setAddModalOpen(false);
      })
      .catch((err) => alert("İlan eklenirken hata: " + err));
  };

  const handleEditJob = (updatedJob) => {
    updateJobAdmin(selectedJobId, updatedJob)
      .then(() => {
        fetchJobs();
        setEditModalOpen(false);
        setSelectedJobId(null);
      })
      .catch((err) => alert("İlan güncellenirken hata: " + err));
  };

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };

  return (
    <Box sx={{ bgcolor: "#f9f9f9", minHeight: "100vh" }}>
      <AppBar position="static" sx={{ backgroundColor: "#fff", color: "#000", borderBottom: "1px solid #e0e0e0" }} elevation={0}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: "space-between", minHeight: 64 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#7b1fa2", fontSize: "1.6rem", textTransform: "lowercase" }}>
              kariyer.net
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button variant="text" size="small">EN</Button>
              <IconButton onClick={handleMenuOpen}>
                <Avatar sx={{ bgcolor: "#7b1fa2" }}>E</Avatar>
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleLogout}>Çıkış Yap</MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h5" fontWeight="bold">Yayınladığınız İlanlar</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setAddModalOpen(true)}
            sx={{ bgcolor: "#7b1fa2", textTransform: "none" }}
          >
            Yeni İlan
          </Button>
        </Box>

        {jobs.length === 0 ? (
          <Typography color="text.secondary">Henüz bir ilan eklemediniz.</Typography>
        ) : (
          jobs.map((job) => (
            <Paper key={job.id} sx={{ p: 3, mb: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography fontWeight="bold">{job.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {job.company} • {job.city} • {job.workType}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton color="primary" onClick={() => {
                    setSelectedJobId(job.id);
                    setEditModalOpen(true);
                  }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(job.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </Paper>
          ))
        )}
      </Container>

      <AddJobModal open={addModalOpen} onClose={() => setAddModalOpen(false)} onSubmit={handleAddJob} />
      <EditJobModal open={editModalOpen} onClose={() => setEditModalOpen(false)} jobId={selectedJobId} onSubmit={handleEditJob} />
    </Box>
  );
};

export default CompanyDashboard;
