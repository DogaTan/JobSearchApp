import React, { useState } from "react";
import {
  Box,
  Modal,
  Typography,
  TextField,
  Button,
  MenuItem,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AddJobModal = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    city: "",
    workType: "",
    level: "",
    department: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: 600,
          maxHeight: "90vh",
          overflowY: "auto",
          bgcolor: "#fff",
          borderRadius: "12px",
          boxShadow: 24,
          p: 4,
        }}
      >
        {/* Kapatma ikonu */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            color: "grey.600",
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" fontWeight="bold" mb={3}>
          Yeni İlan Ekle
        </Typography>

        <TextField
          fullWidth
          label="İlan Başlığı *"
          name="title"
          value={formData.title}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Şirket Adı *"
          name="company"
          value={formData.company}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Şehir *"
          name="city"
          value={formData.city}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          select
          fullWidth
          label="Çalışma Şekli *"
          name="workType"
          value={formData.workType}
          onChange={handleChange}
          margin="normal"
        >
          <MenuItem value="İş Yerinde">İş Yerinde</MenuItem>
          <MenuItem value="Hibrit">Hibrit</MenuItem>
          <MenuItem value="Remote">Remote</MenuItem>
        </TextField>
        <TextField
          select
          fullWidth
          label="Pozisyon Seviyesi *"
          name="level"
          value={formData.level}
          onChange={handleChange}
          margin="normal"
        >
          <MenuItem value="Uzman">Uzman</MenuItem>
          <MenuItem value="Kıdemli Uzman">Kıdemli Uzman</MenuItem>
          <MenuItem value="Yönetici">Yönetici</MenuItem>
        </TextField>
        <TextField
          fullWidth
          label="Departman *"
          name="department"
          value={formData.department}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          multiline
          minRows={4}
          label="Açıklama *"
          name="description"
          value={formData.description}
          onChange={handleChange}
          margin="normal"
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            backgroundColor: "#7b1fa2",
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "1rem",
          }}
          onClick={handleSubmit}
        >
          İş İlanını Yayınla
        </Button>
      </Box>
    </Modal>
  );
};

export default AddJobModal;
