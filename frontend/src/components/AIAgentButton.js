// src/components/AIAgentButton.js
import React, { useState } from 'react';
import {
  Box,
  Fab,
  TextField,
  Typography,
  Paper,
  IconButton
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';

function AIAgentButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <Fab
          color="secondary"
          onClick={() => setOpen(true)}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            bgcolor: '#9c27b0',
            color: '#fff',
            '&:hover': { bgcolor: '#7b1fa2' },
          }}
        >
          <ChatIcon />
        </Fab>
      )}

      {/* Chat Popup */}
      {open && (
        <Paper
          elevation={4}
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            width: 320,
            height: 360,
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            p: 2,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography fontWeight="bold">AI Assistant</Typography>
            <IconButton onClick={() => setOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              flex: 1,
              mt: 1,
              bgcolor: '#f5f5f5',
              borderRadius: 1,
              p: 1,
              overflowY: 'auto',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Hello, I'm your AI assistant. How can I help?
            </Typography>
          </Box>
          <TextField
            size="small"
            placeholder="Type a message..."
            fullWidth
            sx={{ mt: 1 }}
          />
        </Paper>
      )}
    </>
  );
}

export default AIAgentButton;
