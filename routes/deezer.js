// backend/src/routes/deezer.js
const express = require('express');
const axios = require('axios');
const { rapidapiKey, rapidapiHost } = require('../config');

const router = express.Router();

const deezerApi = axios.create({
  baseURL: `https://${rapidapiHost}`,
  headers: {
    'X-RapidAPI-Key': rapidapiKey,
    'X-RapidAPI-Host': rapidapiHost,
  },
});

// Search Route
router.get('/search', async (req, res) => {
  const query = req.query.q;
  const index = req.query.index || 0; // Default index to 0 for the first page

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const response = await deezerApi.get(`/search`, { params: { q: query, index } });
    const data = response.data;

    if (data && data.data.length > 0) {
      return res.json({ tracks: data }); // Return the track data
    } else {
      return res.status(404).json({ error: 'No tracks found' });
    }
  } catch (error) {
    console.error('Error fetching tracks:', error.message);
    return res.status(500).json({ error: 'Failed to fetch tracks' });
  }
});

// Track Details Route
router.get('/track/:id', async (req, res) => {
  const trackId = req.params.id;

  try {
    const response = await deezerApi.get(`/track/${trackId}`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching track by ID:", error.message);
    res.status(500).json({ error: "Failed to fetch track" });
  }
});

module.exports = router;
