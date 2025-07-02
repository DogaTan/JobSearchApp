import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Button,
  Container,
  AppBar,
  Toolbar,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddJobModal from "../components/AddJobModal";
import EditJobModal from "../components/EditJobModal";
import { fetchAllJobsAdmin, deleteJobAdmin, addJobAdmin, updateJobAdmin } from "../services/job";

const AdminDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleMenuOpen = (e) => setMenuAnchor(e.currentTarget);
  const handleMenuClose = () => setMenuAnchor(null);
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAllJobsAdmin(userId) // Admin özel tüm ilanları getirme servisi varsa, userId yerine "admin" gibi uygun değer verilebilir
      .then((data) => setJobs(data))
      .catch(() => setJobs([]));
  }, []);

  const handleAddJob = (newJob) => {
    addJobAdmin(newJob)
      .then(() => {
        // Admin tüm ilanları listelediği için tekrar fetch et
        fetchAllJobsAdmin(userId).then(setJobs);
        setOpenAddModal(false);
      })
      .catch((err) => alert("İlan eklenirken hata: " + err));
  };

  const handleEditJob = (updatedJob) => {
    updateJobAdmin(updatedJob.id, updatedJob)
      .then(() => {
        fetchAllJobsAdmin(userId).then(setJobs);
        setOpenEditModal(false);
        setSelectedJob(null);
      })
      .catch((err) => alert("İlan güncellenirken hata: " + err));
  };

  const handleDeleteJob = (id) => {
    deleteJobAdmin(id)
      .then(() => {
        fetchAllJobsAdmin(userId).then(setJobs);
      })
      .catch((err) => alert("İlan silinirken hata: " + err));
  };

  return (
    <Box sx={{ bgcolor: "#f4f6f8", minHeight: "100vh" }}>
      <AppBar position="static" sx={{ bgcolor: "#fff", color: "#000", boxShadow: 1 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight="bold" color="#7b1fa2">
            Admin Paneli
          </Typography>
          <IconButton onClick={handleMenuOpen}>
            <Avatar sx={{ bgcolor: "#7b1fa2" }}>
              <AccountCircle />
            </Avatar>
          </IconButton>
          <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
            <MenuItem onClick={handleLogout}>Çıkış Yap</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ mb: 4, textAlign: "right" }}>
          <Button
            variant="contained"
            onClick={() => setOpenAddModal(true)}
            sx={{ bgcolor: "#7b1fa2", textTransform: "none", fontWeight: "bold", px: 3 }}
          >
            Yeni İlan Ekle
          </Button>
        </Box>

        {jobs.map((job) => (
          <Paper
            key={job.id}
            sx={{
              p: 3,
              mb: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              borderRadius: 2,
              boxShadow: 2,
              backgroundColor: "#fff",
            }}
          >
            <Box>
              <Typography fontWeight="bold">{job.title}</Typography>
              <Typography variant="body2">
                {job.company} • {job.city}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {job.workType} • {job.level} • {job.department}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton color="primary" onClick={() => { setSelectedJob(job); setOpenEditModal(true); }}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={() => handleDeleteJob(job.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Paper>
        ))}
      </Container>

      <AddJobModal open={openAddModal} onClose={() => setOpenAddModal(false)} onSubmit={handleAddJob} />
      {selectedJob && (
        <EditJobModal
          open={openEditModal}
          onClose={() => {
            setOpenEditModal(false);
            setSelectedJob(null);
          }}
          job={selectedJob}
          onSubmit={handleEditJob}
        />
      )}
    </Box>
  );
};

export default AdminDashboard;
