const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

app.get('/validate-address', async (req, res) => {
  try {
    const { address } = req.query;
    const response = await axios.get(
      `https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=${address}&benchmark=2020&format=json`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to validate address' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});