const express = require('express');
const multer = require('multer');
const cors = require('cors');
const imgurRouter = require('./routes/imgurRouter'); // Your custom router for imgur

const app = express();
const port = process.env.PORT || 8080;

// Middlewares
app.use(cors()); // Enable CORS for your frontend
app.use(express.json()); // Parse JSON bodies
app.use('/api', imgurRouter); // Use your custom routes

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
