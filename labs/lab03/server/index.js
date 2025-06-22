// index.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Enable CORS so React (likely on localhost:3000) can talk to this server.
app.use(cors());
// For JSON bodies (used in /upload-dog).
app.use(express.json());

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer setup: store files in uploads/, with unique filenames
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Route: upload multiple images via form-data key "images"
app.post('/upload-multiple', upload.array('images', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ msg: 'No files uploaded' });
  }
  // Return the saved filenames
  const filenames = req.files.map(f => f.filename);
  res.json({ filenames });
});

// Route: get up to 3 random images from uploads/
app.get('/random-images', (req, res) => {
  let files = [];
  try {
    files = fs.readdirSync(uploadDir)
      .filter(f => /\.(jpe?g|png|gif)$/i.test(f));
  } catch (err) {
    return res.status(500).json({ msg: 'Error reading uploads directory' });
  }
  if (files.length === 0) {
    return res.json({ images: [] });
  }
  // pick up to 3
  const sample = _.sampleSize(files, Math.min(3, files.length));
  // build full URLs
  const urls = sample.map(f => `${req.protocol}://${req.get('host')}/uploads/${f}`);
  res.json({ images: urls });
});

// Route: upload a random dog image by URL
// Expects JSON body: { imageUrl: '...' }
app.post('/upload-dog', async (req, res) => {
  const { imageUrl } = req.body;
  if (!imageUrl) {
    return res.status(400).json({ msg: 'No imageUrl provided' });
  }
  try {
    // Download the image
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    // Determine extension from URL path, default to .jpg
    let ext = path.extname(new URL(imageUrl).pathname);
    if (!ext || ext.length > 5) ext = '.jpg';
    const filename = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;
    const filepath = path.join(uploadDir, filename);
    fs.writeFileSync(filepath, response.data);
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${filename}`;
    res.json({ filename, url: fileUrl });
  } catch (err) {
    console.error('Error downloading/uploading dog image:', err.message || err);
    res.status(500).json({ msg: 'Error downloading or saving the dog image' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
