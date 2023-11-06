const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const imgurPost = require('../imgurPost'); // Path to your imgurPost module

const router = express.Router();

router.post('/upload', upload.array('images'), async (req, res) => {
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
