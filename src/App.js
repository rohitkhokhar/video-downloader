import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';

function App() {
  const [url, setUrl] = useState('');
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState('');

  const handleDownload = async (e) => {
    e.preventDefault();
    setError('');
    setDownloading(true);
    try {
      const response = await fetch('https://video-downloader-backend-dwpk.onrender.com/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const err = await response.json();
        setError(err.error || 'Download failed');
        setDownloading(false);
        return;
      }

      // Download the file
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'video.mp4';
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError('An error occurred');
    }
    setDownloading(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            p: 5,
            boxShadow: 6,
            borderRadius: 4,
            backgroundColor: 'rgba(255,255,255,0.95)',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: '#2193b0',
              letterSpacing: 1,
              mb: 2,
            }}
          >
            Video Downloader
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: '#555', mb: 3 }}
          >
            Paste your video URL below and download instantly!
          </Typography>
          <form onSubmit={handleDownload}>
            <TextField
              label="Video URL"
              variant="outlined"
              fullWidth
              value={url}
              onChange={e => setUrl(e.target.value)}
              required
              sx={{ mb: 3 }}
              size="medium"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={downloading}
              fullWidth
              size="large"
              sx={{
                py: 1.5,
                fontWeight: 600,
                fontSize: '1.1rem',
                background: 'linear-gradient(90deg, #2193b0 0%, #6dd5ed 100%)',
              }}
            >
              {downloading ? 'Downloading...' : 'Download'}
            </Button>
          </form>
          {error && (
            <Typography color="error" sx={{ mt: 3 }}>
              {error}
            </Typography>
          )}
        </Box>
        <Typography
          variant="body2"
          sx={{
            mt: 4,
            color: '#fff',
            textAlign: 'center',
            opacity: 0.8,
            letterSpacing: 1,
          }}
        >
          &copy; {new Date().getFullYear()} Video Downloader. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default App;
