const express = require('express');
const app = express();

const videos = {
  "a-working-man": "A Working Man",
  "deva": "Deva",
  "carjackers": "Carjackers",
  "flight-or-fight": "Flight or Fight",
  "heart-eyes": "Heart Eyes",
  "clawfoot": "Clawfoot"
};

const links = {
  "a-working-man": "https://www.dropbox.com/scl/fi/01/a-working-man.mp4?dl=1",
  "deva": "https://www.dropbox.com/scl/fi/02/deva.mp4?dl=1",
  "carjackers": "https://www.dropbox.com/scl/fi/03/carjackers.mp4?dl=1",
  "flight-or-fight": "https://www.dropbox.com/scl/fi/04/flight-or-fight.mp4?dl=1",
  "heart-eyes": "https://www.dropbox.com/scl/fi/05/heart-eyes.mp4?dl=1",
  "clawfoot": "https://www.dropbox.com/scl/fi/06/clawfoot.mp4?dl=1"
};

const generateToken = (videoId) => `token-for-${videoId}`;

app.get('/video/:id', (req, res) => {
  const userAgent = req.get('User-Agent') || '';
  const token = req.query.token;
  const videoId = req.params.id;

  if (!videos[videoId]) {
    return res.status(404).send('Video not found');
  }

  if (!userAgent.includes('OTT Player')) {
    return res.status(403).send('Access Forbidden: Invalid User-Agent');
  }

  if (token !== generateToken(videoId)) {
    return res.status(403).send('Access Forbidden: Invalid Token');
  }

  return res.redirect(links[videoId]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Secure OTT Server running on port ${PORT}`);
});