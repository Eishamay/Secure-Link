const fetch = require("node-fetch");

const MAX_DEVICES = 2;
const ALLOWED_AGENTS = ["OTT Player", "OTT Navigator"];
const DROPBOX_M3U_URL = "https://www.dropbox.com/scl/fi/7rjbduofncp7xsd9vx1of/CastproGold-FP-2025.zip?rlkey=wxw3nujekhouijvt4ldzjnjjd&st=k6vq45f0&dl=1";

module.exports = async (req, res) => {
  const uuid = req.query.uuid || req.headers["x-device-uuid"];
  const userAgent = req.headers["user-agent"] || "";

  if (!uuid) return res.status(400).send("Missing UUID");

  const isAllowedAgent = ALLOWED_AGENTS.some(agent => userAgent.includes(agent));
  if (!isAllowedAgent) return res.status(403).send("Access denied: invalid client");

  try {
    const response = await fetch(DROPBOX_M3U_URL);
    const m3uContent = await response.text();

    res.setHeader("Content-Type", "application/x-mpegURL");
    res.send(m3uContent);
  } catch (error) {
    res.status(500).send("Failed to fetch M3U from Dropbox");
  }

