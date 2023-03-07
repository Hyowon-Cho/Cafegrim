const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const apiKey = 'YOUR_API_KEY_HERE'; // Google Places API key

app.get('/cafes', async (req, res) => {
  const { lat, lng } = req.query;

  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=500&type=cafe&key=${apiKey}`);
    const cafes = response.data.results.map(cafe => ({
      name: cafe.name,
      rating: cafe.rating,
      address: cafe.vicinity
    }));
    res.json(cafes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
