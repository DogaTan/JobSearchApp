// src/pages/MyApplications.js
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Container,
  CircularProgress,
} from '@mui/material';
import Navbar from '../components/Navbar';
import axios from 'axios';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/applications', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setApplications(response.data || []);
      } catch (error) {
        console.error('Başvurular alınamadı', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <>
      <Navbar />
      <Box sx={{ bgcolor: '#f9f9f9', minHeight: '100vh', py: 6 }}>
        <Container maxWidth="md">
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Başvurularım
          </Typography>

          {loading ? (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : applications.length === 0 ? (
            <Typography sx={{ mt: 4 }} color="text.secondary">
              Henüz hiçbir ilana başvurmadınız.
            </Typography>
          ) : (
            applications.map((app, index) => (
              <Paper
                key={index}
                sx={{
                  p: 3,
                  mb: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.5,
                }}
              >
                <Typography fontWeight="bold">{app.jobTitle}</Typography>
                <Typography variant="body2">{app.company}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {app.city} • Başvuru Tarihi: {app.appliedDate || '—'}
                </Typography>
              </Paper>
            ))
          )}
        </Container>
      </Box>
    </>
  );
};

export default MyApplications;
