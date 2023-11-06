// In your server-side Express route handler
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const imgurPost = require('../firebase/imgurPost.js'); // assuming this is a module you've created for posting to Imgur

router.post('/api/upload', upload.array('images'), async (req, res) => {
  try {
    // The uploaded files are available in `req.files`
    // You can now call your imgurPost function/module to upload to Imgur
    const imgurResponse = await imgurPost(req.files);
    res.send(imgurResponse);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
