// src/components/ApplyModal.js
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import axios from 'axios';

function ApplyModal({ open, onClose, jobId }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleApply = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `/api/applications`,
        { jobId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess('Başvurunuz başarıyla gönderildi.');
      setTimeout(() => {
        setLoading(false);
        onClose();
      }, 1500);
    } catch (err) {
      setError('Başvuru gönderilirken bir hata oluştu.');
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>İlana Başvur</DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          Bu ilana başvurmak istediğinize emin misiniz?
        </Typography>

        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          İptal
        </Button>
        <Button
          onClick={handleApply}
          variant="contained"
          sx={{ bgcolor: '#7b1fa2' }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} /> : 'Başvur'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ApplyModal;
