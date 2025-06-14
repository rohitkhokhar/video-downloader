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
      const response = await fetch('http://localhost:4000/api/download', {
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
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, p: 4, boxShadow: 2, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Video Downloader
        </Typography>
        <form onSubmit={handleDownload}>
          <TextField
            label="Video URL"
            variant="outlined"
            fullWidth
            value={url}
            onChange={e => setUrl(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={downloading}
            fullWidth
          >
            {downloading ? 'Downloading...' : 'Download'}
          </Button>
        </form>
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default App;