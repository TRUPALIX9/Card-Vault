const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const extractText = require('../utils/ocr');
const uploadToCloudinary = require('../utils/upload');
const Card = require('../models/Card');

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const text = await extractText(req.file.path);
    const imageUrl = await uploadToCloudinary(req.file.path);
    fs.unlinkSync(req.file.path);

    const nameMatch = text.match(/([A-Z][a-z]+\s[A-Z][a-z]+)/);
    const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const phoneMatch = text.match(/(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}/);

    const newCard = new Card({
      imageUrl,
      name: nameMatch ? nameMatch[0] : "Unknown",
      email: emailMatch ? emailMatch[0] : "Unknown",
      phone: phoneMatch ? phoneMatch[0] : "Unknown",
      company: "TBD"
    });

    await newCard.save();
    res.json(newCard);
  } catch (err) {
    console.error('OCR or Upload Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
